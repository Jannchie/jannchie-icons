import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { check } from '../symbols'
import { success } from '../tone'

// 文件 + 勾
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...success(check(center, 1, radius)),
]
