import { rounded } from '../geometry'
import { rotate } from '../transform'

// 拐杖（腋下拐）：顶上一道腋托（横线 8.5–15.5）+ 从腋托两头垂下来、往下收拢成一根的两条侧杆 + 两条侧杆之间的握把（横线）+ 收拢以后的一根支脚；
// 竖着画再顺时针转 20°，腋托在右上
// 都是线，没有实心版
export default ({ radius }) => [
  'M8.5 2.75H15.5',
  rounded([[9.5, 2.75], [9.5, 9.5], [12, 14.5], [14.5, 9.5], [14.5, 2.75]], Math.min(radius, 1), false),
  'M9.5 8.5H14.5',
  'M12 14.5V21.25',
].map(d => rotate(d, 20))
