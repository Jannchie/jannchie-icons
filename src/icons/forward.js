import { mirror } from '../transform'
import reply from './reply'

// 转发：reply 的左右镜像——箭头朝右，箭杆往左弯下来（竖线 20.5 镜像到 3.5，仍落在 .5 上）
export default opts => reply(opts).map(d => mirror(d))
