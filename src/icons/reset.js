import { mirror } from '../transform'
import base from './refresh'

// 重置 ↺：refresh 的左右镜像
export default opts => base(opts).map(d => mirror(d))
