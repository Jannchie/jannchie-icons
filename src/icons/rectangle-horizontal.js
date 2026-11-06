import { rounded } from '../geometry'
import { solid } from '../solid'

// 横向矩形：17 × 11（3.5–20.5 × 6.5–17.5），四边落在 .5 上
export default ({ radius }) => [rounded([[3.5, 6.5], [20.5, 6.5], [20.5, 17.5], [3.5, 17.5]], radius)]

// 实心：整个矩形
export const fill = ({ radius }) => [solid(rounded([[3.5, 6.5], [20.5, 6.5], [20.5, 17.5], [3.5, 17.5]], radius))]
