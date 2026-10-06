import { mirror } from '../transform'
import base from './rotate'

// 逆时针旋转：rotate 的左右镜像
export default opts => base(opts).map(d => mirror(d))
