import { circle } from '../geometry'
import { dot } from '../scene'
import { solid } from '../solid'

// 亮度：圆 + 8 个点（区别于 sun 的线条光芒）
const rays = Array.from({ length: 8 }, (_, i) => {
  const a = i * Math.PI / 4
  return dot(12 + 7.75 * Math.cos(a), 12 + 7.75 * Math.sin(a))
})

export default () => [circle(12, 12, 4.5), ...rays]

// 实心：中间的圆填实，8 个点照旧、尖角模式下也是圆点（实心圆配一圈方块读成齿轮）
export const fill = () => [solid(circle(12, 12, 4.5)), ...rays.map(r => ({ ...r, round: true }))]
