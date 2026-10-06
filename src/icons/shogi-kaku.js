import { SHOGI, shogi } from '../pieces'

// 将棋棋子：角
export default ({ radius }) => shogi(SHOGI['kaku'].strokes, radius)
