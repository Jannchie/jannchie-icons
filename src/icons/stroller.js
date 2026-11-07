import { GAP } from '../clearance'
import { circle } from '../geometry'
import { cutout, solid } from '../solid'

// 婴儿车（侧视）：车篷（右上四分之一圆，半径 7）和底部收圆的车斗连成一条闭合轮廓，再用一条横线隔开；左侧把手 + 两个轮子。
// 隔线右端停在右边轮廓中线内半个线宽处，线帽正好伸到轮廓中线；尖角模式下方帽角因轮廓往里收而微凸约 0.02（已记入 audit-caps 基线）
export default ({ stroke }) => [
  'M5 10.5H13.5V3.5A7 7 0 0 1 20.5 10.5C20.5 13 18 14.5 15.5 14.5H10C7.5 14.5 5 13 5 10.5Z',
  `M13.5 10.5H${20.5 - stroke / 2}`,
  'M5 10.5L4 6.5H3',
  circle(8, 19, 1.75),
  circle(17, 19, 1.75),
]

// 实心：车篷、车斗分成两块——车篷底边整条让出 GAP 的缝，车斗顶边是一条完整的横边；把手照旧是线，轮子是实心圆
export const fill = ({ stroke }) => [
  solid('M13.5 10.5V3.5A7 7 0 0 1 20.5 10.5Z'),
  cutout(`M12 ${10.5 - stroke / 2 - GAP}H23V12H12Z`),
  solid('M5 10.5H20.5C20.5 13 18 14.5 15.5 14.5H10C7.5 14.5 5 13 5 10.5Z'),
  'M5 10.5L4 6.5H3',
  solid([circle(8, 19, 1.75), circle(17, 19, 1.75)]),
]
