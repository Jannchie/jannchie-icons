import { oval } from '../geometry'
import { stacked } from '../solid'

// 绵羊（侧面全身，朝左）：一团云朵似的羊毛身子（八个往外鼓的小弧，端点在圆心 (13.5, 11)、半径 7 × 5.25 的椭圆上，鼓到约 1.16 倍）
// + 左边压在身子上的一张实心的黑脸（椭圆 2.5 × 3.25）+ 两条腿（从身子底下两个鼓包的最低点落到 20.5）
// 黑脸在描边版里也是实心的：云朵身子 + 黑脸是绵羊的记号，脸画成空心的圈就和羊毛的鼓包混在一起了
const [cx, cy, rx, ry] = [13.5, 11, 7, 5.25]
const f = v => +v.toFixed(3)
const on = (deg, k = 1) => `${f(cx + rx * k * Math.cos(deg * Math.PI / 180))} ${f(cy + ry * k * Math.sin(deg * Math.PI / 180))}`
const wool = `M${on(0)}${[...Array(8).keys()].map(i => `Q${on(i * 45 + 22.5, 1.4)} ${on(i * 45 + 45)}`).join('')}Z`
const face = oval(5.75, 11.75, 2.5, 3.25)
const legs = ['M10.5 16.5V20.5', 'M16.5 16.5V20.5']

export default () => [wool, { d: face, fill: true, round: true }, ...legs]

// 实心：身子一块，脸在前，身子在脸四周让出缝；腿照旧是线
export const fill = () => [...stacked(wool, face), ...legs]
