import { CONTENTS, bubble, BUBBLE_CENTER } from '../manga'
import { knock, solid } from '../solid'

// 漫画气泡（普通）：感叹号
export default ({ radius }) => [bubble(radius), ...CONTENTS['exclaim'].paths(BUBBLE_CENTER, radius)]

// 实心：气泡填实，内容符号挖空
export const fill = ({ radius }) => [solid(bubble(radius)), knock(CONTENTS['exclaim'].paths(BUBBLE_CENTER, radius))]
