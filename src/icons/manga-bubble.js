import { CONTENTS, bubble, BUBBLE_CENTER } from '../manga'

// 漫画气泡（普通）：空
export default ({ radius }) => [bubble(radius), ...CONTENTS['empty'].paths(BUBBLE_CENTER, radius)]
