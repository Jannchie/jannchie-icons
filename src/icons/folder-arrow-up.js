import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { arrowUp } from '../symbols'
import { info } from '../tone'

// 文件夹 + 上箭头
export default ({ radius }) => [
  rounded(folder, radius),
  ...info(arrowUp(center, 1, radius)),
]
