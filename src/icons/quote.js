import { circle } from '../geometry'

// 引用：两个右引号 ”，像数字 9：圆点在上，尾巴从圆点右侧往下弯向左下
const mark = x => [circle(x + 2.5, 9.5, 2.5), `M${x + 5} 9.5C${x + 5} 14 ${x + 3.5} 16.5 ${x + 0.5} 17`]

export default () => [...mark(4.5), ...mark(13.5)]
