import { overlayTopRight } from '../corner'
import { sparkle } from '../symbols'
import { accent } from '../tone'
import base from './floor-plan'

// floor-plan + 右上角星芒角标（自动生成户型）
export default opts => [...base(opts), ...overlayTopRight('sparkle', sparkle, accent, opts.radius)]
