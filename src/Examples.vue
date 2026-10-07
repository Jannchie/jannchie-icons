<script setup>
// 示例页：用图标拼出常见界面组件，跟随页头的圆角、字重、像素对齐实时变化
// 组件里的示例数据（文件名、歌名等）是演示用的固定英文内容
import { ref } from 'vue'
import Icon from './Icon.vue'

const nav = [
  { icon: 'home', label: 'Home' },
  { icon: 'inbox', label: 'Inbox', count: 12 },
  { icon: 'calendar', label: 'Calendar' },
  { icon: 'layers', label: 'Projects' },
  { icon: 'users', label: 'Team' },
  { icon: 'chart-bar', label: 'Reports' },
]
const activeNav = ref('Inbox')

const marks = ref({ bold: true, italic: false, underline: false, strikethrough: false })
const alignment = ref('align-left')

const files = [
  { icon: 'folder', name: 'Assets', meta: '24 items' },
  { icon: 'file-type-pdf', name: 'Brand Guidelines.pdf', meta: '4.2 MB' },
  { icon: 'file-type-png', name: 'Hero Image.png', meta: '1.8 MB' },
  { icon: 'file-type-xls', name: 'Q3 Budget.xls', meta: '86 KB' },
  { icon: 'file-type-mp4', name: 'Launch Teaser.mp4', meta: '38 MB' },
  { icon: 'file-type-zip', name: 'Icons Export.zip', meta: '640 KB' },
]

const playing = ref(true)
const liked = ref(true)

const toasts = [
  { icon: 'check-circle', tone: 'ok', title: 'Changes saved', body: 'Your profile has been updated.' },
  { icon: 'alert-triangle', tone: 'warn', title: 'Storage almost full', body: '92% of 15 GB used.' },
  { icon: 'alert-circle', tone: 'err', title: 'Upload failed', body: 'Hero Image.png exceeds 1 MB.' },
  { icon: 'info', tone: 'info', title: 'New version available', body: 'Reload to update to 2.4.0.' },
]

const forecast = [
  { day: 'Mon', icon: 'sun', hi: 24, lo: 16 },
  { day: 'Tue', icon: 'cloud', hi: 22, lo: 15 },
  { day: 'Wed', icon: 'cloud-rain', hi: 19, lo: 14 },
  { day: 'Thu', icon: 'cloud-lightning', hi: 18, lo: 13 },
  { day: 'Fri', icon: 'fog', hi: 21, lo: 14 },
]

const care = ['laundry-wash-30', 'laundry-bleach-off', 'laundry-tumble-dry-off', 'laundry-iron-low', 'laundry-dry-clean-p']
const ratings = ['rating-esrb-t', 'rating-pegi-12', 'rating-cero-b']
const settings = ref([
  { icon: 'bell', label: 'Notifications', on: true },
  { icon: 'moon', label: 'Dark mode', on: false },
  { icon: 'wifi', label: 'Sync over Wi-Fi only', on: true },
])
const links = [
  { icon: 'globe', label: 'Language', value: 'English' },
  { icon: 'lock', label: 'Privacy', value: '', arrow: true },
]

const stats = [
  { icon: 'user-plus', label: 'Visitors', value: '12.4k', delta: '+8.2%', up: true },
  { icon: 'shopping-bag', label: 'Orders', value: '1,284', delta: '+3.1%', up: true },
  { icon: 'wallet', label: 'Revenue', value: '¥3.2M', delta: '-1.4%', up: false },
  { icon: 'eye', label: 'Page views', value: '48.9k', delta: '+12%', up: true },
]

const checks = [
  { icon: 'shield-check', tone: 'ok', label: 'build' },
  { icon: 'check-square', tone: 'ok', label: 'lint' },
  { icon: 'loader', tone: 'muted', label: 'e2e' },
]
</script>

<template>
  <div class="examples">
    <!-- 侧边导航 -->
    <section class="ex">
      <div class="ex-nav panel">
        <div class="ex-nav-head">
          <span class="ex-logo"><Icon name="layout-grid-plus" :size="18" /></span>
          <strong>Workspace</strong>
          <Icon class="ex-dim" name="chevrons-up-down" :size="16" />
        </div>
        <button v-for="n in nav" :key="n.label" class="ex-nav-item" :class="{ on: activeNav === n.label }" @click="activeNav = n.label">
          <Icon :name="n.icon" :size="18" />
          <span>{{ n.label }}</span>
          <small v-if="n.count" class="ex-count">{{ n.count }}</small>
        </button>
        <div class="ex-nav-foot">
          <button class="ex-nav-item"><Icon name="settings" :size="18" /><span>Settings</span></button>
          <button class="ex-nav-item"><Icon name="logout" :size="18" /><span>Sign out</span></button>
        </div>
      </div>
    </section>

    <!-- 编辑器工具条 -->
    <section class="ex">
      <div class="panel">
        <div class="ex-toolbar">
          <button class="ex-tool"><Icon name="undo" :size="18" /></button>
          <button class="ex-tool"><Icon name="redo" :size="18" /></button>
          <i class="ex-sep" />
          <button v-for="(on, m) in marks" :key="m" class="ex-tool" :class="{ on }" @click="marks[m] = !on"><Icon :name="m" :size="18" /></button>
          <i class="ex-sep" />
          <button v-for="a in ['align-left', 'align-center', 'align-right']" :key="a" class="ex-tool" :class="{ on: alignment === a }" @click="alignment = a">
            <Icon :name="a" :size="18" />
          </button>
          <i class="ex-sep" />
          <button class="ex-tool"><Icon name="link" :size="18" /></button>
          <button class="ex-tool"><Icon name="image" :size="18" /></button>
          <button class="ex-tool"><Icon name="code-block" :size="18" /></button>
        </div>
        <div class="ex-doc" :style="{ textAlign: alignment.slice(6) }">
          <h4>Release notes</h4>
          <p :class="marks">
            Icons now redraw for every corner radius and stroke weight, so details stay balanced from 16 to 128 pixels.
          </p>
        </div>
      </div>
    </section>

    <!-- 文件列表 -->
    <section class="ex">
      <div class="panel">
        <div class="ex-crumbs">
          <Icon name="folder-open" :size="16" /><span>Drive</span>
          <span class="ex-dim">/</span><span>Marketing</span>
          <span class="ex-dim">/</span><strong>Launch</strong>
          <span class="ex-grow" />
          <button class="ex-tool"><Icon name="search" :size="16" /></button>
          <button class="ex-tool"><Icon name="upload" :size="16" /></button>
        </div>
        <div v-for="f in files" :key="f.name" class="ex-file">
          <Icon :name="f.icon" :size="20" />
          <span class="ex-grow">{{ f.name }}</span>
          <small class="ex-dim mono">{{ f.meta }}</small>
          <button class="ex-tool"><Icon name="dots-vertical" :size="16" /></button>
        </div>
      </div>
    </section>

    <!-- 播放器 -->
    <section class="ex">
      <div class="panel ex-player">
        <div class="ex-cover"><Icon name="notation-beamed-eighth-notes" :size="40" /></div>
        <div class="ex-track">
          <div>
            <strong>Midnight Lines</strong>
            <small>Vector Ensemble</small>
          </div>
          <button class="ex-tool" :class="{ on: liked }" @click="liked = !liked"><Icon name="heart" :size="18" /></button>
        </div>
        <div class="ex-progress"><i style="width: 38%" /></div>
        <div class="ex-times mono"><small>1:24</small><small>3:41</small></div>
        <div class="ex-controls">
          <button class="ex-tool"><Icon name="shuffle" :size="18" /></button>
          <button class="ex-tool"><Icon name="skip-back" :size="20" /></button>
          <button class="ex-play" @click="playing = !playing"><Icon :name="playing ? 'pause' : 'play'" :size="22" /></button>
          <button class="ex-tool"><Icon name="skip-forward" :size="20" /></button>
          <button class="ex-tool"><Icon name="repeat" :size="18" /></button>
        </div>
      </div>
    </section>

    <!-- 通知 -->
    <section class="ex">
      <div class="ex-stack">
        <div v-for="n in toasts" :key="n.title" class="panel ex-toast">
          <Icon :class="`tone-${n.tone}`" :name="n.icon" :size="20" />
          <div class="ex-grow">
            <strong>{{ n.title }}</strong>
            <small>{{ n.body }}</small>
          </div>
          <button class="ex-tool"><Icon name="x" :size="16" /></button>
        </div>
      </div>
    </section>

    <!-- 聊天 -->
    <section class="ex">
      <div class="panel ex-chat">
        <div class="ex-msg">Can you send the final icon set?</div>
        <div class="ex-msg me">Exported at radius 2, regular weight. <Icon name="check-double" :size="14" /></div>
        <div class="ex-attach"><Icon name="archive" :size="20" /><span class="ex-grow">Icons Export.zip</span><Icon name="cloud-download" :size="16" /></div>
        <div class="ex-input">
          <button class="ex-tool"><Icon name="plus-circle" :size="18" /></button>
          <span class="ex-grow ex-dim">Write a message…</span>
          <button class="ex-tool"><Icon name="smile" :size="18" /></button>
          <button class="ex-tool"><Icon name="paperclip-diagonal" :size="18" /></button>
          <button class="ex-send"><Icon name="send" :size="16" /></button>
        </div>
      </div>
    </section>

    <!-- 天气 -->
    <section class="ex">
      <div class="panel ex-weather">
        <div class="ex-now">
          <Icon name="cloud-sun" :size="48" />
          <div>
            <strong class="ex-temp">23°</strong>
            <small><Icon name="map-pin" :size="14" /> Tokyo · Partly cloudy</small>
          </div>
        </div>
        <div class="ex-stats">
          <span><Icon name="wind" :size="16" />4 m/s</span>
          <span><Icon name="droplet" :size="16" />62%</span>
          <span><Icon name="umbrella" :size="16" />20%</span>
        </div>
        <div class="ex-days">
          <div v-for="d in forecast" :key="d.day">
            <small>{{ d.day }}</small>
            <Icon :name="d.icon" :size="24" />
            <small class="mono">{{ d.hi }}° <span class="ex-dim">{{ d.lo }}°</span></small>
          </div>
        </div>
      </div>
    </section>

    <!-- 商品页：洗涤标志 -->
    <section class="ex">
      <div class="panel ex-product">
        <div class="ex-product-head">
          <div>
            <strong>Merino Crew Sweater</strong>
            <small>100% merino wool · Made in Portugal</small>
          </div>
          <strong class="mono">¥12,800</strong>
        </div>
        <div class="ex-care">
          <Icon v-for="c in care" :key="c" :name="c" :size="28" />
        </div>
        <div class="ex-actions">
          <button class="ex-btn primary"><Icon name="cart" :size="18" />Add to cart</button>
          <button class="ex-btn"><Icon name="star" :size="18" /></button>
          <button class="ex-btn"><Icon name="share" :size="18" /></button>
        </div>
      </div>
    </section>

    <!-- 游戏商店：内容分级 -->
    <section class="ex">
      <div class="panel ex-game">
        <div class="ex-cover wide"><Icon name="gamepad" :size="40" /></div>
        <div class="ex-product-head">
          <div>
            <strong>Glyph Quest</strong>
            <small>Puzzle · Adventure</small>
          </div>
          <span class="ex-chip"><Icon name="trophy" :size="14" />42</span>
        </div>
        <div class="ex-care">
          <Icon v-for="r in ratings" :key="r" :name="r" :size="32" />
        </div>
        <div class="ex-actions">
          <button class="ex-btn primary"><Icon name="download" :size="18" />Install</button>
          <button class="ex-btn"><Icon name="bookmark" :size="18" />Wishlist</button>
        </div>
      </div>
    </section>

    <!-- 代码评审 -->
    <section class="ex">
      <div class="panel ex-pr">
        <div class="ex-pr-head">
          <Icon class="tone-ok" name="git-pull-request" :size="20" />
          <div class="ex-grow">
            <strong>Add I Ching hexagram icons</strong>
            <small class="mono"><Icon name="git-branch" :size="14" />feat/iching → main</small>
          </div>
        </div>
        <div class="ex-checks">
          <span v-for="c in checks" :key="c.label"><Icon :class="`tone-${c.tone}`" :name="c.icon" :size="16" />{{ c.label }}</span>
        </div>
        <div class="ex-pr-foot">
          <span><Icon name="git-commit" :size="16" />3 commits</span>
          <span><Icon name="chat" :size="16" />5</span>
          <span class="ex-grow" />
          <button class="ex-btn primary"><Icon name="git-merge" :size="16" />Merge</button>
        </div>
      </div>
    </section>

    <!-- 设置面板 -->
    <section class="ex">
      <div class="panel ex-settings">
        <label v-for="s in settings" :key="s.label" class="ex-row">
          <Icon :name="s.icon" :size="18" />
          <span class="ex-grow">{{ s.label }}</span>
          <input v-model="s.on" type="checkbox" class="ex-switch">
        </label>
        <button v-for="l in links" :key="l.label" class="ex-row">
          <Icon :name="l.icon" :size="18" />
          <span class="ex-grow">{{ l.label }}</span>
          <small class="ex-dim">{{ l.value }}</small>
          <Icon v-if="l.arrow" class="ex-dim" name="chevron-right" :size="16" />
        </button>
      </div>
    </section>

    <!-- 数据看板 -->
    <section class="ex">
      <div class="ex-stats-grid">
        <div v-for="s in stats" :key="s.label" class="panel ex-stat">
          <div class="ex-stat-head">
            <small>{{ s.label }}</small>
            <Icon class="ex-dim" :name="s.icon" :size="16" />
          </div>
          <strong class="ex-stat-value">{{ s.value }}</strong>
          <small :class="s.up ? 'tone-ok' : 'tone-err'" class="ex-delta">
            <Icon :name="s.up ? 'trending-up' : 'trending-down'" :size="14" />{{ s.delta }}
          </small>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
/* 示例网格：和图标网格同一套线框，卡片之间只画右、下边线 */
.examples { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); margin-right: -1px; }
.ex { display: flex; flex-direction: column; justify-content: center; gap: 14px; padding: 24px; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); min-width: 0; }
.ex button { display: inline-flex; align-items: center; gap: 8px; border: 0; background: none; color: inherit; cursor: pointer; }
.ex small { display: block; font-size: 12px; }
.ex strong { font-weight: 600; }
.panel { border: 1px solid var(--line); border-radius: 12px; background: var(--bg); overflow: hidden; }
.ex-dim { color: var(--muted); }
.ex-grow { flex: 1; min-width: 0; }
.tone-ok { color: #16a34a; }
.tone-warn { color: #d97706; }
.tone-err { color: #dc2626; }
.tone-info { color: #2563eb; }
.tone-muted { color: var(--muted); }

/* 通用小按钮 */
.ex-tool { width: 30px; height: 30px; justify-content: center; flex: none; border-radius: 7px; color: var(--text-2) !important; }
.ex-tool:hover { background: var(--sunken); color: var(--text) !important; }
.ex-tool.on { background: var(--accent-soft); color: var(--text) !important; }
.ex-btn { height: 36px; padding: 0 12px; justify-content: center; border: 1px solid var(--line-strong) !important; border-radius: 8px; font-size: 13px; font-weight: 500; }
.ex-btn:hover { background: var(--sunken); }
.ex-btn.primary { flex: 1; border-color: var(--text) !important; background: var(--text); color: var(--bg); }
.ex-btn.primary:hover { opacity: .9; }

/* 侧边导航 */
.ex-nav { padding: 8px; }
.ex-nav-head { display: flex; align-items: center; gap: 10px; padding: 6px 8px 12px; }
.ex-nav-head strong { flex: 1; }
.ex-logo { display: grid; place-items: center; width: 28px; height: 28px; border-radius: 7px; background: var(--text); color: var(--bg); }
.ex-nav-item { width: 100%; height: 34px; padding: 0 10px; border-radius: 7px; color: var(--text-2) !important; font-size: 13.5px; }
.ex-nav-item span { flex: 1; text-align: left; }
.ex-nav-item:hover { background: var(--sunken); color: var(--text) !important; }
.ex-nav-item.on { background: var(--surface); color: var(--text) !important; box-shadow: inset 0 0 0 1px var(--line-strong); }
.ex-count { padding: 0 6px; border-radius: 999px; background: var(--text); color: var(--bg) !important; font: 11px/18px var(--mono) !important; }
.ex-nav-foot { margin-top: 8px; padding-top: 8px; border-top: 1px solid var(--line); }

/* 编辑器 */
.ex-toolbar { display: flex; flex-wrap: wrap; align-items: center; gap: 2px; padding: 6px; border-bottom: 1px solid var(--line); }
.ex-sep { width: 1px; height: 18px; margin: 0 4px; background: var(--line-strong); }
.ex-doc { padding: 16px 18px 20px; }
.ex-doc h4 { margin: 0 0 6px; font-size: 15px; }
.ex-doc p { margin: 0; color: var(--text-2); font-size: 13.5px; }
.ex-doc p.bold { font-weight: 600; }
.ex-doc p.italic { font-style: italic; }
.ex-doc p.underline { text-decoration: underline; }
.ex-doc p.strikethrough { text-decoration: line-through; }
.ex-doc p.underline.strikethrough { text-decoration: underline line-through; }

/* 文件列表 */
.ex-crumbs { display: flex; align-items: center; gap: 6px; padding: 8px 8px 8px 14px; border-bottom: 1px solid var(--line); font-size: 13px; color: var(--text-2); }
.ex-crumbs strong { color: var(--text); }
.ex-file { display: flex; align-items: center; gap: 12px; padding: 6px 8px 6px 14px; font-size: 13.5px; }
.ex-file + .ex-file { border-top: 1px solid var(--line); }
.ex-file:hover { background: var(--sunken); }

/* 播放器 */
.ex-player { padding: 16px; display: flex; flex-direction: column; gap: 12px; }
.ex-cover { display: grid; place-items: center; aspect-ratio: 2.2; border-radius: 8px; background: var(--sunken); color: var(--text-2); }
.ex-cover.wide { aspect-ratio: 2.6; }
.ex-track { display: flex; align-items: center; justify-content: space-between; }
.ex-track small, .ex-product-head small, .ex-toast small, .ex-pr-head small { color: var(--muted); }
.ex-progress { height: 4px; border-radius: 2px; background: var(--line-strong); }
.ex-progress i { display: block; height: 100%; border-radius: 2px; background: var(--text); }
.ex-times { display: flex; justify-content: space-between; margin-top: -6px; }
.ex-controls { display: flex; align-items: center; justify-content: space-between; padding: 0 8px; }
.ex-play { width: 48px; height: 48px; justify-content: center; border-radius: 50%; background: var(--text) !important; color: var(--bg) !important; }

/* 通知 */
.ex-stack { display: flex; flex-direction: column; gap: 8px; }
.ex-toast { display: flex; align-items: flex-start; gap: 12px; padding: 12px 8px 12px 14px; font-size: 13.5px; }
.ex-toast > .icon { margin-top: 1px; }
.ex-toast .ex-tool { margin-top: -5px; }

/* 聊天 */
.ex-chat { display: flex; flex-direction: column; gap: 8px; padding: 14px; font-size: 13.5px; }
.ex-msg { align-self: flex-start; max-width: 80%; padding: 8px 12px; border-radius: 12px 12px 12px 4px; background: var(--sunken); }
.ex-msg.me { align-self: flex-end; display: flex; align-items: flex-end; gap: 6px; border-radius: 12px 12px 4px 12px; background: var(--text); color: var(--bg); }
.ex-attach { align-self: flex-end; display: flex; align-items: center; gap: 10px; width: 70%; padding: 8px 12px; border: 1px solid var(--line-strong); border-radius: 10px; color: var(--text-2); }
.ex-input { display: flex; align-items: center; gap: 2px; margin-top: 6px; padding: 4px; border: 1px solid var(--line-strong); border-radius: 10px; background: var(--surface); }
.ex-input > span { padding-left: 4px; }
.ex-send { width: 30px; height: 30px; justify-content: center; border-radius: 7px; background: var(--text) !important; color: var(--bg) !important; }

/* 天气 */
.ex-weather { padding: 16px; display: flex; flex-direction: column; gap: 14px; }
.ex-now { display: flex; align-items: center; gap: 14px; }
.ex-temp { font-size: 32px; line-height: 1.1; font-weight: 600; letter-spacing: -.02em; }
.ex-now small { display: flex; align-items: center; gap: 4px; color: var(--muted); }
.ex-stats { display: flex; gap: 16px; font-size: 13px; color: var(--text-2); }
.ex-stats span, .ex-checks span, .ex-pr-foot span, .ex-chip, .ex-pr-head small { display: inline-flex; align-items: center; gap: 6px; }
.ex-days { display: grid; grid-template-columns: repeat(5, 1fr); padding-top: 12px; border-top: 1px solid var(--line); text-align: center; }
.ex-days > div { display: flex; flex-direction: column; align-items: center; gap: 6px; }

/* 商品与游戏 */
.ex-product, .ex-game { padding: 16px; display: flex; flex-direction: column; gap: 14px; }
.ex-product-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.ex-care { display: flex; gap: 14px; padding: 12px 14px; border-radius: 8px; background: var(--sunken); }
.ex-actions { display: flex; gap: 8px; }
.ex-chip { padding: 2px 8px; border: 1px solid var(--line-strong); border-radius: 999px; font: 12px var(--mono); color: var(--text-2); }

/* 代码评审 */
.ex-pr { padding: 16px; display: flex; flex-direction: column; gap: 14px; font-size: 13.5px; }
.ex-pr-head { display: flex; gap: 12px; }
.ex-checks { display: flex; gap: 14px; padding: 10px 12px; border-radius: 8px; background: var(--sunken); font: 12.5px var(--mono); color: var(--text-2); }
.ex-pr-foot { display: flex; align-items: center; gap: 14px; color: var(--text-2); font-size: 13px; }
.ex-pr-foot .ex-btn { flex: none; }

/* 设置面板：行内开关用原生 checkbox 画成拨动开关 */
.ex-settings { padding: 6px; }
.ex-row { display: flex !important; align-items: center; gap: 12px !important; width: 100%; text-align: left; height: 42px; padding: 0 10px; border-radius: 8px; font-size: 13.5px; cursor: pointer; }
.ex-row:hover { background: var(--sunken); }
.ex-row + .ex-row { margin-top: 2px; }
.ex-switch { position: relative; width: 32px; height: 18px; margin: 0; flex: none; border-radius: 999px; background: var(--line-strong); cursor: pointer; -webkit-appearance: none; appearance: none; }
.ex-switch::after { content: ''; position: absolute; top: 2px; left: 2px; width: 14px; height: 14px; border-radius: 50%; background: var(--surface); }
.ex-switch:checked { background: var(--text); }
.ex-switch:checked::after { transform: translateX(14px); }

/* 数据看板 */
.ex-stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.ex-stat { display: flex; flex-direction: column; gap: 6px; padding: 14px; }
.ex-stat-head { display: flex; align-items: center; justify-content: space-between; color: var(--muted); }
.ex-stat-value { font-size: 22px; line-height: 1.2; letter-spacing: -.02em; }
.ex-delta { display: inline-flex !important; align-items: center; gap: 4px; font: 12px var(--mono) !important; }

@media (max-width: 760px) {
  .examples { grid-template-columns: minmax(0, 1fr); }
  .ex { padding: 18px 14px; }
}
</style>
