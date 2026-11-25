import { crisp, rounded } from '../geometry'
import { solid } from '../solid'

// 枫叶：左右对称的五裂叶（十一个尖：顶上一个、两侧各五个），一条闭合轮廓，叶尖都是固定的小圆角；叶底正中一根叶柄（落到 21.25）
// 右半边的点（x 是离中线的距离）：从顶尖往下，尖和凹口交替
const HALF = [[1.75, 6.25], [4.25, 5.25], [3.5, 10], [7.5, 7.5], [7, 9.75], [9.25, 10.75], [6.75, 13], [7.5, 15.25], [1.25, 14.75], [1, 16.5]]
const points = [[12, 2.75], ...HALF.map(([x, y]) => [12 + x, y]), ...HALF.map(([x, y]) => [12 - x, y]).reverse()]
const leaf = radius => rounded(points, crisp(radius))
const stalk = 'M12 16.5V21.25'

export default ({ radius }) => [leaf(radius), stalk]

// 实心：叶片一块；叶柄照旧是线
export const fill = ({ radius }) => [solid(leaf(radius)), stalk]
