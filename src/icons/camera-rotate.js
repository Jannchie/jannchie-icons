import { crisp, rounded } from '../geometry'
import camera from './camera'

// 翻转镜头：相机外形（不画镜头圆）+ 机身里两段首尾相追的半圆箭头
const [cx, cy, r] = [12, 13.25, 3.25]
export default ({ radius }) => [
  camera({ radius })[0],
  `M${cx - r} ${cy}A${r} ${r} 0 0 1 ${cx + r} ${cy}`,
  rounded([[cx + r - 1.75, cy - 1.75], [cx + r, cy], [cx + r + 1.75, cy - 1.75]], crisp(radius), false),
  `M${cx + r} ${cy + 0.01}A${r} ${r} 0 0 1 ${cx - r} ${cy + 0.01}`,
  rounded([[cx - r - 1.75, cy + 1.75], [cx - r, cy], [cx - r + 1.75, cy + 1.75]], crisp(radius), false),
]
