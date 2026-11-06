import { rotate } from '../transform'
import up, { fill as upFill } from './thumbs-up'

// 点踩：点赞转 180°
export default opts => up(opts).map(d => rotate(d, 180))

// 实心：点赞的实心版转 180°
export const fill = opts => upFill(opts).map(p => ({ ...p, d: rotate(p.d, 180) }))
