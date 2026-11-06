import { ring } from '../marks'
import { text } from '../controller'
import { knock, solid } from '../solid'

// Xbox 右摇杆 RS：圆圈 + 键名
export default ({ radius }) => [
  ring(),
  ...text('RS', [12, 12]),
]

// 实心：外形填实，挖出按键文字
export const fill = () => [solid(ring()), knock(text('RS', [12, 12]))]
