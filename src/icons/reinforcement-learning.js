import { crisp, rounded } from '../geometry'
import { M } from '../modality'

// Hugging Face 任务：强化学习。上方智能体（立方体）与下方环境（地球线）之间一对循环箭头：动作往下、反馈往上
export default ({ radius }) => [
  ...M.cube([12, 6], 1, radius),
  'M3.5 20.5H20.5',
  'M6.5 10.5V17',
  rounded([[4.5, 15], [6.5, 17], [8.5, 15]], crisp(radius), false),
  'M17.5 17V10.5',
  rounded([[15.5, 12.5], [17.5, 10.5], [19.5, 12.5]], crisp(radius), false),
]
