import { solid } from '../solid'
import { affine } from '../transform'
import { HEART } from './heart'

// 拥抱：中间一颗小爱心（heart 缩到 0.55 倍），左右两条手臂从下往上把它环抱起来——
// 两道弧同在一个圆上（圆心 (12, 12)，外缘固定在半径 10，线宽变粗往里长），底下留一个小口，
// 顶上两只「手」合拢但不碰上，留一个大一点的口
const K = 0.55
const heart = affine(HEART, K, K, 12 - 12 * K, 12.25 - 12.25 * K)
const [BOTTOM, TOP] = [12, 22] // 底部、顶部缺口的半张角（度）
const arms = (stroke) => {
  const R = 10 - stroke / 2
  const at = (deg) => {
    const a = deg * Math.PI / 180
    return `${+(12 + R * Math.sin(a)).toFixed(3)} ${+(12 + R * Math.cos(a)).toFixed(3)}`
  }
  // 角度从正下方量起，往右为正
  return [
    `M${at(-BOTTOM)}A${R} ${R} 0 0 1 ${at(-180 + TOP)}`,
    `M${at(BOTTOM)}A${R} ${R} 0 0 0 ${at(180 - TOP)}`,
  ]
}

export default ({ stroke }) => [heart, ...arms(stroke)]

// 实心：爱心填实，两条手臂照旧是线
export const fill = ({ stroke }) => [solid(heart), ...arms(stroke)]
