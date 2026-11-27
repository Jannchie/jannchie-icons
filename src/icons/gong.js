import { circle } from '../geometry'
import { knock, solid } from '../solid'

// 锣（架子上的大锣）：木架——顶上一根两头出挑的横梁（2.75–21.25 在 3.5）、两根立柱（4.5 / 19.5，落到 20.5）、柱脚各一道横的底脚；
// 横梁上两根绳子（9.5 / 14.5）吊着一面圆锣（圆心 (12, 12.5)、半径 5，离两边的立柱各 2.5；绳子落在锣边上 y = 8.17），锣心一个凸起的锣脐（小圆，半径 1.75）
// 靠「架子上吊着的圆盘 + 锣脐」认出来
const stand = ['M2.75 3.5H21.25', 'M4.5 3.5V20.5', 'M19.5 3.5V20.5', 'M2.75 20.5H6.25', 'M17.75 20.5H21.25']
const cords = ['M9.5 3.5V8.17', 'M14.5 3.5V8.17']
const disc = circle(12, 12.5, 5)
const boss = circle(12, 12.5, 1.75)

export default () => [...stand, ...cords, disc, boss]

// 实心：锣面一块，锣脐的圆圈挖空（锣脐留成实心）；架子和绳子照旧是线
export const fill = () => [...stand, ...cords, solid(disc), knock(boss)]
