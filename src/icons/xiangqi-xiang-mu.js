import { XIANGQI, xiangqi, xiangqiFill } from '../pieces'

// 象棋棋子：相
export default () => xiangqi(XIANGQI['xiang-mu'].strokes)

// 实心：棋子填实，字挖空
export const fill = () => xiangqiFill(XIANGQI['xiang-mu'].strokes)
