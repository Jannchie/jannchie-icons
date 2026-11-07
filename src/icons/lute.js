import { circle } from '../geometry'
import { hole, knock, solid } from '../solid'
import { rotate } from '../transform'

// 鲁特琴：上窄下宽的梨形琴身（没有吉他那样的腰）+ 音孔 + 琴桥 + 两条边的琴颈 + 往后折成直角的弦轴箱；
// 竖着画再逆时针转 45°，琴头朝左上（和 guitar 同向）
const body = 'M12 10C9.75 10 7.25 13.25 7.25 16.5C7.25 19.5 9.5 21.5 12 21.5C14.5 21.5 16.75 19.5 16.75 16.5C16.75 13.25 14.25 10 12 10Z'
const rose = circle(12, 15.5, 1.5)
const bridge = 'M10.5 19.5H13.5'
// 琴颈两条边伸进琴身里一点，和琴身弧形的顶连上（停在 y 10 会和弧线之间留一道细缝）
const neck = 'M11 10.75V4.5H13V10.75'
const pegbox = 'M11 4.5L8 2.5'

export default () => [body, rose, bridge, neck, pegbox].map(d => rotate(d, -45))

// 实心：琴身和琴颈一块，音孔挖成圆洞（只挖一圈的话中间剩一个小点，粗字重下只有针眼大），挖掉琴桥；弦轴箱照旧是线
export const fill = () => [
  solid([rotate(body, -45), rotate(`${neck}Z`, -45)]),
  hole(rotate(rose, -45)),
  knock(rotate(bridge, -45)),
  rotate(pegbox, -45),
]
