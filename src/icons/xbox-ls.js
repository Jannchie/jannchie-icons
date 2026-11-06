import { ring } from '../marks'
import { text } from '../controller'
import { knock, solid } from '../solid'

// Xbox 左摇杆 LS：圆圈 + 键名
export default ({ radius }) => [
  ring(),
  ...text('LS', [12, 12]),
]

// 实心：外形填实，挖出按键文字
export const fill = () => [solid(ring()), knock(text('LS', [12, 12]))]
