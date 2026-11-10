import { dot } from '../scene'
import { solid } from '../solid'

// 浪头：一道从左下涌起、在右上翻卷成钩的浪（浮世绘浪花的简化），浪尖前面飞出两颗水滴
// 一条闭合轮廓：底边 → 浪背往上 → 浪顶往前翻下来到浪尖 → 浪腹（内弯）回到底边右端
// 底边外缘固定在 21、左端外缘在 2（线宽变粗往里长）；浪顶外缘在 3，上下留白一样
const wave = (stroke) => {
  const h = stroke / 2
  return `M${2 + h} ${21 - h}C5.25 19 6.5 16 7.25 12.5C8.25 7.75 10.5 3.75 14 3.75C17.5 3.75 19.25 7.25 17.75 11C17.75 9 16.5 7.75 15 7.75C13.25 7.75 12 9.5 12.25 12C12.65 16 15.5 19.25 19.25 ${21 - h}Z`
}
const drops = [dot(20.75, 4.5, 1.75), dot(21, 9.25, 1.75)]

export default ({ stroke }) => [wave(stroke), ...drops]

// 实心：浪填实，水滴照旧是点
export const fill = ({ stroke }) => [solid(wave(stroke)), ...drops]
