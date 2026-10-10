import { overlayTopRight } from '../corner'
import { sparkle } from '../symbols'
import { accent } from '../tone'
import base from './code'

// code + 右上角星芒角标
export default opts => [...base(opts), ...overlayTopRight('sparkle', sparkle, accent, opts.radius)]
