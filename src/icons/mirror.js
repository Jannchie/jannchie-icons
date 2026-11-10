import { knock, solid } from '../solid'

// 镜子（立式）：竖长的椭圆镜面（6.5–17.5 × 2.5–18.5）+ 镜面右上一道斜的短高光 + 短立杆落到底座横线（8.5–15.5 在 21.5）
// 镜面要占大头、立杆要短：镜面小、杆长的时候看起来像棒棒糖或一棵树
// 支架只画一根杆和一道底座：画成拱形或八字的两只脚时，椭圆 + 杆 + 两脚看起来像个小人
const glass = 'M6.5 10.5a5.5 8 0 1 0 11 0a5.5 8 0 1 0-11 0'
const glint = { d: 'M12.5 8L14 6.5', detail: true }
const stand = ['M12 18.5V21.5', 'M8.5 21.5H15.5']

export default () => [glass, glint, ...stand]

// 实心：镜面一块，高光挖空；立杆和底座照旧是线
export const fill = () => [solid(glass), knock(glint), ...stand]
