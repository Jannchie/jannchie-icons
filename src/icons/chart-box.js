import { rounded } from '../geometry'

// 箱线图：两个箱体（中位线）+ 上下须线和须端短横
export default ({ radius }) => [
  rounded([[6, 9], [10, 9], [10, 15], [6, 15]], Math.min(radius, 0.75)),
  'M6 12H10',
  'M8 9V5',
  'M8 15V19',
  'M7 5H9',
  'M7 19H9',
  rounded([[14, 7], [18, 7], [18, 12.5], [14, 12.5]], Math.min(radius, 0.75)),
  'M14 10H18',
  'M16 7V4',
  'M16 12.5V17',
  'M15 4H17',
  'M15 17H17',
]
