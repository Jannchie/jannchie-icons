import { circle } from '../geometry'
import { dot } from '../scene'
import { knock, solid } from '../solid'

// 鲤鱼旗：左边一根旗杆（x = 4.5，杆头一颗圆球），两条鲤鱼的嘴系在杆上、往右飘；上面一条大、下面一条小。
// 每条鱼是一个闭合的轮廓，左边那条边和旗杆重合（鱼嘴张开套在杆上），鱼身中间鼓、往后收成细尾柄，再张开成分叉的尾鳍；靠嘴的地方一只圆圈大眼。
// 鼓肚子、细尾柄是记号：等宽的长条带燕尾读成三角旗（flag-pennant），要有鱼身的起伏才认得出是鲤鱼
const f = v => +v.toFixed(3)
const pole = 'M4.5 4V21'
const knob = { ...dot(4.5, 2.75), round: true }
// 一条鲤鱼：嘴在杆上 (4.5, y)，s 是缩放；鱼身长 12、尾鳍长 3.5、嘴高 5
const carp = (y, s) => {
  const p = ([x, dy]) => `${f(4.5 + x * s)} ${f(y + dy * s)}`
  return `M${p([0, -2.5])}C${p([4, -3.75])} ${p([9, -3])} ${p([12, -1.5])}L${p([15.5, -3])}L${p([14, 0])}L${p([15.5, 3])}L${p([12, 1.5])}C${p([9, 3])} ${p([4, 3.75])} ${p([0, 2.5])}Z`
}
const big = carp(7.5, 1.032)
const small = carp(16, 0.85)
const eyes = [circle(7.5, 7.25, 1.25), circle(7, 15.75, 1)]

export default () => [pole, big, small, ...eyes, knob]

// 实心：两条鱼各一块（鱼嘴那一边封在旗杆上），眼圈挖空；旗杆、杆头照旧是线
export const fill = () => [solid([big, small]), knock(eyes), pole, knob]
