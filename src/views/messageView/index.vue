<template>
  <section class="chat-me" role="region" aria-label="找我聊天">
    <div class="wrap">
      <div class="card main-card">
        <div
          class="avatar-wrap"
          :style="{ 'background-image': `url(${avatarUrl})` }"
          aria-hidden="true"
        ></div>
        <div class="info">
          <h1 class="name">{{ displayName }}</h1>
          <p class="intro" v-html="introHtml"></p>
          <div class="actions">
            <a
              :href="bilibiliLink"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-primary"
              aria-label="发送 B 站私信"
            >
              发送私信
            </a>
            <button
              class="btn btn-ghost"
              @click="copyLink"
              :aria-label="copyAria"
            >
              复制b站私信链接
            </button>
          </div>
          <!-- <p class="hint">或在 B 站私信中搜索用户后直接联系我</p> -->
        </div>
      </div>

      <section class="topics" aria-label="可以聊的话题">
        <h2 class="topics-title">可以聊点什么？</h2>
        <p class="topics-sub">
          （欢迎随便丢话题过来，除了感情 | 我真没经验 😅）
        </p>
        <div class="topic-grid">
          <article
            v-for="(t, i) in topics"
            :key="i"
            class="topic-card"
            :aria-label="t.title"
          >
            <div class="topic-emoji" aria-hidden="true">{{ t.emoji }}</div>
            <div class="topic-body">
              <h3 class="topic-title">{{ t.title }}</h3>
              <p class="topic-desc">{{ t.desc }}</p>
            </div>
          </article>
        </div>
        <p class="foot-note">愿你被世界温柔以待，也别忘了善待自己。</p>
      </section>
    </div>

    <div v-if="copied" class="toast" role="status" aria-live="polite">
      已复制链接到剪贴板
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// --- 可编辑信息（把你的真实信息替换到这里） ---
const avatarUrl = ref("/avatar.jpeg"); // 替换为你的头像 URL
const displayName = ref("霜落天亦");
const intro = ref(
  "喜欢做网站、打游戏、看番、骑行、做饭等等 / 欢迎来 B 站私信聊天或吐槽\n小声说：我会认真回复你发过来的奇怪想法~"
);
const bilibiliLink = ref(
  "https://message.bilibili.com/?spm_id_from=333.1387.0.0#/whisper/mid372611876"
); // 替换为你的 B 站私信链接
// ------------------------------------------------

const topics = ref([
  {
    emoji: "💻",
    title: "网站技术讨论",
    desc: "Vue、Node、MySQL、接口设计、移动端适配、云服务器选择等等，想问啥都行。",
  },
  {
    emoji: "🛠️",
    title: "前端接单 / 网站开发",
    desc: "个人接单（大学毕设/作业，个人私有网站），包教包会。",
  },
  {
    emoji: "🎞️",
    title: "二次元 / 番剧推荐",
    desc: "想看什么风格的番？我会根据我贫瘠但真诚的观影史给你推荐（你反向推荐我也非常欢迎！）",
  },
  {
    emoji: "🌀",
    title: "鸣潮讨论",
    desc: "想让我下一个做谁的网站？对角色站点有什么建议？欢迎来一起吹吹角色、聊聊想法。",
  },

  {
    emoji: "📹",
    title: "自媒体剪辑与运营",
    desc: "这个我也没什么经验，有没有大佬来传授一下焚诀我保证洗耳恭听。",
  },
  {
    emoji: "☕",
    title: "随便唠唠",
    desc: "日常生活、工作吐槽、摆烂时刻、灵感乱飘——都能聊。",
  },
]);

const copied = ref(false);

const introHtml = computed(() => {
  return intro.value.replace(/\n/g, "<br/>");
});

const copyAria = computed(() => (copied.value ? "已复制" : "复制私信链接"));

async function copyLink() {
  try {
    await navigator.clipboard.writeText(bilibiliLink.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  } catch (e) {
    const textarea = document.createElement("textarea");
    textarea.value = bilibiliLink.value;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      copied.value = true;
      setTimeout(() => (copied.value = false), 2000);
    } catch (_err) {
      alert("复制失败，请手动复制链接");
    }
    document.body.removeChild(textarea);
  }
}
</script>

<style lang="scss" scoped>
// 主题配色（使用你提供的变量）
$bg-start: #f0f4f8;
$bg-end: #d9e2ec;
$muted-hex: #0b1820;
$muted-rgba: rgba(11, 24, 32, 0.65);
$accent-1: #2b8fbf;
$accent-2: #7fbfff;

.chat-me {
  min-height: 100vh; // 占满整个页面
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: linear-gradient(180deg, $bg-start 0%, $bg-end 100%);
  color: $muted-hex;
  padding-bottom: 48px;

  .wrap {
    width: 100%;
    max-width: 1100px;
    padding: 24px;
    box-sizing: border-box;
  }

  .main-card {
    display: flex;
    gap: 18px;
    align-items: center;
    padding: 18px;
    border-radius: 16px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.85),
      rgba(255, 255, 255, 0.7)
    );
    box-shadow: 0 12px 40px rgba(11, 24, 32, 0.06);
    backdrop-filter: blur(6px);
  }

  .avatar-wrap {
    flex: 0 0 120px;
    height: 120px;
    background-size: cover;
    background-position: center;
    border-radius: 14px;
    box-shadow: 0 8px 22px rgba(11, 24, 32, 0.06);
    transition: transform 200ms ease;
  }

  .info {
    flex: 1 1 auto;

    .name {
      margin: 0;
      font-size: 22px;
      color: $muted-hex;
      font-weight: 800;
    }

    .intro {
      margin: 8px 0 12px 0;
      color: $muted-rgba;
      line-height: 1.6;
      font-size: 15px;
    }

    .actions {
      display: flex;
      gap: 10px;
      align-items: center;

      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 10px 14px;
        border-radius: 12px;
        font-weight: 700;
        font-size: 14px;
        border: none;
        cursor: pointer;
        text-decoration: none;
        transition: transform 120ms ease, box-shadow 120ms ease;

        &.btn-primary {
          background: linear-gradient(90deg, $accent-1 0%, $accent-2 100%);
          color: #fff;
          box-shadow: 0 8px 20px rgba(43, 143, 191, 0.18);
        }

        &.btn-ghost {
          background: transparent;
          color: $muted-hex;
          border: 1px solid rgba(11, 24, 32, 0.06);
        }

        &:active {
          transform: translateY(1px);
        }
        &:hover {
          transform: translateY(-2px);
        }
      }
    }

    .hint {
      margin-top: 10px;
      font-size: 13px;
      color: rgba(11, 24, 32, 0.45);
    }
  }

  .topics {
    margin-top: 22px;

    .topics-title {
      margin: 0 0 6px 6px;
      font-size: 18px;
      font-weight: 800;
      color: $muted-hex;
    }

    .topics-sub {
      margin: 0 0 12px 6px;
      color: rgba(11, 24, 32, 0.6);
      font-size: 13px;
    }

    // 使用 flex 布局替代 grid，方便移动端控制为一行一张卡片
    .topic-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: stretch;
    }

    .topic-card {
      display: flex;
      gap: 12px;
      align-items: flex-start;
      padding: 12px;
      border-radius: 12px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.9),
        rgba(255, 255, 255, 0.85)
      );
      box-shadow: 0 8px 18px rgba(11, 24, 32, 0.04);
      border: 1px solid rgba(11, 24, 32, 0.03);

      // 三列等分（减去 gap 的影响）
      flex: 0 1 calc(33.333% - 8px);
      box-sizing: border-box;
      min-width: 220px;
    }

    .topic-emoji {
      font-size: 22px;
    }

    .topic-title {
      margin: 0;
      font-size: 15px;
      font-weight: 700;
    }
    .topic-desc {
      margin: 6px 0 0 0;
      font-size: 13px;
      color: rgba(11, 24, 32, 0.65);
    }

    .foot-note {
      margin-top: 12px;
      font-size: 13px;
      color: rgba(11, 24, 32, 0.55);
    }
  }

  .toast {
    position: fixed;
    right: 18px;
    bottom: 18px;
    padding: 10px 14px;
    border-radius: 10px;
    background: rgba(11, 24, 32, 0.9);
    color: #fff;
    font-size: 13px;
    box-shadow: 0 8px 24px rgba(11, 24, 32, 0.18);
  }
}

// 移动端：一行一张卡片（不使用 grid）
// 替换你的原移动端媒体查询（copy & paste）
@media (max-width: 560px) {
  /* 主卡改为纵向排列，头像在上方（更适合窄屏） */
  .chat-me .main-card {
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 14px;
  }

  /* 隐藏头像可选：如果要显示头像，下面不要 display: none */
  .chat-me .avatar-wrap {
    display: block; /* 或者 none 如果你确实想隐藏 */
    flex-basis: auto;
    width: 92px;
    height: 92px;
    border-radius: 12px;
  }

  /* 话题区：一行一张卡片，强制占满宽度 */
  .chat-me .topic-grid {
    /* 用 column 布局更直观，也可保留 wrap 行为 */
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .chat-me .topic-card {
    /* 强制不伸缩，100% 宽度并且没有最小宽度限制 */
    flex: 0 0 100%;
    width: 100%;
    max-width: 100%;
    min-width: 0; /* 关键：允许在 flex 容器内缩小 */
    box-sizing: border-box;
    padding: 12px;
  }

  /* 适当缩小文字与间距以节省高度 */
  .chat-me .topic-title {
    font-size: 15px;
  }
  .chat-me .topic-desc {
    font-size: 13px;
  }
}
</style>