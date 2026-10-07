import { rounded } from '../geometry'
import { BADGE, withPaths } from '../user'

// 远程办公：人像 + 右下角的小房子（手画的简化版：五边形屋身 + 一扇门，原 home 缩小后窗户、门挤成一团）
// 屋身 14.5–21.5 × 12.5–21.5（尖顶在角标中心正上方），门用细线
const [x] = BADGE
export default ({ radius }) => withPaths([
  rounded([[x, 12.5], [21.5, 15.5], [21.5, 21.5], [14.5, 21.5], [14.5, 15.5]], Math.min(radius, 1)),
  { d: `M${x - 1} 21.5V19H${x + 1}V21.5`, thin: true },
])
