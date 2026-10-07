// 炼金术符号，键按 元素 → 三要素 → 金属 → 其他 排序，预览页据此排序
// 七金属与行星同形，图标文件直接复用 astro-*，这里只登记顺序和小节（paths 为空）
import { circle, crisp, rounded } from './geometry'

// 四元素的三角：边长 18；横边放在 .5 上（正三角底边 19.5、倒三角顶边 4.5），两者上下镜像，各偏离居中约 0.3
// 横杠取离半高最近的 .5（正三角 11.5、倒三角 12.5），两端各伸出三角约 2
const side = 18
const h = side * Math.sqrt(3) / 2
const up = r => rounded([[12, 19.5 - h], [12 + side / 2, 19.5], [12 - side / 2, 19.5]], Math.min(r, 1))
const down = r => rounded([[12, 4.5 + h], [12 - side / 2, 4.5], [12 + side / 2, 4.5]], Math.min(r, 1))
const upBar = 'M5.5 11.5H18.5'
const downBar = 'M5.5 12.5H18.5'
// 贤者之石里三角（底 13、高 13）的内切圆半径 = 面积 / 半周长
const incircle = 84.5 / (6.5 + Math.hypot(6.5, 13))

export const ALCHEMY = {
  fire: { section: 'element', zh: '🜂 火', paths: r => [up(r)] },
  water: { section: 'element', zh: '🜄 水', paths: r => [down(r)] },
  air: { section: 'element', zh: '🜁 风', paths: r => [up(r), upBar] },
  earth: { section: 'element', zh: '🜃 土', paths: r => [down(r), downBar] },
  // 盐、硝石：圆不动，直径上移 / 左移半格落在 .5 上（端点仍在圆上）
  salt: { section: 'principle', zh: '🜔 盐', paths: () => [circle(12, 12, 8.5), 'M3.515 11.5H20.485'] },
  sulfur: { section: 'principle', zh: '🜍 硫', paths: r => [rounded([[11.5, 2.5], [16.5, 11.5], [6.5, 11.5]], crisp(r)), 'M11.5 11.5V21.5', 'M7.5 16.5H15.5'] },
  mercury: { section: 'principle', zh: '☿ 汞' },
  gold: { section: 'metal', zh: '☉ 金' },
  silver: { section: 'metal', zh: '☽ 银' },
  copper: { section: 'metal', zh: '♀ 铜' },
  iron: { section: 'metal', zh: '♂ 铁' },
  tin: { section: 'metal', zh: '♃ 锡' },
  lead: { section: 'metal', zh: '♄ 铅' },
  // 化圆为方：外圆 ⊃ 内接正方 ⊃ 底边贴方框的三角 ⊃ 三角内切圆
  'philosophers-stone': { section: 'other', zh: '贤者之石', paths: r => [
    circle(12, 12, 6.5 * Math.SQRT2),
    rounded([[5.5, 5.5], [18.5, 5.5], [18.5, 18.5], [5.5, 18.5]], crisp(r)),
    rounded([[12, 5.5], [18.5, 18.5], [5.5, 18.5]], crisp(r)),
    // 内切圆按严格相切会在粗字重下糊成一团，半径收小一圈留出缝
    circle(12, 18.5 - incircle, incircle - 1),
  ] },
  // 锑 ♁：圆上立十字（倒过来的 ♀）；竖笔在 11.5，圆跟着左移，半径 6 让圆的上下左右边也落在 .5 上
  antimony: { section: 'other', zh: '♁ 锑', paths: () => [circle(11.5, 14.5, 6), 'M11.5 2.5V8.5', 'M8 5.5H15'] },
  // 硝石 🜕：圆 + 竖直径
  nitre: { section: 'other', zh: '🜕 硝石', paths: () => [circle(12, 12, 8.5), 'M11.5 3.515V20.485'] },
}

export const ALCHEMY_SECTIONS = ['element', 'principle', 'metal', 'other']
