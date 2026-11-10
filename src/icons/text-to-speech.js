import { crisp, rounded } from '../geometry'
import { solid } from '../solid'

// Hugging Face 任务：语音合成（文字转语音）。一个对话气泡（文字）往右发出两道声波弧：字被念出来
// 库里的 volume 是喇叭 + 声波弧；这里发声的是气泡
// 气泡主体外缘 3–12 × 7–16（9 见方），尾巴 45°、尾尖墨迹到 19；横向 3 / 12 同相位，竖向 7 / 16 / 19 同相位（16px 下各自同时清晰）
// 声波弧的圆心在主体右边的中点 (12, 11.5)，外缘半径 4.5 / 9（墨迹到 16.5 / 21，两道弧之间空 3），各张开 ±40°；
// 整体墨迹框 3–21 × 约 5.2–19
const C = [12, 11.5]
const arc = (r) => {
  const [dx, dy] = [r * Math.cos(Math.PI * 2 / 9), r * Math.sin(Math.PI * 2 / 9)].map(v => +v.toFixed(3))
  return `M${C[0] + dx} ${C[1] - dy}A${r} ${r} 0 0 1 ${C[0] + dx} ${C[1] + dy}`
}
const body = (stroke, radius, closed) => {
  const h = stroke / 2
  const [l, t, r, b] = [3 + h, 7 + h, 12 - h, 16 - h]
  return closed
    ? rounded([[6, b, crisp(radius)], [l, b], [l, t], [r, t], [r, b], [9, b], [6, b + 3, crisp(radius)]], Math.min(radius, 2))
    : rounded([[6, b], [l, b], [l, t], [r, t], [r, b], [9, b], [6, b + 3]], Math.min(radius, 2), false)
}
const waves = stroke => [arc(4.5 - stroke / 2), arc(9 - stroke / 2)]

export default ({ radius, stroke }) => [body(stroke, radius, false), ...waves(stroke)]

// 实心：气泡填实（连尾巴封口），声波弧照旧是线
export const fill = ({ radius, stroke }) => [solid(body(stroke, radius, true)), ...waves(stroke)]
