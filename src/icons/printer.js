import { GAP } from '../clearance'
import { rounded } from '../geometry'
import { dot, eye } from '../scene'
import { clear, cutout, knock, solid } from '../solid'

// 打印机：上方进纸 + 机身 + 下方出纸（纸上两行字）
export default ({ radius, stroke }) => [
  rounded([[7.5, 8.5], [7.5, 3.5], [16.5, 3.5], [16.5, 8.5]], Math.min(radius, 1), false),
  rounded([[7.5, 16.5], [3.5, 16.5], [3.5, 8.5], [20.5, 8.5], [20.5, 16.5], [16.5, 16.5]], Math.min(radius, 2), false),
  rounded([[7.5, 13.5], [16.5, 13.5], [16.5, 20.5], [7.5, 20.5]], Math.min(radius, 1)),
  'M9.5 16.5H14.5',
  'M9.5 18.5H12.5',
  dot(17.5, 11),
]

// 实心：机身、进纸、出纸各一块。进纸和机身之间挖开一道 GAP 的横缝：缝的下沿就是机身顶边的外缘，左右伸出进纸的两侧
// （不用两头带线帽的横线去挖：线帽停在进纸的竖边上只擦到外缘，同 fax）；机身在出纸四周让出缝（和描边版机身在出纸处断开一样），
// 出纸上的两行字挖空（行距随字重加大，见下面的 lead）；指示灯用 eye 挖成圆点（尖角模式下也是圆点、粗字重下不再变大），挪到离出纸的让位区和机身顶边各留 1——
// 描边版的位置在尖角粗字重下会和出纸四周的缝连成一个缺口
export const fill = ({ radius, stroke }) => {
  const h = stroke / 2
  // 两行字的间距：描边版是 2，粗字重下两行的墨迹贴在一起、挖出来连成一块；这里让两行之间至少留 1，以 17.5 为中
  const lead = 2 + Math.max(0, stroke - 1)
  const paper = rounded([[7.5, 13.5], [16.5, 13.5], [16.5, 20.5], [7.5, 20.5]], Math.min(radius, 1))
  return [
    solid(rounded([[3.5, 16.5], [3.5, 8.5], [20.5, 8.5], [20.5, 16.5]], Math.min(radius, 2))),
    solid(rounded([[7.5, 8.5], [7.5, 3.5], [16.5, 3.5], [16.5, 8.5]], Math.min(radius, 1))),
    cutout(`M6 ${8.5 - h - GAP}H18V${8.5 - h}H6Z`),
    knock(eye(17.5, 10.5 - h)),
    clear(paper, GAP),
    solid(paper),
    knock([`M9.5 ${17.5 - lead / 2}H14.5`, `M9.5 ${17.5 + lead / 2}H12.5`]),
  ]
}
