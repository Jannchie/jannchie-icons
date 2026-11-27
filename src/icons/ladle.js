import { solid } from '../solid'

// 汤勺：侧视。左下一个半圆的勺兜（勺口 3.5–16.5 在 13.5，兜底到 20）+ 从勺口右端斜着往右上伸的长柄（到 (19.5, 5)），柄头往左弯成一个小钩（挂在锅沿上的那个钩）
// 深勺兜 + 带钩的长柄是汤勺的记号：和 utensils 里的刀叉、平底带柄的 frying-pan 区分开
const bowl = 'M3.5 13.5H16.5A6.5 6.5 0 0 1 3.5 13.5Z'
const handle = 'M16.5 13.5L19.5 5C20 3.5 19 2.75 17.75 3.25'

export default () => [bowl, handle]

// 实心：勺兜一块；长柄照旧是线
export const fill = () => [solid(bowl), handle]
