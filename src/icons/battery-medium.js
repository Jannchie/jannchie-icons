import { level, shell } from '../battery'

// 电池中电量：进度线占三分之二
export default ({ radius }) => [...shell(radius), level(2 / 3)]
