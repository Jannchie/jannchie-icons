// 思考：灯泡（圆弧）收进灯座，下方一道底线
const [cx, cy, r] = [12, 9.5, 6.25]
const rad = deg => deg * Math.PI / 180
const at = deg => [cx + r * Math.cos(rad(deg)), cy + r * Math.sin(rad(deg))]
const [left, right] = [at(125), at(55)]

export default () => [
  `M${left.join(' ')}A${r} ${r} 0 1 1 ${right.join(' ')}L15 17H9Z`,
  'M9.75 20H14.25',
]
