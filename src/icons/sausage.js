import { ray } from '../geometry'
import { knock, solid } from '../solid'

// 香肠：一根斜着的、微微弯的粗香肠（弯月形的圆头条：中线是圆心 (5.75, 5.25)、半径 12.5 的圆弧，从 14° 到 78°，粗 6，两头是半圆）
// + 两头各一小截扎口（顺着香肠的方向伸出去 2）+ 身上三道横着的烤痕（细节线）
// 两头的扎口 + 烤痕是香肠的记号：和夹在面包里的 hot-dog、两头尖的 banana 区分开
const C = [5.75, 5.25]
const [FROM, TO, R, HALF] = [14, 78, 12.5, 3]
const rad = deg => deg * Math.PI / 180
const at = (deg, r) => `${+(C[0] + r * Math.cos(rad(deg))).toFixed(2)} ${+(C[1] + r * Math.sin(rad(deg))).toFixed(2)}`
const body = `M${at(FROM, R + HALF)}A${R + HALF} ${R + HALF} 0 0 1 ${at(TO, R + HALF)}A${HALF} ${HALF} 0 0 1 ${at(TO, R - HALF)}A${R - HALF} ${R - HALF} 0 0 0 ${at(FROM, R - HALF)}A${HALF} ${HALF} 0 0 1 ${at(FROM, R + HALF)}Z`
// 扎口：从香肠一头的圆头顶点起，顺着中线的切线方向（sign = 1 是角度增大的方向）伸出去 2
function knot(deg, sign) {
  const [tx, ty] = [-Math.sin(rad(deg)) * sign, Math.cos(rad(deg)) * sign]
  const P = d => `${+(C[0] + R * Math.cos(rad(deg)) + tx * d).toFixed(2)} ${+(C[1] + R * Math.sin(rad(deg)) + ty * d).toFixed(2)}`
  return `M${P(HALF)}L${P(HALF + 2)}`
}
const knots = [knot(TO, 1), knot(FROM, -1)]
const marks = [30, 46, 62].map(deg => ({ d: ray(C, deg, R - 0.85, R + 0.85), detail: true }))

export default () => [body, ...knots, ...marks]

// 实心：香肠一块，烤痕挖空；扎口照旧是线
export const fill = () => [solid(body), knock(marks), ...knots]
