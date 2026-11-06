import { solid } from '../solid'
import { sparkle } from '../symbols'
import moon, { fill as moonFill } from './moon'

// 夜晚：月牙 + 右上角一颗小星芒
export default opts => [...moon(opts), ...sparkle([18.5, 5], 0.75, opts.radius).map(p => p.d ?? p)]

// 实心：月牙和星芒都填实
export const fill = opts => [...moonFill(opts), ...solid(sparkle([18.5, 5], 0.75, opts.radius).map(p => p.d ?? p))]
