import { circle } from '../geometry'

// 华氏度 ℉：左上的小圆 + F
export default ({ radius }) => [
  circle(6, 6.5, 2),
  'M19 6.5H12.5V17.5',
  'M12.5 11.5H17.5',
]
