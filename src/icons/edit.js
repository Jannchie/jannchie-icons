import { crisp, rounded } from '../geometry'
import { knock, solid } from '../solid'
import { rotate } from '../transform'

// 编辑：先画一支竖直的铅笔（笔尖朝下、笔杆半宽 2.5、上端一道橡皮分隔线），
// 再顺时针转 30°，与水平成 60°，和斜放的曲别针同角度
export default ({ radius }) => [
  rotate(rounded([[12, 21, crisp(radius)], [9.5, 16.5], [9.5, 3.5], [14.5, 3.5], [14.5, 16.5]], Math.min(radius, 1)), 30),
  rotate('M9.5 7L14.5 7', 30),
]

// 实心：铅笔一块，挖掉橡皮分隔线（橡皮头分成单独一截）；分隔线两端横着穿出笔杆两侧（停在笔杆中线上的线帽只擦到外缘，留一道细桥）
export const fill = ({ radius, stroke }) => [
  solid(rotate(rounded([[12, 21, crisp(radius)], [9.5, 16.5], [9.5, 3.5], [14.5, 3.5], [14.5, 16.5]], Math.min(radius, 1)), 30)),
  knock(rotate(`M${9.5 - stroke} 7H${14.5 + stroke}`, 30)),
]
