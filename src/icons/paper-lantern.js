import { GAP } from '../clearance'
import { solid, tile } from '../solid'

// 灯笼（红灯笼）：扁圆的灯身（4.5–19.5 × 6.5–16.5，上下各有一段平口 9.5–14.5）+ 上下两个灯口（实心的小方块，压在平口上）
// + 顶上的挂绳 + 底下的穗子；灯身上两道竖的灯骨（从上平口弯到下平口的弧）
// 灯口在描边版里也是实心的（2 高的小框里面只剩半格，粗字重和 16px 下会糊死）
const body = 'M9.5 6.5H14.5C17.5 6.5 19.5 8.75 19.5 11.5C19.5 14.25 17.5 16.5 14.5 16.5H9.5C6.5 16.5 4.5 14.25 4.5 11.5C4.5 8.75 6.5 6.5 9.5 6.5Z'
const ribs = ['M10.5 6.5C8.5 8.5 8.5 14.5 10.5 16.5', 'M13.5 6.5C15.5 8.5 15.5 14.5 13.5 16.5']
const caps = ['M9.5 4H14.5V6.5H9.5Z', 'M9.5 16.5H14.5V19H9.5Z'].map(d => ({ d, fill: true }))
const cord = 'M12 2.75V4'
const tassel = 'M12 19V21.25'

export default () => [body, ...ribs, ...caps, cord, tassel]

// 实心：灯身是完整的一块（灯骨不挖——挖开的三瓣像切开的南瓜）；上下两个灯口各是一小块，和灯身之间留 GAP 的缝；挂绳、穗子照旧是线
export const fill = ({ stroke }) => {
  const h = stroke / 2
  return [
    solid(body),
    tile([9.5, 6.5 - h - GAP - 2, 14.5, 6.5 - h - GAP], 0),
    tile([9.5, 16.5 + h + GAP, 14.5, 16.5 + h + GAP + 2], 0),
    cord,
    tassel,
  ]
}
