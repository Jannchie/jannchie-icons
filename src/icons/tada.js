import { rounded } from '../geometry'
import { dot } from '../scene'

// tada（礼花筒）：左下尖、右上开口的圆锥（开口边 45°），三个角都跟随圆角；
// 彩带和纸屑从开口中心呈扇形放射：三道彩带等距排开，纸屑点落在彩带之间、稍远处
// 圆角最多到 2，尖端再放宽 1.25 倍；圆角会吃掉角上的面积，所以三角形按圆角从重心往外放大补回来
const cone = [[7.5, 9.5], [14.5, 16.5], [3.5, 20.5]]
const g = [0, 1].map(i => cone.reduce((s, p) => s + p[i], 0) / 3)
const mouth = [11, 13] // 开口中心
const polar = (deg, d) => [mouth[0] + d * Math.cos(deg * Math.PI / 180), mouth[1] + d * Math.sin(deg * Math.PI / 180)]
const streamer = deg => `M${polar(deg, 5.5).join(' ')}L${polar(deg, 8.5).join(' ')}`

export default ({ radius }) => {
  const r = Math.min(radius, 2)
  const grow = 1 + 0.06 * r
  const [a, b, tip] = cone.map(p => [0, 1].map(i => g[i] + (p[i] - g[i]) * grow))
  return [
    rounded([a, b, [...tip, r * 1.25]], r),
    streamer(-100),
    streamer(-45),
    streamer(10),
    dot(...polar(-72, 8.75)),
    dot(...polar(-18, 8.75)),
    dot(...polar(-45, 11)),
  ]
}
