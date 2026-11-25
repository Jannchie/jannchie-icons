import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 短裤：和 pants 同一个版型，裤腿只到大腿（5.5–17.5 高）：腰头 + 门襟线 + 两条短裤腿（中间开叉到裆部 (12, 13)）
const shape = radius => rounded([[5.5, 5.5], [18.5, 5.5], [19.5, 17.5], [13.5, 17.5], [12, 13], [10.5, 17.5], [4.5, 17.5]], Math.min(radius, 1))

export default ({ radius }) => [shape(radius), 'M5.25 8.5H18.75', 'M12 8.5V11']

// 实心：短裤一块，腰头线两头伸出两侧、整条挖穿；门襟线挖空（同 pants）
export const fill = ({ radius }) => [solid(shape(radius)), knock(['M3 8.5H21', 'M12 8.5V11'])]
