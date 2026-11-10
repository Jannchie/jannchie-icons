import { GAP } from '../clearance'
import { clip } from '../clip'
import { circle } from '../geometry'

// 交扣的两个圆环：同样大小、左右交叠，像链环那样一前一后穿插——
// 上面的交叉点左环在前、右环断开；下面的交叉点右环在前、左环断开。没有别的装饰（带钻的婚戒是 rings）
// 圆心相距 7，外缘固定在 2 / 22（墨迹离边 2，线宽变粗往里长）：半径 = 6.5 − 半个线宽（常规 5.75）
const [l, r, cy] = [8.5, 15.5, 12]
// 交叉点处沿「在前面的那个环」的切线取一小段，作为只在这一处起作用的刀
const blade = ([px, py], cx) => {
  const [rx, ry] = [px - cx, py - cy]
  const len = Math.hypot(rx, ry)
  const [tx, ty] = [-ry / len * 1.5, rx / len * 1.5]
  return `M${px - tx} ${py - ty}L${px + tx} ${py + ty}`
}

export default ({ stroke }) => {
  const R = 6.5 - stroke / 2
  const dy = Math.sqrt(R * R - ((r - l) / 2) ** 2)
  const g = GAP + stroke
  return [
    clip(circle(l, cy, R), [blade([12, cy + dy], r)], g), // 下交叉点：右环在前，左环断开
    clip(circle(r, cy, R), [blade([12, cy - dy], l)], g), // 上交叉点：左环在前，右环断开
  ]
}
