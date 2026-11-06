import { ring } from '../marks'
import { text } from '../controller'
import { knock, solid } from '../solid'

// PS 右摇杆按下 R3：圆圈 + 键名
export default ({ radius }) => [
  ring(),
  ...text('R3', [12, 12]),
]

// 实心：外形填实，挖出按键文字
export const fill = () => [solid(ring()), knock(text('R3', [12, 12]))]
