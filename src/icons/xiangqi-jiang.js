import { XIANGQI, xiangqi, xiangqiFill } from '../pieces'

// 象棋棋子：将
export default () => xiangqi(XIANGQI['jiang'].strokes)

// 实心：棋子填实，字挖空
export const fill = () => xiangqiFill(XIANGQI['jiang'].strokes)
