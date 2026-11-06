import { SHOGI, shogi, shogiFill } from '../pieces'

// 将棋棋子：角
export default ({ radius }) => shogi(SHOGI['kaku'].strokes, radius)

// 实心：棋子填实，字挖空
export const fill = ({ radius }) => shogiFill(SHOGI['kaku'].strokes, radius)
