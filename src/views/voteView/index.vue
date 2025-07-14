<template>
  <div class="vote-container">
    <section class="vote__header">
      <h2 class="vote__title">命运投票</h2>
      <p class="vote__desc">投票结果将决定下一个优先搭建的角色网站，票数最多者优先上线~</p>
    </section>

    <section class="vote__form">
      <div class="form-group">
        <input
          v-model="newOption"
          placeholder="输入新的候选角色并回车，或点击添加"
          @keyup.enter="addOption"
          class="vote__input"
        />
        <button
          @click="addOption"
          :disabled="!newOption.trim()"
          class="vote__add-btn"
        >添加选项</button>
      </div>
    </section>

    <ul class="vote__list">
      <li
        v-for="option in options"
        :key="option.id"
        class="vote__item"
      >
        <div class="vote__info">
          <span class="vote__label">{{ option.text }}</span>
          <span class="vote__votes">{{ option.votes }} 票</span>
        </div>
        <div class="vote__bar-container">
          <div
            class="vote__bar"
            :style="{ width: (option.votes / totalVotes * 100) + '%' }"
          ></div>
        </div>
        <button
          class="vote__btn"
          @click="vote(option.id)"
          :disabled="hasVoted(option.id)"
        >投 一 票</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, computed } from 'vue'

type Option = { id: number; text: string; votes: number }
const STORAGE_KEY = 'vote_options'
const VOTED_KEY = 'vote_voted'

const options = reactive<Option[]>([])
const newOption = ref('')
const voted = ref<Set<number>>(new Set())

onMounted(() => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) options.push(...JSON.parse(stored))
  const vs = localStorage.getItem(VOTED_KEY)
  if (vs) voted.value = new Set(JSON.parse(vs))
})

watch(
  options,
  val => localStorage.setItem(STORAGE_KEY, JSON.stringify(val)),
  { deep: true }
)
watch(
  () => Array.from(voted.value),
  val => localStorage.setItem(VOTED_KEY, JSON.stringify(val))
)

const totalVotes = computed(() => options.reduce((sum, o) => sum + o.votes, 0) || 1)

function addOption() {
  const text = newOption.value.trim()
  if (!text) return
  options.push({ id: Date.now(), text, votes: 0 })
  newOption.value = ''
}

function vote(id: number) {
  const opt = options.find(o => o.id === id)
  if (opt && !voted.value.has(id)) {
    opt.votes++
    voted.value.add(id)
  }
}

function hasVoted(id: number) {
  return voted.value.has(id)
}
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
        box-shadow: 0 0 8px rgba(30,144,255,0.3);
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
        box-shadow: 0 6px 18px rgba(30,144,255,0.4);
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
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
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
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
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
    .form-group { flex-direction: column; }
    .vote__add-btn { width: 100%; }
  }
}
</style>