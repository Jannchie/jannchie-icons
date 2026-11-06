import { GAP } from '../clearance'
import { rounded } from '../geometry'
import { clear, knock, solid } from '../solid'
import { image } from '../symbols'
import { rotate } from '../transform'

// 修图：相框往左上挪 + 右下角一支斜放的小铅笔；铅笔作为 cut，相框在附近断开
const pencil = rotate(rounded([[16.25, 13], [18.75, 13], [18.75, 20], [17.5, 22], [16.25, 20]], 0.5), 45, [17.5, 17.5])
export default ({ radius }) => [
  ...image([10.5, 10.5], 2.1, radius).map(p => p.d ?? p),
  { d: pencil, cut: true, tone: 'accent' },
]

// 实心：相框一块，挖掉太阳点和山形线；在铅笔四周让出缝（和描边版的断口一样），铅笔也是实心
export const fill = ({ radius }) => {
  const [frame, ...scene] = image([10.5, 10.5], 2.1, radius).map(p => p.d ?? p)
  return [solid(frame), knock(scene), clear(pencil, GAP), solid({ d: pencil, tone: 'accent' })]
}
