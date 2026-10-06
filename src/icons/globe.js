import { circle } from '../geometry'

// 地球：圆 + 中央经线（椭圆）+ 赤道 + 两条纬线
export default () => [
  circle(12, 12, 9),
  'M12 3A4.5 9 0 0 1 12 21A4.5 9 0 0 1 12 3',
  'M3 12H21',
  'M4.25 7.5H19.75',
  'M4.25 16.5H19.75',
]
