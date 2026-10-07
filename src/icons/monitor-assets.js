import { plain, center, centerScale } from '../monitor'
import { assets } from '../symbols'
import { accent } from '../tone'

// 显示器 + 素材
export default ({ radius }) => [
  ...plain(radius),
  ...accent(assets(center, centerScale, radius)),
]
