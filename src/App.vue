<script setup>
// 版本号取发布包的 package.json（发版时两处一起改），header 上显示当前是哪一版
import { version } from '../packages/core/package.json'
import { computed, nextTick, onMounted, onUnmounted, provide, ref, shallowRef, watch, watchEffect } from 'vue'
import { categorize } from './categories'
import { categoryIcon } from './category-icons'
import { LOCALES, locale, searchGroupTitle, searchTitle, t } from './i18n'
import Examples from './Examples.vue'
import Icon from './Icon.vue'
import IconSvg from './IconSvg.vue'
import { byName, icons } from './iconset'
import LazyIcon from './LazyIcon.vue'
import { svgString } from './export'
import { CORNERS, WEIGHTS } from './options'
import { devicePx, pathsOf } from './render'
import { ROLES } from './tone'
import { resnapAll } from './snap'
import searchIcon from './icons/search'
import { finalize } from './svg'


// 圆角、字重档位见 options.js；文案（尖角、字重名、主题名）按 key 走多语言
const corners = CORNERS
const weights = WEIGHTS
// 预览大小：滑块 16–128，步长 4
const SIZE = { min: 16, max: 128, step: 4 }
const themes = [
  { id: 'auto', label: 'auto', icon: 'theme' },
  { id: 'light', label: 'lightTheme', icon: 'sun' },
  { id: 'dark', label: 'darkTheme', icon: 'moon' },
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
const size = ref(Number.isFinite(saved.size) ? Math.min(SIZE.max, Math.max(SIZE.min, Math.round(saved.size / SIZE.step) * SIZE.step)) : 32)
const theme = ref(themes.some(t => t.id === saved.theme) ? saved.theme : 'auto')
// 着色：单色（全部 currentColor）或双色。双色里主体是 primary（留空跟随文字颜色），角标、划掉的斜杠等按语义角色上色，
// 每个角色有亮 / 暗两套推荐色（tone.js 的 ROLES），按当前主题取；用户可以逐个覆盖（覆盖的颜色两种主题共用）
const HEX = /^#[\da-f]{6}$/i
const duo = ref(saved.duo === true)
const primary = ref(HEX.test(saved.primary) ? saved.primary : '')
const overrides = ref(Object.fromEntries(Object.entries(saved.overrides ?? {}).filter(([r, c]) => r in ROLES && HEX.test(c))))
// 当前是否暗色：主题选「自动」时跟随系统
const systemDark = ref(matchMedia('(prefers-color-scheme: dark)').matches)
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => (systemDark.value = e.matches))
const isDark = computed(() => theme.value === 'dark' || (theme.value === 'auto' && systemDark.value))
const recommended = role => ROLES[role][isDark.value ? 'dark' : 'light']
const roleColors = computed(() => Object.fromEntries(Object.keys(ROLES).map(r => [r, overrides.value[r] ?? recommended(r)])))
const setRole = (role, color) => (overrides.value = color === recommended(role) ? Object.fromEntries(Object.entries(overrides.value).filter(([r]) => r !== role)) : { ...overrides.value, [role]: color })
const customized = computed(() => !!primary.value || Object.keys(overrides.value).length > 0)
// 调色盘面板：点外面关闭
const paletteOpen = ref(false)
const paletteEl = ref(null)
// 面板用 fixed 定位：设置栏可以横向滚动（overflow），绝对定位的面板会被它裁掉；打开时按按钮的位置算坐标，
// 右边和按钮右沿对齐（多出 12），不超出视口
const PANEL_W = 240
const panelPos = ref({})
function togglePalette(e) {
  paletteOpen.value = !paletteOpen.value
  if (!paletteOpen.value)
    return
  const r = e.currentTarget.getBoundingClientRect()
  const left = Math.max(8, Math.min(r.right + 12 - PANEL_W, window.innerWidth - PANEL_W - 8))
  panelPos.value = { top: `${r.bottom + 10}px`, left: `${left}px` }
}
function closePalette(e) {
  if (paletteOpen.value && !paletteEl.value?.contains(e.target))
    paletteOpen.value = false
}
const cycleTheme = () => (theme.value = themes[(themes.findIndex(th => th.id === theme.value) + 1) % themes.length].id)
function resetColors() {
  primary.value = ''
  overrides.value = {}
}
// 导出用的具体颜色（当前主题下生效的那套）；单色时不传
const exportColors = computed(() => (duo.value ? { primary: primary.value || undefined, ...roleColors.value } : undefined))
// 预览：IconSvg 的路径引用这些变量（见 render.js 的 PREVIEW_COLORS 和 .ji 样式）
watchEffect(() => {
  const s = document.documentElement.style
  for (const [role, color] of Object.entries(roleColors.value))
    s.setProperty(`--icon-${role}`, duo.value ? color : 'currentColor')
  if (duo.value && primary.value)
    s.setProperty('--icon-primary', primary.value)
  else
    s.removeProperty('--icon-primary')
})
// 界面语言：默认英语
locale.value = LOCALES.some(l => l.id === saved.lang) ? saved.lang : 'en'
// 模板里直接给导入的 ref 赋值不可靠，包一层本地的 computed
const lang = computed({ get: () => locale.value, set: v => (locale.value = v) })
const cornerLabel = c => c.sharp ? t('ui.sharp') : c.label

watchEffect(() => {
  try {
    localStorage.setItem('preview', JSON.stringify({ corner: corner.value.label, weight: weight.value.id, size: size.value, theme: theme.value, lang: locale.value, duo: duo.value, primary: primary.value, overrides: overrides.value }))
  }
  catch {}
})
watchEffect(() => {
  document.documentElement.lang = LOCALES.find(l => l.id === locale.value).html
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
const sections = computed(() => categorize(icons, query.value, searchTitle, searchGroupTitle))
const matched = computed(() => sections.value.reduce((n, c) => n + c.count, 0))
// 清空搜索（Esc、清除按钮、删光文字）时如果选中了图标：保留选中，并把它在完整列表里的格子滚到视口中间，
// 不用在两千多个图标里重新找一遍
function clearSearch() {
  query.value = ''
  searchInput.value?.focus()
}
watch(query, (q, old) => {
  if (q || !old || !selected.value)
    return
  nextTick(() => mainEl.value?.querySelector(`.cell[data-name="${selected.value}"]`)?.scrollIntoView({ block: 'center' }))
})
// 侧栏自己的筛选：只过滤侧栏里的分类列表（顶部搜索过滤的是图标），分类多时快速跳到想看的分类。
// 和顶部搜索同一套匹配规则（categorize）：分类名（各语言）、小节名、或者分类里任何一个图标的名字对得上，这个分类就留下
const catFilter = ref('')
const sideSections = computed(() => {
  if (!catFilter.value.trim())
    return sections.value
  const keep = new Set(categorize(icons, catFilter.value, searchTitle, searchGroupTitle).map(c => c.id))
  return sections.value.filter(c => keep.has(c.id))
})
const searchPaths = finalize(searchIcon(), 1.5)
// 按名字取图标的 Icon 组件（页头标志、详情的多尺寸预览、示例页）用同一套设置
provide('iconStyle', computed(() => ({ corner: corner.value, weight: weight.value })))

// 视图：图标网格 / 示例组件；记在网址的 ?view=examples 上，方便直接分享示例页
const view = ref(new URLSearchParams(location.search).get('view') === 'examples' ? 'examples' : 'icons')
watch(view, (v) => {
  const url = new URL(location.href)
  if (v === 'examples')
    url.searchParams.set('view', 'examples')
  else
    url.searchParams.delete('view')
  url.hash = ''
  history.replaceState(null, '', url)
  window.scrollTo(0, 0)
  if (v === 'icons')
    nextTick(collectSections)
})

// 选中的图标：右侧详情面板；记在网址的 ?icon= 上，可以直接分享某个图标
const selected = ref(byName.has(new URLSearchParams(location.search).get('icon')) ? new URLSearchParams(location.search).get('icon') : null)
watch(selected, (name) => {
  const url = new URL(location.href)
  if (name)
    url.searchParams.set('icon', name)
  else
    url.searchParams.delete('icon')
  history.replaceState(null, '', url)
})
const selectedIcon = computed(() => {
  const icon = selected.value && byName.get(selected.value)
  if (!icon)
    return null
  // 不做像素对齐的路径：详情大图和导出用
  return { name: icon.name, paths: pathsOf(icon, corner.value, weight.value) }
})
// 变体：去掉 -badge-top / -badge / -off 后缀得到「本体」，本体和所有以「本体-」开头的图标算一族（folder-search → folder-search-badge、-badge-top……）；
// 一族只有自己时，退而显示它所在分组里的其他图标（tag-a → tag-b、tag-c……）
const VARIANT_SUFFIX = /-(?:badge-top|badge|off)$/
const MAX_RELATED = 48
const related = computed(() => {
  const name = selected.value
  if (!name)
    return null
  const stripped = name.replace(VARIANT_SUFFIX, '')
  const core = byName.has(stripped) ? stripped : name
  const family = icons.filter(i => i.name === core || i.name.startsWith(`${core}-`))
  if (family.length > 1)
    return { kind: 'variants', icons: family.slice(0, MAX_RELATED), more: Math.max(0, family.length - MAX_RELATED) }
  for (const c of sections.value) {
    const g = c.groups.find(g => g.icons.some(i => i.name === name))
    if (g && g.icons.length > 1)
      return { kind: 'series', icons: g.icons.slice(0, MAX_RELATED), more: Math.max(0, g.icons.length - MAX_RELATED) }
  }
  return null
})
// 圆角 × 字重：同一个图标在每种组合下的样子，点一格就切到那套设置
const styleGrid = computed(() => {
  const icon = selected.value && byName.get(selected.value)
  return icon && weights.map(w => ({ w, cells: corners.map(c => ({ c, paths: pathsOf(icon, c, w, devicePx(24)) })) }))
})
const selectedAnimated = computed(() => !!(selected.value && byName.get(selected.value)?.animation))

const selectedCategory = computed(() => selected.value && sections.value.find(c => c.groups.some(g => g.icons.some(i => i.name === selected.value)))?.id)

// 导出的 SVG：按当前圆角、字重、配色生成（见 export.js）
const toSvg = (icon, size = 24) => svgString(icon.paths, { stroke: weight.value.stroke, sharp: !!corner.value.sharp, colors: exportColors.value, size })
// 当前选中图标的导出文本：代码面板、复制、下载共用，不在每次重渲染时重新拼
const svgText = computed(() => selectedIcon.value && toSvg(selectedIcon.value))

const toast = ref('')
let toastTimer
function notify(text) {
  toast.value = text
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toast.value = ''), 1600)
}
// label：复制成功后提示文案的 key
async function copy(text, label) {
  try {
    await navigator.clipboard.writeText(text)
    notify(t(label))
  }
  catch {
    notify(t('ui.copyFailed'))
  }
}
function download(icon) {
  const url = URL.createObjectURL(new Blob([svgText.value], { type: 'image/svg+xml' }))
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
let headerHeight = 102
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

// 网格列数：auto-fill 排出来的实际列数，用来在每组最后一行补空格子，让没填满的行也画出完整的格线
// 所有网格同宽、同一个格子尺寸，读第一个就够；内容区宽度、图标大小、分类变化时重新读
const cols = ref(1)
const mainEl = ref(null)
let gridObserver
function measureCols() {
  resnapAll()
  const grid = mainEl.value?.querySelector('.grid')
  if (grid)
    cols.value = getComputedStyle(grid).gridTemplateColumns.split(' ').length || 1
}
const fillers = n => (cols.value - n % cols.value) % cols.value
watch([size, () => sections.value.map(c => c.id).join()], () => nextTick(measureCols))

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

// 页头固定两行（不随宽度在一行、两行之间跳变）；仍量出实际高度写进 --header-h，侧栏、详情栏、分类标签、锚点跳转都据此留位置
const header = ref(null)
let headerObserver

onMounted(() => {
  headerObserver = new ResizeObserver(([entry]) => {
    headerHeight = entry.target.offsetHeight
    document.documentElement.style.setProperty('--header-h', `${headerHeight}px`)
  })
  headerObserver.observe(header.value)
  window.addEventListener('keydown', onKey)
  window.addEventListener('pointerdown', closePalette)
  window.addEventListener('scroll', onScroll, { passive: true })
  collectSections()
  gridObserver = new ResizeObserver(measureCols)
  observeGrid(mainEl.value)
})
// 网格只在「图标」视图里存在：切到示例时 mainEl 变成 null，切回来是一个新元素——跟着它重新观察，
// 而不是只在挂载时观察一次（以示例视图打开页面时 mainEl 为 null，observe 会直接抛错）
function observeGrid(el) {
  if (!gridObserver)
    return
  gridObserver.disconnect()
  if (el) {
    gridObserver.observe(el)
    measureCols()
  }
}
watch(mainEl, observeGrid)
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('pointerdown', closePalette)
  window.removeEventListener('scroll', onScroll)
  headerObserver?.disconnect()
  gridObserver?.disconnect()
})
</script>

<template>
  <div class="shell">
    <!-- 页头固定两行：第一行 名字 | 搜索，第二行 视图切换 | 设置；左栏和侧栏同宽，中间那条竖线和下方侧栏的竖线连成一条 -->
    <header ref="header" class="top">
      <div class="brand">
        <!-- 标志就是库里的十面骰，跟着当前的圆角、字重一起变 -->
        <Icon class="mark" name="dice-d10" :size="20" />
        <span>Jannchie Icons</span>
        <span class="version mono">v{{ version }}</span>
      </div>
      <nav class="views">
        <button :aria-pressed="view === 'icons'" @click="view = 'icons'">{{ t('ui.viewIcons') }}</button>
        <button :aria-pressed="view === 'examples'" @click="view = 'examples'">{{ t('ui.viewExamples') }}</button>
      </nav>
      <!-- 示例视图里搜索框只是藏起来（占位还在）：第一行底下的分隔线挂在它身上，整个隐藏会让那段线消失 -->
      <label class="search" :class="{ concealed: view !== 'icons' }" :aria-hidden="view !== 'icons'">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
            <path v-for="p in searchPaths" :key="p.d" :d="p.d" />
          </svg>
          <input ref="searchInput" v-model="query" type="search" :placeholder="t('ui.search')" @keydown.esc="clearSearch">
          <kbd v-if="!query">/</kbd>
          <template v-else>
            <small class="mono">{{ matched }}</small>
            <button class="clear" :title="t('ui.clearSearch')" :aria-label="t('ui.clearSearch')" @click.prevent="clearSearch">
              <Icon name="x" :size="14" />
            </button>
          </template>
      </label>
      <div class="opts" @scroll="paletteOpen = false">
        <div class="opt" role="group" :aria-label="t('ui.corner')">
          <button v-for="c in corners" :key="c.label" :aria-pressed="corner === c" @click="corner = c">{{ cornerLabel(c) }}</button>
        </div>
        <div class="opt" role="group" :aria-label="t('ui.weight')">
          <button v-for="w in weights" :key="w.id" :aria-pressed="weight === w" @click="weight = w">{{ t(`ui.${w.id}`) }}</button>
        </div>
        <div class="opt" role="group" :aria-label="t('ui.size')">
          <input
            v-model.number="size" class="slider" type="range" :min="SIZE.min" :max="SIZE.max" :step="SIZE.step" :aria-label="t('ui.size')"
            :style="{ '--p': `${(size - SIZE.min) / (SIZE.max - SIZE.min) * 100}%` }"
          >
          <output class="size-value mono">{{ size }}</output>
        </div>
        <div class="opt" role="group" :aria-label="t('ui.color')">
          <button :aria-pressed="!duo" @click="duo = false">{{ t('ui.mono') }}</button>
          <button :aria-pressed="duo" @click="duo = true">{{ t('ui.duo') }}</button>
          <!-- 双色时一个调色盘按钮：几个小圆点预览当前配色，点开面板逐个设置（色块 + 角色名） -->
          <div v-if="duo" ref="paletteEl" class="palette">
            <button class="palette-toggle" :aria-expanded="paletteOpen" :title="t('ui.colors')" @click="togglePalette">
              <i v-for="(color, role) in roleColors" :key="role" :style="{ background: color }" />
            </button>
            <div v-if="paletteOpen" class="palette-panel" :style="panelPos">
              <label class="palette-row">
                <span class="swatch" :class="{ follow: !primary }"><input v-model="primary" type="color"></span>
                <span>{{ t('ui.primary') }}</span>
              </label>
              <label v-for="(color, role) in roleColors" :key="role" class="palette-row">
                <span class="swatch" :style="{ '--c': color }"><input :value="color" type="color" @input="setRole(role, $event.target.value)"></span>
                <span>{{ t(`ui.role.${role}`) }}</span>
              </label>
              <button class="palette-reset" :disabled="!customized" @click="resetColors">{{ t('ui.resetColors') }}</button>
            </div>
          </div>
        </div>
        <div class="opt">
          <!-- 主题：一个按钮在 自动 → 亮 → 暗 之间循环，图标用库里的 theme / sun / moon -->
          <button class="icon-btn" :title="t(`ui.${themes.find(th => th.id === theme).label}`)" :aria-label="t(`ui.${themes.find(th => th.id === theme).label}`)" @click="cycleTheme">
            <Icon :name="themes.find(th => th.id === theme).icon" :size="16" />
          </button>
        </div>
        <div class="opt" role="group" :aria-label="t('ui.language')">
          <button v-for="l in LOCALES" :key="l.id" :aria-pressed="lang === l.id" @click="lang = l.id">{{ l.label }}</button>
        </div>
        <div class="opt">
          <a class="repo" href="https://github.com/Jannchie/jannchie-icons" target="_blank" rel="noopener"><Icon name="github" :size="16" />{{ t('ui.github') }}</a>
        </div>
      </div>
    </header>

    <main v-if="view === 'examples'" class="examples-main">
      <Examples />
    </main>
    <div v-else class="layout">
      <aside ref="sidebar" class="sidebar">
        <div class="side-head">
          <p class="label">{{ t('ui.categories') }} · {{ sideSections.length }}</p>
          <input v-model="catFilter" class="cat-filter" type="search" :placeholder="t('ui.filterCategories')" :aria-label="t('ui.filterCategories')" @keydown.esc="catFilter = ''">
        </div>
        <a v-for="c in sideSections" :key="c.id" :href="`#${c.id}`" :class="{ active: active === c.id }">
          <Icon v-if="categoryIcon(c.id)" :name="categoryIcon(c.id)" :size="16" class="cat-icon" />
          <span>{{ t(`cat.${c.id}`) }}</span><small class="mono">{{ c.count }}</small>
        </a>
      </aside>

      <main ref="mainEl" :style="{ '--size': `${size}px` }">
        <!-- 窄屏没有侧栏：分类改成可横向滚动的标签 -->
        <nav class="pills">
          <a v-for="c in sections" :key="c.id" :href="`#${c.id}`" :class="{ active: active === c.id }">
            <Icon v-if="categoryIcon(c.id)" :name="categoryIcon(c.id)" :size="14" class="cat-icon" />{{ t(`cat.${c.id}`) }}<small class="mono">{{ c.count }}</small>
          </a>
        </nav>

        <section v-for="c in sections" :id="c.id" :key="c.id" class="category">
          <h2 class="category-head">{{ t(`cat.${c.id}`) }}<small class="mono">{{ c.count }}</small></h2>
          <template v-for="g in c.groups" :key="g.key">
            <p v-if="g.key" class="group label">{{ t(`group.${g.key}`) }} · {{ g.icons.length }}</p>
            <div class="grid">
              <button
                v-for="icon in g.icons"
                :key="icon.name"
                class="cell"
                :class="{ selected: selected === icon.name }"
                :data-name="icon.name"
                :title="icon.name"
                @click="selected = selected === icon.name ? null : icon.name"
              >
                <LazyIcon :icon="icon" :corner="corner" :weight="weight" :px="devicePx(size)" />
                <span class="name">{{ icon.name }}</span>
              </button>
              <div v-for="i in fillers(g.icons.length)" :key="`fill-${i}`" class="cell filler" aria-hidden="true" />
            </div>
          </template>
        </section>
        <p v-if="!sections.length" class="empty">{{ t('ui.empty', { q: query }) }}</p>
      </main>

      <!-- 详情：常驻的第三列。打开、切换只换列里的内容，网格既不重排也不会被挡住；没选中时显示空状态 -->
      <aside v-if="selectedIcon" class="detail">
        <div class="detail-head">
          <div>
            <p class="label">{{ t(`cat.${selectedCategory}`) }}<template v-if="selectedAnimated"> · {{ t('ui.animated') }}</template></p>
            <h3 class="mono">{{ selectedIcon.name }}</h3>
          </div>
          <button class="close" :aria-label="t('ui.close')" @click="selected = null">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M7 7L17 17M17 7L7 17" /></svg>
          </button>
        </div>
        <div class="hero">
          <!-- 辅助线（在图标下面）：中线与对角线、常用外形的参考框（大圆、正方形、竖横长方形、内圈）、离边 2 的安全边距、
               四个角上的角标区（圆心对准系列角标：右下 (18, 17) 同文件夹，右上 (18, 7) 同对话框、日历，左边两个镜像；
               半径 5 盖住角标符号和它让出的空隙）；整体以画布中心左右对称；比背景网格明显，1px 不随预览放大变粗 -->
          <svg class="guides" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0V24M0 12H24M0 0L24 24M24 0L0 24" />
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <rect x="2" y="2" width="20" height="20" />
            <circle cx="6" cy="7" r="5" />
            <circle cx="18" cy="7" r="5" />
            <circle cx="6" cy="17" r="5" />
            <circle cx="18" cy="17" r="5" />
          </svg>
          <IconSvg :paths="selectedIcon.paths" :stroke="weight.stroke" :sharp="!!corner.sharp" />
        </div>
        <div class="scales">
          <div v-for="px in [16, 20, 24, 32, 48]" :key="px">
            <Icon :name="selectedIcon.name" :size="px" />
            <small class="mono">{{ px }}</small>
          </div>
        </div>
        <div class="actions">
          <button @click="copy(selectedIcon.name, 'ui.copiedName')">{{ t('ui.copyName') }}</button>
          <button @click="copy(svgText, 'ui.copiedSvg')">{{ t('ui.copySvg') }}</button>
          <button @click="download(selectedIcon)">{{ t('ui.download') }}</button>
        </div>
        <section v-if="related" class="related">
          <p class="label">{{ t(`ui.${related.kind}`) }} · {{ related.icons.length + related.more }}</p>
          <div class="related-grid">
            <button
              v-for="i in related.icons" :key="i.name" :class="{ current: i.name === selected }" :title="i.name" :aria-label="i.name"
              @click="selected = i.name"
            >
              <Icon :name="i.name" :size="20" />
            </button>
            <span v-if="related.more" class="more mono">+{{ related.more }}</span>
          </div>
        </section>
        <section class="styles">
          <p class="label">{{ t('ui.styles') }}</p>
          <div class="style-grid" :style="{ '--cols': corners.length }">
            <span />
            <small v-for="c in corners" :key="c.label" class="mono">{{ cornerLabel(c) }}</small>
            <template v-for="row in styleGrid" :key="row.w.id">
              <small class="mono row-head">{{ t(`ui.${row.w.id}`) }}</small>
              <button
                v-for="cell in row.cells" :key="cell.c.label" :class="{ current: cell.c === corner && row.w === weight }"
                :aria-label="`${cornerLabel(cell.c)} · ${t(`ui.${row.w.id}`)}`" @click="corner = cell.c; weight = row.w"
              >
                <IconSvg :paths="cell.paths" :stroke="row.w.stroke" :sharp="!!cell.c.sharp" snap style="width: 24px; height: 24px" />
              </button>
            </template>
          </div>
        </section>
      </aside>
      <aside v-else class="detail empty-detail">
        <div class="hero placeholder">
          <p v-html="t('ui.placeholder')" />
        </div>
        <dl class="keys">
          <div><dt><kbd>/</kbd></dt><dd>{{ t('ui.keySearch') }}</dd></div>
          <div><dt><kbd>Esc</kbd></dt><dd>{{ t('ui.keyEsc') }}</dd></div>
        </dl>
      </aside>
    </div>
  </div>

    <div v-if="toast" class="toast">{{ toast }}</div>
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
  --header-h: 102px;
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
/* 页面滚动条：两侧都预留滚动条宽度，滚动条出现、消失时内容不左右跳，居中的版面也保持左右对称；
   只在桌面（宽屏 + 鼠标）这样做——手机上没有常驻滚动条，预留出来的只是两条白边 */
@media (min-width: 761px) and (pointer: fine) { html { scrollbar-gutter: stable both-edges; } }
body { margin: 0; background: var(--bg); color: var(--text); font: 14px/1.6 var(--sans); -webkit-font-smoothing: antialiased; }
button { font: inherit; color: inherit; }
small { color: var(--muted); }
.mono { font-family: var(--mono); }
.label { margin: 0; font: 12px/1.4 var(--mono); letter-spacing: .06em; text-transform: uppercase; color: var(--muted); }

/* 内部滚动条：细、圆角、颜色跟随主题 */
.sidebar, .detail { scrollbar-width: thin; scrollbar-color: var(--line-strong) transparent; }
.sidebar::-webkit-scrollbar, .detail::-webkit-scrollbar { width: 8px; height: 8px; }
.sidebar::-webkit-scrollbar-track, .detail::-webkit-scrollbar-track { background: transparent; }
.sidebar::-webkit-scrollbar-thumb, .detail::-webkit-scrollbar-thumb {
  border: 2px solid transparent; border-radius: 999px; background: var(--line-strong); background-clip: padding-box;
}
.sidebar::-webkit-scrollbar-thumb:hover, .detail::-webkit-scrollbar-thumb:hover { background-color: var(--muted); }
.sidebar::-webkit-scrollbar-button, .detail::-webkit-scrollbar-button { display: none; }

/* 线框（参考 voidzero.dev）：内容收在居中的容器里，左右两条竖线贯穿整页；每根线只画一次 */
.shell { max-width: 1680px; min-height: 100vh; margin: 0 auto; border-inline: 1px solid var(--line); background: var(--surface); }

/* 页头固定两行：名字 | 搜索、视图切换 | 设置；左栏和侧栏同宽，中间那条竖线和侧栏的竖线连成一条 */
/* 第一行高 57：减去 1px 分隔线，内容区是偶数 56，20px 的标志居中后正好落在整数像素上（奇数高度只能偏半像素或发虚）；第二行 44 */
.top {
  position: sticky; top: 0; z-index: 3; display: grid; grid-template-columns: var(--side) minmax(0, 1fr); grid-template-rows: 57px 44px;
  grid-template-areas: 'brand search' 'views opts'; border-bottom: 1px solid var(--line);
  background: color-mix(in srgb, var(--surface) 85%, transparent); backdrop-filter: blur(14px) saturate(1.4);
}
.brand { grid-area: brand; display: flex; align-items: center; gap: 10px; padding: 0 20px; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); font-weight: 600; letter-spacing: -.01em; white-space: nowrap; }
.brand .version { color: var(--muted); font-size: 12px; font-weight: 400; }
/* 双色变体的 primary（未设置时就是继承的文字颜色） */
.ji { color: var(--icon-primary, currentColor); }
.mark { width: 20px; height: 20px; flex: none; color: var(--accent); }
/* 设置一行放不下时横向滑动，不换行 */
.opts { grid-area: opts; display: flex; align-items: stretch; min-width: 0; overflow-x: auto; scrollbar-width: none; }
.opts::-webkit-scrollbar { display: none; }
.opts .opt:first-child { border-left: 0; }
/* 视图切换：图标 / 示例，和设置按钮同一套选中样式 */
.views { grid-area: views; display: flex; align-items: center; gap: 2px; padding: 0 12px; border-right: 1px solid var(--line); }
.views button {
  height: 28px; padding: 0 10px; border: 0; border-radius: 6px; background: none; cursor: pointer;
  font-size: 13px; color: var(--text-2);
}
.views button:hover { color: var(--text); }
.views button[aria-pressed='true'] { color: var(--text); background: var(--sunken); box-shadow: inset 0 0 0 1px var(--line-strong); }
.examples-main { padding-bottom: 0; }
.search { grid-area: search; display: flex; align-items: center; gap: 10px; min-width: 0; padding: 0 20px; border-bottom: 1px solid var(--line); cursor: text; }
.search.concealed > * { visibility: hidden; }
.search.concealed { pointer-events: none; }
.search svg { width: 16px; height: 16px; flex: none; color: var(--muted); }
.search input { flex: 1; min-width: 0; border: 0; outline: 0; background: none; color: inherit; font: inherit; }
.search input::placeholder { color: var(--muted); }
.search input::-webkit-search-cancel-button { display: none; }
.search .clear { display: grid; place-items: center; width: 24px; height: 24px; padding: 0; border: 0; border-radius: 6px; background: none; color: var(--muted); cursor: pointer; }
.search .clear:hover { color: var(--text); background: var(--sunken); }
kbd { font: 12px var(--mono); color: var(--muted); padding: 1px 6px; border: 1px solid var(--line-strong); border-radius: 4px; }
.opt { display: flex; align-items: center; gap: 2px; padding: 0 12px; border-left: 1px solid var(--line); white-space: nowrap; }
.opt button {
  height: 26px; min-width: 26px; padding: 0 7px; border: 0; border-radius: 6px; background: none; cursor: pointer;
  font: 12.5px var(--mono); color: var(--text-2);
}
.opt button:hover { color: var(--text); }
/* 大小滑块：一条细轨道，已选部分用正文色；把手是一个实心小圆点，不描边、不放大 */
.slider { width: 112px; height: 26px; margin: 0 4px; padding: 0; background: none; cursor: pointer; -webkit-appearance: none; appearance: none; }
.slider:focus-visible { outline: none; }
.slider::-webkit-slider-runnable-track { height: 2px; border-radius: 1px; background: linear-gradient(var(--text), var(--text)) 0 / var(--p) 100% no-repeat, var(--line-strong); }
.slider::-moz-range-track { height: 2px; border-radius: 1px; background: var(--line-strong); }
.slider::-moz-range-progress { height: 2px; border-radius: 1px; background: var(--text); }
.slider::-webkit-slider-thumb { width: 10px; height: 10px; margin-top: -4px; border: 0; border-radius: 50%; background: var(--text); -webkit-appearance: none; appearance: none; }
.slider::-moz-range-thumb { width: 10px; height: 10px; border: 0; border-radius: 50%; background: var(--text); }
.slider:focus-visible::-webkit-slider-thumb { outline: 2px solid var(--accent-soft); outline-offset: 2px; }
.slider:focus-visible::-moz-range-thumb { outline: 2px solid var(--accent-soft); outline-offset: 2px; }
/* 数值定宽，拖动时后面的控件不跟着跳 */
/* 调色盘：按钮里一排小圆点预览配色；面板逐行「色块 + 角色名」 */
.palette { position: relative; display: flex; align-items: center; }
.palette-toggle { display: flex !important; align-items: center; gap: 2px; padding: 0 6px !important; }
.palette-toggle i { width: 8px; height: 8px; border-radius: 50%; }
.palette-panel {
  position: fixed; z-index: 6; display: flex; flex-direction: column; gap: 2px; width: 240px; padding: 8px;
  border: 1px solid var(--line-strong); border-radius: 10px; background: var(--surface); box-shadow: 0 12px 32px rgb(0 0 0 / .18);
}
.palette-row { display: flex; align-items: center; gap: 10px; padding: 6px 8px; border-radius: 6px; font-size: 13px; color: var(--text-2); cursor: pointer; white-space: nowrap; }
.palette-row:hover { background: var(--sunken); color: var(--text); }
.palette-reset { margin-top: 4px; height: 30px; border: 1px solid var(--line-strong) !important; border-radius: 6px; font: 12.5px var(--sans) !important; }
.palette-reset:disabled { opacity: .4; cursor: default; }
/* 取色：圆形色块里藏一个原生取色器；primary 跟随文字颜色时画成半边文字色 */
.swatch { position: relative; flex: none; width: 16px; height: 16px; border-radius: 50%; box-shadow: inset 0 0 0 1px var(--line-strong); background: var(--c, var(--icon-primary, var(--text))); cursor: pointer; overflow: hidden; }
.swatch.follow { background: linear-gradient(135deg, var(--text) 50%, transparent 50%); }
.swatch input { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; }
.icon-btn { display: grid !important; place-items: center; width: 28px; padding: 0 !important; }
.size-value { width: 3ch; font-size: 12.5px; color: var(--text-2); text-align: right; }
.opt button[aria-pressed='true'] { color: var(--text); background: var(--sunken); box-shadow: inset 0 0 0 1px var(--line-strong); }

/* 主体：侧栏 | 内容 | 详情（常驻） */
.layout { display: grid; grid-template-columns: var(--side) minmax(0, 1fr) var(--detail); }
.sidebar {
  position: sticky; top: var(--header-h); align-self: start; height: calc(100vh - var(--header-h));
  overflow-y: auto; padding: 20px 10px 40px; border-right: 1px solid var(--line);
}
.sidebar .label { padding: 0 10px 10px; }
/* 侧栏标题和筛选框：钉在侧栏顶部，列表在下面滚（侧栏 padding-top 20，往上抵掉） */
.side-head { position: sticky; top: -20px; z-index: 1; margin: -20px -10px 0; padding: 20px 10px 0; background: var(--surface); }
/* 侧栏的分类筛选框 */
.cat-filter {
  display: block; width: 100%; height: 30px; margin: 0 0 10px; padding: 0 10px; border: 1px solid var(--line-strong); border-radius: 6px;
  background: none; color: inherit; font: 13px var(--sans); outline: 0;
}
.cat-filter:focus { border-color: var(--accent); }
.cat-filter::placeholder { color: var(--muted); }
.cat-filter::-webkit-search-cancel-button { display: none; }
.sidebar a {
  display: flex; align-items: center; gap: 8px; padding: 5px 10px; border-radius: 6px;
  color: var(--text-2); text-decoration: none; font-size: 13.5px; white-space: nowrap;
}
/* 分类的代表图标（见 category-icons.js）：比文字淡一档，悬停、当前分类时跟着文字一起变亮 */
.cat-icon { color: var(--muted); }
.sidebar a:hover .cat-icon, .sidebar a.active .cat-icon, .pills a.active .cat-icon { color: currentColor; }
.sidebar a span { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; }
.sidebar a small { font-size: 12px; }
.sidebar a:hover { color: var(--text); background: var(--sunken); }
.sidebar a.active { color: var(--text); background: var(--sunken); }
.sidebar a.active small { color: var(--accent); }

main { min-width: 0; padding-bottom: 80px; }
.pills { display: none; }

/* 分类区块：不用 content-visibility——未渲染的区块按估计高度占位，点侧栏跳转后实际高度一出来，内容会整体挪动；
   图标本身已经懒加载（LazyIcon），排版开销不大 */
.category { border-bottom: 1px solid var(--line); scroll-margin-top: var(--header-h); }
/* 锚点、选中格子滚动的避让只加在内容上，不用 html 的 scroll-padding-top：页头是 sticky 的，
   整页留白会让浏览器以为页头里的搜索框被页头挡住，一聚焦就把页面往回滚 */
.cell { scroll-margin-top: var(--header-h); }
.category-head { display: flex; align-items: baseline; gap: 10px; margin: 0; padding: 28px 32px 14px; font-size: 18px; line-height: 1.3; letter-spacing: -.01em; font-weight: 600; }
.category-head small { font-size: 13px; font-weight: 400; }
/* 小标题上方画一条整行的分割线；上移 1px 盖住上一组网格最后一行格子的下边线，避免叠成双线 */
.group { position: relative; margin-top: -1px; padding: 12px 32px; border-top: 1px solid var(--line); }
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
  background: none; color: var(--text); cursor: pointer;
}
.cell:hover { background: var(--sunken); }
.cell.filler { cursor: default; }
.cell.filler:hover { background: none; }
/* 选中：强调色淡底 + 一圈 2px 强调色内描边（只有淡底时和悬停的灰底差不多，不够醒目） */
.cell.selected { background: var(--accent-soft); color: var(--accent); box-shadow: inset 0 0 0 2px var(--accent); }
.cell .name {
  position: absolute; left: 0; right: 0; bottom: 8px; padding: 0 6px; text-align: center;
  font: 11.5px var(--mono); color: var(--text-2); opacity: 0;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.cell:hover .name, .cell.selected .name { opacity: 1; }
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
/* 辅助线和图标叠在同一格里：辅助线在下，用 40% 的次要文字色，比背景网格明显、又不抢图标 */
.hero:not(.placeholder) > * { grid-area: 1 / 1; }
.guides { fill: none; stroke: color-mix(in srgb, var(--muted) 40%, transparent); stroke-width: 1; vector-effect: non-scaling-stroke; }
.guides * { vector-effect: non-scaling-stroke; }
.scales { display: grid; grid-template-columns: repeat(5, 1fr); }
.scales div { display: flex; flex-direction: column; align-items: center; justify-content: flex-end; gap: 8px; padding: 16px 0 12px; border-right: 1px solid var(--line); }
.scales div:last-child { border-right: 0; }
.scales small { font-size: 12px; }
.actions { display: grid; grid-template-columns: repeat(3, 1fr); }
.actions button {
  height: 44px; border: 0; border-right: 1px solid var(--line); background: none; cursor: pointer;
  font-size: 13px; color: var(--text-2);
}
.actions button:last-child { border-right: 0; }
.actions button:hover { color: var(--text); background: var(--sunken); }
/* 变体 / 同组图标：小格子平铺，当前这个描一圈强调色 */
.related, .styles { display: flex; flex-direction: column; gap: 10px; padding: 16px 20px; }
.related-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(36px, 1fr)); gap: 2px; }
.related-grid button, .style-grid button {
  display: grid; place-items: center; aspect-ratio: 1; padding: 0; border: 0; border-radius: 6px; background: none; color: var(--text); cursor: pointer;
}
.related-grid button:hover, .style-grid button:hover { background: var(--sunken); }
.related-grid button.current, .style-grid button.current { background: var(--accent-soft); color: var(--accent); box-shadow: inset 0 0 0 1.5px var(--accent); }
.related-grid .more { align-self: center; font-size: 12px; color: var(--muted); text-align: center; }
/* 圆角 × 字重：第一列是字重名，第一行是圆角名 */
.style-grid { display: grid; grid-template-columns: auto repeat(var(--cols), minmax(0, 1fr)); gap: 2px; align-items: center; }
.style-grid small { font-size: 11px; text-align: center; }
.style-grid button { aspect-ratio: auto; height: 40px; }
.style-grid .row-head { padding-right: 8px; text-align: left; }
/* 页头的 GitHub 链接 */
.repo { display: inline-flex; align-items: center; gap: 6px; height: 26px; padding: 0 7px; border-radius: 6px; font: 12.5px var(--mono); color: var(--text-2); text-decoration: none; }
.repo:hover { color: var(--text); background: var(--sunken); }

.toast {
  position: fixed; left: 50%; bottom: 28px; z-index: 5; transform: translateX(-50%);
  padding: 8px 14px; border-radius: 8px; background: var(--text); color: var(--bg); font-size: 13px;
  box-shadow: 0 8px 24px rgb(0 0 0 / .2);
}

/* 中屏：详情栏放不下第三列，改成从右下浮起 */
@media (max-width: 1180px) {
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
  .top { grid-template-columns: auto minmax(0, 1fr); grid-template-rows: 49px 44px; }
  .views { padding: 0 6px; }
  .views button { padding: 0 8px; }
  .brand { padding: 0 14px; }
  .brand span { display: none; }
  .search { padding: 0 14px; }
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
    flex: none; display: inline-flex; gap: 6px; align-items: center; padding: 4px 11px;
    border: 1px solid var(--line-strong); border-radius: 999px; color: var(--text-2); text-decoration: none; font-size: 13px;
  }
  .pills a.active { color: var(--text); border-color: var(--accent); background: var(--accent-soft); }
  .category { scroll-margin-top: calc(var(--header-h) + 50px); }
  .category-head { padding: 22px 14px 12px; font-size: 16px; }
  .group { padding: 10px 14px; }
  .grid { grid-template-columns: repeat(auto-fill, minmax(max(76px, calc(var(--size) * 2)), 1fr)); }
  /* 输入框字号至少 16px：iOS Safari 聚焦字号更小的输入框时会自动放大整页 */
  .search input, .cat-filter { font-size: 16px; }
  /* 触屏：设置按钮、视图切换的点按区域加高 */
  .opt button, .views button, .repo { height: 32px; }
  .detail {
    left: 0; right: 0; bottom: 0; width: auto; max-height: 72vh; border-radius: 16px 16px 0 0; border-width: 1px 0 0;
    padding-bottom: env(safe-area-inset-bottom);
  }
  /* 底部面板顶上一道把手，提示这是一张可以关掉的卡片 */
  .detail::before { content: ''; position: sticky; top: 0; z-index: 1; flex: none; align-self: center; width: 36px; height: 4px; margin: 8px 0 -12px; border-radius: 2px; background: var(--line-strong); border: 0; }
  .detail-head { padding: 16px 16px 12px; }
  .related, .styles { padding: 14px 16px; }
  /* 预览区比宽度矮：图标方块按高度居中，背景网格跟着这个方块对齐（格子边长 = 方块边长 / 24；横向按 50% 对齐时格线落在中线左右半格，再挪半格让格线压在中线上） */
  .hero { --box: calc(34vh - 40px); padding: 20px; aspect-ratio: auto; height: 34vh; background-size: calc(var(--box) / 24) calc(var(--box) / 24); background-position: calc(50% + var(--box) / 48) 20px; }
  .hero svg { width: auto; height: 100%; aspect-ratio: 1; }
}
</style>
