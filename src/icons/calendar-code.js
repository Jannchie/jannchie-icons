import { base, center, centerScale } from '../calendar'
import { code, visual } from '../symbols'
import { accent } from '../tone'

// 日历 + 代码
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...accent(code(center, centerScale * visual.code, radius)),
]
