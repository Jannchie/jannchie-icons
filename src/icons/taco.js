import { stacked } from '../solid'
import { rotate, translate } from '../transform'

// 塔可：前面一片半圆的饼皮（拱朝上、平底，3.5–20.5，底在 17.75）+ 饼皮拱上露出来的一圈馅（五个往外鼓的波浪，两头落在饼皮的弧上）；
// 整个往左歪 20°（绕 (12, 13) 逆时针转）。半圆饼皮 + 上沿一圈冒出来的馅是塔可的记号；歪着放，和平底朝下、一排小褶的饺子区分开
const [cy, r] = [17.75, 8.5]
const f = v => +v.toFixed(3)
const pol = (k, deg) => `${f(12 + k * Math.cos(deg * Math.PI / 180))} ${f(cy + k * Math.sin(deg * Math.PI / 180))}`
// 转完以后整体挪 (−0.45, −1.4)，墨迹居中
const tilt = d => translate(rotate(d, -20, [12, 13]), -0.45, -1.4)
const shell = tilt(`M${12 - r} ${cy}A${r} ${r} 0 0 1 ${12 + r} ${cy}Z`)
// 馅：端点在饼皮的弧上（200°、340°），中间的点在半径 r + 1.75 上，控制点在 r + 3.75 上
const STEP = 28
const filling = tilt(`M${pol(r, 200)}${[...Array(5).keys()].map(i => `Q${pol(r + 3.75, 200 + (i + 0.5) * STEP)} ${pol(i === 4 ? r : r + 1.75, 200 + (i + 1) * STEP)}`).join('')}`)

export default () => [shell, filling]

// 实心：馅封口成一块，饼皮在前、馅在饼皮四周让出缝
export const fill = () => stacked(`${filling}Z`, shell)
