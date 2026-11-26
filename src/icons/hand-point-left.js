import { mirror } from '../transform'
import right from './hand-point-right'

// 食指朝左：hand-point-right 左右镜像（大拇指照旧在上面）
// 都是线，没有实心版（同 hand）
export default opts => right(opts).map(d => mirror(d))
