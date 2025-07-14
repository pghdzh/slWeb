<template>
  <div class="blog-list" ref="listRef">
    <h2 class="blog-list__title">构筑札记</h2>
    <ul class="blog-list__items">
      <li v-for="(post, index) in posts" :key="post.id" class="post-item" @click="goDetail(post.id)"
        :style="{ animationDelay: `${index * 100}ms` }">
        <div class="post-item__header">
          <h3 class="post-item__title">{{ post.title }}</h3>
          <div class="post-item__meta">
            <span class="post-item__date">{{ formatDate(post.publish_date) }}</span>
            <span class="post-item__views">阅读 {{ post.views }}</span>
          </div>
        </div>
        <p class="post-item__excerpt">{{ post.excerpt }}</p>
      </li>
      <li v-if="loading" class="loading">加载中...</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { getPostList } from "@/api/modules/blog"
interface Post {
  id: number
  title: string
  excerpt: string
  date: string
  views: number
}

const router = useRouter()
const posts = ref<Post[]>([])
const page = ref(1)
const pageSize = 6
const totalPages = ref(Infinity)
const loading = ref(false)


async function fetchPosts() {
  if (loading.value || page.value > totalPages.value) return
  loading.value = true

  try {
    const res = await getPostList({ page: page.value, pageSize })
    if (res.success) {
      posts.value.push(...res.data)
      totalPages.value = res.pagination.totalPages
    }
  } catch (e) {
    console.error('获取文章列表失败', e)
  } finally {
    loading.value = false
  }
}
function onWindowScroll() {
  const scrollY = window.scrollY || window.pageYOffset
  const vh = window.innerHeight
  const bodyHeight = document.documentElement.scrollHeight
  if (scrollY + vh >= bodyHeight - 10) {
    page.value++
    fetchPosts()
  }
}

onMounted(() => {
  fetchPosts()
  window.addEventListener('scroll', onWindowScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onWindowScroll)
})

function goDetail(id: number) {
  router.push({ name: 'BlogDetail', params: { id } })
}

function formatDate(str: string) {
  return new Date(str).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })
}
</script>

<style lang="scss" scoped>
$bg-gradient: linear-gradient(135deg, #f0f4f8, #d9e2ec);
$primary-color: #1e90ff;
$post-bg: rgba(255, 255, 255, 0.8);
$post-hover: rgba(30, 144, 255, 0.1);

.blog-list {
  background: $bg-gradient;
  padding: 2rem 1rem;
  min-height: 100vh;
  color: #333;

  &__title {
    max-width: 600px;
    margin: 0 auto 1.5rem;
    font-size: 2rem;
    text-align: center;
    color: $primary-color;
    text-shadow: 0 0 6px rgba(30, 144, 255, 0.5);
  }

  &__items {
    max-width: 600px;
    margin: 0 auto;
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .loading {
      text-align: center;
      color: #666;
      padding: 1rem 0;
    }
  }
}

.post-item {
  background: $post-bg;
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  opacity: 0;
  transform: translateY(10px);
  animation: fadeInUp 0.5s ease forwards;

  &:hover {
    background: $post-hover;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.5rem;

    .post-item__title {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;
    }

    .post-item__meta {
      display: flex;
      gap: 0.5rem;
      font-size: 0.85rem;
      color: #666;

      .post-item__date,
      .post-item__views {
        white-space: nowrap;
      }
    }
  }

  &__excerpt {
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
    margin: 0;
  }
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .blog-list {
    padding: 1.5rem 0.75rem;

    &__title {
      font-size: 1.75rem;
      margin-bottom: 1rem;
    }

    &__items {
      gap: 0.75rem;
    }
  }
}
</style>
