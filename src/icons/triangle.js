import { rounded } from '../geometry'

// 三角（PlayStation 手柄那种正三角，尖朝上）：和 circle / square / x 摆在一起视觉等大
// 三角面积小，边长放到 19（比方块 17、圆直径 18 都宽）；高 19·√3/2 ≈ 16.45，
// 外接框中心比格子中心下移 0.25，让重心更稳
const side = 19
const h = side * Math.sqrt(3) / 2
// 底边落在 20.5（.5 上），外接框中心约 12.27
const [top, bottom] = [20.5 - h, 20.5]

export default ({ radius }) => [
  rounded([[12, top], [12 + side / 2, bottom], [12 - side / 2, bottom]], Math.min(radius, 2)),
]
