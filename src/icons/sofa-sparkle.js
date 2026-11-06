import { GAP } from '../clearance'
import { overlayTopRight } from '../corner'
import { clear } from '../solid'
import { sparkle } from '../symbols'
import { accent } from '../tone'
import base, { fill as baseFill } from './sofa'

// sofa + 右上角星芒角标（自动摆放家具）
export default opts => [...base(opts), ...overlayTopRight('sparkle', sparkle, accent, opts.radius)]

// 实心：sofa 的实心版，在星芒四周让出缝，再画星芒
export const fill = (opts) => {
  const badge = overlayTopRight('sparkle', sparkle, accent, opts.radius).map(({ cut, ...p }) => p)
  return [...baseFill(opts), clear(badge, GAP), ...badge]
}
