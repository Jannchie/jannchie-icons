import { pill } from '../controller'
import { dot } from '../scene'

// PS Create 键：竖胶囊 + 中间一点和向上、左上、右上发散的三道短线（竖线落在 11.5 像素中心，整组左移半格）
export default () => [
  pill,
  dot(11.5, 14),
  'M11.5 11.5V8',
  'M9.75 12.25L9 10.5',
  'M13.25 12.25L14 10.5',
]
