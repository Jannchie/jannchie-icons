import { through } from '../geometry'
import { knock, solid } from '../solid'

// 可颂（牛角包）：两头朝下弯的月牙（3–21，顶到 5，两个圆钝的角尖落到 17.5 左右），一条闭合轮廓；
// 四道从外沿切到内沿的分段线（里面一对近乎竖直，外面一对斜着），把面包分成中间一大瓣、两边各两小瓣
const body = 'M3 15.5C3 9.5 7 5 12 5C17 5 21 9.5 21 15.5C21 17 19.5 18 18.5 17C17 15.5 15 13 12 13C9 13 7 15.5 5.5 17C4.5 18 3 17 3 15.5Z'
// 每道线的两个端点：外沿上一点、内沿上一点（左边两道；右边是镜像）
const LEFT = [[[9.25, 5.5], [9.93, 13.4]], [[5.15, 8.6], [7.28, 15.2]]]
const CUTS = [...LEFT, ...LEFT.map(([a, b]) => [[24 - a[0], a[1]], [24 - b[0], b[1]]])]

export default () => [body, ...CUTS.map(([a, b]) => through(a, b, 0))]

// 实心：月牙一块，四道分段线里外都挖穿，面包分成五瓣
export const fill = ({ stroke }) => [solid(body), knock(CUTS.map(([a, b]) => through(a, b, stroke * 1.5)))]
