import { rounded } from '../geometry'

// 日晷（中式赤道日晷）：晷盘与地面斜成一定角度，画成转了 -35° 的椭圆（圆心 (11.5, 9)、长半轴 7、短半轴 2.75），
// 晷针垂直于盘面穿过盘心；盘下一个梯形石座（顶边 15.5），和晷盘之间留出缝，不画立柱——
// 立柱上端只能斜着接在倾斜的盘边上，尖角时线头会冒出去
const [cx, cy] = [11.5, 9]
const t = -35 * Math.PI / 180
const P = (x, y) => `${+(cx + x * Math.cos(t) - y * Math.sin(t)).toFixed(3)} ${+(cy + x * Math.sin(t) + y * Math.cos(t)).toFixed(3)}`

export default ({ radius }) => [
  `M${P(-7, 0)}A7 2.75 -35 1 0 ${P(7, 0)}A7 2.75 -35 1 0 ${P(-7, 0)}Z`,
  `M${P(0, -6)}L${P(0, 4.5)}`,
  rounded([[7.5, 21.5], [9.5, 15.5], [13.5, 15.5], [15.5, 21.5]], Math.min(radius, 1)),
]
