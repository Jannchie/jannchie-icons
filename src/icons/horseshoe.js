import { num } from '../geometry'
import { eye } from '../scene'
import { knock, solid } from '../solid'

// 马蹄铁：开口朝下的一圈厚铁条——外圈是半径 8.5 的半圆（圆心 (12, 11)，顶到 2.5），内圈半径 4；两条腿往下、往里收，
// 越往下越窄（上面宽 4.5，蹄踵宽 4），平平地落在 20.5；铁条上左右各三个钉孔（沿着铁条的中线，半径 6.25 处，每 40° 一个）
// 靠「往里收的圆弧形 + 一圈钉孔」认出来；magnet 是开口朝上的直腿 U 形，腿上是分磁极的横线
const shoe = 'M5.5 20.5C4.25 18 3.5 14.5 3.5 11A8.5 8.5 0 0 1 20.5 11C20.5 14.5 19.75 18 18.5 20.5H14.5C15.5 17.5 16 14 16 11A4 4 0 0 0 8 11C8 14 8.5 17.5 9.5 20.5Z'
const NAILS = [165, 205, 245, 295, 335, 15].map(deg => eye(num(12 + 6.25 * Math.cos(deg * Math.PI / 180)), num(11 + 6.25 * Math.sin(deg * Math.PI / 180)), 1.5))

export default () => [shoe, ...NAILS]

// 实心：马蹄铁一块，钉孔挖空
export const fill = () => [solid(shoe), knock(NAILS)]
