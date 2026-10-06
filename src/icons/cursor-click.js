import { crisp, rounded } from '../geometry'
import { pointer } from './cursor'

// 点击：箭头往右下挪，尖端左上方三道放射短线
const shifted = pointer.map(([x, y]) => [x + 2.5, y + 1.5])

export default ({ radius }) => [
  rounded(shifted.map((p, i) => (i === 0 ? [...p, crisp(radius)] : p)), Math.min(radius, 1)),
  'M9.25 2V3.5',
  'M3.75 5H5.25',
  'M5.25 1.5L6.25 2.5',
]
