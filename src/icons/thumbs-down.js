import { rotate } from '../transform'
import up from './thumbs-up'

// 点踩：点赞转 180°
export default opts => up(opts).map(d => rotate(d, 180))
