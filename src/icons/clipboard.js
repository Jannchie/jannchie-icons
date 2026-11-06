import { GAP } from '../clearance'
import { rounded } from '../geometry'
import { clear, solid } from '../solid'

// 粘贴：剪贴板；顶部的夹子作为 cut，把板子上沿真正断开
export default ({ radius }) => [
  rounded([[5.5, 4.5], [18.5, 4.5], [18.5, 20.5], [5.5, 20.5]], Math.min(radius, 2)),
  { d: rounded([[9.5, 3.5], [14.5, 3.5], [14.5, 6.5], [9.5, 6.5]], Math.min(radius, 1)), cut: true },
]

// 实心：板子一块，在夹子四周让出缝（和描边版断线的间隙一样），夹子也是实心
export const fill = ({ radius }) => {
  const clip = rounded([[9.5, 3.5], [14.5, 3.5], [14.5, 6.5], [9.5, 6.5]], Math.min(radius, 1))
  return [
    solid(rounded([[5.5, 4.5], [18.5, 4.5], [18.5, 20.5], [5.5, 20.5]], Math.min(radius, 2))),
    clear(clip, GAP),
    solid(clip),
  ]
}
