import { GAP } from '../clearance'
import { overlayTopRight } from '../corner'
import { clear } from '../solid'
import { sparkle } from '../symbols'
import { accent } from '../tone'
import base, { fill as cubeFill } from './cube'

// cube + 右上角星芒角标
export default opts => [...base(opts), ...overlayTopRight('sparkle', sparkle, accent, opts.radius)]

// 实心：立方体的实心版在星芒四周让出缝，再把星芒画回去
export const fill = (opts) => {
  const badge = overlayTopRight('sparkle', sparkle, accent, opts.radius)
  return [...cubeFill(opts), clear(badge, GAP), ...badge]
}
