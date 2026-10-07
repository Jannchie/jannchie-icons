import { circle, rounded } from '../geometry'

// Hugging Face 任务：机器人。底座 + 两节机械臂（关节是小圆）+ 末端夹爪；底座压低成 2 高，关节和底座之间留 2.5 的立柱
export default ({ radius }) => [
  rounded([[5.5, 20.5], [5.5, 18.5], [9.5, 18.5], [9.5, 20.5]], Math.min(radius, 1), false),
  'M3 20.5H12',
  circle(7.5, 14.5, 1.5),
  'M7.5 16V18.5',
  'M8.56 13.44L12.94 9.56',
  circle(14, 8.5, 1.5),
  'M15.5 8.5H18.5',
  rounded([[20.5, 6.5], [18.5, 6.5], [18.5, 10.5], [20.5, 10.5]], Math.min(radius, 0.75), false),
]
