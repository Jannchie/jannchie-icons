import { rounded } from '../geometry'
import { solid } from '../solid'

// 甘特图：左侧时间轴 + 三行左右错开的横条
export default ({ radius }) => [
  'M3.5 3V21',
  rounded([[6.5, 4.5], [13.5, 4.5], [13.5, 7.5], [6.5, 7.5]], Math.min(radius, 1)),
  rounded([[10.5, 10.5], [17.5, 10.5], [17.5, 13.5], [10.5, 13.5]], Math.min(radius, 1)),
  rounded([[14.5, 16.5], [20.5, 16.5], [20.5, 19.5], [14.5, 19.5]], Math.min(radius, 1)),
]

// 实心：三根横条填实，时间轴照旧是线
export const fill = ({ radius }) => [
  'M3.5 3V21',
  solid(rounded([[6.5, 4.5], [13.5, 4.5], [13.5, 7.5], [6.5, 7.5]], Math.min(radius, 1))),
  solid(rounded([[10.5, 10.5], [17.5, 10.5], [17.5, 13.5], [10.5, 13.5]], Math.min(radius, 1))),
  solid(rounded([[14.5, 16.5], [20.5, 16.5], [20.5, 19.5], [14.5, 19.5]], Math.min(radius, 1))),
]
