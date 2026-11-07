import { off, offFill } from '../off'
import { cutout } from '../solid'
import base, { fill as baseFill } from './filter'

// 无筛选
export default off(base)

// 实心：漏斗的左斜边和斜线几乎平行，让出缝以后漏斗口左下剩一根越来越细的尖刺：
// 斜线左下方、漏斗颈左边（墨迹外缘 10.5 - 半线宽）以外的部分整块去掉，漏斗颈单独一根，顶端顺着斜线切
export const fill = offFill(opts => [...baseFill(opts), cutout(`M-1 -1L${10.5 - opts.stroke / 2} ${10.5 - opts.stroke / 2}V25H-1Z`)])
