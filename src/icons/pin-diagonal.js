import { rotate } from '../transform'
import pin from './pin'

// 图钉（倾斜）：竖直的图钉顺时针转 45°，针尖朝左下，像钉在板上
export default opts => pin(opts).map(d => rotate(d, 45))
