import { level, shell } from '../battery'

// 电池低电量：填充到约 30% 处
export default ({ radius }) => [...shell(radius), level(0.3, radius)]
