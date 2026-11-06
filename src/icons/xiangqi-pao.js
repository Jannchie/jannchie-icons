import { XIANGQI, xiangqi, xiangqiFill } from '../pieces'

// 象棋棋子：炮
export default () => xiangqi(XIANGQI['pao'].strokes)

// 实心：棋子填实，字挖空
export const fill = () => xiangqiFill(XIANGQI['pao'].strokes)
