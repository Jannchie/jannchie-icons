import moon from './moon'
import { sparkle } from '../symbols'

// 夜晚：月牙 + 右上角一颗小星芒
export default opts => [...moon(opts), ...sparkle([18.5, 5], 0.75, opts.radius).map(p => p.d ?? p)]
