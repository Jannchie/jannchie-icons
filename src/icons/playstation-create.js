import { pill } from '../controller'
import { dot } from '../scene'

// PS Create 键：竖胶囊 + 中间一点和向上、左上、右上发散的三道短线（竖线落在中轴 12 上，两道斜线左右对称）
export default () => [
  pill,
  dot(12, 14),
  'M12 11.5V8',
  'M10.25 12.25L9.5 10.5',
  'M13.75 12.25L14.5 10.5',
]
