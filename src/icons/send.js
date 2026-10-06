import { rounded } from '../geometry'
import { rotate } from '../transform'

// 发送（纸飞机）：机头朝上的纸飞机 + 中间折线，再顺时针旋转 deg 度；默认转 30°（与水平成 60°，和铅笔同角度）
export const plane = deg => ({ radius }) => {
  const r = Math.min(radius, 1)
  return [
    rotate(rounded([[12, 2.5], [19, 20], [12, 16], [5, 20]], r), deg),
    rotate('M12 2.5L12 16', deg),
  ]
}

export default plane(30)
