import { plain, center, centerScale } from '../briefcase'
import { cloud } from '../symbols'

// 公文包 + 云
export default ({ radius }) => [
  ...plain(radius),
  ...cloud(center, centerScale, radius),
]
