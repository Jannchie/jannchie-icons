import { code } from '../symbols'
import base from './window'

// HTML：窗口 + 中间的 </>
export default opts => [...base(opts), ...code([12, 14.25], 1, opts.radius).map(p => p.d ?? p)]
