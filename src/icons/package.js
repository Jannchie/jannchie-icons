import { through } from '../geometry'
import { cutout, knock, solid } from '../solid'
import cube from './cube'

// 包裹：30° 等距视角的箱子 + 顶面一道封箱胶带
export default opts => [...cube(opts), 'M8 5.31L16 9.93']

// 实心：箱子一块，三条内棱整条挖穿、穿出外轮廓，三个面分成三块；封箱胶带也挖穿，顶面分成两块：
// 胶带的缝是一条平行带（胶带线 ± 半个线宽），上端穿出箱子外缘，下端齐着右边那条内棱的中心线截平，
// 尖角模式下也不会有方线帽从内棱的缝里伸进右侧面
export const fill = (opts) => {
  const [box] = cube(opts)
  const { stroke } = opts
  const s = 2 * stroke
  const h = stroke / 2
  // 立方体的中心点和三个外顶点（同 cube.js）
  const dy = 8 * Math.tan(Math.PI / 6)
  const c = [12, 3 + 2 * dy]
  // 胶带 (8, 5.31) → (16, 9.93)，起点在箱子外缘上，终点在右边那条内棱 c → (20, 3 + dy) 上
  const l = Math.hypot(8, 4.62)
  const [ux, uy] = [8 / l, 4.62 / l]
  // 胶带线平移 ±h 后和右内棱所在直线的交点：右内棱上的点 c + t·(8, −dy)
  const hit = (o) => {
    const [px, py] = [8 + o * -uy, 5.31 + o * ux]
    // 解 p + k·u = c + t·(8, −dy)
    const det = ux * -dy - uy * 8
    const k = ((c[0] - px) * -dy - (c[1] - py) * 8) / det
    return [px + k * ux, py + k * uy]
  }
  const start = o => [8 + o * -uy - s * ux, 5.31 + o * ux - s * uy]
  const tape = [start(h), hit(h), hit(-h), start(-h)].map(([x, y]) => `${x} ${y}`)
  return [
    solid(box),
    knock([through(c, [4, 3 + dy], 0, s), through(c, [20, 3 + dy], 0, s), through(c, [12, 21], 0, s)]),
    cutout(`M${tape.join('L')}Z`),
  ]
}
