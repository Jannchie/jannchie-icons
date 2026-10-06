import { SHOGI, shogi } from '../pieces'

// 将棋棋子：香
export default ({ radius }) => shogi(SHOGI['kyousha'].strokes, radius)
