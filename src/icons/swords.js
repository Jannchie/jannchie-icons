import { mirror, rotate } from '../transform'
import { sword } from '../weapons'

// 双剑交叉：一把剑尖朝左上，另一把是它的左右镜像（剑尖朝右上）；
// 镜像那把在前面，作为 cut 让后面那把在交叉处断开；间隙比默认小，只留一道细缝
export default () => {
  const back = sword.map(d => rotate(d, -45))
  return [...back, ...back.map(d => ({ d: mirror(d), cut: true, gap: 0.5 }))]
}
