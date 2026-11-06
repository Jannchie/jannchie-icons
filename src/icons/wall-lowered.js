import { crisp, rounded } from '../geometry'
import { arrow } from '../media'
import { knock, solid } from '../solid'
import base from './wall-half'

// 压低的墙：半墙（wall-half）+ 上方一支向下的箭头（竖线 x 11.5，2.5 → 9.5，尖端离墙顶 3）——墙被往下压到一半
export default opts => [
  ...base(opts),
  'M11.5 2.5V9.5',
  rounded(arrow(11.5, 9.5, 'down', 2.5), crisp(opts.radius), false),
]

// 实心：墙体填实，砖缝挖空（缝都通到墙边，砖一块块分开），箭头照旧是线
export const fill = (opts) => {
  const [wall, ...joints] = base(opts)
  return [
    solid(wall),
    knock(joints),
    'M11.5 2.5V9.5',
    rounded(arrow(11.5, 9.5, 'down', 2.5), crisp(opts.radius), false),
  ]
}
