import { crisp, rounded } from '../geometry'

// 魔方：30° 等距视角的立方体（六边形 + Y 形棱）+ 每个面一横一竖的分格线（2 × 2）
export default ({ radius }) => [
  rounded([[12, 2.5], [20.25, 7.25], [20.25, 16.75], [12, 21.5], [3.75, 16.75], [3.75, 7.25]], crisp(radius)),
  'M3.75 7.25L12 12L20.25 7.25',
  'M12 12V21.5',
  { d: 'M7.88 4.88L16.13 9.63', thin: true },
  { d: 'M16.13 4.88L7.88 9.63', thin: true },
  { d: 'M7.88 9.63V19.13', thin: true },
  { d: 'M3.75 12L12 16.75', thin: true },
  { d: 'M16.13 9.63V19.13', thin: true },
  { d: 'M20.25 12L12 16.75', thin: true },
]
