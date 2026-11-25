import { eye } from '../scene'
import { knock, stacked } from '../solid'

// 玉米：竖着的玉米棒（8.5–15.5，圆顶到 2.75）+ 底下左右两片裹着它的苞叶（从底尖 (12, 21.25) 往两边张开，叶尖到 (4.5, 11.5) / (19.5, 11.5)）；
// 玉米棒的两条边落在苞叶的上沿上；棒上两列玉米粒（小圆点，粗字重下不再变大）
const cob = 'M8.5 14.4V9C8.5 5.5 10 2.75 12 2.75C14 2.75 15.5 5.5 15.5 9V14.4'
const husk = 'M12 21.25C7.5 21.25 4.5 17.5 4.5 11.5C7.5 12.5 10.5 15.5 12 21.25Z'
const husks = [husk, 'M12 21.25C16.5 21.25 19.5 17.5 19.5 11.5C16.5 12.5 13.5 15.5 12 21.25Z']
const kernels = [7.25, 10, 12.75].flatMap(y => [10.75, 13.25].map(x => eye(x, y, 1.5)))

export default () => [cob, ...husks, ...kernels]

// 实心：玉米棒（往下封口到 18）、两片苞叶从后往前叠，每块在后面的块上让出缝；玉米粒挖空
export const fill = () => {
  const [body, ...leaves] = stacked(`${cob}V18H8.5Z`, ...husks)
  return [body, knock(kernels), ...leaves]
}
