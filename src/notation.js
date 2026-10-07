// 音乐记号：谱号、音符、休止符、变音记号和其他常用记号，键按小节、小节内按惯用顺序排列，预览页据此排序
import { circle, crisp, rounded } from './geometry'

const fmt = n => String(Math.round(n * 1000) / 1000)

// 椭圆（可旋转，deg 为正时顺时针）；reverse 反向绕行，叠在正向椭圆里填充时成为镂空
function ellipse(cx, cy, rx, ry, deg = 0, reverse = false) {
  const t = deg * Math.PI / 180
  const dx = rx * Math.cos(t)
  const dy = rx * Math.sin(t)
  const s = reverse ? 0 : 1
  const arc = (x, y) => `A${fmt(rx)} ${fmt(ry)} ${fmt(deg)} 0 ${s} ${fmt(x)} ${fmt(y)}`
  return `M${fmt(cx + dx)} ${fmt(cy + dy)}${arc(cx - dx, cy - dy)}${arc(cx + dx, cy + dy)}Z`
}

// 实心圆：闭合（Z），尖角模式下起点不会冒出方头
const disc = (x, y, r) => ({ d: `${circle(x, y, r)}Z`, fill: true })

// 实心小圆点（附点、反复记号的点）：用填充圆而不是 dot，跟随字重
const blob = (x, y) => disc(x, y, 0.75)

// 符头：略向右上倾斜的椭圆
const HEAD = { rx: 2.6, ry: 1.85, deg: -22 }
// 符头最右点相对圆心的偏移：符干从这里竖起
const HEAD_RIGHT = (() => {
  const t = HEAD.deg * Math.PI / 180
  const u = Math.atan2(-HEAD.ry * Math.sin(t), HEAD.rx * Math.cos(t))
  return [
    HEAD.rx * Math.cos(u) * Math.cos(t) - HEAD.ry * Math.sin(u) * Math.sin(t),
    HEAD.rx * Math.cos(u) * Math.sin(t) + HEAD.ry * Math.sin(u) * Math.cos(t),
  ]
})()

// 带符干的音符：stem 是符干的 x（落在 .5 上），符头圆心由它反推；top 是符干顶端
function note(stem, cy, top, filled) {
  const cx = stem - HEAD_RIGHT[0]
  const head = ellipse(cx, cy, HEAD.rx, HEAD.ry, HEAD.deg)
  // 符干从切点起：正好落在符头轮廓上，不会被端点吸附拉歪，也不戳进空心符头的镂空
  return [filled ? { d: head, fill: true } : head, `M${stem} ${fmt(cy + HEAD_RIGHT[1])}V${top}`]
}

// 符尾：从符干顶端向右下甩出；单个符尾末端略回勾，叠两层时不回勾，免得上下粘连
function flag(x, y, h, curl = true) {
  if (!curl)
    return `M${x} ${y}Q${x + 3.5} ${y + h * 0.3} ${x + 4.5} ${y + h}`
  return `M${x} ${y}C${x} ${y + h * 0.3} ${x + 4.5} ${y + h * 0.35} ${x + 4.5} ${y + h * 0.72}C${x + 4.5} ${y + h * 0.85} ${x + 4.1} ${y + h * 0.95} ${x + 3.6} ${y + h}`
}

// 带符尾的音符：第一面符尾接在符干上连成一笔，顶端是转角而不是两个线头
function flagged(stem, cy, top, flags) {
  const [head, line] = note(stem, cy, top, true)
  return [head, line + flags[0].replace(/^M[^CQ]+/, ''), ...flags.slice(1)]
}

// 降号：符干和弯肚连成一笔；弯肚沿符干方向收回，线头藏在符干里
const flat = (x, w) => `M${x} 3.5V20C${x + w * 0.45} 18.5 ${x + w} 16 ${x + w} 13C${x + w} 10 ${x} 9.3 ${x} 12.5`

// 反复记号：粗线（填充窄条）+ 细线 + 两个点；dir = 1 时粗线在左（开始），-1 时在右（结束）
function repeat(dir, r) {
  const x = 12 - dir * 4.25
  const bar = [[x - 0.75, 4], [x + 0.75, 4], [x + 0.75, 20], [x - 0.75, 20]]
  return [
    { d: rounded(bar, crisp(r)), fill: true },
    `M${x + dir * 3.75} 4V20`,
    blob(x + dir * 8, 10),
    blob(x + dir * 8, 14),
  ]
}

// 渐强 / 渐弱的开口
const hairpin = (tip, open, r) => rounded([[open, 6.5], [tip, 12], [open, 17.5]], crisp(r), false)

export const NOTATION = {
  // 谱号
  'treble-clef': {
    zh: '高音谱号',
    section: 'clef',
    // 一笔到底的三次贝塞尔，每个衔接点前后控制点共线（切线连续），曲线没有折角和鼓包：
    // 从螺旋中心出发顺时针向外绕 G 线一圈，从左侧斜上到顶部回环，再沿斜贯的符干直下，底部钩向左收进实心小球
    paths: () => [
      'M11 14.75C11 12.5 13.5 11.25 15 12.5C16.2 13.5 16.25 17 13.75 17.75C10.75 18.65 7.5 17 7.75 13.75C7.97 10.82 11 9.5 13 7.5'
      + 'C14.5 6 15 4.25 14.25 3C13.65 2 11.5 2.75 11.75 4.25L13.75 19C13.95 20.5 13.25 21.75 11.75 21.75',
      disc(10.25, 20.75, 1.25),
    ],
  },
  'bass-clef': {
    zh: '低音谱号',
    section: 'clef',
    // 实心圆头在左，弧线从圆头左上起笔，绕过顶部到右侧，再长长地甩向左下；两点夹住圆头所在的 F 线
    paths: () => [
      disc(6.5, 9.75, 1.75),
      'M5 9C4.75 6 7.5 4 10.5 4C14 4 16 6.5 16 9.5C16 13 12.5 18.5 4.5 20.5',
      disc(19.5, 7.5, 1),
      disc(19.5, 12, 1),
    ],
  },
  'alto-clef': {
    zh: '中音谱号',
    section: 'clef',
    paths: (r) => {
      // 上半个「3」：从细竖线中点斜挑上去成尖，再绕一圈收进小球；下半个沿 y = 12 镜像
      const upper = 'M9.5 12C10.5 11 11 9.5 11.5 8.5C12.5 10 14 10.5 15.5 10.5C18 10.5 19 8.5 19 6.5C19 4.5 17.5 3.5 15.5 3.5C14 3.5 13 4.5 13 5.5'
      const lower = upper.replace(/(-?[\d.]+) (-?[\d.]+)/g, (_, x, y) => `${x} ${24 - Number(y)}`)
      return [
        { d: rounded([[4, 3.5], [6.5, 3.5], [6.5, 20.5], [4, 20.5]], crisp(r)), fill: true },
        'M9.5 3.5V20.5',
        upper,
        lower,
        disc(14.25, 5.75, 1.25),
        disc(14.25, 18.25, 1.25),
      ]
    },
  },
  // 音符
  'whole-note': {
    zh: '全音符',
    section: 'note',
    paths: () => [{ d: ellipse(12, 12, 5.5, 3.75) + ellipse(12, 12, 3.2, 2.1, -45, true), fill: true }],
  },
  'half-note': { zh: '二分音符', section: 'note', paths: () => note(14.5, 18, 3.5, false) },
  'quarter-note': { zh: '四分音符', section: 'note', paths: () => note(14.5, 18, 3.5, true) },
  'eighth-note': { zh: '八分音符', section: 'note', paths: () => flagged(12.5, 18, 3.5, [flag(12.5, 3.5, 9)]) },
  'sixteenth-note': {
    zh: '十六分音符',
    section: 'note',
    paths: () => flagged(12.5, 18.5, 3, [flag(12.5, 3, 4.5, false), flag(12.5, 8, 4.5, false)]),
  },
  'beamed-eighth-notes': {
    zh: '连梁八分音符',
    section: 'note',
    paths: r => [
      // 符干顶端停在符梁中线上，正好贴着符梁侧边，不会被吸到圆角上
      ...note(10.5, 18, 5.75, true),
      ...note(18.5, 16.5, 4.25, true),
      { d: rounded([[10.5, 5], [18.5, 3.5], [18.5, 5], [10.5, 6.5]], crisp(r)), fill: true },
    ],
  },
  // 休止符
  'whole-rest': {
    zh: '全休止符',
    section: 'rest',
    paths: r => ['M4.5 9.5H19.5', { d: rounded([[8.5, 9.5], [15.5, 9.5], [15.5, 13.5], [8.5, 13.5]], crisp(r)), fill: true }],
  },
  'half-rest': {
    zh: '二分休止符',
    section: 'rest',
    paths: r => ['M4.5 14.5H19.5', { d: rounded([[8.5, 10.5], [15.5, 10.5], [15.5, 14.5], [8.5, 14.5]], crisp(r)), fill: true }],
  },
  'quarter-rest': {
    zh: '四分休止符',
    section: 'rest',
    paths: r => [
      rounded([[10, 3], [14.5, 8], [10.5, 12.5], [14.5, 17]], crisp(r), false) + 'C12 15.8 9 16.5 10 18.8C10.4 19.7 11.2 20.3 12 21',
      // 中段那一笔是粗的
      { d: rounded([[14.5, 8], [13.3, 6.7], [9.3, 11.2], [10.5, 12.5]], crisp(r)), fill: true },
    ],
  },
  'eighth-rest': {
    zh: '八分休止符',
    section: 'rest',
    paths: () => [
      disc(9, 7.5, 1.4),
      'M9.99 8.49C11.2 9.7 14 10 16 6.5L11.5 20.5',
    ],
  },
  // 变音记号
  'sharp': {
    zh: '升号',
    section: 'accidental',
    paths: () => ['M9.5 4.5V20.5', 'M14.5 3.5V19.5', 'M6.5 10L17.5 7.5', 'M6.5 16.5L17.5 14'],
  },
  'flat': { zh: '降号', section: 'accidental', paths: () => [flat(7.5, 8)] },
  'natural': {
    zh: '还原号',
    section: 'accidental',
    paths: r => [rounded([[8.5, 3.5], [8.5, 16.5], [15.5, 15]], crisp(r), false), rounded([[8.5, 9], [15.5, 7.5], [15.5, 20.5]], crisp(r), false)],
  },
  'double-sharp': {
    zh: '重升号',
    section: 'accidental',
    paths: r => [
      'M8.5 8.5L15.5 15.5',
      'M15.5 8.5L8.5 15.5',
      ...[[6.5, 6.5], [17.5, 6.5], [6.5, 17.5], [17.5, 17.5]].map(([x, y]) => ({
        d: rounded([[x - 1.25, y - 1.25], [x + 1.25, y - 1.25], [x + 1.25, y + 1.25], [x - 1.25, y + 1.25]], crisp(r)),
        fill: true,
      })),
    ],
  },
  'double-flat': {
    zh: '重降号',
    section: 'accidental',
    paths: () => [flat(4.5, 5.5), flat(13.5, 5.5)],
  },
  // 其他记号
  'fermata': {
    zh: '延长记号',
    section: 'other',
    paths: () => ['M3.5 16A8.5 8.5 0 0 1 20.5 16', disc(12, 14.5, 1.1)],
  },
  'repeat-start': { zh: '反复开始', section: 'other', paths: r => repeat(1, r) },
  'repeat-end': { zh: '反复结束', section: 'other', paths: r => repeat(-1, r) },
  'segno': {
    zh: '记号（Segno）',
    section: 'other',
    paths: () => [
      'M15.5 6.5C14.5 4.5 9 4 9 7.5C9 10.5 15 11.5 15 15.5C15 19.5 9.5 19.5 8.5 17.5',
      'M6.5 20L17.5 4',
      blob(6, 12.5),
      blob(18, 11.5),
    ],
  },
  'coda': {
    zh: '尾声（Coda）',
    section: 'other',
    // 十字连同椭圆整体左上移半格，横竖落在 .5 上
    paths: () => [ellipse(11.5, 11.5, 5, 6), 'M11.5 2.5V20.5', 'M2.5 11.5H20.5'],
  },
  'staff': {
    zh: '五线谱',
    section: 'other',
    // 只有五条线会像菜单，压一个音符上去；音符当刀，把周围的谱线断开，免得糊成一团
    // 线距 4（整数），五条线都落在 .5 上，符头仍压在 15.5 的线上
    paths: () => [
      'M3 3.5H21', 'M3 7.5H21', 'M3 11.5H21', 'M3 15.5H21', 'M3 19.5H21',
      ...note(13.5, 15.5, 3, true).map(p => ({ ...(typeof p === 'string' ? { d: p } : p), cut: true })),
    ],
  },
  'crescendo': { zh: '渐强', section: 'other', paths: r => [hairpin(4.5, 19.5, r)] },
  'decrescendo': { zh: '渐弱', section: 'other', paths: r => [hairpin(19.5, 4.5, r)] },
}

// 小节顺序，对应 NOTATION 里的 section
export const NOTATION_SECTIONS = ['clef', 'note', 'rest', 'accidental', 'other']
