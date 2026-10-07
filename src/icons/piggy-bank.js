import { circle } from '../geometry'
import { eye, softEar } from '../scene'

// 存钱罐（侧视、猪鼻朝右）：圆润的椭圆猪身（中心 (11.5, 13)、半轴 7.5 × 5.5）+ 头顶一只软耳朵 + 右边圆角的短猪鼻 +
// 两条敦实的短腿（宽 2，竖边在 .5 上，落到 20.5）+ 背上的投币口 + 投币口上方一枚硬币 + 眼睛 + 左边往上翘的小尾巴（尾尖离猪身留开，尖角模式下线头不碰轮廓）
const [cx, cy, rx, ry] = [11.5, 13, 7.5, 5.5]
const r3 = v => +v.toFixed(3)
// 猪身上 x 处的上 / 下沿、y 处的右沿
const topAt = x => r3(cy - ry * Math.sqrt(1 - ((x - cx) / rx) ** 2))
const bottomAt = x => r3(cy + ry * Math.sqrt(1 - ((x - cx) / rx) ** 2))
const rightAt = y => r3(cx + rx * Math.sqrt(1 - ((y - cy) / ry) ** 2))
// 短腿：左右两条竖边从猪身下沿落到 20.5，底边圆角
const leg = (x0, x1) => `M${x0} ${bottomAt(x0)}V19.5A1 1 0 0 0 ${x0 + 1} 20.5A1 1 0 0 0 ${x1} 19.5V${bottomAt(x1)}`
export default () => [
  `M${cx - rx} ${cy}A${rx} ${ry} 0 0 1 ${cx + rx} ${cy}A${rx} ${ry} 0 0 1 ${cx - rx} ${cy}Z`,
  // 耳朵：耳根在猪身上沿 x 13.5 和 17.5，耳尖 (16.5, 4.5)
  `M13.5 ${topAt(13.5)}${softEar([13.5, topAt(13.5)], [16.5, 4.5], [17.5, topAt(17.5)], 1.15)}`,
  // 猪鼻：从猪身右沿伸出 1.5，上下 11.5–14.5，前端圆角
  `M${rightAt(11.5)} 11.5H20.5A1 1 0 0 1 21.5 12.5V13.5A1 1 0 0 1 20.5 14.5H${rightAt(14.5)}`,
  leg(6.5, 8.5),
  leg(14.5, 16.5),
  'M9.5 10.5H12.5',
  circle(10.5, 3.75, 1.75),
  eye(16, 11.5),
  // 尾巴是一小段弯线，尖角模式下也用圆头（方头在弯处会从猪身轮廓外冒出来）
  { d: `M4.5 12.5C2.75 12.5 2.25 11.25 2.75 10.25`, round: true },
]
