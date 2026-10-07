import { ECHELON, unitFrame } from '../unit'

// 兵牌部队规模：组（分队）（友军框 + 框上方的规模标记）
export default ({ radius }) => [unitFrame(radius), ...ECHELON['section'].paths()]
