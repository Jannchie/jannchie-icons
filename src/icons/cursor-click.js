import { crisp, rounded } from '../geometry'
import { pointer } from './cursor'

// 点击：箭头往右下挪，尖端左上方三道放射短线
// 右移 3、下移 2，竖边和底边仍在 .5 上
const shifted = pointer.map(([x, y]) => [x + 3, y + 2])

export default ({ radius }) => [
  rounded(shifted.map((p, i) => (i === 0 ? [...p, crisp(radius)] : p)), Math.min(radius, 1)),
  'M9.5 2V3.5',
  'M3.75 4.5H5.25',
  'M5.5 1.5L6.5 2.5',
]
