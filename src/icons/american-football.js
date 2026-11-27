import { knock, solid } from '../solid'
import { rotate } from '../transform'

// 美式橄榄球：两头尖的梭形球身（长 22、最宽处 10.5）+ 球面正中的系带——一道顺着球身的长缝线，上面三道横的短针脚（间距 2.5）；
// 竖着画再顺时针转 45°（/ 方向）
// 和 rugby 区分：rugby 是 \ 方向、三道不带长缝线的细系带、两头各一道弧形条纹；这里是「一道长缝 + 横针脚」的鱼骨形系带，没有条纹
const t = d => rotate(d, 45)
const ball = t('M12 1C19 5 19 19 12 23C5 19 5 5 12 1Z')
const laces = ['M12 7.5V16.5', ...[9.5, 12, 14.5].map(y => `M10.25 ${y}H13.75`)].map(t)

export default () => [ball, ...laces]

// 实心：球一块，系带挖空
export const fill = () => [solid(ball), knock(laces)]
