import { rounded } from '../geometry'
import { stacked } from '../solid'

// 挖掘机（侧视、朝右）：底下一条履带（跑道形，2.5–13.5 × 16.5–20.5，两头是半圆），履带上的车身（3.5–12.5，顶 8.5），
// 车身左上是高的驾驶室、往右一个台阶落到 11.5 的机身；机身右侧伸出动臂斜上到肘点 (15.5, 3.5)，斗杆斜下到 (20, 7.5)，
// 斗杆端头一只往左下勾的铲斗（弧线绕到 (17, 12.5)）
// 履带 + 折成「人」字的长臂 + 铲斗是记号，和 tractor（大小两个轮子）、truck 分开
const track = rounded([[2.5, 16.5], [13.5, 16.5], [13.5, 20.5], [2.5, 20.5]], 2)
const house = (radius, closed) => rounded([[3.5, 16.5], [3.5, 8.5], [7.5, 8.5], [9, 11.5], [12.5, 11.5], [12.5, 16.5]], Math.min(radius, 1.5), closed)
const arm = 'M12.5 13L15.5 3.5L20 7.5'
const bucket = 'M20 7.5C21.75 9 21.75 11.5 20.5 12.5H17'

export default ({ radius }) => [track, house(radius, false), arm, bucket]

// 实心：车身一块在后，履带是完整的一块在前，车身沿履带让出 GAP 的缝；动臂、斗杆、铲斗照旧是线
export const fill = ({ radius }) => [...stacked(house(radius, true), track), arm, bucket]
