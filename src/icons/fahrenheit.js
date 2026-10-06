import { circle } from '../geometry'

// 华氏度 ℉：左上的小圆 + F
export default ({ radius }) => [
  circle(6, 6.5, 2),
  'M19 6.5H12V17.5',
  'M12 12H17.5',
]
