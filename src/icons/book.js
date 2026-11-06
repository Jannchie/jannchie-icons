import { fillParts, plain } from '../book'
import { plainFill } from '../solid'

// 书：封面 + 书脊下方的页线
export default ({ radius, stroke }) => plain(radius, stroke)

// 实心：封面一块，挖掉页线（见 book.js 的 fillParts）
export const fill = ({ radius, stroke }) => plainFill(fillParts(radius, stroke))
