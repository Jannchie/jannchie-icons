import { CONTENTS, bubble, BUBBLE_CENTER } from '../manga'
import { solid } from '../solid'

// 漫画气泡（普通）：空
export default ({ radius }) => [bubble(radius), ...CONTENTS['empty'].paths(BUBBLE_CENTER, radius)]

// 实心：气泡填实
export const fill = ({ radius }) => [solid(bubble(radius))]
