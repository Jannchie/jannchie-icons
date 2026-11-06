import { alignObjects, alignObjectsFill } from '../align-objects'

// 对齐对象：left
export default ({ radius }) => alignObjects('start', false, radius)

// 实心：两个条填实，基准线照旧
export const fill = ({ radius }) => alignObjectsFill('start', false, radius)
