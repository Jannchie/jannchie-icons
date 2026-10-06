import { crisp, rounded } from '../geometry'
import { M } from '../modality'

// Hugging Face 任务：强化学习。上方智能体（立方体）与下方环境（地球线）之间一对循环箭头：动作往下、反馈往上
export default ({ radius }) => [
  ...M.cube([12, 6], 0.85, radius),
  'M3.5 20.5H20.5',
  'M7 10.5V17',
  rounded([[5, 15], [7, 17], [9, 15]], crisp(radius), false),
  'M17 17V10.5',
  rounded([[15, 12.5], [17, 10.5], [19, 12.5]], crisp(radius), false),
]
