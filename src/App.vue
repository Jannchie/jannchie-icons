<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, shallowRef, watch, watchEffect } from 'vue'
import { categorize } from './categories'
import IconSvg from './IconSvg.vue'
import LazyIcon from './LazyIcon.vue'
import { pathAttrs, pathsOf, svgAttrs } from './render'
import searchIcon from './icons/search'
import { finalize } from './svg'

// 每个图标是 ({ radius, stroke, weight }) => 路径数组
const modules = import.meta.glob('./icons/*.js', { import: 'default', eager: true })
const icons = Object.entries(modules)
  .map(([path, draw]) => ({ name: path.split('/').pop().slice(0, -3), draw }))
  .sort((a, b) => a.name.localeCompare(b.name))

const corners = [
  { label: '尖角', radius: 0, sharp: true },
  { label: '0', radius: 0 },
  { label: '1', radius: 1 },
  { label: '2', radius: 2 },
  { label: '3', radius: 3 },
]
// 字重：只提供三档整数 / 半整数线宽，配合像素对齐在高清屏上横竖线清晰
const weights = [
  { id: 'light', label: '细', stroke: 1 },
  { id: 'regular', label: '常规', stroke: 1.5 },
  { id: 'bold', label: '粗', stroke: 2 },
]
const sizes = [16, 20, 24, 32, 48, 64, 96, 128]
const themes = [
  { id: 'auto', label: '自动' },
  { id: 'light', label: '亮' },
  { id: 'dark', label: '暗' },
]

// 选项存在本地，热更新整页刷新后不丢
function load() {
  try {
    return JSON.parse(localStorage.getItem('preview')) ?? {}
  }
  catch {
    return {}
  }
}
const saved = load()

const corner = shallowRef(corners.find(c => c.label === saved.corner) ?? corners[3])
const weight = shallowRef(weights.find(w => w.id === saved.weight) ?? weights[1])
const size = ref(sizes.includes(saved.size) ? saved.size : 32)
const theme = ref(themes.some(t => t.id === saved.theme) ? saved.theme : 'auto')
// 像素对齐（见 render.js 的 pixelOffset），默认打开
const align = ref(saved.align ?? true)

watchEffect(() => {
  try {
    localStorage.setItem('preview', JSON.stringify({ corner: corner.value.label, weight: weight.value.id, size: size.value, theme: theme.value, align: align.value }))
  }
  catch {}
})
watchEffect(() => {
  if (theme.value === 'auto')
    delete document.documentElement.dataset.theme
  else
    document.documentElement.dataset.theme = theme.value
})

// 搜索：按名字或分类名过滤；按 / 聚焦，Esc 清空
const query = ref('')
const searchInput = ref(null)
const sections = computed(() => categorize(icons, query.value))
const matched = computed(() => sections.value.reduce((n, c) => n + c.count, 0))
const searchPaths = finalize(searchIcon(), 1.5)
// 页头的标志就是库里的 layout-grid-plus，跟着当前的圆角、字重、像素对齐一起变
const markIcon = icons.find(i => i.name === 'layout-grid-plus')
const markPaths = computed(() => pathsOf(markIcon, corner.value, weight.value, align.value))

// 选中的图标：右侧详情面板
const selected = ref(null)
const selectedIcon = computed(() => {
  const icon = selected.value && icons.find(i => i.name === selected.value)
  return icon && { name: icon.name, paths: pathsOf(icon, corner.value, weight.value, align.value) }
})
const selectedCategory = computed(() => selected.value && sections.value.find(c => c.groups.some(g => g.icons.some(i => i.name === selected.value)))?.title)

// 导出的 SVG：按当前圆角、字重生成；点、细线、细节的线宽写在各自的路径上
function toSvg(icon, px = 24) {
  const attrs = obj => Object.entries(obj).filter(([, v]) => v !== undefined).map(([k, v]) => `${k}="${v}"`).join(' ')
  const paths = icon.paths.map(p => `  <path ${attrs(pathAttrs(p))}/>`)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="0 0 24 24" ${attrs(svgAttrs(weight.value.stroke, !!corner.value.sharp))}>\n${paths.join('\n')}\n</svg>\n`
}

const toast = ref('')
let toastTimer
function notify(text) {
  toast.value = text
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toast.value = ''), 1600)
}
async function copy(text, label) {
  try {
    await navigator.clipboard.writeText(text)
    notify(`已复制${label}`)
  }
  catch {
    notify('复制失败，浏览器不允许访问剪贴板')
  }
}
function download(icon) {
  const url = URL.createObjectURL(new Blob([toSvg(icon)], { type: 'image/svg+xml' }))
  const a = Object.assign(document.createElement('a'), { href: url, download: `${icon.name}.svg` })
  a.click()
  URL.revokeObjectURL(url)
}

function onKey(e) {
  if (e.key === '/' && document.activeElement !== searchInput.value) {
    e.preventDefault()
    searchInput.value?.focus()
  }
  else if (e.key === 'Escape' && selected.value && document.activeElement !== searchInput.value) {
    selected.value = null
  }
}

// 当前所在分类：顶部已经越过页头下沿（再往下 24px 容差）的区块里，取最靠下的那个；一个都没越过就取第一个
// 用滚动事件 + requestAnimationFrame 节流计算，比 IntersectionObserver 判断「最靠上的可见区块」更准——
// 上一个区块的尾巴常常还留在视口顶部，会让高亮慢一拍
const active = ref('')
let ticking = false
let headerHeight = 56
let sectionEls = []
function updateActive() {
  ticking = false
  let current = ''
  for (const s of sectionEls) {
    if (s.getBoundingClientRect().top <= headerHeight + 24)
      current = s.id
    else
      break
  }
  active.value = current || sections.value[0]?.id || ''
}
function onScroll() {
  if (!ticking) {
    ticking = true
    requestAnimationFrame(updateActive)
  }
}
// 分类变了（比如搜索）就重新取一次区块列表
function collectSections() {
  sectionEls = [...document.querySelectorAll('main section[id]')]
  updateActive()
}
watch(() => sections.value.map(c => c.id).join(), () => nextTick(collectSections))

// 侧栏里高亮的分类始终滚到可见范围：只改侧栏自己的 scrollTop，不用 scrollIntoView（它会连带滚动整页）
const sidebar = ref(null)
watch(active, (id) => {
  const bar = sidebar.value
  const link = bar?.querySelector(`a[href="#${id}"]`)
  if (!bar || !link)
    return
  // 链接在侧栏滚动内容里的位置：用 rect 算，不用 offsetTop——侧栏是 sticky，link.offsetTop 已经相对侧栏，
  // 再减 bar.offsetTop（随页面滚动变化的吸顶位置）会把结果算偏，导致点击后侧栏被拽回顶部
  const top = link.getBoundingClientRect().top - bar.getBoundingClientRect().top + bar.scrollTop
  if (top < bar.scrollTop + 32)
    bar.scrollTop = top - 32
  else if (top + link.offsetHeight > bar.scrollTop + bar.clientHeight - 32)
    bar.scrollTop = top + link.offsetHeight - bar.clientHeight + 32
})

// 页头在窄屏会换行、变高：量出实际高度写进 --header-h，侧栏、详情栏、分类标签、锚点跳转都据此留位置
const header = ref(null)
let headerObserver
onMounted(() => {
  headerObserver = new ResizeObserver(([entry]) => {
    headerHeight = entry.target.offsetHeight
    document.documentElement.style.setProperty('--header-h', `${headerHeight}px`)
  })
  headerObserver.observe(header.value)
  window.addEventListener('keydown', onKey)
  window.addEventListener('scroll', onScroll, { passive: true })
  collectSections()
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('scroll', onScroll)
  headerObserver?.disconnect()
})
</script>

<template>
  <div class="shell">
    <!-- 页头：左栏和侧栏同宽（放名字），右栏是工具条；中间那条竖线和下方侧栏的竖线连成一条 -->
    <header ref="header" class="top">
      <div class="brand">
        <IconSvg class="mark" :paths="markPaths" :stroke="weight.stroke" :sharp="!!corner.sharp" />
        <span>Jannchie Icons</span>
      </div>
      <label class="search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
            <path v-for="p in searchPaths" :key="p.d" :d="p.d" />
          </svg>
          <input ref="searchInput" v-model="query" type="search" placeholder="搜索图标或分类" @keydown.esc="query = ''">
          <kbd v-if="!query">/</kbd>
          <small v-else class="mono">{{ matched }}</small>
      </label>
      <div class="opts">
        <div class="opt">
          <span class="label">圆角</span>
          <button v-for="c in corners" :key="c.label" :aria-pressed="corner === c" @click="corner = c">{{ c.label }}</button>
        </div>
        <div class="opt">
          <span class="label">字重</span>
          <button v-for="w in weights" :key="w.id" :aria-pressed="weight === w" @click="weight = w">{{ w.label }}</button>
        </div>
        <div class="opt">
          <span class="label">大小</span>
          <button v-for="s in sizes" :key="s" :aria-pressed="size === s" @click="size = s">{{ s }}</button>
        </div>
        <div class="opt">
          <span class="label">对齐</span>
          <button :aria-pressed="align" title="像素对齐：线宽 1.5 时整体平移 0.25，让高清屏上的横竖线清晰" @click="align = !align">{{ align ? '开' : '关' }}</button>
        </div>
        <div class="opt">
          <button v-for="t in themes" :key="t.id" :aria-pressed="theme === t.id" @click="theme = t.id">{{ t.label }}</button>
        </div>
      </div>
    </header>

    <div class="layout">
      <aside ref="sidebar" class="sidebar">
        <p class="label">分类 · {{ sections.length }}</p>
        <a v-for="c in sections" :key="c.id" :href="`#${c.id}`" :class="{ active: active === c.id }">
          <span>{{ c.title }}</span><small class="mono">{{ c.count }}</small>
        </a>
      </aside>

      <main :style="{ '--size': `${size}px` }">
        <!-- 窄屏没有侧栏：分类改成可横向滚动的标签 -->
        <nav class="pills">
          <a v-for="c in sections" :key="c.id" :href="`#${c.id}`" :class="{ active: active === c.id }">{{ c.title }}<small class="mono">{{ c.count }}</small></a>
        </nav>

        <section v-for="c in sections" :id="c.id" :key="c.id" class="category">
          <h2 class="category-head">{{ c.title }}<small class="mono">{{ c.count }}</small></h2>
          <template v-for="g in c.groups" :key="g.title">
            <p v-if="g.title" class="group label">{{ g.title }} · {{ g.icons.length }}</p>
            <div class="grid">
              <button
                v-for="icon in g.icons"
                :key="icon.name"
                class="cell"
                :class="{ selected: selected === icon.name }"
                :title="icon.name"
                @click="selected = selected === icon.name ? null : icon.name"
              >
                <LazyIcon :icon="icon" :corner="corner" :weight="weight" :align="align" />
                <span class="name">{{ icon.name }}</span>
              </button>
            </div>
          </template>
        </section>
        <p v-if="!sections.length" class="empty">没有匹配「{{ query }}」的图标</p>
      </main>

      <!-- 详情：常驻的第三列。打开、切换只换列里的内容，网格既不重排也不会被挡住；没选中时显示空状态 -->
      <aside v-if="selectedIcon" class="detail">
        <div class="detail-head">
          <div>
            <p class="label">{{ selectedCategory }}</p>
            <h3 class="mono">{{ selectedIcon.name }}</h3>
          </div>
          <button class="close" aria-label="关闭" @click="selected = null">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M7 7L17 17M17 7L7 17" /></svg>
          </button>
        </div>
        <div class="hero">
          <IconSvg :paths="selectedIcon.paths" :stroke="weight.stroke" :sharp="!!corner.sharp" />
        </div>
        <div class="scales">
          <div v-for="px in [16, 20, 24, 32, 48]" :key="px">
            <IconSvg :style="{ width: `${px}px`, height: `${px}px` }" :paths="selectedIcon.paths" :stroke="weight.stroke" :sharp="!!corner.sharp" />
            <small class="mono">{{ px }}</small>
          </div>
        </div>
        <div class="actions">
          <button @click="copy(selectedIcon.name, '名称')">复制名称</button>
          <button @click="copy(toSvg(selectedIcon), ' SVG')">复制 SVG</button>
          <button @click="download(selectedIcon)">下载</button>
        </div>
        <div class="code-wrap">
          <p class="label">SVG · {{ corner.sharp ? '尖角' : `圆角 ${corner.label}` }} · {{ weight.label }}</p>
          <pre class="code">{{ toSvg(selectedIcon) }}</pre>
        </div>
      </aside>
      <aside v-else class="detail empty-detail">
        <div class="hero placeholder">
          <p>点击任意图标<br>查看详情、复制 SVG</p>
        </div>
        <dl class="keys">
          <div><dt><kbd>/</kbd></dt><dd>搜索</dd></div>
          <div><dt><kbd>Esc</kbd></dt><dd>清空搜索 / 关闭详情</dd></div>
        </dl>
      </aside>
    </div>
  </div>

  <Transition name="fade">
    <div v-if="toast" class="toast">{{ toast }}</div>
  </Transition>
</template>

<style>
@font-face { font-family: 'Berkeley Mono'; src: url('https://cdn.jannchie.com/fonts/variants/BerkeleyMono-Regular.woff2') format('woff2'); font-weight: 400; }
@font-face { font-family: 'Berkeley Mono'; src: url('https://cdn.jannchie.com/fonts/variants/BerkeleyMono-Bold.woff2') format('woff2'); font-weight: 700; }

/* 主题：暗色为主；线、面、文字各三级 */
:root {
  --bg: #fbfbfc;
  --surface: #ffffff;
  --sunken: #f3f3f5;
  --line: #e6e6ea;
  --line-strong: #d4d4da;
  --text: #0e0e11;
  --text-2: #4a4b53;
  --muted: #6e6f78;
  /* 不用彩色强调：强调色就是正文色，选中态用一层很淡的正文色 */
  --accent: var(--text);
  --accent-soft: color-mix(in srgb, var(--text) 9%, transparent);
  --header-h: 56px;
  --side: 220px;
  --detail: 340px;
  --sans: 'Inter', system-ui, -apple-system, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  --mono: 'Berkeley Mono', ui-monospace, 'Sarasa Mono SC', 'Microsoft YaHei', monospace;
  color-scheme: light;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
    --bg: #09090b; --surface: #0e0e11; --sunken: #141418; --line: #1d1d22; --line-strong: #2a2a31;
    --text: #f2f2f4; --text-2: #c2c3ca; --muted: #9a9ba4; color-scheme: dark;
  }
}
:root[data-theme='dark'] {
  --bg: #09090b; --surface: #0e0e11; --sunken: #141418; --line: #1d1d22; --line-strong: #2a2a31;
  --text: #f2f2f4; --text-2: #c2c3ca; --muted: #9a9ba4; color-scheme: dark;
}
* { box-sizing: border-box; }
/* 锚点跳转的顶部留白只在这里留一次（页头高度）；.category 的 scroll-margin 只补窄屏标签栏，别再叠加页头高度 */
html { scroll-padding-top: var(--header-h); }
body { margin: 0; background: var(--bg); color: var(--text); font: 14px/1.6 var(--sans); -webkit-font-smoothing: antialiased; }
button { font: inherit; color: inherit; }
small { color: var(--muted); }
.mono { font-family: var(--mono); }
.label { margin: 0; font: 12px/1.4 var(--mono); letter-spacing: .06em; text-transform: uppercase; color: var(--muted); }

/* 内部滚动条：细、圆角、颜色跟随主题 */
.sidebar, .detail, .code { scrollbar-width: thin; scrollbar-color: var(--line-strong) transparent; }
.sidebar::-webkit-scrollbar, .detail::-webkit-scrollbar, .code::-webkit-scrollbar { width: 8px; height: 8px; }
.sidebar::-webkit-scrollbar-track, .detail::-webkit-scrollbar-track, .code::-webkit-scrollbar-track { background: transparent; }
.sidebar::-webkit-scrollbar-thumb, .detail::-webkit-scrollbar-thumb, .code::-webkit-scrollbar-thumb {
  border: 2px solid transparent; border-radius: 999px; background: var(--line-strong); background-clip: padding-box;
}
.sidebar::-webkit-scrollbar-thumb:hover, .detail::-webkit-scrollbar-thumb:hover, .code::-webkit-scrollbar-thumb:hover { background-color: var(--muted); }
.sidebar::-webkit-scrollbar-button, .detail::-webkit-scrollbar-button, .code::-webkit-scrollbar-button { display: none; }

/* 线框（参考 voidzero.dev）：内容收在居中的容器里，左右两条竖线贯穿整页；每根线只画一次 */
.shell { max-width: 1680px; min-height: 100vh; margin: 0 auto; border-inline: 1px solid var(--line); background: var(--surface); }

/* 页头：名字 | 搜索 | 设置；名字一栏和侧栏同宽，中间那条竖线和侧栏的竖线连成一条 */
.top {
  position: sticky; top: 0; z-index: 3; display: grid; grid-template-columns: var(--side) minmax(0, 1fr) auto;
  grid-template-areas: 'brand search opts'; min-height: 56px; border-bottom: 1px solid var(--line);
  background: color-mix(in srgb, var(--surface) 85%, transparent); backdrop-filter: blur(14px) saturate(1.4);
}
.brand { grid-area: brand; display: flex; align-items: center; gap: 10px; padding: 0 20px; border-right: 1px solid var(--line); font-weight: 600; letter-spacing: -.01em; white-space: nowrap; }
.mark { width: 20px; height: 20px; flex: none; color: var(--accent); }
.opts { grid-area: opts; display: flex; align-items: stretch; min-width: 0; }
.search { grid-area: search; display: flex; align-items: center; gap: 10px; min-width: 120px; padding: 0 20px; cursor: text; }
.search svg { width: 16px; height: 16px; flex: none; color: var(--muted); }
.search input { flex: 1; min-width: 0; border: 0; outline: 0; background: none; color: inherit; font: inherit; }
.search input::placeholder { color: var(--muted); }
.search input::-webkit-search-cancel-button { display: none; }
kbd { font: 12px var(--mono); color: var(--muted); padding: 1px 6px; border: 1px solid var(--line-strong); border-radius: 4px; }
.opt { display: flex; align-items: center; gap: 2px; padding: 0 12px; border-left: 1px solid var(--line); white-space: nowrap; }
.opt .label { margin-right: 6px; }
.opt button {
  height: 26px; min-width: 26px; padding: 0 7px; border: 0; border-radius: 6px; background: none; cursor: pointer;
  font: 12.5px var(--mono); color: var(--text-2); transition: color .12s, background .12s;
}
.opt button:hover { color: var(--text); }
.opt button[aria-pressed='true'] { color: var(--text); background: var(--sunken); box-shadow: inset 0 0 0 1px var(--line-strong); }

/* 主体：侧栏 | 内容 | 详情（常驻） */
.layout { display: grid; grid-template-columns: var(--side) minmax(0, 1fr) var(--detail); }
.sidebar {
  position: sticky; top: var(--header-h); align-self: start; height: calc(100vh - var(--header-h));
  overflow-y: auto; padding: 20px 10px 40px; border-right: 1px solid var(--line);
}
.sidebar .label { padding: 0 10px 10px; }
.sidebar a {
  display: flex; justify-content: space-between; align-items: baseline; gap: 8px; padding: 5px 10px; border-radius: 6px;
  color: var(--text-2); text-decoration: none; font-size: 13.5px; white-space: nowrap; transition: color .12s, background .12s;
}
.sidebar a span { overflow: hidden; text-overflow: ellipsis; }
.sidebar a small { font-size: 12px; }
.sidebar a:hover { color: var(--text); background: var(--sunken); }
.sidebar a.active { color: var(--text); background: var(--sunken); }
.sidebar a.active small { color: var(--accent); }

main { min-width: 0; padding-bottom: 80px; }
.pills { display: none; }

/* 分类区块：不用 content-visibility——未渲染的区块按估计高度占位，点侧栏跳转后实际高度一出来，内容会整体挪动；
   图标本身已经懒加载（LazyIcon），排版开销不大 */
.category { border-bottom: 1px solid var(--line); }
.category-head { display: flex; align-items: baseline; gap: 10px; margin: 0; padding: 28px 32px 14px; font-size: 18px; line-height: 1.3; letter-spacing: -.01em; font-weight: 600; }
.category-head small { font-size: 13px; font-weight: 400; }
.group { padding: 18px 32px 10px; }
.empty { color: var(--muted); text-align: center; padding: 96px 0; }

/* 网格：格子只画右边和下边，网格只画顶边；最右一列的右边线收进容器竖线 */
.grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(max(92px, calc(var(--size) * 2.25)), 1fr));
  margin-right: -1px; border-top: 1px solid var(--line);
}
.category .grid:last-child { margin-bottom: -1px; }
.cell {
  position: relative; aspect-ratio: 1; display: grid; place-items: center; padding: 0; border: 0;
  border-right: 1px solid var(--line); border-bottom: 1px solid var(--line);
  background: none; color: var(--text); cursor: pointer; transition: background .12s, color .12s;
}
.cell:hover { background: var(--sunken); }
.cell.selected { background: var(--accent-soft); color: var(--accent); }
.cell .name {
  position: absolute; left: 0; right: 0; bottom: 8px; padding: 0 6px; text-align: center;
  font: 11.5px var(--mono); color: var(--text-2); opacity: 0; transform: translateY(2px); transition: opacity .15s, transform .15s;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.cell:hover .name, .cell.selected .name { opacity: 1; transform: none; }
.cell.selected .name { color: var(--accent); }

/* 详情栏：常驻右列，随页面滚动保持在视口里 */
.detail {
  position: sticky; top: var(--header-h); align-self: start; height: calc(100vh - var(--header-h));
  display: flex; flex-direction: column; overflow-y: auto; border-left: 1px solid var(--line);
}
.placeholder { color: var(--muted); text-align: center; }
.placeholder p { margin: 0; font-size: 13px; line-height: 1.8; }
.keys { margin: 0; padding: 16px 20px; display: flex; flex-direction: column; gap: 10px; border-bottom: 0 !important; }
.keys div { display: flex; align-items: center; gap: 12px; }
.keys dt { width: 48px; }
.keys dd { margin: 0; font-size: 13px; color: var(--text-2); }
.detail > * { border-bottom: 1px solid var(--line); }
.detail-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; padding: 20px; }
.detail-head h3 { margin: 6px 0 0; font-size: 16px; font-weight: 600; word-break: break-all; }
.close { display: grid; place-items: center; width: 28px; height: 28px; flex: none; padding: 0; border: 0; border-radius: 6px; background: none; color: var(--muted); cursor: pointer; }
.close svg { width: 16px; height: 16px; }
.close:hover { color: var(--text); background: var(--sunken); }
.hero {
  display: grid; place-items: center; aspect-ratio: 1; padding: 28px; color: var(--text);
  background-image: linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: calc((100% - 56px) / 24) calc((100% - 56px) / 24); background-position: 28px 28px; background-origin: border-box;
}
.hero svg { width: 100%; height: 100%; }
.scales { display: grid; grid-template-columns: repeat(5, 1fr); }
.scales div { display: flex; flex-direction: column; align-items: center; justify-content: flex-end; gap: 8px; padding: 16px 0 12px; border-right: 1px solid var(--line); }
.scales div:last-child { border-right: 0; }
.scales small { font-size: 12px; }
.actions { display: grid; grid-template-columns: repeat(3, 1fr); }
.actions button {
  height: 44px; border: 0; border-right: 1px solid var(--line); background: none; cursor: pointer;
  font-size: 13px; color: var(--text-2); transition: color .12s, background .12s;
}
.actions button:last-child { border-right: 0; }
.actions button:hover { color: var(--text); background: var(--sunken); }
.code-wrap { display: flex; flex-direction: column; gap: 10px; padding: 16px 20px 20px; border-bottom: 0; }
.code { margin: 0; padding: 12px; font: 12px/1.6 var(--mono); color: var(--text-2); border-radius: 8px; background: var(--sunken); overflow: auto; white-space: pre; }

.toast {
  position: fixed; left: 50%; bottom: 28px; z-index: 5; transform: translateX(-50%);
  padding: 8px 14px; border-radius: 8px; background: var(--text); color: var(--bg); font-size: 13px;
  box-shadow: 0 8px 24px rgb(0 0 0 / .2);
}
.fade-enter-active, .fade-leave-active { transition: opacity .15s, transform .15s; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translate(-50%, 4px); }

/* 中屏：设置挪到第二行，可以横向滑动；详情栏放不下第三列，改成从右下浮起 */
@media (max-width: 1180px) {
  .top { grid-template-columns: var(--side) minmax(0, 1fr); grid-template-areas: 'brand search' 'opts opts'; }
  .search { height: 52px; }
  .opts { overflow-x: auto; border-top: 1px solid var(--line); scrollbar-width: none; }
  .opts::-webkit-scrollbar { display: none; }
  .opt { height: 44px; }
  .opt:first-child { border-left: 0; }
  .layout { grid-template-columns: var(--side) minmax(0, 1fr); }
  .empty-detail { display: none !important; }
  .detail {
    position: fixed; top: auto; right: 16px; bottom: 16px; left: auto; z-index: 4; width: min(var(--detail), calc(100vw - 32px));
    height: auto; max-height: 72vh; border: 1px solid var(--line-strong); border-radius: 12px; background: var(--surface);
    box-shadow: 0 16px 48px rgb(0 0 0 / .25);
  }
}
/* 手机：名字只留图标、和搜索挤一行；去掉侧栏，分类改成固定在页头下方、可横向滑动的标签；详情从底部弹出成半屏面板 */
@media (max-width: 760px) {
  .top { grid-template-columns: auto minmax(0, 1fr); }
  .brand { padding: 0 14px; }
  .brand span { display: none; }
  .search { height: 48px; padding: 0 14px; }
  .search kbd { display: none; }
  .opt { padding: 0 10px; }
  .layout { grid-template-columns: minmax(0, 1fr); }
  .sidebar { display: none; }
  .pills {
    display: flex; gap: 6px; overflow-x: auto; padding: 10px 14px; scrollbar-width: none; border-bottom: 1px solid var(--line);
    position: sticky; top: var(--header-h); z-index: 2; background: color-mix(in srgb, var(--surface) 92%, transparent); backdrop-filter: blur(14px);
  }
  .pills::-webkit-scrollbar { display: none; }
  .pills a {
    flex: none; display: inline-flex; gap: 6px; align-items: baseline; padding: 4px 11px;
    border: 1px solid var(--line-strong); border-radius: 999px; color: var(--text-2); text-decoration: none; font-size: 13px;
  }
  .pills a.active { color: var(--text); border-color: var(--accent); background: var(--accent-soft); }
  .category { scroll-margin-top: 50px; }
  .category-head { padding: 22px 14px 12px; font-size: 16px; }
  .group { padding: 14px 14px 8px; }
  .grid { grid-template-columns: repeat(auto-fill, minmax(max(76px, calc(var(--size) * 2)), 1fr)); }
  .detail { left: 0; right: 0; bottom: 0; width: auto; max-height: 68vh; border-radius: 16px 16px 0 0; border-width: 1px 0 0; }
  .hero { padding: 20px; max-height: 34vh; aspect-ratio: auto; height: 34vh; }
  .hero svg { width: auto; height: 100%; aspect-ratio: 1; }
}
</style>
