import { rounded } from '../geometry'
import { LABEL, line, snap } from '../letters'
import { knock, solid } from '../solid'

// YAML：和 gif、css、sql、画质标识同一套横向圆角外框（2.5–21.5 × 5.5–18.5）+ 框里切角线条字母 YAML
// 四个字母放不下画质标识的字宽（0.85），横向压到 0.65、字距 2（整组约 15 宽，左右各离框内缘 1 多），字高仍是 7.2；
// 字距放大到 2.25 时吸附网格会把 A 和 M 拉开、读成 YA ML
const box = radius => rounded([[2.5, 5.5], [21.5, 5.5], [21.5, 18.5], [2.5, 18.5]], Math.min(radius, 2.5))
const letters = snap(line('YAML', [12, 12], 0.65, 2, 1.2, LABEL)).map(d => ({ d, thin: true }))

export default ({ radius }) => [box(radius), ...letters]

// 实心：外框一块，字母挖空
export const fill = ({ radius }) => [solid(box(radius)), knock(letters)]
