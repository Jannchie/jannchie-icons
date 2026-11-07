import { crisp, rounded } from '../geometry'
import { arrow } from '../media'
import { screen, stand } from '../monitor'
import { off, offFill } from '../off'
import { knock, solid } from '../solid'
import base from './screen-share'

// 关闭 / 划掉
export default off(base)

// 实心：屏幕一块，挖掉向上的箭头。描边版的箭头正好压在斜线上，挖空后箭头和斜线的缝连成一片、右翼和缝之间夹一根细条，
// 实心版把箭头挪到斜线右上方的屏幕空处（离斜线的缝、屏幕边都留出一截）；底座照旧是线
export const fill = offFill(({ radius, stroke }) => [
  solid(rounded(screen, Math.min(radius, 2.5))),
  knock([`M15.5 11V${6 + stroke / 2}`, rounded(arrow(15.5, 6, 'up', 2.5), crisp(radius), false)]),
  ...stand,
])
