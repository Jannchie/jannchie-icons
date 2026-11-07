import { solid } from '../solid'

// 直方图：底线 + 起伏的山形曲线
const base = 'M3 20.5H21'
const curve = 'M3 20.5C6 20.5 6 12 9 12C12 12 11 17 13.5 17C16 17 16 5.5 18.5 5.5C20.5 5.5 20 20.5 21 20.5'

export default () => [
  base,
  curve,
]

// 实心：曲线下面到底线的面积填实，底线照旧是线
export const fill = () => [
  solid(`${curve}Z`),
  base,
]
