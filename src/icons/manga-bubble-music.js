import { CONTENTS, bubble, BUBBLE_CENTER } from '../manga'

// 漫画气泡（普通）：音符
export default ({ radius }) => [bubble(radius), ...CONTENTS['music'].paths(BUBBLE_CENTER, radius)]
