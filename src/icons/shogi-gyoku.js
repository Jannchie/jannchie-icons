import { SHOGI, shogi, shogiFill } from '../pieces'

// 将棋棋子：玉
export default ({ radius }) => shogi(SHOGI['gyoku'].strokes, radius)

// 实心：棋子填实，字挖空
export const fill = ({ radius }) => shogiFill(SHOGI['gyoku'].strokes, radius)
