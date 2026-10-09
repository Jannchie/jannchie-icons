import { license, LICENSES } from '../license'

// 开源协议：GNU 宽通用公共许可证
export default ({ radius, stroke }) => license(LICENSES['lgpl'].text, radius, stroke)
