import { rounded } from '../geometry'

// 横向矩形：17 × 11（3.5–20.5 × 6.5–17.5），四边落在 .5 上
export default ({ radius }) => [rounded([[3.5, 6.5], [20.5, 6.5], [20.5, 17.5], [3.5, 17.5]], radius)]
