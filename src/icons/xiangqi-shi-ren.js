import { XIANGQI, xiangqi, xiangqiFill } from '../pieces'

// 象棋棋子：仕
export default () => xiangqi(XIANGQI['shi-ren'].strokes)

// 实心：棋子填实，字挖空
export const fill = () => xiangqiFill(XIANGQI['shi-ren'].strokes)
