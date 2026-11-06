import { CONTENTS, bubble, BUBBLE_CENTER } from '../manga'
import { hole, knock, solid } from '../solid'

// 漫画气泡（普通）：音符
export default ({ radius }) => [bubble(radius), ...CONTENTS['music'].paths(BUBBLE_CENTER, radius)]

// 实心：气泡填实，音符挖空（符头挖成整个洞，不留中间的实心）
export const fill = ({ radius }) => {
  const [head, stem] = CONTENTS['music'].paths(BUBBLE_CENTER, radius)
  return [solid(bubble(radius)), hole(head), knock(stem)]
}
