import { GAP } from '../clearance'
import { circle, crisp, rounded } from '../geometry'
import { clear, solid } from '../solid'

// 摩托车（侧视、车头朝右）：两个车轮（半径 3.25，轮心 (5.5, 16.5)、(18.5, 16.5)）
// 车身是一块闭合轮廓：后挡泥板 + 座垫（3.5–9.5，高 11.5）往前抬到油箱（11–14，高 9.5），油箱前沿斜下（离前叉留开），底边收在两轮之间（13.5）
// 前叉从前轮心斜上到 (15.5, 7.5)，在顶上折成往后的车把——同一条折线；车把比油箱顶高 2，不压在油箱上
export default ({ radius }) => [
  circle(5.5, 16.5, 3.25),
  circle(18.5, 16.5, 3.25),
  rounded([[3.5, 11.5], [9.5, 11.5], [11, 9.5], [14, 9.5], [15, 11.5], [12.5, 13.5], [9.5, 13.5], [3.5, 12.5, crisp(radius)]], Math.min(radius, 1)),
  'M18.5 16.5L15.5 7.5H13',
]

// 实心：两个车轮是实心圆；车身一块，和前叉、车把一起在轮子上让出缝（车身底边压在轮顶上，不让出缝会粘成一团）
export const fill = ({ radius }) => {
  const body = rounded([[3.5, 11.5], [9.5, 11.5], [11, 9.5], [14, 9.5], [15, 11.5], [12.5, 13.5], [9.5, 13.5], [3.5, 12.5, crisp(radius)]], Math.min(radius, 1))
  const fork = 'M18.5 16.5L15.5 7.5H13'
  return [
    solid([circle(5.5, 16.5, 3.25), circle(18.5, 16.5, 3.25)]),
    clear([body, fork], GAP),
    solid(body),
    fork,
  ]
}
