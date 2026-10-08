import { crisp, rounded } from '../geometry'
import { cross } from '../symbols'
import { danger } from '../tone'

// 清除格式：带衬线的 T（顶横 3.5–17.5 两端下垂到 7、竖画 10.5、底横 7.5–13.5）+ 右下一个叉（5 × 5，中心 (18, 17)）
// 竖线 3.5 / 10.5 / 17.5、横线 4.5 / 19.5 都落在 .5 上；叉和 T 的竖画隔 5，和顶横的下垂端隔开 7.5
export default ({ radius }) => [
  rounded([[3.5, 7], [3.5, 4.5], [17.5, 4.5], [17.5, 7]], crisp(radius), false),
  'M10.5 4.5V19.5',
  'M7.5 19.5H13.5',
  ...danger(cross([18, 17], 1.25, radius)),
]
