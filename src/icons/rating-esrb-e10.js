import { rating } from '../rating'

// 内容分级：北美游戏 ESRB E10+
export default ({ radius }) => rating('esrb', 'E/10+', radius)
