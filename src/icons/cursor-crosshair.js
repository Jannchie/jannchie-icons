import { circle } from '../geometry'
import { knock, solid } from '../solid'

// 十字准星：圆 + 四个方向伸出圆外的短线（中心留空）
export default () => [
  circle(12, 12, 6.5),
  'M12 3V8',
  'M12 16V21',
  'M3 12H8',
  'M16 12H21',
]

// 实心：圆一块，四道短线在圆里的部分挖空（离圆边留一个线宽，圆不被切开），圆外的部分照旧是线
export const fill = ({ stroke }) => {
  const e = 5.5 + stroke
  return [
    solid(circle(12, 12, 6.5)),
    knock([`M12 ${e}V8`, `M12 16V${24 - e}`, `M${e} 12H8`, `M16 12H${24 - e}`]),
    'M12 3V5.5',
    'M12 18.5V21',
    'M3 12H5.5',
    'M18.5 12H21',
  ]
}
