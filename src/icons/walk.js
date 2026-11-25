import { rounded } from '../geometry'
import { dot } from '../scene'

// 步行：往右走的小人，身体直立（头点 3，同 run 的头身比例）。两臂是一笔：后手 → 肩 (12, 8.5) → 前肘 → 前手（小臂往前抬）；
// 躯干从肩竖直落到胯 (12, 14.5)；两腿是一笔：后脚 → 胯 → 前膝 → 前脚（小腿竖直落地）
export default ({ radius }) => [
  dot(12.5, 4.5, 3),
  rounded([[8.5, 13], [12, 8.5], [14.5, 11.5], [16.5, 10.5]], Math.min(radius, 1), false),
  'M12 8.5V14.5',
  rounded([[8.5, 20.5], [12, 14.5], [14.5, 17.5], [14.5, 20.5]], Math.min(radius, 1), false),
]
