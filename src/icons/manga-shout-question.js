import { CONTENTS, shout, SHOUT_CENTER } from '../manga'
import { knock, solid } from '../solid'

// 漫画气泡（喊叫）：问号
export default ({ radius, stroke }) => [shout(radius, stroke), ...CONTENTS['question'].paths(SHOUT_CENTER, radius)]

// 实心：气泡填实，内容符号挖空
export const fill = ({ radius, stroke }) => [solid(shout(radius, stroke)), knock(CONTENTS['question'].paths(SHOUT_CENTER, radius))]
