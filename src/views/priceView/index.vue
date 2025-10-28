<template>
  <div class="price-wrap" role="main" aria-label="代肝价格表">
    <!-- 左侧侧栏（联系 + 说明）-->
    <aside class="sidebar" aria-label="联系方式与说明">
      <div class="side-card contact-card">
        <div class="brand">
          <div class="logo">霜</div>
          <div class="brand-text">
            <h2 class="title">霜落代肝小站</h2>
            <p class="muted">个人接单</p>
          </div>
        </div>

        <div class="contacts">
          <div class="row">
            <span class="k">qq：</span><span class="v">1663859111</span>
          </div>
          <div class="row">
            <span class="k">vx：</span><span class="v">18284940529</span>
          </div>
        </div>

        <p class="hint"></p>
      </div>

      <div class="side-card note-card">
        <h3 class="card-title">说明</h3>
        <p class="muted small">
          up是单线程笨蛋，没法多开设备，所以可能做的会慢一点，然后都会在b站直播
        </p>
      </div>
    </aside>

    <!-- 右侧主区域（价格卡片网格） -->
    <main class="main" aria-label="价格列表">
      <div class="grid">
        <section
          v-for="(sec, idx) in sections"
          :key="idx"
          class="section"
          :data-variant="sec.variant"
          :aria-label="sec.title"
        >
          <header class="sec-head">
            <h3 class="sec-title">{{ sec.title }}</h3>
            <span class="sec-badge" v-if="sec.badge">{{ sec.badge }}</span>
          </header>

          <ul class="sec-list">
            <li v-for="(it, i) in sec.items" :key="i" class="sec-item">
              <div class="item-left">
                <div class="it-name">{{ it.name }}</div>
                <div class="it-sub muted" v-if="it.sub">{{ it.sub }}</div>
              </div>

              <div class="item-right">
                <div class="it-price">{{ it.price }}</div>
                <div class="it-note muted" v-if="it.note">
                  （{{ it.note }}）
                </div>
              </div>
            </li>
          </ul>

          <div v-if="sec.summary" class="sec-summary muted">
            {{ sec.summary }}
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
/**
 * 价格数据（可按需增删改）
 * 保持结构化以便后续更新或国际化
 */
type Item = { name: string; price: string; note?: string; sub?: string };
type Section = {
  title: string;
  variant?: string;
  badge?: string;
  items: Item[];
  summary?: string;
};

const sections: Section[] = [
  {
    title: "托管（每月）",
    variant: "v1",
    items: [
      { name: "纯日常", price: "60r" },
      { name: "每日活跃 + 每日体力", price: "80r" },
      { name: "日体 + 电台满级 + 千道门扉 + 小活动", price: "160r" },
      { name: "日体 + 电台 + 门扉 + 深塔海域 + 大小活动", price: "300r" },
      { name: "全套 + 角色培养（升级材料+声骸刷取）", price: "600r" },
    ],
  },
  {
    title: "任务类",
    variant: "v2",
    items: [
      { name: "伴星 / 危行", price: "15r/每幕" },
      { name: "主线", price: "15~25r/每幕" },
    ],
  },

  {
    title: "声骸刷取",
    variant: "v3",
    items: [
      { name: "C4指定词条（治疗龟龟除外）", price: "6r/个" },
      { name: "C3指定词条", price: "12r/个" },
      { name: "一套小毕业43311(双爆加1个有效词条)", price: "300r" },
      { name: "一套大毕业43311(双爆加2个有效词条)", price: "600r" },
    ],
    summary: "需葫芦等级21以上（练度不够价格可能会有波动）",
  },
];
</script>

<style scoped lang="scss">
/* ---------- 替换整个 <style scoped lang="scss"> 为下面内容 ---------- */

.price-wrap {
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
  min-height: 100vh;
  padding: 28px;
  display: flex;
  gap: 20px;
  box-sizing: border-box;
  font-family: -apple-system, system-ui, "Segoe UI", Roboto, "Noto Sans CJK SC",
    "PingFang SC", "Microsoft YaHei", Arial;
  color: #0b1820;
  position: relative;
  overflow: hidden;
  --glass-bg-1: rgba(255, 255, 255, 0.06);
  --glass-bg-2: rgba(255, 255, 255, 0.03);
  --muted: rgba(11, 24, 32, 0.65);
  --accent: #2b8fbf;
  --accent-2: #7fbfff;
  --radius: 14px;
}

/* subtle moving accent (very low contrast, purely decorative) */
.price-wrap::before {
  content: "";
  position: absolute;
  inset: -20% -10%;
  background: radial-gradient(
      circle at 10% 20%,
      rgba(127, 191, 255, 0.06),
      transparent 10%
    ),
    radial-gradient(circle at 90% 80%, rgba(43, 143, 191, 0.04), transparent 8%);
  transform: translateZ(0);
  pointer-events: none;
  animation: slow-drift 18s linear infinite;
  will-change: transform;
  z-index: 0;
}

/* ---------- 布局 ---------- */
.sidebar {
  width: 320px;
  max-width: 36%;
  display: flex;
  flex-direction: column;
  gap: 14px;
  z-index: 1;
}

.side-card {
  background: linear-gradient(180deg, var(--glass-bg-1), var(--glass-bg-2));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: var(--radius);
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 8px 28px rgba(6, 15, 20, 0.08);
  position: relative;
  overflow: hidden;
  transform-origin: center;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

/* subtle hover lift for side cards */
.side-card:focus-within,
.side-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(6, 15, 20, 0.12);
}

/* CONTACT BRAND */
.contact-card .brand {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 8px;
  position: relative;
  z-index: 2;
}

/* LOGO 扩展效果：保留文字“霜”，并增加滑光 */
.logo {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  display: flex;
  align-items: center;
  justify-content: center;
  color: #072029;
  font-weight: 800;
  font-size: 1.05rem;
  box-shadow: 0 12px 30px rgba(43, 143, 191, 0.12);
  position: relative;
  overflow: hidden;
  flex: 0 0 56px;
}

/* logo 光泽划过 */
.logo::after {
  content: "";
  position: absolute;
  top: -40%;
  left: -30%;
  width: 36%;
  height: 180%;
  transform: rotate(-20deg);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.55) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  opacity: 0;
  transition: opacity 0.28s ease;
  pointer-events: none;
}

/* hover 时滑光短暂出现 */
.logo:hover::after,
.logo:focus::after {
  opacity: 0.9;
  animation: logo-sheen 900ms ease;
}

/* brand text */
.brand-text .title {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: #04202a;
}
.brand-text .muted {
  margin: 0;
  color: var(--muted);
  font-size: 0.92rem;
}

/* contacts */
.contacts {
  margin: 10px 0;
  .row {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 6px;
    .k {
      color: var(--muted);
      width: 28px;
      font-size: 0.95rem;
    }
    .v {
      font-weight: 700;
      color: #04202a;
      font-size: 0.98rem;
    }
  }
}

/* hint small */
.hint {
  color: var(--muted);
  font-size: 0.9rem;
}

/* note card */
.note-card .card-title {
  margin: 0 0 6px;
  font-weight: 700;
  color: #04202a;
}
.note-card .muted {
  color: var(--muted);
  font-size: 0.9rem;
}

/* ---------- 主区域 / 网格 ---------- */
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 1;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  align-items: start;
}

/* section 卡片（入口动画 + 悬浮） */
.section {
  padding: 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, var(--glass-bg-1), var(--glass-bg-2));
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  box-shadow: 0 6px 18px rgba(8, 16, 20, 0.06);
  display: flex;
  flex-direction: column;
  gap: 8px;
  transform-origin: center;
  transition: transform 0.18s cubic-bezier(0.2, 0.9, 0.3, 1),
    box-shadow 0.18s ease;
  opacity: 0;
  transform: translateY(10px) scale(0.995);
  animation: card-fadeUp 0.46s ease forwards;
  will-change: transform, opacity;
}

/* stagger entrance for dynamic sections (对较多 section 的场景做到 6 个) */
.grid .section:nth-child(1) {
  animation-delay: 80ms;
}
.grid .section:nth-child(2) {
  animation-delay: 160ms;
}
.grid .section:nth-child(3) {
  animation-delay: 240ms;
}
.grid .section:nth-child(4) {
  animation-delay: 320ms;
}
.grid .section:nth-child(5) {
  animation-delay: 400ms;
}
.grid .section:nth-child(6) {
  animation-delay: 480ms;
}

/* hover lift */
.section:hover,
.section:focus-within {
  transform: translateY(-6px) scale(1.01);
  box-shadow: 0 18px 38px rgba(10, 24, 30, 0.12);
}

/* header */
.sec-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.sec-title {
  margin: 0;
  font-size: 1.02rem;
  font-weight: 700;
  color: #07202a;
}
.sec-badge {
  background: rgba(255, 255, 255, 0.08);
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 0.82rem;
  color: var(--muted);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform-origin: center;
  animation: badge-pulse 2.4s ease-in-out infinite;
}

/* 列表与 item 动画（顺序入场）*/
.sec-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.sec-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.12s ease, transform 0.12s ease, box-shadow 0.12s ease;
  background: transparent;
  will-change: transform, opacity;
  cursor: default;
  opacity: 0;
  transform: translateY(6px);
  animation: item-fadeUp 0.36s ease forwards;
}

/* stagger list item animation up to first 8 items */
.sec-list .sec-item:nth-child(1) {
  animation-delay: 120ms;
}
.sec-list .sec-item:nth-child(2) {
  animation-delay: 180ms;
}
.sec-list .sec-item:nth-child(3) {
  animation-delay: 240ms;
}
.sec-list .sec-item:nth-child(4) {
  animation-delay: 300ms;
}
.sec-list .sec-item:nth-child(5) {
  animation-delay: 360ms;
}
.sec-list .sec-item:nth-child(6) {
  animation-delay: 420ms;
}
.sec-list .sec-item:nth-child(7) {
  animation-delay: 480ms;
}
.sec-list .sec-item:nth-child(8) {
  animation-delay: 540ms;
}

/* hover / focus on items */
.sec-item:hover,
.sec-item:focus {
  background: rgba(207, 207, 207, 0.02);
  transform: translateY(-4px);
  box-shadow: 0 8px 18px rgba(6, 15, 20, 0.06);
  outline: none;
  cursor: pointer;
}

/* left / right columns */
.item-left {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.it-name {
  font-weight: 600;
  color: #07202a;
}
.it-sub {
  color: var(--muted);
  font-size: 0.9rem;
}

.item-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}
.it-price {
  color: #045a6b;
  font-weight: 800;
  font-size: 0.98rem;
  transition: transform 0.12s ease;
}
.it-note {
  color: var(--muted);
  font-size: 0.9rem;
  text-align: right;
}

/* 鼠标悬停时让价格微微放大以吸引注意 */
.sec-item:hover .it-price,
.sec-item:focus .it-price {
  transform: scale(1.06);
}

/* summary */
.sec-summary {
  margin-top: 6px;
  padding: 8px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.03);
  color: var(--muted);
  font-size: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.02);
}

/* 响应式：窄屏（移动端）调整为单列堆叠 */
@media (max-width: 900px) {
  .price-wrap {
    flex-direction: column;
    padding: 16px;
  }
  .sidebar {
    width: 100%;
    max-width: 100%;
    order: -1;
  }
  .grid {
    grid-template-columns: 1fr;
  }
  .section {
    padding: 14px;
  }
}

/* 小屏进一步缩放文字 */
@media (max-width: 420px) {
  .contacts .v {
    font-size: 0.95rem;
  }
  .sec-item {
    padding: 10px;
  }
  .sec-title {
    font-size: 1rem;
  }
  .hint,
  .muted,
  .small {
    font-size: 0.84rem;
  }
}

/* keyboard focus outline for accessibility */
:focus-visible {
  outline: 3px solid rgba(43, 143, 191, 0.18);
  outline-offset: 3px;
  border-radius: 6px;
}

/* reduce motion preference — 关闭动画但保留静态样式 */
@media (prefers-reduced-motion: reduce) {
  .price-wrap::before,
  .grid .section,
  .sec-list .sec-item,
  .sec-badge,
  .logo::after {
    animation: none !important;
    transition: none !important;
  }
  .section,
  .side-card {
    transform: none !important;
  }
}

/* ---------- keyframes ---------- */
@keyframes slow-drift {
  0% {
    transform: translate3d(0, 0, 0) rotate(0.001deg);
  }
  50% {
    transform: translate3d(-6px, 4px, 0) rotate(0.001deg);
  }
  100% {
    transform: translate3d(0, 0, 0) rotate(0.001deg);
  }
}

@keyframes card-fadeUp {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.995);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes item-fadeUp {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes badge-pulse {
  0% {
    transform: scale(0.98);
    opacity: 0.96;
  }
  50% {
    transform: scale(1.04);
    opacity: 1;
  }
  100% {
    transform: scale(0.98);
    opacity: 0.96;
  }
}

@keyframes logo-sheen {
  0% {
    transform: translateX(-120%) rotate(-20deg);
    opacity: 0;
  }
  50% {
    transform: translateX(10%) rotate(-20deg);
    opacity: 0.92;
  }
  100% {
    transform: translateX(120%) rotate(-20deg);
    opacity: 0;
  }
}

/* 微调：保持视觉一致性 */
.hint,
.muted,
.small,
.sec-summary {
  font-size: 0.9rem;
}
</style>
