import { off, offFill } from '../off'
import { solid } from '../solid'
import { sparkle } from '../symbols'
import base from './sparkle'

// 无星芒
export default off(base)

// 实心：斜线正好穿过两颗星的中心；小星让出缝以后只剩两条细弯片，实心版不画它，只留大星被斜线切开的两半
export const fill = offFill(({ radius }) => [solid(sparkle([12, 12], 2.6, radius)[0])])
