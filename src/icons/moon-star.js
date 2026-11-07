import { GAP } from '../clearance'
import { clear, solid } from '../solid'
import { sparkle } from '../symbols'
import moon, { fill as moonFill } from './moon'

// 夜晚：月牙 + 右上角一颗小星芒
export default opts => [...moon(opts), ...sparkle([18.5, 5], 0.75, opts.radius).map(p => p.d ?? p)]

// 实心：月牙和星芒都填实；星芒在前，月牙沿星芒让出 GAP 的缝（粗字重下星芒的尖会碰上月牙的上角）
export const fill = (opts) => {
  const star = sparkle([18.5, 5], 0.75, opts.radius).map(p => p.d ?? p)
  return [...moonFill(opts), clear(star, GAP), ...solid(star)]
}
