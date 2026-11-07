import { rounded, through } from '../geometry'
import { cutout, knock, solid } from '../solid'

// Ruby：宝石。上沿 7.5–16.5、腰线 y 9.5（3.5–20.5）、底尖 (12, 20.5)
// 冠部是一排三角形切面：上沿的三个点（两角 + 中点）和腰线上的两个点（9.5、14.5）连成一条 W 形折线
// 亭部从腰线上的这两个点收到底尖；和 diamond 的区别是冠部多了中间那个尖
export default ({ radius }) => [
  rounded([[7.5, 4.5], [16.5, 4.5], [20.5, 9.5], [12, 20.5], [3.5, 9.5]], Math.min(radius, 1)),
  'M3.5 9.5H20.5',
  'M7.5 4.5L9.5 9.5L12 4.5L14.5 9.5L16.5 4.5',
  'M9.5 9.5L12 20.5L14.5 9.5',
]

// 亭部的两道缝：中间的切面就是两条切面线（腰线上的 9.5 / 14.5 → 底尖 (12, 20.5)）围成的三角形，带着底尖；
// 每道缝宽一个线宽，内缘就是切面线，往外让开，顺着切面线一直挖穿到轮廓外——左、中、右三块完全分开，底尖不把左右两块连起来
function pavilion(stroke) {
  const l = Math.hypot(2.5, 11)
  const [ux, uy] = [2.5 / l, 11 / l] // 左切面线往下的方向
  const [nx, ny] = [-uy * stroke, ux * stroke] // 往外（左下）让开一个线宽
  const ext = 4 // 两头都伸出去：上头伸进腰线的缝，下头穿出轮廓
  const band = (mx) => {
    const [ax, ay, bx, by] = [mx(9.5 - ux * ext), 9.5 - uy * ext, mx(12 + ux * ext), 20.5 + uy * ext]
    const m = mx === Number ? 1 : -1
    return `M${ax} ${ay}L${bx} ${by}L${bx + m * nx} ${by + ny}L${ax + m * nx} ${ay + ny}Z`
  }
  return [band(Number), band(x => 24 - x)]
}

// 实心：腰线整条挖穿，冠部的 W 形切面线上端穿出上沿：冠部分成五个三角形切面，和亭部分开；
// 亭部沿两条切面线各挖一道贯通的缝（见 pavilion），分成左、中、右三个切面，底尖归中间的切面
export const fill = ({ radius, stroke }) => {
  const s = 2 * stroke
  return [
    solid(rounded([[7.5, 4.5], [16.5, 4.5], [20.5, 9.5], [12, 20.5], [3.5, 9.5]], Math.min(radius, 1))),
    knock(`M${3.5 - s} 9.5H${20.5 + s}`),
    // 切面线的下端停在腰线中心：用圆线帽，尖角模式下方线帽的角不会从腰线的缝里戳进亭部
    knock([
      through([7.5, 4.5], [9.5, 9.5], s, 0),
      through([12, 4.5], [9.5, 9.5], s, 0),
      through([12, 4.5], [14.5, 9.5], s, 0),
      through([16.5, 4.5], [14.5, 9.5], s, 0),
    ].map(d => ({ d, round: true }))),
    cutout(pavilion(stroke)),
  ]
}
