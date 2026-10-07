import { rounded } from '../geometry'
import { rotate } from '../transform'

// 天文望远镜：前粗后细的锥形镜筒 + 前端镜头盖 + 尾端小目镜（先水平画，再绕支点逆时针转 30° 指向右上）
// + 三条向外张开的三脚架腿
// 支点 x 取 11.5：三脚架中间那条竖腿落在 .5 上
const pivot = [11.5, 12.5]
const tilt = path => rotate(path, -30, pivot)

export default ({ radius }) => {
  const r = Math.min(radius, 1.5)
  return [
    tilt(rounded([[6, 10.75], [17.5, 9.5], [17.5, 15.5], [6, 14.25]], r)),
    tilt(rounded([[17.5, 8.75], [20, 8.75], [20, 16.25], [17.5, 16.25]], Math.min(radius, 1))),
    tilt(rounded([[3.5, 11.25], [6, 11.25], [6, 13.75], [3.5, 13.75]], Math.min(radius, 0.75))),
    `M${pivot[0]} 15.5L8 21.5`,
    `M${pivot[0]} 15.5V21.5`,
    `M${pivot[0]} 15.5L16 21.5`,
  ]
}
