import { license, LICENSES } from '../license'

// 开源协议：MIT 许可证
export default ({ radius, stroke }) => license(LICENSES['mit'].text, radius, stroke)
