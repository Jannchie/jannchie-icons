import { XIANGQI, xiangqi, xiangqiFill } from '../pieces'

// 象棋棋子：兵
export default () => xiangqi(XIANGQI['bing'].strokes)

// 实心：棋子填实，字挖空
export const fill = () => xiangqiFill(XIANGQI['bing'].strokes)
