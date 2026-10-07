import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { arrowDown } from '../symbols'
import { info } from '../tone'

// 文件夹 + 下箭头
export default ({ radius }) => [
  rounded(folder, radius),
  ...info(arrowDown(center, 1, radius)),
]
