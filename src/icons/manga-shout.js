import { CONTENTS, shout, SHOUT_CENTER } from '../manga'

// 漫画气泡（喊叫）：空
export default ({ radius, stroke }) => [shout(radius, stroke), ...CONTENTS['empty'].paths(SHOUT_CENTER, radius)]
