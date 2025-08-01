<template>
  <div class="vote-container">
    <section class="vote__header">
      <h2 class="vote__title">命运投票</h2>
      <p class="vote__desc">投票结果将决定下一个优先搭建的角色网站，票数最多者优先上线~</p>
    </section>

    <section class="vote__form">
      <div class="vote__tip">
        ⚠️ 添加前请先前往
        <span class="vote__link" @click="goToRedirector">角色入口</span>
        页面确认是否已有对应角色
      </div>
      <div class="form-group">
        <input v-model="newOption" placeholder="输入新的候选角色并回车，或点击添加" @keyup.enter="addOption" class="vote__input" />
        <button @click="addOption" :disabled="!newOption.trim()" class="vote__add-btn">添加选项</button>
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
        <button class="vote__btn" @click="vote(option.id)" :disabled="hasVoted(option.id)">投 一 票</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import {
  getOptions,
  addOption as apiAddOption,
  voteOption as apiVoteOption,
} from '@/api/modules/vote'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

function goToRedirector() {
  router.push('/redirector')
}
type Option = { id: number; text: string; votes: number }
const options = reactive<Option[]>([])
const newOption = ref('')
// 本地用来防止重复投票
const VOTED_KEY = 'vote_voted'
const voted = ref<Set<number>>(new Set())

// 读取已投记录
function loadVoted() {
  const vs = localStorage.getItem(VOTED_KEY)
  voted.value = vs ? new Set(JSON.parse(vs)) : new Set()
}
// 保存已投记录
function saveVoted() {
  localStorage.setItem(VOTED_KEY, JSON.stringify(Array.from(voted.value)))
}

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

// 添加新选项
async function addOption() {
  const text = newOption.value.trim()
  if (!text) return
  try {
    const res = await apiAddOption({ text })
    if (res.success) {
      options.unshift(res.data)   // 新选项放到最前面
      newOption.value = ''
      ElMessage.success('添加成功')
    } else {
      ElMessage.error(res.message || '添加失败')
    }
  } catch (err: any) {
    if (err.response?.status === 409) {
      ElMessage.warning('该选项已存在')
    } else {
      ElMessage.error('网络异常，添加失败')
    }
  }
}

// 投一票
async function vote(id: number) {
  if (voted.value.has(id)) return
  try {
    const res = await apiVoteOption(id)
    if (res.success) {
      // 本地标记已投，并保存
      voted.value.add(id)
      saveVoted()
      // 更新前端展示：重新拉一次最新数据
      await loadOptions()
      ElMessage.success('投票成功')
    } else {
      ElMessage.error(res.message || '投票失败')
    }
  } catch {
    ElMessage.error('网络异常，投票失败')
  }
}

function hasVoted(id: number) {
  return voted.value.has(id)
}

onMounted(() => {
  loadVoted()
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

  .vote__tip {
    font-size: 0.9rem;
    color: #ff4d4f;
    margin-bottom: 0.5rem;

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

  .form-group {
    display: flex;
    gap: 0.75rem;

    .vote__input {
      flex: 1;
      padding: 0.75rem 1rem;
      border: 2px solid #ddd;
      border-radius: 0.75rem;
      font-size: 1rem;
      transition: border-color 0.3s, box-shadow 0.3s;

      &:focus {
        border-color: #1e90ff;
        box-shadow: 0 0 8px rgba(30, 144, 255, 0.3);
        outline: none;
      }
    }

    .vote__add-btn {
      padding: 0 1.5rem;
      background: linear-gradient(135deg, #1e90ff, #54a0ff);
      color: #fff;
      border: none;
      border-radius: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.3s, box-shadow 0.3s;

      &:disabled {
        background: #ccc;
        cursor: not-allowed;
      }

      &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 18px rgba(30, 144, 255, 0.4);
      }
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

    .form-group {
      flex-direction: column;
    }

    .vote__add-btn {
      width: 100%;
    }
  }
}
</style>