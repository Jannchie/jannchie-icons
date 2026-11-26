import { knock, solid } from '../solid'

// 球衣：无袖的篮球背心（和有袖子的 t-shirt 区分开）。两根肩带（7–9.5 / 14.5–17 × y 3.5）、深挖的袖窿弧下到腋下 (4.5 / 19.5, 9.5)，
// 直筒衣身到 20.5，领口是一道 U 形；胸前一个号码 7（横 9.5–14.5 × 11.5，斜笔落到 (11.5, 17.5)）
const shirt = 'M9.5 3.5H7C7 6.75 6.5 8.5 4.5 9.5V20.5H19.5V9.5C17.5 8.5 17 6.75 17 3.5H14.5C14.5 5.75 13.5 7.25 12 7.25C10.5 7.25 9.5 5.75 9.5 3.5Z'
const number = 'M9.5 11.5H14.5L11.5 17.5'

export default () => [shirt, number]

// 实心：整件一块，号码挖空
export const fill = () => [solid(shirt), knock(number)]
