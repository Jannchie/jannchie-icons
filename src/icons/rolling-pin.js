import { rounded } from '../geometry'
import { stacked } from '../solid'
import { rotate } from '../transform'

// 擀面杖：从左下到右上的斜 45°。先横着画，再逆时针转 45°：中间一根粗的圆角滚筒（4.5–19.5 × 9–15）+ 两头各一个细一号的把手（宽 3，伸出去 4，外端圆角，根部接在滚筒的端面上）
// 粗滚筒 + 两头细把手是擀面杖的记号：和两头是大片的 dumbbell、两头拧成三角的 candy 区分开
const tilt = d => rotate(d, -45)
const roller = radius => tilt(rounded([[4.5, 9], [19.5, 9], [19.5, 15], [4.5, 15]], Math.min(radius, 2)))
// 把手：三边，开口的两个线头落在滚筒的端面上
const handles = radius => [
  rounded([[4.5, 10.5], [0.5, 10.5], [0.5, 13.5], [4.5, 13.5]], Math.min(radius, 1.5), false),
  rounded([[19.5, 10.5], [23.5, 10.5], [23.5, 13.5], [19.5, 13.5]], Math.min(radius, 1.5), false),
].map(tilt)

export default ({ radius }) => [roller(radius), ...handles(radius)]

// 实心：两个把手（封口）在后、滚筒在前，把手在滚筒的端面外让出缝
export const fill = ({ radius }) => stacked(handles(radius).map(d => `${d}Z`), roller(radius))
