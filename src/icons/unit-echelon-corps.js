import { ECHELON, unitFrame } from '../unit'

// 兵牌部队规模：军（友军框 + 框上方的规模标记）
export default ({ radius }) => [unitFrame(radius), ...ECHELON['corps'].paths()]
