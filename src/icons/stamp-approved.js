import { circle } from '../geometry'
import { ring } from '../marks'
import { check } from '../symbols'
import { success } from '../tone'

// 盖好的批准印：圆形印外圈（半径 9）+ 细线内圈（半径 6.75）+ 中间一个勾
export default ({ radius }) => [
  ring(),
  { d: circle(12, 12, 6.75), thin: true },
  ...success(check([12, 12], 1.1, radius)),
]
