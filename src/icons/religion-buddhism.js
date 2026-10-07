import { circle } from '../geometry'

// 佛教：法轮。外圈轮辋、中心轮毂，八根辐条；辐条整体转 22.5°，没有正横正竖的单线（落不到 .5 上）
const R = 8.5
const HUB = 2
const spoke = (i) => {
  const a = (22.5 + 45 * i) * Math.PI / 180
  const p = r => `${Math.round((12 + r * Math.cos(a)) * 100) / 100} ${Math.round((12 + r * Math.sin(a)) * 100) / 100}`
  return `M${p(HUB)}L${p(R)}`
}

export default () => [
  circle(12, 12, R),
  circle(12, 12, HUB),
  ...Array.from({ length: 8 }, (_, i) => spoke(i)),
]
