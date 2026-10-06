import { rating } from '../rating'

// 内容分级：北美游戏 ESRB RP
export default ({ radius }) => rating('esrb', 'RP', radius)
