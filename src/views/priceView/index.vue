<template>
  <div class="price-wrap" role="main" aria-label="代肝价格表">
    <!-- 左侧侧栏（联系 + 说明）-->
    <aside class="sidebar" aria-label="联系方式与说明">
      <div class="side-card contact-card">
        <div class="brand">
          <div class="logo">霜</div>
          <div class="brand-text">
            <h2 class="title">霜落代肝小站</h2>
            <p class="muted">个人接单</p>
          </div>
        </div>

        <div class="contacts">
          <div class="row"><span class="k">Q：</span><span class="v">321759121</span></div>
          <div class="row"><span class="k">V：</span><span class="v">zlww255223</span></div>
        </div>

        <p class="hint"></p>
      </div>

      <div class="side-card note-card">
        <h3 class="card-title">说明</h3>
        <p class="muted small">up是单线程笨蛋，没法多开设备，所以可能做的会慢一点，然后都会在b站直播</p>
      </div>
    </aside>

    <!-- 右侧主区域（价格卡片网格） -->
    <main class="main" aria-label="价格列表">
      <div class="grid">
        <section
          v-for="(sec, idx) in sections"
          :key="idx"
          class="section"
          :data-variant="sec.variant"
          :aria-label="sec.title"
        >
          <header class="sec-head">
            <h3 class="sec-title">{{ sec.title }}</h3>
            <span class="sec-badge" v-if="sec.badge">{{ sec.badge }}</span>
          </header>

          <ul class="sec-list">
            <li v-for="(it, i) in sec.items" :key="i" class="sec-item">
              <div class="item-left">
                <div class="it-name">{{ it.name }}</div>
                <div class="it-sub muted" v-if="it.sub">{{ it.sub }}</div>
              </div>

              <div class="item-right">
                <div class="it-price">{{ it.price }}</div>
                <div class="it-note muted" v-if="it.note">（{{ it.note }}）</div>
              </div>
            </li>
          </ul>

          <div v-if="sec.summary" class="sec-summary muted">{{ sec.summary }}</div>
        </section>
      </div>

      <footer class="foot">
        <p class="muted small">以上价格仅作参考，实际以微信沟通确认为准。下单前请确认需求并保留聊天/转账凭证。</p>
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
/**
 * 价格数据（可按需增删改）
 * 保持结构化以便后续更新或国际化
 */
type Item = { name: string; price: string; note?: string; sub?: string }
type Section = { title: string; variant?: string; badge?: string; items: Item[]; summary?: string }

const sections: Section[] = [
  {
    title: '煌珏',
    variant: 'v1',
    items: [
      { name: '云陵谷', price: '20r', note: '30r' },
      { name: '虎口山脉', price: '20r', note: '30r' },
      { name: '今州城', price: '15r', note: '30r' },
      { name: '无明湾', price: '20r', note: '30r' },
      { name: '怨鸟泽', price: '30r', note: '60r' },
      { name: '归墟港市', price: '35r', note: '50r' },
      { name: '无光之森', price: '35r', note: '45r' },
      { name: '中曲台地', price: '40r', note: '70r' },
      { name: '荒石高地', price: '40r', note: '50r' },
      { name: '乘霜山', price: '40r', note: '60r' }
    ],
    summary: '全包：满探290r · 全收集400r'
  },
  {
    title: '黑海岸',
    variant: 'v2',
    items: [
      { name: '黑海岸群岛', price: '20r', note: '30r' },
      { name: '泰提斯之底', price: '20r', note: '30r' }
    ]
  },
  {
    title: '黎那汐塔',
    variant: 'v3',
    items: [
      { name: '拉古那城', price: '5r' },
      { name: '贝奥海域', price: '10r', note: '15r' },
      { name: '拂风水畔', price: '25r', note: '35r' },
      { name: '埃弗拉德金库', price: '25r', note: '35r' },
      { name: '下层金库', price: '10r', note: '15r' },
      { name: '狄萨莱海湾', price: '30r', note: '35r' },
      { name: '黎系列群岛', price: '10r', note: '15r' },
      { name: '氪暴水境', price: '20r', note: '30r' },
      { name: '赞悼堂迹', price: '20r', note: '30r' },
      { name: '悲叹墓岛', price: '30r', note: '40r' },
      { name: '榴生半岛', price: '25r', note: '30r' },
      { name: '阿维纽林', price: '20r', note: '30r' },
      { name: '隐海实验场', price: '20r', note: '30r' },
      { name: '七丘', price: '50r', note: '60r' },
      { name: '桑古伊斯狩原', price: '40r', note: '50r' }
    ],
    summary: '全包：全部330r · 全收集420r'
  },
  {
    title: '任务类',
    variant: 'v4',
    items: [
      { name: '伴星 / 危行统', price: '15r/每幕' },
      { name: '主线', price: '15~25r/每幕' }
    ]
  },
  {
    title: '托管（每月）',
    variant: 'v5',
    items: [
      { name: '纯日常', price: '30r' },
      { name: '每日活跃 + 每日体力', price: '45r' },
      { name: '日体 + 电台满级 + 千道门扉', price: '60r' },
      { name: '日体 + 电台 + 门扉 + 深塔海域', price: '100r' },
      { name: '全套（含活动）', price: '200r' }
    ]
  },
  {
    title: '常驻活动',
    variant: 'v6',
    items: [
      { name: '旋旗不落', price: '45r' },
      { name: '老人与海', price: '80r' },
      { name: '打牌', price: '70r' },
      { name: '团团转', price: '50r' },
      { name: '幻梦游园', price: '45r' },
      { name: '失序梦逸', price: '40r' },
      { name: '拍照', price: '5r/期' }
    ]
  },
  {
    title: '其他',
    variant: 'v7',
    items: [
      { name: '数据坟 0~5', price: '4r/级' },
      { name: '数据坟 5~10', price: '6r/级' },
      { name: '数据坟 10~18', price: '8r/级' },
      { name: '数据坟 18以上', price: '10r/级' },
      { name: '肝抽数', price: '5r/抽' },
      { name: '刷声赐（按时间）', price: '20r/小时' },
      { name: '指定词条（C1/C4）', price: 'C1 3r/个 · C4 5r/个' }
    ]
  },
  {
    title: '限时活动',
    variant: 'v8',
    items: [{ name: '潮蚀模拟（99波）', price: '80r' }]
  }
]
</script>

<style scoped lang="scss">
.price-wrap {
  /* 使用你指定的背景渐变 */
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
  min-height: 100vh;
  padding: 28px;
  display: flex;
  gap: 20px;
  box-sizing: border-box;
  font-family: -apple-system, system-ui, "Segoe UI", Roboto, "Noto Sans CJK SC", "PingFang SC", Arial;
  color: #0b1820;
}

/* 全局变量（局部容器内定义，scoped 安全） */
.price-wrap {
  --glass-bg: rgba(255,255,255,0.10);
  --glass-border: rgba(255,255,255,0.14);
  --muted: rgba(11,24,32,0.65);
  --accent: #2b8fbf;
  --accent-2: #7fbfff;
  --radius: 14px;
}

/* 侧栏 */
.sidebar {
  width: 320px;
  max-width: 36%;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* 通用 side-card：玻璃质感 */
.side-card {
  background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: var(--radius);
  padding: 16px;
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow: 0 8px 28px rgba(6,15,20,0.08);
}

/* 联系卡更强调左上角标识 */
.contact-card .brand {
  display:flex;
  gap:12px;
  align-items:center;
  margin-bottom:8px;

  .logo {
    width:56px;height:56px;border-radius:12px;
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    display:flex;align-items:center;justify-content:center;
    color: #072029;font-weight:800;font-size:1.05rem;
    box-shadow: 0 12px 30px rgba(43,143,191,0.12);
  }
  .brand-text .title { margin:0;font-size:1.05rem;font-weight:700;color:#04202a; }
  .brand-text .muted { margin:0;color:var(--muted);font-size:0.92rem; }
}

.contacts { margin: 10px 0;
  .row { display:flex; gap:10px; align-items:center; margin-bottom:6px;
    .k { color:var(--muted); width:22px; }
    .v { font-weight:700; color:#04202a; }
  }
}

.hint { color:var(--muted); font-size:0.9rem; }

/* 备注卡小样式 */
.note-card .card-title { margin:0 0 6px; font-weight:700; color:#04202a; }
.note-card .muted { color:var(--muted); font-size:0.9rem; }

/* 主区域 */
.main { flex:1; display:flex; flex-direction:column; gap:12px; }

/* 网格：PC 两列，移动单列 */
.grid {
  display:grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

/* 主要玻璃卡片（不同 variant 视觉上做区分）*/
.section {
  padding: 12px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.08);
  background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03));
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  box-shadow: 0 6px 18px rgba(8,16,20,0.06);
  display:flex;
  flex-direction:column;
  gap:8px;
}

/* variant 差异化 */
.section[data-variant="v1"] { border-left: 4px solid #ffd17a; }
.section[data-variant="v2"] { border-top: 3px solid #7fd6ff; box-shadow: 0 8px 30px rgba(31,70,90,0.06); }
.section[data-variant="v3"] { border-radius: 16px; background: linear-gradient(180deg, rgba(240,255,250,0.55), rgba(255,255,255,0.03)); }
.section[data-variant="v4"] { border: 1px dashed rgba(11,24,32,0.06); }
.section[data-variant="v5"] { transform: translateY(0); }
.section[data-variant="v6"] { border-left: 4px solid rgba(255,179,209,0.6); }
.section[data-variant="v7"] { border-left: 4px solid rgba(140,224,168,0.6); }
.section[data-variant="v8"] { border-left: 4px solid #c9b3ff; }

/* 头部 */
.sec-head { display:flex; align-items:center; justify-content:space-between; gap:8px; }
.sec-title { margin:0; font-size:1.02rem; font-weight:700; color:#07202a; }
.sec-badge { background: rgba(255,255,255,0.08); padding:4px 8px; border-radius:8px; font-size:0.82rem; color:var(--muted); }

/* 列表 */
.sec-list { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:6px; }
.sec-item { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:8px; border-radius:8px;
  transition: background .12s ease, transform .08s ease;
  &:hover { background: rgba(255,255,255,0.02); transform: translateY(-2px); }

  .item-left { display:flex; flex-direction:column; gap:4px;
    .it-name { font-weight:600; color:#07202a; }
    .it-sub { color:var(--muted); font-size:0.9rem; }
  }
  .item-right { display:flex; flex-direction:column; align-items:flex-end; gap:4px;
    .it-price { color: #045a6b; font-weight:800; }
    .it-note { color:var(--muted); font-size:0.9rem; text-align:right; }
  }
}

/* summary */
.sec-summary { margin-top:6px; padding:8px; border-radius:8px; background: rgba(255,255,255,0.03); color:var(--muted); font-size:0.9rem; border:1px solid rgba(255,255,255,0.02); }

/* footer */
.foot { color:var(--muted); font-size:0.9rem; margin-top:8px; }

/* 响应式：窄屏（移动端）调整为单列堆叠 */
@media (max-width: 900px) {
  .price-wrap { flex-direction: column; padding: 16px; }
  .sidebar { width:100%; max-width:100%; order: -1; }
  .grid { grid-template-columns: 1fr; }
  .section { padding: 14px; }
}

/* 小屏进一步缩放文字 */
@media (max-width: 420px) {
  .contacts .v { font-size:0.95rem; }
  .sec-item { padding:10px; }
  .sec-title { font-size:1rem; }
  .hint, .muted, .small { font-size:0.84rem; }
}

/* 修正：替换掉之前可能的错误 token（保持单位正确） */
.hint, .muted, .small, .sec-summary, .foot { font-size: 0.9rem; }
</style>
