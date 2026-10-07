import { circle } from '../geometry'
import { cloud } from '../symbols'

// 晴转多云：右上太阳，左下云挡在前面；云的轮廓作为 cut，太阳靠近云的地方断开
// 光线起点随线宽外移，和日轮之间始终留 0.75 的可见间隙，光线长度固定 1.25
const sun = [15.5, 8.5]
const R = 2.25
const rays = stroke => [0, 45, 90, 180, 225, 270, 315].map((deg) => {
  const [c, s] = [Math.cos(deg * Math.PI / 180), Math.sin(deg * Math.PI / 180)]
  const inner = R + stroke + 0.75
  return `M${sun[0] + inner * c} ${sun[1] + inner * s}L${sun[0] + (inner + 1.25) * c} ${sun[1] + (inner + 1.25) * s}`
})

export default ({ stroke = 1.5 }) => [
  circle(sun[0], sun[1], R),
  ...rays(stroke),
  ...cloud([9.75, 15.5], 2).map(d => ({ d, cut: true })),
]
