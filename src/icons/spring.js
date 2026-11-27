import { num } from '../geometry'

// 弹簧（螺旋弹簧，斜放）：一根簧丝连着绕四个圈，从左下往右上排开，两头各留一小段直的线头——随手画弹簧、电话线时的那种连笔圈
// 先横着算：簧丝是一条长幅摆线 x = X0 + C·θ − A·sin θ、y = 12 + B·cos θ（θ 每走 2π 绕一圈，A > C 所以每圈自己交叉一次、打成一个环），
// θ 从 −π 到 7π，起点、终点都在两个环之间切线水平的地方，各接一段长 LEAD 的线头；再整体逆时针转 45°、平移到画布正中
// 圈距 4.9、环宽约 2.7：相邻两个环之间的缝约 2.2，粗线宽下也不粘在一起；环高 9（B = 4.5）
// 斜放是为了用满画布，也和横放的 inductor（三个半圆鼓包、不打环）、resistor（锯齿）区分开
// 都是线，没有实心版（簧丝本来就是一根线）
const [TURNS, PITCH, A, B, LEAD] = [4, 4.9, 2.45, 4.5, 1]
const C = PITCH / (2 * Math.PI)
const X0 = 12 - C * (TURNS - 1) * Math.PI
const at = t => [X0 + C * t - A * Math.sin(t), 12 + B * Math.cos(t)]
const slope = t => [C - A * Math.cos(t), -B * Math.sin(t)]
// 逆时针转 45° 之后墨迹范围偏向左上（线头在环的一侧），往右下各挪 SHIFT 正好居中
const SHIFT = 1.118
const put = ([x, y]) => `${num(12 + (x + y - 24) * Math.SQRT1_2 + SHIFT)} ${num(12 + (y - x) * Math.SQRT1_2 + SHIFT)}`
// 每 45° 一段三次贝塞尔（两端的切线取曲线的导数）
const STEP = Math.PI / 4
const [T0, T1] = [-Math.PI, (2 * TURNS - 1) * Math.PI]
const wire = () => {
  const [[sx, sy], [ex, ey]] = [at(T0), at(T1)]
  let d = `M${put([sx - LEAD, sy])}L${put([sx, sy])}`
  for (let t = T0; t < T1 - 1e-9; t += STEP) {
    const [[x0, y0], [x1, y1], [dx0, dy0], [dx1, dy1]] = [at(t), at(t + STEP), slope(t), slope(t + STEP)]
    d += `C${put([x0 + dx0 * STEP / 3, y0 + dy0 * STEP / 3])} ${put([x1 - dx1 * STEP / 3, y1 - dy1 * STEP / 3])} ${put([x1, y1])}`
  }
  return `${d}L${put([ex + LEAD, ey])}`
}
const WIRE = wire()

export default () => [WIRE]
