import { GAP } from '../clearance'
import { rounded } from '../geometry'
import { clear, solid } from '../solid'
import { rotate } from '../transform'
import wrench, { fill as wrenchFill } from './wrench'

// 工具：扳手（头朝右上，同 wrench）和螺丝刀交叉。螺丝刀先竖直画——刀头在上（一字口），细刀杆，下面圆角手柄——
// 再逆时针转 45°，刀头朝左上、手柄朝右下；螺丝刀作为 cut，扳手在交叉处断开、压在下面
const screwdriver = radius => [
  'M12 3.5V11',
  rounded([[10.25, 11], [13.75, 11], [13.75, 20.5], [10.25, 20.5]], Math.min(radius, 1.5)),
].map(d => ({ d: rotate(d, -45), cut: true }))

export default opts => [...wrench(opts), ...screwdriver(opts.radius)]

// 实心：扳手的实心版，在螺丝刀四周让出缝（和描边版扳手在交叉处断开一样），再画螺丝刀：手柄填实，刀杆照旧是线
export const fill = (opts) => {
  const [shaft, handle] = screwdriver(opts.radius).map(({ cut, ...p }) => p)
  return [...wrenchFill(opts), clear([shaft, handle], GAP), shaft, solid(handle)]
}
