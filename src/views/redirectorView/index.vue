<template>
    <div class="redirector">
        <h2 class="redirector__title">角色入口</h2>
        <div class="redirector__cards">
            <div v-for="item in portals" :key="item.name" class="portal-card" @click="go(item.url)">
                <div class="portal-card__img-wrapper">
                    <img :src="item.img" :alt="item.name" class="portal-card__img" />
                    <div class="portal-card__overlay"
                        :style="{ background: `linear-gradient(to top, ${item.gradientStart}, transparent)` }">
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
    name: string
    url: string
    img: string
    desc: string
    gradientStart: string
}

const portals: Portal[] = [
    {
        name: '时崎狂三',
        url: 'http://1.94.189.79:9528/#/',
        img: new URL('@/views/redirectorView/images/1.png', import.meta.url).href,
        desc: '时间与存在的化身',
        gradientStart: 'rgba(255, 95, 109, 0.7)' // 热情红
    },
    {
        name: '鸢一折纸',
        url: 'http://1.94.189.79:9526/#/',
        img: new URL('@/views/redirectorView/images/2.png', import.meta.url).href,
        desc: '优雅与力量的交织',
        gradientStart: 'rgba(54, 144, 255, 0.7)' // 冰蓝
    },
    {
        name: '楪祈',
        url: 'http://1.94.189.79:9525/#/',
        img: new URL('@/views/redirectorView/images/3.png', import.meta.url).href,
        desc: '魔法与科技的契约',
        gradientStart: 'rgba(138, 43, 226, 0.7)' // 紫罗兰
    },
    {
        name: '薇尔莉特',
        url: 'http://1.94.189.79:9527/#/',
        img: new URL('@/views/redirectorView/images/4.png', import.meta.url).href,
        desc: '言语与情感的编织者',
        gradientStart: 'rgba(255, 189, 46, 0.7)' // 金黄
    },
    {
        name: '珂朵莉',
        url: 'http://1.94.189.79:9524/#/',
        img: new URL('@/views/redirectorView/images/5.png', import.meta.url).href,
        desc: '花与牺牲的终焉之诗',
        gradientStart: 'rgba(255, 115, 234, 0.7)' // 樱花粉紫
    }

]

function go(url: string) {
    window.open(url, '_blank')
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
