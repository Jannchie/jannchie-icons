import { knock, solid } from '../solid'

// 松饼（一摞三张，侧视）：三层厚饼摞在一起（5–19 的平边，两侧每层各鼓出一个半径 2 的半圆，外缘 3–21；
// 层高 4：7.5 / 11.5 / 15.5 / 19.5），层与层之间一道横线；顶面上平放着一块黄油（斜着看是一个平行四边形，底边落在顶面上，顶到 4.5）
// 两侧一层一层鼓出来的边是「一摞饼」的记号；黄油平放、斜着画，不画成竖起来的方块（像手提包的提手）
const LAYERS = [7.5, 11.5, 15.5, 19.5]
const R = 2
const stack = `M5 ${LAYERS[0]}H19${[1, 2, 3].map(i => `A${R} ${R} 0 0 1 19 ${LAYERS[i]}`).join('')}H5${[2, 1, 0].map(i => `A${R} ${R} 0 0 1 5 ${LAYERS[i]}`).join('')}Z`
const SEAMS = [11.5, 15.5]
const butter = 'M8.75 7.5L10.5 4.5H16L14.25 7.5'

export default () => [stack, ...SEAMS.map(y => `M5 ${y}H19`), butter]

// 实心：整摞一块，两道层缝整条挖穿（三张饼各是一块）；黄油封口填实，和顶面连在一起
export const fill = () => [solid([stack, `${butter}Z`]), knock(SEAMS.map(y => `M1 ${y}H23`))]
