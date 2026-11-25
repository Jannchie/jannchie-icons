import { circle, rounded } from '../geometry'
import { knock, solid } from '../solid'
import { rotate } from '../transform'

// 平底锅（俯视）：左下的圆锅身（圆心 (9.25, 14.75)、半径 6.5）+ 里面一圈锅底（半径 3.75）+ 伸向右上角的长锅柄
// 锅柄是一根有宽度的圆头长条（宽 3，从锅沿伸出 9），不是一条线——和放大镜的手柄区分开；先朝右横着画，再绕锅心逆时针转 45°
const [cx, cy, R] = [9.25, 14.75, 6.5]
const pan = circle(cx, cy, R)
const base = circle(cx, cy, 3.75)
// into：实心版的锅柄往锅里多伸一点、封口，和锅身叠在一起
const handle = (radius, into = 0) => rotate(rounded([[cx + R - into, cy - 1.5, 0], [cx + R + 9, cy - 1.5], [cx + R + 9, cy + 1.5], [cx + R - into, cy + 1.5, 0]], Math.min(radius, 1.5), into > 0), -45, [cx, cy])

export default ({ radius }) => [pan, base, handle(radius)]

// 实心：锅身和锅柄连成一块，锅底那一圈挖空（锅底留成实心）
export const fill = ({ radius }) => [solid([pan, handle(radius, 1)]), knock(base)]
