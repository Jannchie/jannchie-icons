import { XIANGQI, xiangqi, xiangqiFill } from '../pieces'

// 象棋棋子：马
export default () => xiangqi(XIANGQI['ma'].strokes)

// 实心：棋子填实，字挖空
export const fill = () => xiangqiFill(XIANGQI['ma'].strokes)
