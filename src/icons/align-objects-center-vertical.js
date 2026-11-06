import { alignObjects, alignObjectsFill } from '../align-objects'

// 对齐对象：center-vertical
export default ({ radius }) => alignObjects('center', true, radius)

// 实心：两个条填实，基准线照旧
export const fill = ({ radius }) => alignObjectsFill('center', true, radius)
