import { rating } from '../rating'

// 内容分级：北美游戏 ESRB AO
export default ({ radius }) => rating('esrb', 'AO', radius)
