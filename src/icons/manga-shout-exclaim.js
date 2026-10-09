import { CONTENTS, shout, SHOUT_CENTER } from '../manga'

// 漫画气泡（喊叫）：感叹号
export default ({ radius, stroke }) => [shout(radius, stroke), ...CONTENTS['exclaim'].paths(SHOUT_CENTER, radius)]
