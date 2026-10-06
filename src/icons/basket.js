import { rounded } from '../geometry'

// 购物篮：上宽下窄的篮身 + 两道斜上的提手 + 三根竖向篮条
export default ({ radius }) => [
  rounded([[3, 10], [21, 10], [19, 20], [5, 20]], Math.min(radius, 1.5)),
  'M7 10L10 4',
  'M17 10L14 4',
  'M9.5 13V17',
  'M12 13V17',
  'M14.5 13V17',
]
