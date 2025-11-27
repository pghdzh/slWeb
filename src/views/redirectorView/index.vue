<template>
  <div class="redirector">
    <h2 class="redirector__title">角色入口</h2>
    <div class="redirector__cards">
      <div
        v-for="item in portals"
        :key="item.name"
        class="portal-card"
        @click="go(item.url)"
      >
        <div class="portal-card__img-wrapper">
          <img :src="item.img" :alt="item.name" class="portal-card__img" />
          <div
            class="portal-card__overlay"
            :style="{
              background: `linear-gradient(to top, ${item.gradientStart}, transparent)`,
            }"
          >
            <span class="portal-card__name">{{ item.name }}</span>
          </div>
        </div>
        <div class="portal-card__desc">{{ item.desc }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Portal {
  name: string;
  url: string;
  img: string;
  desc: string;
  gradientStart: string;
}

const portals: Portal[] = [
  {
    name: "时崎狂三",
    url: "http://slty.site:9528/#/",
    img: new URL("@/views/redirectorView/images/1.webp", import.meta.url).href,
    desc: "时间与存在的化身",
    gradientStart: "rgba(255, 95, 109, 0.7)", // 热情红
  },
  {
    name: "鸢一折纸",
    url: "http://slty.site:9526/#/",
    img: new URL("@/views/redirectorView/images/2.webp", import.meta.url).href,
    desc: "优雅与力量的交织",
    gradientStart: "rgba(54, 144, 255, 0.7)", // 冰蓝
  },
  {
    name: "楪祈",
    url: "http://slty.site:9525/#/",
    img: new URL("@/views/redirectorView/images/3.webp", import.meta.url).href,
    desc: "魔法与科技的契约",
    gradientStart: "rgba(138, 43, 226, 0.7)", // 紫罗兰
  },
  {
    name: "薇尔莉特",
    url: "http://slty.site:9527/#/",
    img: new URL("@/views/redirectorView/images/4.webp", import.meta.url).href,
    desc: "言语与情感的编织者",
    gradientStart: "rgba(255, 189, 46, 0.7)", // 金黄
  },
  {
    name: "珂朵莉",
    url: "http://slty.site:9524/#/",
    img: new URL("@/views/redirectorView/images/5.webp", import.meta.url).href,
    desc: "花与牺牲的终焉之诗",
    gradientStart: "rgba(255, 115, 234, 0.7)", // 樱花粉紫
  },
  {
    name: "加藤惠",
    url: "http://slty.site:9523/#/",
    img: new URL("@/views/redirectorView/images/6.webp", import.meta.url).href,
    desc: "不知不觉走进你故事的普通少女",
    gradientStart: "rgba(255, 182, 193, 0.7)", // 淡粉樱色，
  },

  {
    name: "夜刀神十香",
    url: "http://slty.site:9522/#/",
    img: new URL("@/views/redirectorView/images/7.webp", import.meta.url).href,
    desc: "宛如烈焰般炽热又单纯的精灵公主",
    gradientStart: "rgba(138, 43, 226, 0.7)", // 深紫与蓝的交融，
  },
  {
    name: "韩立",
    url: "http://slty.site:9521/#/",
    img: new URL("@/views/redirectorView/images/8.webp", import.meta.url).href,
    desc: "凡人起步，修仙路上步步为营的坚定者",
    gradientStart: "rgba(34, 139, 34, 0.7)", // 青绿色，
  },
  {
    name: "珂莱塔",
    url: "http://slty.site:9520/#/",
    img: new URL("@/views/redirectorView/images/9.webp", import.meta.url).href,
    desc: "冷静温柔，银发如霜",
    gradientStart: "rgba(145, 200, 230, 0.78)", // 冰蓝偏青，
  },
  {
    name: "椿",
    url: "http://slty.site:9519/#/",
    img: new URL("@/views/redirectorView/images/10.webp", import.meta.url).href,
    desc: "赤白并立，花瓣似刃",
    gradientStart: "rgba(158, 24, 32, 0.75)", // 深椿红
  },
  {
    name: "菲比",
    url: "http://slty.site:9518/#/",
    img: new URL("@/views/redirectorView/images/11.webp", import.meta.url).href,
    desc: "以光织梦的祈语者，聆听命运的微光低语",
    gradientStart: "rgba(255,209,102,0.90)",
  },
  {
    name: "守岸人",
    url: "http://slty.site:9517/#/",
    img: new URL("@/views/redirectorView/images/12.webp", import.meta.url).href,
    desc: "潮声为灯，守望回声",
    gradientStart: "rgba(45, 180, 220, 0.78)", // 冰蓝/海蓝，契合守岸人的回音与晶体感
  },
  {
    name: "长离",
    url: "http://slty.site:9516/#",
    img: new URL("@/views/redirectorView/images/13.webp", import.meta.url).href,
    desc: "余焰为烛，策局为路",
    gradientStart: "rgba(255,140,70,0.78)", // 余焰暖光，契合长离的谋士与温度感
  },
  {
    name: "今汐",
    url: "http://slty.site:9515/#",
    img: new URL("@/views/redirectorView/images/14.webp", import.meta.url).href,
    desc: "潮汐为灯，秩序为路",
    gradientStart: "rgba(127,231,214,0.78)", // 薄雾海绿：象征今汐的珍珠感与冷静守护
  },
  {
    name: "嘉贝莉娜",
    url: "http://slty.site:9514/#",
    img: new URL("@/views/redirectorView/images/15.webp", import.meta.url).href,
    desc: "冷蓝为眼，炽橙为誓",
    gradientStart: "rgba(60,158,255,0.88)", // 冷蓝起点（蓝→柔橙渐变主色，体现嘉贝莉娜的冰火交融气质）
  },
  {
    name: "弗洛洛",
    url: "http://slty.site:9513/#",
    img: new URL("@/views/redirectorView/images/16.webp", import.meta.url).href,
    desc: "彼岸花开，血色为幕",
    gradientStart: "rgba(102, 34, 68, 0.88)", // 深紫红起点（紫红→暗黑渐变，体现弗洛洛的优雅与危险）
  },
  {
    name: "坎特蕾拉",
    url: "http://slty.site:9512/#",
    img: new URL("@/views/redirectorView/images/17.webp", import.meta.url).href,
    desc: "冷蓝如海面，幽紫如潮涌",
    gradientStart: "rgba(95,224,255,0.88)",
  },
  {
    name: "卡提希娅",
    url: "http://slty.site:9511/#", // 请替换为实际网址
    img: new URL("@/views/redirectorView/images/18.webp", import.meta.url).href, // 请确保图片路径正确
    desc: "风旅无终章，剑心寄长诗",
    gradientStart: "rgba(100, 205, 255, 0.72)", // 鸢尾紫起
  },
  {
    name: "尤诺",
    url: "http://slty.site:9510/#",
    img: new URL("@/views/redirectorView/images/19.webp", import.meta.url).href,
    desc: "月光为契，命运回响",
    gradientStart: "rgba(143, 217, 255, 0.88)",
  },
  {
    name: "赞妮",
    url: "http://slty.site:9509/#",
    img: new URL("@/views/redirectorView/images/20.webp", import.meta.url).href,
    desc: "金库值守专业户，准时下班梦想家",
    gradientStart: "rgba(255, 193, 7, 0.85)", // 金色调
  },
  {
    name: "布兰特",
    url: "http://slty.site:9508/#",
    img: new URL("@/views/redirectorView/images/21.webp", import.meta.url).href,
    desc: "愚人剧团团长，随性洒脱的领航者",
    gradientStart: "rgba(147, 112, 219, 0.85)",
  },
  {
    name: "奥古斯塔",
    url: "http://slty.site:9507/#",
    img: new URL("@/views/redirectorView/images/22.webp", import.meta.url).href,
    desc: "角斗场上的不败冠冕，诞于血与铁的无畏领袖",
    gradientStart: "rgba(255, 87, 34, 0.85)", 
  },
];

function go(url: string) {
  window.open(url, "_blank");
}
</script>

<style lang="scss" scoped>
$card-width: 360px;
$card-height: 260px;
$primary-color: #1e90ff;

.redirector {
  padding: 3rem 1rem;
  text-align: center;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
  min-height: 100vh;

  &__title {
    font-size: 2.5rem;
    color: $primary-color;
    margin-bottom: 2rem;
    text-shadow: 0 0 12px $primary-color;
  }

  &__cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
  }
}

.portal-card {
  position: relative;
  width: $card-width;
  height: $card-height;
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.7);
  }

  &__img-wrapper {
    position: relative;
    width: 100%;
    height: 75%;
    overflow: hidden;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;

    &:hover {
      transform: scale(1.1) rotate(1deg);
    }
  }

  &__overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0.5rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__name {
    color: #fff;
    font-size: 1.5rem;
    font-weight: 700;
    text-shadow: 0 0 6px #000;
  }

  &__desc {
    height: 25%;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ccc;
    background: #111;
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .portal-card {
    width: 100%;
    max-width: 320px;
    height: auto;

    &__img-wrapper {
      height: 200px;
    }

    &__desc {
      padding: 0.75rem;
      font-size: 0.9rem;
    }
  }
}
</style>
