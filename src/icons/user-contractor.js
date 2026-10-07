import { crisp, rounded } from '../geometry'
import { withPaths } from '../user'

// 外包 / 合同工：人像 + 右下角的合同（手画的简化版：右上折角的文件 + 两行字，原 file-text 缩小后线条挤成一团）
// 文件 14.5–21.5 × 12.5–21.5，字用细线，离边框 2 以上
export default ({ radius }) => withPaths([
  rounded([[14.5, 12.5], [19.5, 12.5, crisp(radius)], [21.5, 14.5, crisp(radius)], [21.5, 21.5], [14.5, 21.5]], Math.min(radius, 1)),
  { d: 'M16.5 16.5H19.5M16.5 19H19.5', thin: true },
])
