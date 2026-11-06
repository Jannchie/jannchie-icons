import { ring } from '../marks'
import { text } from '../controller'
import { knock, solid } from '../solid'

// Xbox 面键 Y：圆圈 + 字母
export default ({ radius }) => [
  ring(),
  ...text('Y', [12, 12], 1.35),
]

// 实心：外形填实，挖出按键文字
export const fill = () => [solid(ring()), knock(text('Y', [12, 12], 1.35))]
