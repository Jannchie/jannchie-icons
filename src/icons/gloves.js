import { GAP } from '../clearance'
import { rounded } from '../geometry'
import { clear, knock, solid } from '../solid'

// 手套（手背朝前）：手的部分和 hand 同一个造型（四根宽 3 的 U 形手指 6.5–18.5、大拇指往左上斜出），
// 但四根手指并拢、指缝是从指根往下的三道短线，手掌底下接一截宽一点的罗纹袖口（5.5–19.5 × 15.5–20.5，三道竖纹）
// 袖口是手套的记号：没有它就是 hand；有五根手指，和 boxing-glove（连指的拳套）区分开
const glove = 'M7 15.5L3.8 12.3A1.5 1.5 0 0 1 5.9 10.2L6.5 10.8V6A1.5 1.5 0 0 1 9.5 6V4.5A1.5 1.5 0 0 1 12.5 4.5V6A1.5 1.5 0 0 1 15.5 6V8.5A1.5 1.5 0 0 1 18.5 8.5V15.5'
const cuff = radius => rounded([[5.5, 15.5], [19.5, 15.5], [19.5, 20.5], [5.5, 20.5]], Math.min(radius, 1))
const seams = ['M9.5 6V10', 'M12.5 6V10', 'M15.5 8.5V10']
const ribs = { d: 'M9.5 15.5V20.5M12.5 15.5V20.5M15.5 15.5V20.5', detail: true }

export default ({ radius }) => [glove, cuff(radius), ...seams, ribs]

// 实心：手套一块（底边用直线封上），指缝从指尖之间一直挖到指根；袖口在前，手套在袖口四周让出缝
export const fill = ({ radius }) => [
  solid(`${glove}Z`),
  knock(['M9.5 2V10', 'M12.5 2V10', 'M15.5 2V10']),
  clear(cuff(radius), GAP),
  solid(cuff(radius)),
]
