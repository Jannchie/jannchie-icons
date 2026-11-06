import { tagHorizontal, tagHorizontalFill } from '../tag'

// 横放的空白标签：tag 系列（标签里写字母、数字）的外框本身
export default ({ radius, stroke }) => tagHorizontal(stroke, radius)

// 实心：标签一块，穿孔挖空
export const fill = ({ radius, stroke }) => tagHorizontalFill(stroke, radius)
