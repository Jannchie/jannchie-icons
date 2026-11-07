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

// 亭部的两道缝（同 ruby）：中间的切面就是两条切面线（腰线上的 9.5 / 14.5 → 底尖 (12, 20)）围成的三角形，带着底尖；
// 每道缝宽一个线宽，内缘就是切面线，往外让开；上端停在腰线中线上（落进腰线的缝里，再往上伸会啃到冠部中间那块），
// 下端顺着切面线穿出轮廓——左、中、右三块完全分开
function pavilion(stroke) {
  const l = Math.hypot(2.5, 11.5)
  const [ux, uy] = [2.5 / l, 11.5 / l] // 左切面线往下的方向
  const [nx, ny] = [-uy * stroke, ux * stroke] // 往外（左下）让开一个线宽
  const ext = 4
  const band = (mx, m) => {
    const [ax, bx, by] = [mx(9.5), mx(12 + ux * ext), 20 + uy * ext]
    return `M${ax} 8.5L${bx} ${by}L${bx + m * nx} ${by + ny}L${ax + m * nx} ${8.5 + ny}Z`
  }
  return [band(x => x, 1), band(x => 24 - x, -1)]
}

// 实心：钻石一块，腰线挖穿两侧，上面的冠部和下面的亭部分开；冠部两条切面线挖成一道斜缝，上端穿出顶边、下端平平地落进腰线的缝里
// （线帽伸进亭部会在腰线下面啃出小缺口），冠部分成三块；亭部沿两条切面线各挖一道贯通的缝（见 pavilion），分成左、中、右三个切面
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
    cutout([facet(7, 9.5), facet(17, 14.5), ...pavilion(stroke)]),
  ]
}
