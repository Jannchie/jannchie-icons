import { rounded } from '../geometry'

// 椅子（侧视，朝右）：靠背立柱从 3.5 一直落到地面（20.5），同时是后腿；座面在 12.5 往右伸到 16.5，再垂直落成前腿。
// 靠背顶端往右折出一小段横档（到 10.5），和座面隔开 9，粗字重下也不挤
export default ({ radius }) => [
  rounded([[10.5, 3.5], [7.5, 3.5], [7.5, 20.5]], Math.min(radius, 1.5), false),
  rounded([[7.5, 12.5], [16.5, 12.5], [16.5, 20.5]], Math.min(radius, 1.5), false),
]
