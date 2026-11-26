import { crisp, rounded } from '../geometry'
import { solid, stacked } from '../solid'

// 折纸（纸鹤）：侧面，头朝左。身子是一只横放的扁菱形（6.5–17.5 × 13.5–20），
// 左角伸出细长的脖子到 (4, 7.5)、头往左下折一小截到 (2.5, 10)；右角伸出尾巴到 (21, 8.5)；
// 背上一只高高竖起、往后倒的三角翅膀（尖在 (16, 3.5)），两脚落在菱形的两条上边上。
// 脖子、尾巴画成单线（纸鹤的这两处本来就是折得极细的尖），翅膀最大最高：三个尖一样高的话读成王冠
const body = radius => rounded([[6.5, 16], [12, 13.5], [17.5, 16], [12, 20]], crisp(radius))
const neck = radius => rounded([[6.5, 16], [4, 7.5], [2.5, 10]], crisp(radius), false)
const tail = 'M17.5 16L21 8.5'
// 翅膀两脚在菱形上边上：x = 9.5 / 14.5 处
const foot = x => [x, +(13.5 + 2.5 * Math.abs(x - 12) / 5.5).toFixed(3)]
const wing = (radius, closed) => rounded([foot(9.5), [16, 3.5, crisp(radius)], foot(14.5)], crisp(radius), closed)

export default ({ radius }) => [body(radius), neck(radius), tail, wing(radius, false)]

// 实心：翅膀在后、身子在前（身子四周让出 GAP 的缝）；脖子、尾巴照旧是线
export const fill = ({ radius }) => [...stacked(wing(radius, true), body(radius)), neck(radius), tail]
