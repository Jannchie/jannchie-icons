import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 鼠标：竖放的胶囊（7–17 × 3.5–20.5，圆角固定 5 = 半宽，同 bug 的身子）+ 顶部中线上的滚轮（7–10）
export default () => [
  rounded([[7, 3.5], [17, 3.5], [17, 20.5], [7, 20.5]], 5),
  'M12 7V10',
]

// 实心：机身一块，挖掉滚轮
export const fill = () => [
  solid(rounded([[7, 3.5], [17, 3.5], [17, 20.5], [7, 20.5]], 5)),
  knock('M12 7V10'),
]
