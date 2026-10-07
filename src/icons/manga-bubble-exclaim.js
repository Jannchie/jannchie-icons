import { CONTENTS, bubble, BUBBLE_CENTER } from '../manga'

// 漫画气泡（普通）：感叹号
export default ({ radius }) => [bubble(radius), ...CONTENTS['exclaim'].paths(BUBBLE_CENTER, radius)]
