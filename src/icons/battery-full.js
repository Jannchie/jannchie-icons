import { level, shell } from '../battery'

// 电池满电：整个壳填满
export default ({ radius }) => [...shell(radius), level(1, radius)]
