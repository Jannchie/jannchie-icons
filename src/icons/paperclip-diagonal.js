import { rotate } from '../transform'
import { clip } from './paperclip'

// 曲别针（倾斜）：竖直版顺时针转 30°，与水平成 60°，和铅笔同角度
export default () => [rotate(clip, 30)]
