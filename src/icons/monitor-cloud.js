import { plain, center, centerScale } from '../monitor'
import { cloud } from '../symbols'
import { info } from '../tone'

// 显示器 + 云
export default ({ radius }) => [
  ...plain(radius),
  ...info(cloud(center, centerScale, radius)),
]
