import { rounded } from '../geometry'
import { solid } from '../solid'

// Hugging Face 任务：语音识别（语音转文字）。一支话筒，底座换成了两行文字：对着话筒说的话落成了字
// 和 mic（底座是一小段横线）靠两行通栏的字区分；captions（CC 字幕框）是另一个图形
// 竖向墨迹 3–21，全部落在 1.5 的整数倍上：话筒头 3–12，托弧最低处墨迹到 15.75，
// 第一行字 16.5–18（立杆落在这一行上），第二行 19.5–21，行间空 1.5 = 16px 下 1 像素
// 话筒头宽 6（9–15），托弧外缘半径 6（内缘离话筒头 1.5）；线宽变粗时外缘不动、往里长
const capsule = (stroke) => {
  const h = stroke / 2
  return rounded([[9 + h, 3 + h], [15 - h, 3 + h], [15 - h, 12 - h], [9 + h, 12 - h]], 3)
}
const rest = (stroke) => {
  const h = stroke / 2
  const r = 6 - h
  return [
    `M${12 - r} 9.75A${r} ${r} 0 0 0 ${12 + r} 9.75`,
    `M12 ${9.75 + r}V${18 - h}`,
    // 两行字：第一行通栏 3–21，第二行短一截（3–15），读成文字
    `M${3 + h} ${18 - h}H${21 - h}`,
    `M${3 + h} ${21 - h}H${15 - h}`,
  ]
}

export default ({ stroke }) => [capsule(stroke), ...rest(stroke)]

// 实心：话筒头填实，托弧、立杆和两行字照旧是线
export const fill = ({ stroke }) => [solid(capsule(stroke)), ...rest(stroke)]
