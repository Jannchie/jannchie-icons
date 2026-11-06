import { clear } from '../solid'
import { mirror, rotate } from '../transform'
import { sword, swordFill } from '../weapons'

// 双剑交叉：一把剑尖朝左上，另一把是它的左右镜像（剑尖朝右上）；
// 镜像那把在前面，作为 cut 让后面那把在交叉处断开；间隙比默认小，只留一道细缝
export default () => {
  const back = sword.map(d => rotate(d, -45))
  return [...back, ...back.map(d => ({ d: mirror(d), cut: true, gap: 0.5 }))]
}

// 实心：两把都用 swordFill；后面那把在前面那把四周让出同样的细缝
export const fill = () => {
  const map = f => p => (typeof p === 'string' ? f(p) : { ...p, d: f(p.d) })
  const back = swordFill.map(map(d => rotate(d, -45)))
  const front = back.map(map(d => mirror(d)))
  return [...back, clear(sword.map(d => mirror(rotate(d, -45))), 0.5), ...front]
}
