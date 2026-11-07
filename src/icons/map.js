import { circle, crisp, rounded } from '../geometry'
import { knock, solid } from '../solid'

// 地图：三折的折页 + 两道折痕；竖边都落在 .5 上（三折宽 6 / 5 / 6）
export default ({ radius, stroke }) => [
  rounded([[3.5, 6], [9.5, 3.5], [14.5, 6], [20.5, 3.5], [20.5, 18], [14.5, 20.5], [9.5, 18], [3.5, 20.5]], Math.min(radius, 1)),
  'M9.5 3.5V18',
  'M14.5 6V20.5',
]

// 实心：折页一块，两道折痕整条竖着挖穿，分成三折——折痕停在折页的尖角、凹角上的话，上端的线帽把尖角啃出缺口，
// 下端在凹角下面留一道窄桥，三折没有真正分开
export const fill = ({ radius }) => [
  solid(rounded([[3.5, 6], [9.5, 3.5], [14.5, 6], [20.5, 3.5], [20.5, 18], [14.5, 20.5], [9.5, 18], [3.5, 20.5]], Math.min(radius, 1))),
  knock(['M9.5 0V24', 'M14.5 0V24']),
]
