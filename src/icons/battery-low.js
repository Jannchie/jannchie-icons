import { level, shell } from '../battery'

// 电池低电量：进度线占三分之一
export default ({ radius }) => [...shell(radius), level(1 / 3)]
