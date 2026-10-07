import { CONTENTS, shout, SHOUT_CENTER } from '../manga'

// 漫画气泡（喊叫）：问号
export default ({ radius }) => [shout(radius), ...CONTENTS['question'].paths(SHOUT_CENTER, radius)]
