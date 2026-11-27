import { crisp, rounded } from '../geometry'
import { solid } from '../solid'

// 栅栏（尖头木栅栏）：三根尖头的木桩（宽 3，x 4.5 / 10.5 / 16.5 起，桩缝也是 3；尖顶在 3、肩在 6.5，落到 20.5），
// 上下两道横档（9.5 / 16.5）从左到右穿过去、两头各伸出最外面的木桩 2：横档在木桩后面，只画露出来的几段，线头落在木桩的边上
// 靠「尖头的桩 + 两道出头的横档」认出来
const XS = [4.5, 10.5, 16.5]
const picket = (x, radius) => rounded([[x, 6.5], [x + 1.5, 3, crisp(radius)], [x + 3, 6.5], [x + 3, 20.5], [x, 20.5]], Math.min(radius, 1))
const rails = [9.5, 16.5].flatMap(y => [`M2.5 ${y}H4.5`, `M7.5 ${y}H10.5`, `M13.5 ${y}H16.5`, `M19.5 ${y}H21.5`])

export default ({ radius }) => [...XS.map(x => picket(x, radius)), ...rails]

// 实心：三根木桩各一块；横档照旧是线
export const fill = ({ radius }) => [solid(XS.map(x => picket(x, radius))), ...rails]
