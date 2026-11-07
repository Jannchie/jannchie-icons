import { rounded } from '../geometry'
import { cutout, knock, solid } from '../solid'

// 钻石：上方梯形 + 腰线 + 收到底部尖点的切面
export default ({ radius, stroke }) => [
  rounded([[7, 3.5], [17, 3.5], [21, 8.5], [12, 20], [3, 8.5]], Math.min(radius, 1)),
  'M3 8.5H21',
  'M9.5 8.5L12 20L14.5 8.5',
  'M7 3.5L9.5 8.5',
  'M17 3.5L14.5 8.5',
]

// 实心：钻石一块，腰线挖穿两侧，上面的冠部和下面的亭部分开；冠部两条切面线挖成一道斜缝，上端穿出顶边、下端平平地落进腰线的缝里
// （线帽伸进亭部会在腰线下面啃出小缺口），冠部分成三块；
// 亭部的两条切面线收在底尖上，挖了只会把底尖切成三根细尖条，实心版不画，亭部是整块
export const fill = ({ radius, stroke }) => {
  // 冠部切面线 (x0, 3.5)→(x1, 8.5) 的缝：垂直方向宽一个线宽，上端在 y = 1（顶边以外），下端在腰线中线上
  const facet = (x0, x1) => {
    const k = (x1 - x0) / 5
    const w = stroke / 2 * Math.hypot(1, k)
    const x = y => x0 + (y - 3.5) * k
    return `M${x(1) - w} 1H${x(1) + w}L${x(8.5) + w} 8.5H${x(8.5) - w}Z`
  }
  return [
    solid(rounded([[7, 3.5], [17, 3.5], [21, 8.5], [12, 20], [3, 8.5]], Math.min(radius, 1))),
    knock(`M${3 - 2 * stroke} 8.5H${21 + 2 * stroke}`),
    cutout([facet(7, 9.5), facet(17, 14.5)]),
  ]
}
