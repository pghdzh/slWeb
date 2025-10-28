<template>
  <div class="diary-list" role="main" aria-label="代肝日记">
    <!-- 顶部工具栏：搜索 + 简要统计 -->
    <div class="toolbar" role="search" aria-label="搜索任务">
      <div class="left">
        <h2 class="page-title">代肝日记</h2>
        <p class="subtitle muted">展示正在托管/已托管的任务进度与日记预览</p>
      </div>

      <div class="controls">
        <div class="search-wrapper" role="search">
          <input
            v-model="keyword"
            @keyup.enter="fetchPosts"
            type="text"
            class="search-input"
            placeholder="搜索昵称 / 套餐"
            aria-label="搜索昵称"
          />
          <button class="btn sm" @click="fetchPosts" aria-label="搜索">
            搜索
          </button>
        </div>

        <div class="summary">
          <span class="muted">共</span>
          <strong>{{ total }}</strong>
          <span class="muted">个任务</span>
        </div>
      </div>
    </div>

    <!-- 卡片网格 -->
    <div class="grid">
      <section
        v-for="post in derivedPosts"
        :key="post.id"
        class="card"
        :aria-label="`任务 ${post.title}`"
        tabindex="0"
        @click="openViewer(post)"
      >
        <header class="card-head">
          <div class="title-wrap">
            <h3 class="title">{{ post.title }}</h3>
            <span class="badge" v-if="post.remainingDays === 0">已完成</span>
            <span class="badge in-progress" v-else>进行中</span>
          </div>
          <div class="meta muted">
            开始：{{ formatDate(post.publish_date) }}
            <span class="dot">•</span>
            总天数：{{ post.views }}
          </div>
        </header>

        <div class="card-body">
          <p class="excerpt" v-if="post.excerpt">{{ post.excerpt }}</p>
          <p class="excerpt muted" v-else>{{ post.contentPreview }}</p>

          <div class="progress-wrap" aria-hidden="true">
            <div class="progress-info">
              <div class="days">
                <span class="num">{{ post.daysPassed }}</span>
                <span class="muted small">已过天数</span>
              </div>
              <div class="days remaining">
                <span class="num">{{ post.remainingDays }}</span>
                <span class="muted small">剩余天数</span>
              </div>
            </div>

            <div
              class="progress-bar"
              role="progressbar"
              :aria-valuenow="post.progressPercent"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div
                class="progress-fill"
                :style="{ width: post.progressPercent + '%' }"
              ></div>
            </div>
          </div>
        </div>

        <footer class="card-foot">
          <button class="btn sm" @click.stop="openViewer(post)">
            查看日记
          </button>
          <div class="right muted">
            <span class="small">ID: {{ post.id }}</span>
          </div>
        </footer>
      </section>

      <!-- 无数据提示 -->
      <div v-if="derivedPosts.length === 0" class="empty">
        <div class="empty-card">
          <p class="muted">未查到相关任务。试试清空搜索或切换页码。</p>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <div class="pagination" aria-label="分页">
      <button
        class="btn pager"
        :disabled="page === 1"
        @click="changePage(page - 1)"
      >
        上一页
      </button>
      <span class="page-info">第 {{ page }} 页 / 共 {{ totalPages }} 页</span>
      <button
        class="btn pager"
        :disabled="page >= totalPages"
        @click="changePage(page + 1)"
      >
        下一页
      </button>
    </div>

    <!-- 查看弹窗 -->
    <div
      v-if="viewer.show"
      class="modal-mask"
      role="dialog"
      aria-modal="true"
      :aria-label="`查看 ${viewer.post?.title}`"
    >
      <div class="modal-wrapper" @click.self="closeViewer">
        <article class="modal-card">
          <header class="modal-head">
            <h3>{{ viewer.post?.title }}</h3>
            <div class="meta muted">
              开始：{{ formatDate(viewer.post?.publish_date) }} · 总天数：{{
                viewer.post?.views
              }}
              <span class="dot">•</span> 已过：{{ viewer.post?.daysPassed }} 天
              · 剩余：{{ viewer.post?.remainingDays }} 天
            </div>
          </header>

          <div class="modal-body">
            <p
              v-if="viewer.post?.content"
              class="content"
              v-html="viewer.post.content"
            ></p>
            <p v-else class="muted">该任务暂无日记内容。</p>
          </div>

          <footer class="modal-foot">
            <button class="btn" @click="closeViewer">关闭</button>
          </footer>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { getPostList, Post } from "@/api/modules/blog"; // 与后台相同的接口模块

// state
const posts = ref<Post[]>([]);
const page = ref<number>(1);
const pageSize = 10;
const totalPages = ref<number>(1);
const total = ref<number>(0);
const keyword = ref<string>("");

// viewer modal
const viewer = ref<{
  show: boolean;
  post:
    | (Post & {
        daysPassed?: number;
        remainingDays?: number;
        progressPercent?: number;
        contentPreview?: string;
      })
    | null;
}>({ show: false, post: null });

// 获取并处理数据
async function fetchPosts() {
  const res: any = await getPostList({
    page: page.value,
    pageSize,
    keyword: keyword.value,
  });
  if (res && res.success) {
    posts.value = res.data || [];
    totalPages.value = res.pagination?.totalPages ?? 1;
    total.value =
      res.pagination?.totalTotal ??
      posts.value.length + (totalPages.value - 1) * pageSize;
  } else {
    posts.value = [];
    totalPages.value = 1;
    total.value = 0;
  }
}

// 辅助：计算已过天数 / 剩余天数 / 进度
function calcDerived(p: Post) {
  const now = new Date();
  const start = new Date(p.publish_date);
  // 计算 daysPassed（向下取整），若开始日期在将来则为 0
  const msPerDay = 1000 * 60 * 60 * 24;
  const diff = now.getTime() - start.getTime();
  let daysPassed = Math.max(0, Math.floor(diff / msPerDay));
  // 如果 p.views 不是正数，直接处理为 0
  const totalDays = Number(p.views) >= 0 ? Math.floor(Number(p.views)) : 0;
  let remainingDays = Math.max(0, totalDays - daysPassed);
  // progress percent：已过 / 总天数（如果总天数为 0 则视作 100%）
  let progressPercent =
    totalDays > 0
      ? Math.min(
          100,
          Math.round((Math.min(daysPassed, totalDays) / totalDays) * 100)
        )
      : 100;

  // content 预览（去掉 html 标签并限制长度）
  const plain = (p.content ?? p.excerpt ?? "").replace(/<[^>]*>/g, "");
  const contentPreview = plain.length > 140 ? plain.slice(0, 140) + "…" : plain;

  return {
    ...p,
    daysPassed,
    remainingDays,
    progressPercent,
    contentPreview,
  };
}

// 派生列表（带计算字段）
const derivedPosts = computed(() => posts.value.map((p) => calcDerived(p)));

// 控制器
function openViewer(
  p: Post | (Post & { daysPassed?: number; remainingDays?: number })
) {
  viewer.value.post = calcDerived(p as Post);
  viewer.value.show = true;
}

function closeViewer() {
  viewer.value.show = false;
  viewer.value.post = null;
}

function changePage(p: number) {
  if (p < 1) return;
  page.value = p;
  fetchPosts();
}

function formatDate(s?: string) {
  if (!s) return "";
  try {
    return new Date(s).toLocaleDateString("zh-CN");
  } catch {
    return s;
  }
}

// 初始化
onMounted(fetchPosts);
</script>

<style scoped lang="scss">
.diary-list {
  padding: 28px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
  font-family: -apple-system, system-ui, "Segoe UI", Roboto, "Noto Sans CJK SC",
    "PingFang SC", "Microsoft YaHei", Arial;
  color: #0b1820;
  --glass-bg-1: rgba(255, 255, 255, 0.06);
  --glass-bg-2: rgba(255, 255, 255, 0.03);
  --muted: rgba(11, 24, 32, 0.62);
  --accent: #2b8fbf;
  --accent-2: #7fbfff;
  --radius: 12px;
}

/* toolbar */
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
  z-index: 1;

  .left {
    .page-title {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 700;
      color: #04202a;
    }
    .subtitle {
      margin: 2px 0 0;
      color: var(--muted);
      font-size: 0.92rem;
    }
  }

  .controls {
    display: flex;
    gap: 12px;
    align-items: center;

    .search-wrapper {
      display: flex;
      gap: 8px;
      align-items: center;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.02),
        rgba(255, 255, 255, 0.01)
      );
      padding: 6px;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.06);
      box-shadow: 0 6px 18px rgba(6, 15, 20, 0.04);

      .search-input {
        border: none;
        background: transparent;
        padding: 6px 8px;
        width: 220px;
        outline: none;
        color: #04202a;
      }
    }

    .summary {
      display: flex;
      align-items: baseline;
      gap: 6px;
      color: var(--muted);
      font-size: 0.95rem;
      strong {
        color: #04202a;
        font-weight: 700;
      }
    }
  }
}

/* grid */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-bottom: 18px;
}

/* card */
.card {
  background: linear-gradient(180deg, var(--glass-bg-1), var(--glass-bg-2));
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: var(--radius);
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 30px rgba(6, 15, 20, 0.06);
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
  transition: transform 0.18s cubic-bezier(0.2, 0.9, 0.3, 1),
    box-shadow 0.18s ease;
  opacity: 0;
  transform: translateY(8px);
  animation: card-fadeUp 0.42s ease forwards;
}

/* stagger by index via nth-child (up to 9) */
.grid .card:nth-child(1) {
  animation-delay: 80ms;
}
.grid .card:nth-child(2) {
  animation-delay: 140ms;
}
.grid .card:nth-child(3) {
  animation-delay: 200ms;
}
.grid .card:nth-child(4) {
  animation-delay: 260ms;
}
.grid .card:nth-child(5) {
  animation-delay: 320ms;
}
.grid .card:nth-child(6) {
  animation-delay: 380ms;
}
.grid .card:nth-child(7) {
  animation-delay: 440ms;
}
.grid .card:nth-child(8) {
  animation-delay: 500ms;
}
.grid .card:nth-child(9) {
  animation-delay: 560ms;
}

.card:hover,
.card:focus {
  transform: translateY(-8px);
  box-shadow: 0 22px 46px rgba(6, 15, 20, 0.12);
  outline: none;
}

/* head */
.card-head {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.title-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: space-between;
}
.title {
  margin: 0;
  font-size: 1.02rem;
  font-weight: 700;
  color: #07202a;
}
.badge {
  background: rgba(255, 255, 255, 0.08);
  padding: 4px 8px;
  border-radius: 10px;
  color: var(--muted);
  font-size: 0.82rem;
}
.badge.in-progress {
  color: var(--accent);
}

/* meta line */
.meta {
  font-size: 0.85rem;
  color: var(--muted);
  display: flex;
  gap: 8px;
  align-items: center;
}
.dot {
  margin: 0 6px;
  color: rgba(11, 24, 32, 0.18);
}

/* body */
.card-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.excerpt {
  margin: 0;
  color: #04202a;
  font-size: 0.95rem;
  line-height: 1.4;
}
.excerpt.muted {
  color: var(--muted);
}

/* progress */
.progress-wrap {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.progress-info {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}
.days {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.days.remaining {
  align-items: flex-end;
}
.num {
  font-weight: 800;
  font-size: 1.08rem;
  color: #045a6b;
}
.small {
  font-size: 0.82rem;
  color: var(--muted);
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.02);
}
.progress-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  border-radius: 999px;
  transition: width 0.6s cubic-bezier(0.2, 0.9, 0.3, 1);
}

/* foot */
.card-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}
.btn.sm {
  padding: 6px 10px;
  font-size: 0.9rem;
}

/* empty */
.empty {
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
}
.empty-card {
  padding: 24px;
  border-radius: 10px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.02),
    rgba(255, 255, 255, 0.01)
  );
  border: 1px solid rgba(255, 255, 255, 0.04);
  color: var(--muted);
}

/* pagination */
.pagination {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
  color: var(--muted);
}
.page-info {
  font-size: 0.95rem;
  color: #04202a;
}

/* modal */
.modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(4, 8, 12, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 60;
}
.modal-wrapper {
  max-width: 980px;
  width: 100%;
}
.modal-card {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), #fff);
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 30px 80px rgba(6, 15, 20, 0.28);
  max-height: 80vh;
  overflow: auto;
}
.modal-head h3 {
  margin: 0 0 6px;
  font-size: 1.12rem;
}
.modal-body {
  padding: 8px 0 14px;
  color: #04202a;
  line-height: 1.6;
}
.modal-foot {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

/* animation keyframes */
@keyframes card-fadeUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* reduce motion */
@media (prefers-reduced-motion: reduce) {
  .card {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
  .progress-fill {
    transition: none !important;
  }
}

/* responsive */
@media (max-width: 1100px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .search-input {
    width: 160px;
  }
}
@media (max-width: 700px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .toolbar {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  .controls {
    width: 100%;
    justify-content: space-between;
  }
  .search-input {
    width: 100%;
  }
}
</style>
