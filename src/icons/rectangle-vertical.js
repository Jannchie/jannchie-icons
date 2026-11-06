import { rounded } from '../geometry'
import { solid } from '../solid'

// 竖向矩形：rectangle-horizontal 转 90°——11 × 17（6.5–17.5 × 3.5–20.5）
export default ({ radius }) => [rounded([[6.5, 3.5], [17.5, 3.5], [17.5, 20.5], [6.5, 20.5]], radius)]

// 实心：整个矩形
export const fill = ({ radius }) => [solid(rounded([[6.5, 3.5], [17.5, 3.5], [17.5, 20.5], [6.5, 20.5]], radius))]
