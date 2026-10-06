import { circle } from '../geometry'
import { cloud } from '../symbols'

// 晴转多云：右上太阳，左下云挡在前面；云的轮廓作为 cut，太阳靠近云的地方断开
const sun = [15.75, 9]
const rays = [0, 45, 90, 180, 225, 270, 315].map((deg) => {
  const [c, s] = [Math.cos(deg * Math.PI / 180), Math.sin(deg * Math.PI / 180)]
  return `M${sun[0] + 4.25 * c} ${sun[1] + 4.25 * s}L${sun[0] + 5.5 * c} ${sun[1] + 5.5 * s}`
})

export default () => [
  circle(sun[0], sun[1], 2.75),
  ...rays,
  ...cloud([9.75, 15.5], 2).map(d => ({ d, cut: true })),
]
