import { level, shell } from '../battery'

// 电池满电：刻度竖线在约 85% 处
export default ({ radius }) => [...shell(radius), level(0.85)]
