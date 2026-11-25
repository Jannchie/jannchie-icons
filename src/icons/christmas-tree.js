import { rounded } from '../geometry'
import { dot, eye } from '../scene'
import { knock, solid } from '../solid'

// 圣诞树：三层叠起的三角树冠（同 tree-pine 的画法，树尖让给星星、矮一点）+ 树尖上一颗星（圆点）+ 树上挂着的三颗彩球 + 短树干
const crown = radius => rounded([[12, 5.5], [16.5, 10.5], [14.5, 10.5], [18.5, 15], [16.5, 15], [20, 19.5], [4, 19.5], [7.5, 15], [5.5, 15], [9.5, 10.5], [7.5, 10.5]], Math.min(radius, 1))
const star = { ...dot(12, 3.75, 2.5), round: true }
const baubles = [eye(12, 12.5, 1.5), eye(9.5, 17, 1.5), eye(14.5, 17, 1.5)]
const trunk = 'M12 19.5V21.5'

export default ({ radius }) => [crown(radius), star, ...baubles, trunk]

// 实心：树冠一块，彩球挖空；星星和树干照旧
export const fill = ({ radius }) => [solid(crown(radius)), knock(baubles), star, trunk]
