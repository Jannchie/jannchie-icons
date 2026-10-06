import { SHOGI, shogi } from '../pieces'

// 将棋棋子：金
export default ({ radius }) => shogi(SHOGI['kin'].strokes, radius)
