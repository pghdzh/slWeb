<template>
  <div class="home-container">
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

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

onMounted(() => {
  type()
  setInterval(() => {
    cursorVisible.value = !cursorVisible.value
  }, 500)
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
</style>
