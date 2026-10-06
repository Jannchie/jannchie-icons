import { rounded } from '../geometry'

// 立方体：30° 等距视角的六边形 + 三条内棱
export default ({ radius }) => [
  rounded([[12, 3], [19.8, 7.5], [19.8, 16.5], [12, 21], [4.2, 16.5], [4.2, 7.5]], Math.min(radius, 1)),
  'M4.2 7.5L12 12L19.8 7.5',
  'M12 12V21',
]
