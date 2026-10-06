import { rating } from '../rating'

// 内容分级：北美游戏 ESRB M
export default ({ radius }) => rating('esrb', 'M', radius)
