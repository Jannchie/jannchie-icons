import { alignObjects, alignObjectsFill } from '../align-objects'

// 对齐对象：center-horizontal
export default ({ radius }) => alignObjects('center', false, radius)

// 实心：两个条填实，基准线照旧
export const fill = ({ radius }) => alignObjectsFill('center', false, radius)
