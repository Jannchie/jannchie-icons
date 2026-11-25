import { eye } from '../scene'
import { knock, solid } from '../solid'

// 章鱼：正面。圆顶的大脑袋（5.5–18.5，顶到 3.5，底边平直在 13.5）+ 两只眼睛 + 从脑袋底边垂下来的四条腕足（间距 3，外面两条往外卷，里面两条往外下方弯）
const head = 'M5.5 13.5V10A6.5 6.5 0 0 1 18.5 10V13.5Z'
const eyes = [eye(9.5, 9.5), eye(14.5, 9.5)]
const arms = [
  'M7.5 13.5C7.5 16.5 6.5 18.5 3.5 19',
  'M10.5 13.5C10.5 16.5 10 19 8 20.5',
  'M13.5 13.5C13.5 16.5 14 19 16 20.5',
  'M16.5 13.5C16.5 16.5 17.5 18.5 20.5 19',
]

export default () => [head, ...eyes, ...arms]

// 实心：脑袋一块，眼睛挖空；腕足照旧是线
export const fill = () => [solid(head), knock(eyes), ...arms]
