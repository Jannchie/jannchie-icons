import { rounded } from '../geometry'

// 马赛克图（Marimekko）：方框里三列宽度不等，每列再按不同比例横向切分
export default ({ radius }) => [
  rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 20.5], [3.5, 20.5]], Math.min(radius, 2)),
  'M10 3.5V20.5',
  'M15 3.5V20.5',
  'M3.5 9H10',
  'M10 13H15',
  'M15 7.5H20.5',
  'M15 14.5H20.5',
]
