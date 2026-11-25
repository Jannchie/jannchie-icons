import { crisp, rounded } from '../geometry'
import { solid } from '../solid'

// 水桶：上宽下窄的桶身（桶口 5.5–18.5 在 9.5，桶底 7.5–16.5 在 20.5）+ 两头伸出桶身的桶沿（4–20）+ 竖起来的半圆提梁（顶到 3）
const body = radius => rounded([[5.5, 9.5, crisp(radius)], [18.5, 9.5, crisp(radius)], [16.5, 20.5], [7.5, 20.5]], Math.min(radius, 1.5))
const rim = 'M4 9.5H20'
const bail = 'M5.5 9.5A6.5 6.5 0 0 1 18.5 9.5'

export default ({ radius }) => [body(radius), rim, bail]

// 实心：桶身一块；桶沿、提梁照旧是线
export const fill = ({ radius }) => [solid(body(radius)), rim, bail]
