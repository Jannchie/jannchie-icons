import { GAP } from '../clearance'
import { clear, solid } from '../solid'

// 阔叶树：三瓣云朵形树冠（底部留口）+ 穿进树冠的树干和两根枝
// 树干只画到上面那个分枝点（13.5），两根枝从树干上长出来：树干顶端不留空悬的线头，粗字重下不会被吸到枝梢上
const crown = 'M9.5 16.5H7A4 4 0 0 1 5.5 9A6.6 6.6 0 0 1 18.5 9A4 4 0 0 1 17 16.5H14.5'
const trunk = [
  'M12 21.5V13.5',
  'M12 15L9.5 12.5',
  'M12 13.5L14 11.5',
]

export default () => [
  crown,
  ...trunk,
]

// 实心：树冠（底部封口）填实，树干和枝在前面、四周在树冠上让出 GAP 的缝（缝按圆头圆角让：尖角模式下方头和斜接会在分枝处让出锯齿）
export const fill = () => [
  solid(`${crown}Z`),
  clear(trunk.map(d => ({ d, round: true })), GAP),
  ...trunk,
]
