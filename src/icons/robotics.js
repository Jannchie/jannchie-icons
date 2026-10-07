import { circle, rounded } from '../geometry'

// Hugging Face 任务：机器人。底座 + 两节机械臂（关节是小圆）+ 末端夹爪
export default ({ radius }) => [
  rounded([[4.5, 20.5], [4.5, 17.5], [10.5, 17.5], [10.5, 20.5]], Math.min(radius, 1), false),
  'M3 20.5H12',
  circle(7.5, 15, 1.5),
  'M7.5 16.5V17.5',
  'M8.6 13.9L12.9 9.6',
  circle(14, 8.5, 1.5),
  'M15.5 8.5H18.5',
  rounded([[20.5, 6.5], [18.5, 6.5], [18.5, 10.5], [20.5, 10.5]], Math.min(radius, 0.75), false),
]
