import { ECHELON, unitFrame } from '../unit'

// 兵牌部队规模：班（友军框 + 框上方的规模标记）
export default ({ radius }) => [unitFrame(radius), ...ECHELON['squad'].paths()]
