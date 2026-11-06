import { GAP } from '../clearance'
import { circle, crisp, rounded } from '../geometry'
import { dot } from '../scene'
import { clear, knock, solid } from '../solid'

// 打印机：上方进纸 + 机身 + 下方出纸（纸上两行字）
export default ({ radius, stroke }) => [
  rounded([[7.5, 8.5], [7.5, 3.5], [16.5, 3.5], [16.5, 8.5]], Math.min(radius, 1), false),
  rounded([[7.5, 16.5], [3.5, 16.5], [3.5, 8.5], [20.5, 8.5], [20.5, 16.5], [16.5, 16.5]], Math.min(radius, 2), false),
  rounded([[7.5, 13.5], [16.5, 13.5], [16.5, 20.5], [7.5, 20.5]], Math.min(radius, 1)),
  'M9.5 16.5H14.5',
  'M9.5 18.5H12.5',
  dot(17.5, 11),
]

// 实心：机身、进纸、出纸各一块；进纸和机身之间挖开一道缝，指示灯挖空；机身在出纸四周让出缝（和描边版机身在出纸处断开一样），
// 出纸上的两行字挖空
export const fill = ({ radius, stroke }) => {
  const paper = rounded([[7.5, 13.5], [16.5, 13.5], [16.5, 20.5], [7.5, 20.5]], Math.min(radius, 1))
  return [
    solid(rounded([[3.5, 16.5], [3.5, 8.5], [20.5, 8.5], [20.5, 16.5]], Math.min(radius, 2))),
    solid(rounded([[7.5, 8.5], [7.5, 3.5], [16.5, 3.5], [16.5, 8.5]], Math.min(radius, 1))),
    knock([`M7.5 ${8.5 - stroke}H16.5`, dot(17.5, 11)]),
    clear(paper, GAP),
    solid(paper),
    knock(['M9.5 16.5H14.5', 'M9.5 18.5H12.5']),
  ]
}
