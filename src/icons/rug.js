import { crisp, rounded } from '../geometry'
import { knock, solid } from '../solid'

// 地毯（俯视）：横放的长方形毯面（4.5–19.5 × 6.5–17.5），两头各一道细的边饰线，正中一个菱形纹样，
// 左右两条短边各垂出六根细流苏（间隔 2，从上角排到下角，伸到 2.5）
// 和 cpu / chip 区分开：流苏只在短边上、用细线、排满整条边（引脚是粗线、四边都有、避开角），毯面里是边饰 + 纹样而不是内框
const rect = radius => rounded([[4.5, 6.5], [19.5, 6.5], [19.5, 17.5], [4.5, 17.5]], crisp(radius))
const motif = radius => rounded([[9.5, 12], [12, 9.5], [14.5, 12], [12, 14.5]], crisp(radius))
const bands = ['M7.5 6.5V17.5', 'M16.5 6.5V17.5'].map(d => ({ d, thin: true }))
const fringes = [7, 9, 11, 13, 15, 17].flatMap(y => [`M4.5 ${y}H2.5`, `M19.5 ${y}H21.5`]).map(d => ({ d, thin: true }))

export default ({ radius }) => [rect(radius), motif(radius), ...bands, ...fringes]

// 实心：毯面一块，边饰线和菱形纹样挖空；流苏照旧是细线
export const fill = ({ radius }) => [solid(rect(radius)), knock(motif(radius)), knock(bands), ...fringes]
