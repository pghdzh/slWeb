<template>
    <header class="top-nav">

        <button class="top-nav__toggle" @click="isOpen = !isOpen" aria-label="Toggle menu">
            <span :class="{ 'open': isOpen }"></span>
            <span :class="{ 'open': isOpen }"></span>
            <span :class="{ 'open': isOpen }"></span>
        </button>
        <nav :class="['top-nav__menu', { 'is-open': isOpen }]">
            <ul>
                <li v-for="item in items" :key="item.path" class="top-nav__item"
                    :class="{ 'is-active': route.path === item.path }" @click="isOpen = false">
                    <RouterLink :to="{ path: item.path }" class="top-nav__link">
                        {{ item.label }}
                        <span class="underline"></span>
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isOpen = ref(false)

interface NavItem {
    label: string;
    path: string;
}

const items: NavItem[] = [
    { label: '映界首页', path: '/' },
    { label: '角色入口', path: '/redirector' },
    { label: '构筑札记', path: '/blog' },
    { label: '抽奖', path: '/lottery' },
    { label: '命运投票', path: '/vote' },
]

</script>

<style lang="scss" scoped>
$breakpoint-mobile: 768px;

.top-nav {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: #ffffff;
    padding: 0.75rem 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    height: 64px;



    &__toggle {
        display: none;
        flex-direction: column;
        justify-content: space-between;
        width: 24px;
        height: 18px;
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;

        span {
            display: block;
            width: 100%;
            height: 3px;
            background-color: #333;
            transition: transform 0.3s ease, opacity 0.3s ease;

            &.open:nth-child(1) {
                transform: translateY(7.5px) rotate(45deg);
            }

            &.open:nth-child(2) {
                opacity: 0;
            }

            &.open:nth-child(3) {
                transform: translateY(-7.5px) rotate(-45deg);
            }
        }
    }

    &__menu {
        ul {
            display: flex;
            gap: 2rem;
            list-style: none;
            margin: 0;
            padding: 0;

            .top-nav__item {
                position: relative;

                .top-nav__link {
                    position: relative;
                    display: inline-block;
                    color: #333333;
                    font-size: 1rem;
                    text-decoration: none;
                    padding: 0.5rem 0;
                    transition: color 0.3s ease;

                    &:hover {
                        color: #1e90ff;
                    }

                    .underline {
                        position: absolute;
                        bottom: -2px;
                        left: 0;
                        width: 0;
                        height: 2px;
                        background-color: #1e90ff;
                        transition: width 0.3s ease;
                    }
                }

                &.is-active {
                    .top-nav__link {
                        color: #1e90ff;
                        font-weight: bold;

                        .underline {
                            width: 100%;
                        }
                    }
                }

                &:hover {
                    .top-nav__link .underline {
                        width: 100%;
                    }
                }
            }
        }


    }

    @media (max-width: $breakpoint-mobile) {
        padding: 0.75rem 1rem;

        &__toggle {
            display: flex;
        }

        &__menu {
            position: absolute;
            top: 64px;
            left: 0;
            width: 100%;
            background-color: #ffffff;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            max-height: 0;
            transition: max-height 0.3s ease;

            ul {
                flex-direction: column;
                gap: 0;

                .top-nav__item {
                    text-align: center;
                    padding: 1rem 0;
                    border-bottom: 1px solid #f0f0f0;
                }
            }

            &.is-open {
                max-height: 500px; // 足够撑开菜单高度
            }
        }
    }
}

@keyframes slide-down {
    from {
        transform: translateY(-100%);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>
