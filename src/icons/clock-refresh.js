import { mirror } from '../transform'
import base from './history'

// 时间刷新：history（逆时针）的左右镜像，箭头顺时针
export default opts => base(opts).map(d => mirror(d))
