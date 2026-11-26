import { rotate } from '../transform'
import up from './hand-point-up'

// 食指朝右（指向右边、下一个）：hand-point-up 顺时针转 90°——食指横着伸向右边，大拇指在上面，三根蜷着的手指在下面，手腕在左
// 转 90° 之后原来的竖线都变成横线，仍然落在 .5 上；墨迹左右各差 0.25 的偏心和 hand-point-up 上下的偏心一样，留着不动
// 都是线，没有实心版（同 hand）
export default opts => up(opts).map(d => rotate(d, 90))
