import { translate } from '../transform'
import { plane } from './send'

// 发送：机头朝正右；中间的折线是水平的，整体上移半格落在 .5 上
export default opts => plane(90)(opts).map(d => translate(d, 0, -0.5))
