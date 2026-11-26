import { rotate } from '../transform'
import up from './hand-point-up'

// 食指朝下：hand-point-up 转 180°（同 thumbs-down 和 thumbs-up 的关系），大拇指转到右上
// 不用上下翻转：翻转会把大拇指留在左边，成了手背朝前的另一只手；转 180° 后竖线仍落在 .5 上，墨迹上下 2.75 / 2.25、左右 3.75 / 3.61，
// 和 hand-point-up 的偏心一样，不另外挪
// 都是线，没有实心版（同 hand）
export default opts => up(opts).map(d => rotate(d, 180))
