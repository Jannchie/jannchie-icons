import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 输液：右边一根输液架（竖杆 17.5，落到 20.5，底下一条横的底座 14.5–20.5），杆顶拐成一根横臂伸到左边（和竖杆一笔画），
// 横臂垂下来挂着一只输液袋（3.5–13.5 × 6.5–15.5，袋上一颗小水滴），袋底一根输液管落下来、往右拐到地面
// 「挂在架子上的袋子 + 往下的管子」是输液的记号；水滴说明袋里是液体，不是一块牌子
const bag = radius => rounded([[3.5, 6.5], [13.5, 6.5], [13.5, 15.5], [3.5, 15.5]], Math.min(radius, 2))
const drop = 'M8.5 9C8.5 9 7 10.75 7 11.75C7 12.55 7.7 13.25 8.5 13.25C9.3 13.25 10 12.55 10 11.75C10 10.75 8.5 9 8.5 9Z'
const stand = ['M8.5 6.5V3.5H17.5V20.5', 'M14.5 20.5H20.5']
const tube = 'M8.5 15.5V18C8.5 19.5 9.5 20.5 11 20.5H12'

export default ({ radius }) => [bag(radius), { d: drop, detail: true }, ...stand, tube]

// 实心：输液袋一块，水滴的轮廓挖空；架子、输液管照旧是线
export const fill = ({ radius }) => [solid(bag(radius)), knock(drop), ...stand, tube]
