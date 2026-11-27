import { circle } from '../geometry'
import { solid } from '../solid'
import { rotate, translate } from '../transform'

// 安全别针（打开的）：一头是钢丝绕出来的小线圈（圆心 (2, 12)、半径 1.5），另一头是盾形的扣帽（靠钢丝的一边平、外侧是半圆，16.5–22.5 × 8.5–15.5）；
// 背面那根钢丝从线圈底直直地伸进扣帽；针那根从线圈顶出去，绕线圈弹开 12°，针尖悬在扣帽外面——扣上的时候它和背面那根平行、相距 3.5
// 两根钢丝的线头停在线圈顶 / 底的切点前面一点（x = 2.75），藏在线圈的线里：尖角模式下方线帽不从线圈外面冒出来
// 横着画（线圈在左、扣帽在右），再逆时针转 45°：线圈在左下、扣帽在右上
// 靠「线圈 + 细长的两根钢丝 + 扣帽 + 弹开的针」认出来；扣着画的话两根钢丝并成一条细长的框，像试管、火柴
const t = d => translate(rotate(d, -45), -0.1, 0.1)
const COIL = [2, 12]
const clasp = (radius) => {
  const k = Math.min(radius, 1)
  return t(`M${16.5 + k} 8.5H19A3.5 3.5 0 0 1 19 15.5H${16.5 + k}A${k} ${k} 0 0 1 16.5 ${15.5 - k}V${8.5 + k}A${k} ${k} 0 0 1 ${16.5 + k} 8.5Z`)
}
const back = t('M16.5 13.75L2.75 13.51')
const needle = t(rotate('M15.5 10.25L2.75 10.49', -12, COIL))
const coil = t(circle(...COIL, 1.5))

export default ({ radius }) => [clasp(radius), back, needle, coil]

// 实心：扣帽一块；钢丝和线圈照旧是线
export const fill = ({ radius }) => [solid(clasp(radius)), back, needle, coil]
