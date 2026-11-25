import { eye } from '../scene'
import { knock, stacked } from '../solid'
import { mirror } from '../transform'

// 大象：正面头像。脑袋和垂下来的长鼻子是一条闭合轮廓（脑袋 7.5–16.5，顶到 3.5；鼻子 10.5–13.5，垂到 21.25）；
// 两侧两只大耳朵（各是一道从脑袋侧边鼓出去再收回来的弧，鼓到 2.75 / 21.25）；两只眼睛
const head = 'M7.5 7C7.5 4.75 9.5 3.5 12 3.5C14.5 3.5 16.5 4.75 16.5 7V13.5C16.5 15 15.25 16 13.5 16.5V19.5C13.5 20.5 12.85 21.25 12 21.25C11.15 21.25 10.5 20.5 10.5 19.5V16.5C8.75 16 7.5 15 7.5 13.5Z'
const ear = 'M7.5 6.5C5.25 5 2.75 6.75 2.75 10C2.75 13.25 5.25 15 7.5 13.5'
const ears = [ear, mirror(ear)]
const eyes = [eye(10, 10), eye(14, 10)]

export default () => [head, ...ears, ...eyes]

// 实心：两只耳朵封口各成一块，在脑袋四周让出缝，脑袋连鼻子一块，眼睛挖空
export const fill = () => [...stacked(ears.map(d => `${d}Z`), head), knock(eyes)]
