import { circle } from '../geometry'
import { knock, solid } from '../solid'

// 牛油果（切开的半个）：上窄下宽的果形（5–19 × 2.75–21.25）+ 下半正中一颗圆果核（圆心 (12, 15)、半径 3.25）
const body = 'M12 2.75C9.5 2.75 8 5 7.5 8C7 11 5 12.5 5 16C5 19 8 21.25 12 21.25C16 21.25 19 19 19 16C19 12.5 17 11 16.5 8C16 5 14.5 2.75 12 2.75Z'
const pit = circle(12, 15, 3.25)

export default () => [body, pit]

// 实心：果肉一块，果核的圆圈挖空（果核留成实心）
export const fill = () => [solid(body), knock(pit)]
