import { rounded } from '../geometry'

// 竖向矩形：rectangle-horizontal 转 90°——11 × 17（6.5–17.5 × 3.5–20.5）
export default ({ radius }) => [rounded([[6.5, 3.5], [17.5, 3.5], [17.5, 20.5], [6.5, 20.5]], radius)]
