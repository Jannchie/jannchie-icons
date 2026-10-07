import { translate } from '../transform'
import { plane } from './send'

// 发送：机头朝正上；中间的折线是竖直的，整体左移半格落在 .5 上
export default opts => plane(0)(opts).map(d => translate(d, -0.5, 0))
