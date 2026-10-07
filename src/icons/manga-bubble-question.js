import { CONTENTS, bubble, BUBBLE_CENTER } from '../manga'

// 漫画气泡（普通）：问号
export default ({ radius }) => [bubble(radius), ...CONTENTS['question'].paths(BUBBLE_CENTER, radius)]
