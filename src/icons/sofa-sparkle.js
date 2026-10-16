import { overlayTopRight } from '../corner'
import { sparkle } from '../symbols'
import { accent } from '../tone'
import base from './sofa'

// sofa + 右上角星芒角标（自动摆放家具）
export default opts => [...base(opts), ...overlayTopRight('sparkle', sparkle, accent, opts.radius)]
