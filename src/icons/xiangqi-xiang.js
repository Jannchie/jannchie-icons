import { XIANGQI, xiangqi, xiangqiFill } from '../pieces'

// 象棋棋子：象
export default () => xiangqi(XIANGQI['xiang'].strokes)

// 实心：棋子填实，字挖空
export const fill = () => xiangqiFill(XIANGQI['xiang'].strokes)
