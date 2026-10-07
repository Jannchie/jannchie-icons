import { circle } from '../geometry'

// 日间：圆 + 8 道间隔 45° 的光线
// 光线起点随线宽外移，日轮和光线之间始终留 1 的可见间隙；终点固定，粗字重下光线短一些
// 横竖两道光线落在 .5 上：圆心往左上偏半格
const [cx, cy] = [11.5, 11.5]
const R = 4
const rays = stroke => Array.from({ length: 8 }, (_, i) => {
  const a = i * Math.PI / 4
  const [c, s] = [Math.cos(a), Math.sin(a)]
  const inner = R + stroke + 1
  return `M${cx + inner * c} ${cy + inner * s}L${cx + 9 * c} ${cy + 9 * s}`
})

export default ({ stroke = 1.5 }) => [circle(cx, cy, R), ...rays(stroke)]
