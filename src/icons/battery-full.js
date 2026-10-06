import { level, shell } from '../battery'

// 电池满电：进度线占满
export default ({ radius }) => [...shell(radius), level(1)]
