import { rounded } from '../geometry'
import { solid } from '../solid'

// 里程碑：立杆（12.5）+ 一块朝右的箭头旗牌（4.5–20，6.5–12.5）；立杆在牌子上下各露一段，垂直接在牌边上
export default ({ radius }) => [
  rounded([[4.5, 6.5], [16.5, 6.5], [20, 9.5], [16.5, 12.5], [4.5, 12.5]], Math.min(radius, 1)),
  'M12.5 2.5V6.5',
  'M12.5 12.5V21.5',
]

// 实心：箭头旗牌填实，立杆照旧是线
export const fill = ({ radius }) => [
  solid(rounded([[4.5, 6.5], [16.5, 6.5], [20, 9.5], [16.5, 12.5], [4.5, 12.5]], Math.min(radius, 1))),
  'M12.5 2.5V6.5',
  'M12.5 12.5V21.5',
]
