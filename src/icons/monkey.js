import { earedHead } from '../geometry'
import { eye } from '../scene'
import { knock, solid } from '../solid'

// 猴子：正面头像。圆脑袋（圆心 (12, 11.75)、半径 7.25）和两侧的小圆耳朵（圆心 (4.75, 12.25) / (19.25, 12.25)、半径 2.5）连成一条闭合轮廓（同 bear 的做法，耳朵长在两侧）；
// 里面一块猴脸：上面两瓣包住眼睛（像一颗心）、往下收成鼓出来的嘴套；两只眼睛 + 一弯嘴。记号是两侧的耳朵 + 心形脸
// chinese-zodiac-monkey 的耳朵是分开的圆、脸线是细线；这里耳朵和头是一条轮廓、脸线和轮廓一样粗
const [hx, hy, R] = [12, 11.75, 7.25]
const [ex, ey, r] = [4.75, 12.25, 2.5]
// 耳朵长在脑袋两侧，下面那段脑袋弧不到半圆
const head = earedHead([hx, hy], R, [ex, ey], r, 0)
const face = 'M12 9C11 7.5 7.75 7.5 7.75 10.5C7.75 12.25 8.5 13 8.5 14.75C8.5 17 10 18.25 12 18.25C14 18.25 15.5 17 15.5 14.75C15.5 13 16.25 12.25 16.25 10.5C16.25 7.5 13 7.5 12 9Z'
const features = [eye(10.25, 11), eye(13.75, 11), { d: 'M10.75 15.5Q12 16.5 13.25 15.5', round: true }]

export default () => [head, face, ...features]

// 实心：脑袋连耳朵一块，脸线、眼睛、嘴都挖成白线——黑脑袋上一圈心形的脸
// （把整张脸挖白再画黑的眼睛和嘴，像戴了一张面具）
export const fill = () => [solid(head), knock([{ d: face.slice(0, -1), round: true }, ...features])]
