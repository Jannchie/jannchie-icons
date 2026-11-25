import { meet } from '../geometry'
import { dot, eye } from '../scene'
import { knock, solid } from '../solid'

// 雪人：上小下大的两个雪球（头：圆心 (12, 6.75)、半径 3.5；身子：圆心 (12, 15.25)、半径 6）连成一条闭合轮廓，中间收成脖子；
// 头上两只眼睛，身上两颗纽扣；身子两侧往外上方伸出去的两根树枝手臂
const [x, y1, r1, y2, r2] = [12, 6.75, 3.5, 15.25, 6]
const f = v => +v.toFixed(3)
// 两个圆的交点（脖子的两侧）
const [[nl, ny], [nr]] = meet([x, y1], r1, [x, y2], r2).map(p => p.map(f))
const body = `M${nl} ${ny}A${r1} ${r1} 0 1 1 ${nr} ${ny}A${r2} ${r2} 0 1 1 ${nl} ${ny}Z`
const features = [eye(10.75, 6.25, 1.5), eye(13.25, 6.25, 1.5), dot(12, 13.5, 1.5), dot(12, 16.75, 1.5)].map(p => ({ ...p, round: true }))
// 手臂从身子的圆上接出去（−155° / −25° 方向，径向）
const arm = (s) => {
  const [c, k] = [Math.cos(25 * Math.PI / 180), Math.sin(25 * Math.PI / 180)]
  return `M${f(x + s * r2 * c)} ${f(y2 - r2 * k)}L${f(x + s * (r2 + 3.25) * c)} ${f(y2 - (r2 + 3.25) * k)}`
}
const arms = [arm(-1), arm(1)]

export default () => [body, ...features, ...arms]

// 实心：雪人一块，眼睛和纽扣挖空；手臂照旧是线
export const fill = () => [solid(body), knock(features), ...arms]
