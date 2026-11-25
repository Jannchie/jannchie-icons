import { through } from '../geometry'
import { knock, solid } from '../solid'

// 拐杖糖：一根有粗细的弯钩（糖棍宽 4）——竖直的长柄（5.5–9.5，落到 20.5），顶上弯成半圆的钩（外半径 6.5、内半径 2.5，圆心 (12, 9.5)），
// 钩头垂到 12.5（14.5–18.5），一条闭合轮廓；糖棍上四道斜的条纹：柄上两道（左高右低），弯钩上两道（沿径向，±45°）
const cane = 'M5.5 20.5V9.5A6.5 6.5 0 0 1 18.5 9.5V12.5H14.5V9.5A2.5 2.5 0 0 0 9.5 9.5V20.5Z'
const S = Math.SQRT1_2
const f = v => +v.toFixed(3)
const radial = s => [[f(12 + s * 2.5 * S), f(9.5 - 2.5 * S)], [f(12 + s * 6.5 * S), f(9.5 - 6.5 * S)]]
const STRIPES = [[[5.5, 13], [9.5, 15]], [[5.5, 17], [9.5, 19]], radial(-1), radial(1)]

export default () => [cane, ...STRIPES.map(([a, b]) => through(a, b, 0))]

// 实心：拐杖糖一块，四道条纹两头都挖穿，分成一段一段
export const fill = ({ stroke }) => [solid(cane), knock(STRIPES.map(([a, b]) => through(a, b, stroke * 2)))]
