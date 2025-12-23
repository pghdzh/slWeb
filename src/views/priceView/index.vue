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
            <span class="k">QQ：</span><span class="v">1663859111</span>
          </div>
          <div class="row">
            <span class="k">微信：</span><span class="v">slty_site</span>
          </div>
        </div>

        <p class="hint"></p>
      </div>

      <div class="side-card note-card">
        <h3 class="card-title">说明</h3>
        <p class="muted small">有什么问题都可以随时私信我哦</p>
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
      {
        name: "日体 + 电台 + 门扉 + 深塔海域 + 大小活动 + 角色培养（升级材料+声骸刷取）",
        price: "400r",
      },
    ],
  },
  {
    title: "煌珑地图全收集",
    variant: "v2",
    items: [
      { name: "云陵谷", price: "20r" },
      { name: "今州城", price: "25r" },
      { name: "中曲台地", price: "55r" },
      { name: "荒石高地", price: "40r" },
      { name: "归墟港市", price: "45r" },
      { name: "无光之森", price: "35r" },
      { name: "无明湾", price: "25r" },
      { name: "北落野", price: "25r" },
      { name: "怨鸟泽", price: "40r" },
      { name: "虎口山脉", price: "25r" },
      { name: "乘霄山", price: "60r" },
      { name: "煌珑十一图全包", price: "370r" },
    ],
  },
  {
    title: "黑海岸地图全收集",
    variant: "v3",
    items: [
      { name: "黑海岸全包收集", price: "50r" },
      { name: "黑海岸群岛", price: "25r" },
      { name: "泰提斯之底", price: "30r" },
    ],
 
  },
  {
    title: "黎那汐塔地图全收集",
    variant: "v4",
    items: [
      { name: "拉古娜城", price: "5r" },
      { name: "埃弗拉德金库", price: "35r" },
      { name: "悲叹墓岛", price: "30r" },
      { name: "赞悼圣迹", price: "25r" },
      { name: "拂风水畔", price: "30r" },
      { name: "氤冢水境", price: "30r" },
      { name: "柳生半岛", price: "30r" },
      { name: "狄萨莱海脊", price: "35r" },
      { name: "下层金库", price: "20r" },
      { name: "黎乔利群岛", price: "25r" },
      { name: "阿维纽林", price: "30r" },
      { name: "贝奥海域", price: "25r" },
      { name: "七丘", price: "60r" },
      { name: "隐海试验场", price: "20r" },
      { name: "桑古伊斯狩原", price: "50r" },
      { name: "黎那汐塔十五图全包", price: "420r" },
    ],
   
  },

  {
    title: "声骸刷取",
    variant: "v5",
    items: [
      { name: "C4指定词条（治疗龟龟除外）", price: "3r/个" },
      { name: "C3指定词条", price: "6r/个" },
      { name: "一套小毕业43311(双爆加1个有效词条)", price: "200r" },
      { name: "一套大毕业43311(双爆加2个有效词条)", price: "300r" },
    ],
    summary: "需葫芦等级21以上",
  },

  {
    title: "常驻活动与任务",
    variant: "v6",
    items: [
      { name: "老人鱼海", price: "60r" },
      { name: "团团团团转", price: "60r" },
      { name: "荣耀之丘", price: "70r" },
      { name: "主线剧情", price: "15r/幕" },
      { name: "伴星任务", price: "15r" },
      { name: "危行任务", price: "15～20r" },
    ],
  },
];
</script>

<style scoped lang="scss">
// ---------- 变量区 ----------
$bg-start: #f0f4f8;
$bg-end: #d9e2ec;
$muted-hex: #0b1820;
$muted-rgba: rgba(11, 24, 32, 0.65);
$accent-1: #2b8fbf;
$accent-2: #7fbfff;
$glass-1: rgba(255, 255, 255, 0.06);
$glass-2: rgba(255, 255, 255, 0.03);
$radius: 14px;
$card-padding: 16px;
$sidebar-width: 320px;
$gap: 20px;
$max-columns: 3; // 桌面最多列数（可调）
$min-card-w: 240px; // 卡片最小宽度

// 辅助 mixin：玻璃质感
@mixin glass($blur: 8px, $border-opacity: 0.12) {
  background: linear-gradient(180deg, $glass-1, $glass-2);
  backdrop-filter: blur($blur);
  -webkit-backdrop-filter: blur($blur);
  border: 1px solid rgba(255, 255, 255, $border-opacity);
}

// prefers-reduced-motion
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}

// ---------- 主容器 ----------
.price-wrap {
  min-height: 100vh;
  padding: 28px;
  display: flex;
  gap: $gap;
  box-sizing: border-box;
  font-family: -apple-system, system-ui, "Segoe UI", Roboto, "Noto Sans CJK SC",
    "PingFang SC", "Microsoft YaHei", Arial;
  color: $muted-hex;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, $bg-start, $bg-end);
  --muted: $muted-rgba;
  --accent: $accent-1;
  --accent-2: $accent-2;
  --radius: $radius;
  z-index: 0;

  // 低对比度装饰光斑，性能友好：只用 transform/opacity
  &::before {
    content: "";
    position: absolute;
    inset: -18% -8%;
    background: radial-gradient(
        circle at 12% 22%,
        rgba($accent-2, 0.06),
        transparent 10%
      ),
      radial-gradient(circle at 88% 78%, rgba($accent-1, 0.04), transparent 8%);
    pointer-events: none;
    transform: translateZ(0);
    animation: slow-drift 20s linear infinite;
    will-change: transform;
    z-index: 0;
  }
}

/* ---------- 布局：侧边栏 + 主区 ---------- */
.sidebar {
  width: $sidebar-width;
  max-width: 36%;
  display: flex;
  flex-direction: column;
  gap: 14px;
  z-index: 1;

  .side-card {
    @include glass(10px, 0.12);
    border-radius: var(--radius);
    padding: $card-padding;
    box-shadow: 0 8px 28px rgba(6, 15, 20, 0.06);
    position: relative;
    overflow: hidden;
    transform-origin: center;
    transition: transform 180ms ease, box-shadow 180ms ease;
    will-change: transform, box-shadow;

    &:hover,
    &:focus-within {
      transform: translateY(-6px);
      box-shadow: 0 20px 40px rgba(6, 15, 20, 0.1);
    }
  }

  // contact card
  .contact-card {
    .brand {
      display: flex;
      gap: 12px;
      align-items: center;
      margin-bottom: 8px;
      z-index: 2;

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

        &::after {
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
          transition: opacity 220ms ease;
          pointer-events: none;
        }

        &:hover::after,
        &:focus::after {
          opacity: 0.9;
          animation: logo-sheen 900ms ease;
        }
      }

      .brand-text {
        .title {
          margin: 0;
          font-size: clamp(0.98rem, 1.6vw, 1.08rem);
          font-weight: 700;
          color: #04202a;
        }
        .muted {
          margin: 0;
          color: var(--muted);
          font-size: 0.92rem;
        }
      }
    }

    .contacts {
      margin: 10px 0;

      .row {
        display: flex;
        gap: 10px;
        align-items: center;
        margin-bottom: 6px;

        .k {
          color: var(--muted);
          width: 56px;
          font-size: clamp(0.9rem, 1.2vw, 0.95rem);
        }
        .v {
          font-weight: 700;
          color: #04202a;
          font-size: clamp(0.95rem, 1.4vw, 1rem);
          word-break: break-all;
        }
      }
    }

    .hint {
      color: var(--muted);
      font-size: 0.9rem;
    }
  }

  .note-card {
    .card-title {
      margin: 0 0 6px;
      font-weight: 700;
      color: #04202a;
    }
    .muted {
      color: var(--muted);
      font-size: 0.9rem;
    }
  }
}

/* ---------- 主区域 / 网格 ---------- */
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 1;

  .grid {
    display: grid;
    // 自动适配列数：卡片最小宽度 $min-card-w，再用 auto-fit 填充
    grid-template-columns: repeat(auto-fit, minmax($min-card-w, 1fr));
    gap: 12px;
    align-items: start;
  }

  .section {
    @include glass(6px, 0.08);
    padding: 12px;
    border-radius: 12px;
    box-shadow: 0 6px 18px rgba(8, 16, 20, 0.06);
    display: flex;
    flex-direction: column;
    gap: 8px;
    transform-origin: center;
    transition: transform 180ms cubic-bezier(0.2, 0.9, 0.3, 1),
      box-shadow 180ms ease;
    opacity: 0;
    transform: translateY(8px) scale(0.997);
    animation: card-fadeUp 420ms ease forwards;
    will-change: transform, opacity;

    &:hover,
    &:focus-within {
      transform: translateY(-6px) scale(1.01);
      box-shadow: 0 18px 38px rgba(10, 24, 30, 0.12);
    }

    .sec-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;

      .sec-title {
        margin: 0;
        font-size: clamp(1rem, 1.8vw, 1.06rem);
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
        animation: badge-pulse 2.4s ease-in-out infinite;
      }
    }

    // 用 grid 让左右两列对齐更稳定（名称 / 价格）
    .sec-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;

      .sec-item {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 12px;
        align-items: center;
        padding: 8px;
        border-radius: 8px;
        transition: background 120ms ease, transform 120ms ease,
          box-shadow 120ms ease;
        background: transparent;
        will-change: transform, opacity;
        cursor: default;
        opacity: 0;
        transform: translateY(6px);
        animation: item-fadeUp 360ms ease forwards;

        &:hover,
        &:focus {
          background: rgba(207, 207, 207, 0.02);
          transform: translateY(-4px);
          box-shadow: 0 8px 18px rgba(6, 15, 20, 0.06);
          outline: none;
          cursor: pointer;
        }

        .item-left {
          display: flex;
          flex-direction: column;
          gap: 4px;
          .it-name {
            font-weight: 600;
            color: #07202a;
          }
          .it-sub {
            color: var(--muted);
            font-size: 0.9rem;
          }
        }

        .item-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
          .it-price {
            color: #045a6b;
            font-weight: 800;
            font-size: 0.98rem;
            transition: transform 120ms ease;
          }
          .it-note {
            color: var(--muted);
            font-size: 0.9rem;
            text-align: right;
          }
        }

        &:hover .it-price,
        &:focus .it-price {
          transform: scale(1.06);
        }
      } // .sec-item
    } // .sec-list

    .sec-summary {
      margin-top: 6px;
      padding: 8px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.03);
      color: var(--muted);
      font-size: 0.9rem;
      border: 1px solid rgba(255, 255, 255, 0.02);
    }
  } // .section
} // .main

/* ---------- 响应式：窄屏（移动端） ---------- */
@media (max-width: 900px) {
  .price-wrap {
    flex-direction: column;
    padding: 16px;
  }

  .sidebar {
    width: 100%;
    max-width: 100%;
    order: -1;
    flex-direction: row;
    align-items: stretch;
    gap: 12px;

    // 把侧边卡片变成水平堆叠（更节省竖向空间）
    .side-card {
      flex: 1 1 auto;
      padding: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .contact-card {
      .brand {
        align-items: center;
        gap: 10px;
      }
      .contacts .row .k {
        width: 44px;
      }
    }
  }

  .main .grid {
    grid-template-columns: 1fr; // 单列
  }

  // 在移动端降低模糊以改善性能（某些设备）
  .side-card,
  .section {
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
    border: 1px solid rgba(0, 0, 0, 0.04);
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.02),
      rgba(255, 255, 255, 0.01)
    );
  }
}

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

/* ---------- 辅助与可访问性 ---------- */
:focus-visible {
  outline: 3px solid rgba(43, 143, 191, 0.18);
  outline-offset: 3px;
  border-radius: 6px;
}

/* ---------- 动画 keyframes（仅 transform/opacity） */
@keyframes slow-drift {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(-6px, 4px, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes card-fadeUp {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.996);
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
</style>
