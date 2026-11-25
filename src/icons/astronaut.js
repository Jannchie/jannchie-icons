import { circle } from '../geometry'
import { hole, solid } from '../solid'
import { affine } from '../transform'

// 宇航员（头盔）：圆头盔（圆心 (12, 10.75)、半径 7.75）+ 头盔正面的大面罩（7.5–16.5 × 7.25–14.75，上平下圆）+ 面罩左上一道反光（细节线）
// + 头盔两侧的耳罩（两小块实心的方块，压在头盔的线上；没有它像一只摄像头）+ 头盔底下的颈环（横线）
const helmet = circle(12, 10.75, 7.75)
const visor = 'M7.5 9.75C7.5 8.25 9 7.25 12 7.25C15 7.25 16.5 8.25 16.5 9.75V11.5C16.5 13.5 15 14.75 12 14.75C9 14.75 7.5 13.5 7.5 11.5Z'
const glint = { d: 'M9.75 10.25C10 9.5 10.75 9.25 11.5 9.25', detail: true }
const ears = ['M2.25 9H4.75V12.5H2.25Z', 'M19.25 9H21.75V12.5H19.25Z'].map(d => ({ d, fill: true }))
const collar = 'M8.5 20.5H15.5'

export default () => [helmet, visor, glint, ...ears, collar]

// 实心：头盔一块，面罩挖成洞（和描边版面罩的内缘差不多大），反光是洞里的线；耳罩、颈环照旧
export const fill = ({ stroke }) => {
  // 面罩半宽 4.5、半高 3.75，往里收一个线宽（hole 会再外扩半个）
  const [sx, sy] = [(4.5 - stroke) / 4.5, (3.75 - stroke) / 3.75]
  return [solid(helmet), hole(affine(visor, sx, sy, 12 * (1 - sx), 11 * (1 - sy))), glint, ...ears, collar]
}
