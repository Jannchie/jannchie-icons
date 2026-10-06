import { crisp, rounded } from '../geometry'
import { rotate } from '../transform'

// 编辑：先画一支竖直的铅笔（笔尖朝下、笔杆半宽 2.5、上端一道橡皮分隔线），
// 再顺时针转 30°，与水平成 60°，和斜放的曲别针同角度
export default ({ radius }) => [
  rotate(rounded([[12, 21, crisp(radius)], [9.5, 16.5], [9.5, 3.5], [14.5, 3.5], [14.5, 16.5]], Math.min(radius, 1)), 30),
  rotate('M9.5 7L14.5 7', 30),
]
