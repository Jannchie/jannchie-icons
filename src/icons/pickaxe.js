import { solid } from '../solid'
import { rotate, scale, translate } from '../transform'

// 镐（十字镐）：两头尖的弯镐头（闭合的月牙，中间厚 3、两头收成尖）+ 从镐头正中垂直伸出去的长柄；
// 竖着画（镐头在上）再顺时针转 45°：镐头在右上、柄朝左下；转完挪到居中，再放大 1.1 倍，镐尖离画布边 2 左右
const place = d => scale(translate(rotate(d, 45), -0.7, 0.7), 1.1)
const head = place('M3 9.5C5.5 5.5 9 3.5 12 3.5C15 3.5 18.5 5.5 21 9.5C18 7.5 15 6.5 12 6.5C9 6.5 6 7.5 3 9.5Z')
const shaft = place('M12 6.5V21.5')

export default () => [head, shaft]

// 实心：镐头一块；柄照旧是线
export const fill = () => [solid(head), shaft]
