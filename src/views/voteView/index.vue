<template>
  <div class="vote-container">
    <section class="vote__header">
      <h2 class="vote__title">命运投票</h2>
      <p class="vote__desc">投票结果将决定下一个优先搭建的角色网站，票数最多者优先上线~</p>
    </section>

    <section class="vote__form">
      <div class="vote__notice notice--check">
        ⚠️ 添加前请先前往
        <span class="vote__link" @click="goToRedirector">角色入口</span>
        页面确认是否已有对应角色
      </div>
      <div class="vote__notice notice--contact">
        🚫 因为无法有效防止刷票，请点击
        <a class="vote__link" href="https://message.bilibili.com/?spm_id_from=333.1387.0.0#/whisper/mid372611876"
          target="_blank">
          B站私信
        </a>
        给我留言想添加或者投票的角色吧
      </div>
    </section>

    <ul class="vote__list">
      <li v-for="option in options" :key="option.id" class="vote__item">
        <div class="vote__info">
          <span class="vote__label">{{ option.text }}</span>
          <span class="vote__votes">{{ option.votes }} 票</span>
        </div>
        <div class="vote__bar-container">
          <div class="vote__bar" :style="{ width: (option.votes / totalVotes * 100) + '%' }"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import {
  getOptions,
} from '@/api/modules/vote'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

function goToRedirector() {
  router.push('/redirector')
}
type Option = { id: number; text: string; votes: number }
const options = reactive<Option[]>([])



// 从接口加载所有选项
async function loadOptions() {
  try {
    const res = await getOptions()
    if (res.success) {
      // 1. 先对数据按 votes 降序排序
      const sorted = res.data.sort((a, b) => b.votes - a.votes)
      // 2. 再用 splice 原地替换 options
      options.splice(0, options.length, ...sorted)
    } else {
      ElMessage.error('获取投票选项失败')
    }
  } catch {
    ElMessage.error('网络异常，获取投票选项失败')
  }
}

const totalVotes = computed(() =>
  options.reduce((sum, o) => sum + o.votes, 0) || 1
)

onMounted(() => {
  loadOptions()
})
</script>


<style lang="scss" scoped>
.vote-container {
  max-width: 600px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  animation: fadeIn 0.5s ease;
}

.vote__header {
  text-align: center;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
  margin-bottom: 1.5rem;

  .vote__title {
    font-size: 2.25rem;
    color: #1e90ff;
    margin: 0;
    font-weight: 700;
  }

  .vote__desc {
    font-size: 1rem;
    color: #555;
    margin-top: 0.5rem;
  }
}

.vote__form {
  margin-bottom: 2rem;

  .vote__notice {
    font-size: 0.9rem;
    line-height: 1.6;
    margin-bottom: 0.5rem;
    border-left: 4px solid #ff4d4f;
    padding-left: 0.75rem;

    &.notice--check {
      color: #ff4d4f;
      background: rgba(255, 77, 79, 0.05);
    }

    &.notice--contact {
      color: #ffa500;
      background: rgba(255, 165, 0, 0.08);
    }
  }

  .vote__link {
    color: #1e90ff;
    cursor: pointer;
    font-weight: bold;
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }


}

.vote__list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.vote__item {
  background: #f0f4f8;
  border-radius: 0.75rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  .vote__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.1rem;
    font-weight: 500;
    color: #333;
  }

  .vote__bar-container {
    width: 100%;
    height: 10px;
    background: #ddd;
    border-radius: 5px;
    overflow: hidden;
  }

  .vote__bar {
    height: 100%;
    background: linear-gradient(90deg, #1e90ff, #54a0ff);
    transition: width 0.5s ease;
  }

  .vote__btn {
    align-self: flex-end;
    padding: 0.5rem 1rem;
    background: #1e90ff;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s;

    &:disabled {
      background: #aaa;
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      background: #1877e0;
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (max-width: 600px) {
  .vote-container {
    padding: 1.5rem 0.5rem;
  }

  .vote__header {
    margin-bottom: 1rem;
  }

  .vote__form {
    margin-bottom: 1.5rem;
  }
}
</style>