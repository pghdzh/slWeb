<template>
    <div class="blog-detail">
        <!-- Scroll Progress Bar -->
        <div class="progress-bar" :style="{ width: scrollProgress + '%' }"></div>

        <!-- Back Button -->
        <button class="back-btn" @click="goBack">← 返回札记列表</button>

        <article class="article" ref="articleRef">
            <h1 class="article__title" v-html="post.title"></h1>
            <div class="article__meta">
                <span>{{ formatDate(post.publish_date) }}</span> ·
                <span>阅读 {{ post.views }}</span>
            </div>
            <div class="article__content">
                <section v-for="(block, idx) in post.content" :key="idx" class="content-block"
                    :style="{ animationDelay: (idx * 200) + 'ms' }">
                    <p>{{ block }}</p>
                </section>
            </div>
        </article>

        <!-- Back to Top -->
        <button v-show="showTop" class="to-top" @click="scrollToTop">↑</button>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPostDetail, updatePost } from "@/api/modules/blog"

const route = useRoute()
const router = useRouter()
const post = ref<Post>({
    id: 0,
    title: '',
    publish_date: '',
    views: 0,
    content: []
})

// Scroll progress and top button
const scrollProgress = ref(0)
const showTop = ref(false)
const articleRef = ref<HTMLElement | null>(null)

function updateProgress() {
    const scrollTop = window.scrollY || window.pageYOffset
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    scrollProgress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
    showTop.value = scrollTop > 200
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

function goBack() {
    router.push({ path: '/blog' })
}

function formatDate(str: string) {
    return new Date(str).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })
}
async function fetchPost(id: number) {
    try {
        // 1. 拉取文章详情 
        const res = await getPostDetail(id)
        if (res.success && res.data) {
            post.value = res.data
            // 2. 阅读量 +1   
            await updatePost(id, { views: post.value.views + 1 })
            // 本地立即反映  
            post.value.views += 1
        }
    } catch (err) {
        console.error('获取文章详情或更新阅读量失败', err)
    }
}
onMounted(() => {
    const id = Number(route.params.id)
    fetchPost(id)
    window.addEventListener('scroll', updateProgress)
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', updateProgress)
})
</script>

<style lang="scss" scoped>
$bg-light: #fff;
$bg-dark: #f0f4f8;
$text-dark: #333;
$accent: #1e90ff;

.blog-detail {
    background: $bg-dark;
    padding: 0 1rem 2rem;
    position: relative;
    min-height: calc(100vh - 64px);

    .progress-bar {
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: $accent;
        transition: width 0.1s;
        z-index: 1000;
    }

    .back-btn {
        margin: 1rem 0;
        background: none;
        border: none;
        color: $accent;
        font-size: 1rem;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
            color: #1877e0;
        }
    }

    .article {
        max-width: 700px;
        margin: 0 auto;
        background: $bg-light;
        padding: 2rem;
        border-radius: 1rem;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);

        &__title {
            font-size: 2rem;
            font-weight: 700;
            color: $text-dark;
            margin-bottom: 0.5rem;
            animation: fadeIn 0.6s ease;
        }

        &__meta {
            font-size: 0.85rem;
            color: #666;
            margin-bottom: 1.5rem;
            animation: fadeIn 0.6s ease 200ms;
        }

        &__content {
            .content-block {
                opacity: 0;
                transform: translateY(20px);
                animation: fadeInUp 0.6s ease forwards;
                margin-bottom: 1.25rem;

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
    }

    .to-top {
        position: fixed;
        right: 1rem;
        bottom: 2rem;
        background: $accent;
        color: #fff;
        border: none;
        border-radius: 50%;
        width: 2.5rem;
        height: 2.5rem;
        font-size: 1.25rem;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        transition: background 0.3s;

        &:hover {
            background: #1877e0;
        }
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 600px) {
    .article {
        padding: 1.5rem;

        &__title {
            font-size: 1.5rem;
        }
    }
}
</style>
