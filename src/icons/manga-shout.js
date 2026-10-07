import { CONTENTS, shout, SHOUT_CENTER } from '../manga'

// 漫画气泡（喊叫）：空
export default ({ radius }) => [shout(radius), ...CONTENTS['empty'].paths(SHOUT_CENTER, radius)]
