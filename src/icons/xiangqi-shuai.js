import { XIANGQI, xiangqi, xiangqiFill } from '../pieces'

// 象棋棋子：帅
export default () => xiangqi(XIANGQI['shuai'].strokes)

// 实心：棋子填实，字挖空
export const fill = () => xiangqiFill(XIANGQI['shuai'].strokes)
