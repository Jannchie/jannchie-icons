import { knock, solid } from '../solid'
import cube from './cube'

// 包裹：30° 等距视角的箱子 + 顶面一道封箱胶带
export default opts => [...cube(opts), 'M8 5.31L16 9.93']

// 实心：箱子一块，三条内棱挖空分出三个面，封箱胶带也挖空（上端在外缘前缩一个线宽，不咬缺箱子轮廓）
export const fill = (opts) => {
  const [box, ...edges] = cube(opts)
  // 胶带 (8, 5.31) → (16, 9.93)，起点在箱子外缘上
  const [dx, dy] = [8, 4.62]
  const k = opts.stroke / Math.hypot(dx, dy)
  return [
    solid(box),
    knock([...edges, `M${8 + dx * k} ${5.31 + dy * k}L16 9.93`]),
  ]
}
