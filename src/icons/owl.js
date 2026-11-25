import { circle } from '../geometry'
import { eye } from '../scene'
import { hole, knock, solid } from '../solid'

// 猫头鹰：正面。一条闭合轮廓：头顶两角翘起的耳羽（(3.5, 3.5) / (20.5, 3.5)）、中间往下兜的头顶、直身子、圆底（到 20.5）；
// 两只相切的大圆眼（圆心 (9, 11.5) / (15, 11.5)、半径 3）+ 眼珠 + 两眼下面的小三角喙（15.5 起，粗字重下也不碰眼圈）
const body = 'M3.5 3.5C5 5.25 8.5 5.75 12 5.75C15.5 5.75 19 5.25 20.5 3.5V13C20.5 17.5 16.75 20.5 12 20.5C7.25 20.5 3.5 17.5 3.5 13Z'
const discs = [circle(9, 11.5, 3), circle(15, 11.5, 3)]
const pupils = [eye(9, 11.5), eye(15, 11.5)]
const beak = { d: 'M11 15.5H13L12 17.25Z', fill: true }

export default () => [body, ...discs, ...pupils, beak]

// 实心：身子一块，两只大眼挖成洞（和描边版眼圈的内缘一样大），眼珠是洞里的实心点；喙挖空
export const fill = ({ stroke }) => [
  solid(body),
  hole([circle(9, 11.5, 3 - stroke), circle(15, 11.5, 3 - stroke)]),
  knock({ ...beak, round: true }),
  ...pupils,
]
