import { XIANGQI, xiangqi, xiangqiFill } from '../pieces'

// 象棋棋子：车
export default () => xiangqi(XIANGQI['che'].strokes)

// 实心：棋子填实，字挖空
export const fill = () => xiangqiFill(XIANGQI['che'].strokes)
