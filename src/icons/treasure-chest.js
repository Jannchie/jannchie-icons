import { rounded } from '../geometry'
import { clear, knock, solid } from '../solid'
import { GAP } from '../clearance'

// 宝箱：拱形箱盖（两角半径 4 的圆弧）+ 箱身 + 正中压在接缝上的锁扣；锁扣是刀，接缝在它两侧断开
const lid = 'M3.5 11.5V8.5A4 4 0 0 1 7.5 4.5H16.5A4 4 0 0 1 20.5 8.5V11.5'
const body = radius => rounded([[3.5, 11.5], [20.5, 11.5], [20.5, 20.5], [3.5, 20.5]], Math.min(radius, 1.5))
const clasp = radius => rounded([[10.5, 9.5], [13.5, 9.5], [13.5, 13.5], [10.5, 13.5]], Math.min(radius, 1))

export default ({ radius }) => [lid, body(radius), { d: clasp(radius), cut: true }]

// 实心：箱盖、箱身各一块，中间挖开接缝；锁扣四周让出缝，锁扣本身也是实心
export const fill = ({ radius }) => [
  solid(`${lid}Z`),
  solid(body(radius)),
  knock('M3.5 11.5H20.5'),
  clear(clasp(radius), GAP),
  solid(clasp(radius)),
]
