import { overlayTopRight } from '../corner'
import { sparkle } from '../symbols'
import { accent } from '../tone'
import base from './video'

// video + 右上角星芒角标
export default opts => [...base(opts), ...overlayTopRight('sparkle', sparkle, accent, opts.radius)]
