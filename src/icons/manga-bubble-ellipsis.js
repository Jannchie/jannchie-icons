import { CONTENTS, bubble, BUBBLE_CENTER } from '../manga'

// 漫画气泡（普通）：省略号
export default ({ radius }) => [bubble(radius), ...CONTENTS['ellipsis'].paths(BUBBLE_CENTER, radius)]
