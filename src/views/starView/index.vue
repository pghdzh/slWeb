<template>
  <div class="home-container">

    <div class="mobile-header-btns">
      <button @click="showRanking = true" class="mobile-btn">充电榜</button>
    </div>
    <!-- 充电排行榜 -->
    <div class="ranking-list">
      <h3>充电鸣谢榜</h3>
      <div class="scroll-list">
        <div class="rank-item" v-for="(item, idx) in ranking" :key="item.name">
          <span class="rank">{{ idx + 1 }}</span>
          <span class="name">{{ item.name }}</span>
          <span class="value">{{ item.value }}</span>
        </div>
      </div>
      <div class="tips">
        <p>
          当前粉丝：<span class="highlight">{{ fansCount }}</span> / 目标
          <span class="highlight">3000</span> 粉丝开启抽奖（流麻、透光浮雕）
        </p>
        <p>根据充电量增加获奖权重</p>
        <a class="award-btn" href="https://www.bilibili.com/video/BV1Y2pFzhEkK/" target="_blank" rel="noopener"
          aria-label="600粉抽奖（已结束）查看">
          600粉抽奖（已结束） <span class="hint">↗</span>
        </a>

        <a class="award-btn currentBtn" href="https://www.bilibili.com/video/BV1JX42zmEJe/" target="_blank"
          rel="noopener" aria-label="千粉抽奖（10.19截止）查看">
          千粉抽奖（10.19截止） <span class="hint">↗</span>
        </a>
      </div>
    </div>
    <div class="hero">
      <h1 class="hero__brand">霜落映界</h1>
      <p class="hero__typed">
        <span>{{ displayText }}</span><span class="cursor">|</span>
      </p>
    </div>

    <footer class="site-footer">
      <div class="footer-content">
        <p>© 2025 霜落天亦. All rights reserved.</p>
        <p>汇聚幻想，映照世界 —— 永不停息的探索之旅</p>
      </div>
    </footer>

    <!-- 弹窗：充电榜 -->
    <transition name="fade">
      <div class="modal-mask" v-if="showRanking" @click.self="showRanking = false">
        <div class="modal-wrapper">
          <div class="modal-header">
            <h3>充电鸣谢榜</h3>
            <span class="close" @click="showRanking = false">×</span>
          </div>
          <div class="modal-body">
            <!-- 直接复用 .ranking-list 的内容 -->
            <div class="scroll-list">
              <div class="rank-item" v-for="(item, idx) in ranking" :key="item.name">
                <span class="rank">{{ idx + 1 }}</span>
                <span class="name">{{ item.name }}</span>
                <span class="value">{{ item.value }}</span>
              </div>
            </div>
            <div class="tips">
              <p>
                当前粉丝：<span class="highlight">{{ fansCount }}</span> / 目标
                <span class="highlight">3000</span>
                粉丝开启抽奖（流麻、透光浮雕）
              </p>
              <p>根据充电量增加获奖权重</p>
              <a class="award-btn" href="https://www.bilibili.com/video/BV1Y2pFzhEkK/" target="_blank" rel="noopener"
                aria-label="600粉抽奖（已结束）查看">
                600粉抽奖（已结束） <span class="hint">↗</span>
              </a>

              <a class="award-btn currentBtn" href="https://www.bilibili.com/video/BV1JX42zmEJe/" target="_blank"
                rel="noopener" aria-label="千粉抽奖（10.19截止）查看">
                千粉抽奖（10.19截止） <span class="hint">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getBiliFansCount } from "@/api/modules/bilbilReq";
import { getRankingMoneyList } from "@/api/modules/rankingsMoney"
// 排行榜示例数据
interface RankItem {
  name: string;
  value: number;
}
const ranking = ref<RankItem[]>([]);
// 控制弹窗显隐
const showRanking = ref(false);
// 示例：粉丝数
const fansCount = ref(0);



const phrases = [
  '星河之上，愿你乘风而行。',
  '未来如夜幕深邃，而光明始终与你同在。',
  '在虚拟晨曦中醒来，邂逅超现实祝福。',
  '代码与幻想，皆由你我共创。'
]
const currentPhrase = ref(0)
const displayText = ref('')
const cursorVisible = ref(true)
let charIndex = 0
let typing = true

function type() {
  const text = phrases[currentPhrase.value]
  if (typing) {
    if (charIndex < text.length) {
      displayText.value += text.charAt(charIndex)
      charIndex++
      setTimeout(type, 100)
    } else {
      typing = false
      setTimeout(type, 2000)
    }
  } else {
    if (charIndex > 0) {
      displayText.value = text.substring(0, charIndex - 1)
      charIndex--
      setTimeout(type, 50)
    } else {
      typing = true
      currentPhrase.value = (currentPhrase.value + 1) % phrases.length
      setTimeout(type, 500)
    }
  }
}

onMounted(async () => {
  type()
  setInterval(() => {
    cursorVisible.value = !cursorVisible.value
  }, 500)

  try {
    const res = await getBiliFansCount();
    if (res.success) {
      fansCount.value = res.data.follower;
    } else {
      console.error("获取粉丝数失败：", res.message);
    }
  } catch (err) {
    console.error("请求出错：", err);
  }

  try {
    const res2 = await getRankingMoneyList();
    if (res2.success) {
      ranking.value = res2.data;
    }
  } catch (err) {
    console.error("获取充值记录请求出错：", err);
  }
})
</script>

<style lang="scss" scoped>
.home-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: calc(100vh - 64px);
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);

  .mobile-header-btns {
    display: none;
  }

  .ranking-list {
    position: fixed;
    top: 50%;
    left: 24px;
    transform: translateY(-50%);
    width: 260px;
    max-height: 72%;
    padding: 16px;
    background: rgba(255, 255, 255, 0.6);
    border: 1px solid rgba(200, 220, 255, 0.4);
    border-radius: 16px;
    backdrop-filter: blur(8px);
    box-shadow: 0 0 24px rgba(160, 190, 255, 0.4);
    color: #333;
    z-index: 10;

    h3 {
      font-size: 1.4rem;
      font-weight: bold;
      color: #3366ff;
      text-align: center;
      margin-bottom: 12px;
      text-shadow: 0 0 4px rgba(180, 200, 255, 0.3);
    }

    .scroll-list {
      max-height: 280px;
      overflow-y: auto;
    }


  }

}

.hero {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  &__brand {
    font-size: 3rem;
    font-weight: 800;
    color: #1e90ff;
    margin-bottom: 1rem;
    animation: fadeIn 1s ease-out;
  }

  &__typed {
    font-size: 1.25rem;
    color: #333;
    height: 2rem;

    .cursor {
      display: inline-block;
      width: 1ch;
      color: #1e90ff;
      opacity: 1;
      transition: opacity 0.2s;
    }
  }
}

.site-footer {
  width: 100%;
  background: #ffffff;
  padding: 1.5rem 2rem;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);

  .footer-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;

    p {
      margin: 0.5rem 0;
      color: #555;
      font-size: 0.9rem;
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 小屏适配 */
@media (max-width: 767px) {


  .home-container .hero .announcement {
    top: 68px;
    left: 0px;
    padding: 6px 10px;
    font-size: 0.8rem;

    a {
      font-size: 0.8rem;
    }
  }

  .home-container .mobile-header-btns {
    display: flex;
    justify-content: space-around;
    padding: 10px 12px;
    position: fixed;
    bottom: 120px;
    left: 0;
    right: 0;
    z-index: 30;
    backdrop-filter: blur(6px);

    .mobile-btn {
      flex: 1;
      margin: 0 6px;
      padding: 8px 0;
      background: linear-gradient(to right, #69b7ff, #91d5ff);
      color: #fff;
      border-radius: 20px;
      font-weight: bold;
      font-size: 0.9rem;
      border: none;
      box-shadow: 0 2px 8px rgba(105, 183, 255, 0.4);
      transition: background 0.3s;

      &:active {
        background: linear-gradient(to right, #91d5ff, #69b7ff);
      }
    }
  }

  /* 隐藏原本侧边的列表 */
  .ranking-list {
    display: none !important;
  }

  /* Modal 通用样式 */
  .modal-mask {
    position: fixed;
    z-index: 40;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(240, 248, 255, 0.8); // 更亮更轻
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;

    .modal-wrapper {
      width: 90%;
      max-height: 80%;
      background: rgba(255, 255, 255, 0.85);
      border-radius: 16px;
      overflow: auto;
      box-shadow: 0 0 30px rgba(160, 190, 255, 0.4);
      display: flex;
      flex-direction: column;

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        background: rgba(230, 240, 255, 0.8);
        border-bottom: 1px solid rgba(200, 220, 255, 0.4);

        h3 {
          font-size: 1.2rem;
          color: #3366ff;
        }

        .close {
          font-size: 1.6rem;
          cursor: pointer;
          color: #ff9f43;
        }
      }

      .modal-body {
        padding: 12px;
        flex: 1;
        overflow-y: auto;
        color: #333;
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}

.tips {
  margin-top: 12px;
  padding: 8px 10px;
  background: rgba(255, 255, 255, 0.4);
  border-top: 1px solid rgba(180, 200, 255, 0.4);
  text-align: center;
  font-size: 0.85rem;
  color: #444;

  .highlight {
    color: #ff9f43;
  }

  .award-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    margin-top: 10px;
    margin-right: 8px;
    border-radius: 10px;
    text-decoration: none;
    font-weight: 600;
    font-size: 13px;
    line-height: 1;
    transition: transform .18s, box-shadow .18s, background .18s;
    -webkit-tap-highlight-color: transparent;
  }

  /* 主样式：渐变背景（你给的配色） */
  .award-btn {
    background: linear-gradient(to right, #d0e2f3, #aadbfa);
    color: #071428;
    box-shadow: 0 6px 18px rgba(105, 183, 255, 0.12);
  }

  .currentBtn {
       background: linear-gradient(to right, #3198f8, #6bbff3);
  }

  .award-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 26px rgba(105, 183, 255, 0.18);
  }

  /* 小提示箭头 */
  .award-btn .hint {
    font-size: 12px;
    opacity: .9;
  }

}

.rank-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 6px 0;
  padding: 6px 12px;
  background: linear-gradient(135deg,
      rgba(173, 216, 255, 0.3),
      rgba(255, 255, 255, 0.25));
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #333;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.4);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: default;
  animation: float 4s ease-in-out infinite alternate;
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 8px rgba(160, 190, 255, 0.15);

  &:nth-child(4n + 1) {
    animation-duration: 5s;
  }

  &:nth-child(4n + 2) {
    animation-duration: 6s;
  }

  &:nth-child(4n + 3) {
    animation-duration: 4.5s;
  }

  &:nth-child(4n) {
    animation-duration: 5.5s;
  }

  .rank {
    font-family: "Cinzel Decorative", serif;
    font-size: 1.1rem;
    width: 24px;
    text-align: center;
    color: #f9a825;
    text-shadow: 0 0 4px rgba(255, 223, 128, 0.7);
  }

  .name {
    flex: 1;
    margin: 0 8px;
    color: #1e90ff;
    font-weight: 600;
  }

  .value {
    font-style: italic;
    color: #888;
  }

  &:hover {
    transform: translateY(-2px); // 或 translate3d(0, -2px, 0)
    box-shadow: 0 6px 12px rgba(120, 160, 255, 0.4);

  }
}
</style>
