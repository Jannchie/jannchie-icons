import { CONTENTS, shout, SHOUT_CENTER } from '../manga'
import { solid } from '../solid'

// 漫画气泡（喊叫）：空
export default ({ radius, stroke }) => [shout(radius, stroke), ...CONTENTS['empty'].paths(SHOUT_CENTER, radius)]

// 实心：气泡填实
export const fill = ({ radius, stroke }) => [solid(shout(radius, stroke))]
