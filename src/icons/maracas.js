import { knock, solid } from '../solid'
import { rotate } from '../transform'

// 沙锤（一对，交叉着）：每只是一个蛋形的头（远端圆、靠柄的一端收窄，宽 7.5、长 9）+ 头上两道横的花纹带 + 一根长柄；
// 先竖着画一只（头在上、柄朝下），再绕 (12, 15) 左右各转 36°：两个头分在左上、右上（相距约 3），两根柄在下面交叉成 X
// 靠「成对交叉 + 蛋形的头 + 花纹带」认出来；花纹带画两道：只画一道的话，转过来像圆圈里一道斜杠的禁止符号
const PIVOT = [12, 15]
const head = 'M12 1.5C14.45 1.5 15.75 3.4 15.75 5.5C15.75 7.9 14 10.5 12 10.5C10 10.5 8.25 7.9 8.25 5.5C8.25 3.4 9.55 1.5 12 1.5Z'
// 花纹带的两端落在头的轮廓上
const BANDS = [[4, 8.49, 15.51], [7.5, 8.63, 15.37]]
const stick = 'M12 10.5V22.5'
const pair = d => [rotate(d, -36, PIVOT), rotate(d, 36, PIVOT)]

export default () => [...pair(head), ...BANDS.flatMap(([y, a, b]) => pair(`M${a} ${y}H${b}`)), ...pair(stick)]

// 实心：两个头各一块，两道花纹带两头穿出头的轮廓、整条挖空（头分成三截；伸出去的长度跟着线宽，够穿出去又碰不到另一个头）；柄照旧是线
export const fill = ({ stroke }) => {
  const e = stroke + 0.25
  return [solid(pair(head)), knock(BANDS.flatMap(([y, a, b]) => pair(`M${a - e} ${y}H${b + e}`))), ...pair(stick)]
}
