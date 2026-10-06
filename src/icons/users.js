import { circle } from '../geometry'

// 多人：前面一人完整，后面一人只露出右半边的头和肩
export default () => [
  circle(9, 9, 3.25),
  'M3 20A6 6 0 0 1 15 20',
  'M15 5.6A3 3 0 1 1 16.5 11.25',
  'M17 14.25A5.5 5.5 0 0 1 21 19.5',
]
