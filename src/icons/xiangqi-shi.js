import { XIANGQI, xiangqi, xiangqiFill } from '../pieces'

// 象棋棋子：士
export default () => xiangqi(XIANGQI['shi'].strokes)

// 实心：棋子填实，字挖空
export const fill = () => xiangqiFill(XIANGQI['shi'].strokes)
