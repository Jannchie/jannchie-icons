import { XIANGQI, xiangqi, xiangqiFill } from '../pieces'

// 象棋棋子：卒
export default () => xiangqi(XIANGQI['zu'].strokes)

// 实心：棋子填实，字挖空
export const fill = () => xiangqiFill(XIANGQI['zu'].strokes)
