import { level, shell } from '../battery'

// 电池中电量：填充到约 55% 处
export default ({ radius }) => [...shell(radius), level(0.55, radius)]
