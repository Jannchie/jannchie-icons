// 月相：北半球视角（盈月亮面在右）。圆轮廓 + 实心暗面，沿用历书「● 朔、○ 望」的画法
// 明暗交界线是半椭圆，横半径 TERM 决定蛾眉 / 凸月的胖瘦
import { circle } from './geometry'

const [C, R] = [12, 9]
const TERM = 3.5
const TOP = `M${C} ${C - R}`
const BOTTOM = `${C} ${C + R}`
// 外圆的半边（从顶到底）：left 走左侧，否则走右侧
const half = left => `A${R} ${R} 0 0 ${left ? 0 : 1} ${BOTTOM}`
// 交界线从底回到顶，bulge 向右或向左鼓
const term = right => `A${TERM} ${R} 0 0 ${right ? 0 : 1} ${C} ${C - R}`

// 暗面：left 表示暗面占外圆的左半边，bulge 是交界线鼓出的方向（null 表示交界线是直径）
const dark = (left, bulge) => ({ d: TOP + half(left) + (bulge === null ? 'Z' : term(bulge === 'right')), fill: true })

const ring = circle(C, C, R)

export const MOON_PHASES = {
  'new': { zh: '朔（新月）', paths: () => [{ d: ring, fill: true }] },
  'waxing-crescent': { zh: '蛾眉月', paths: () => [ring, dark(true, 'right')] },
  'first-quarter': { zh: '上弦月', paths: () => [ring, dark(true, null)] },
  'waxing-gibbous': { zh: '盈凸月', paths: () => [ring, dark(true, 'left')] },
  'full': { zh: '望（满月）', paths: () => [ring] },
  'waning-gibbous': { zh: '亏凸月', paths: () => [ring, dark(false, 'right')] },
  'last-quarter': { zh: '下弦月', paths: () => [ring, dark(false, null)] },
  'waning-crescent': { zh: '残月', paths: () => [ring, dark(false, 'left')] },
}
