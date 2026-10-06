import { license, LICENSES } from '../license'

// 开源协议：MIT 许可证
export default ({ radius }) => license(LICENSES['mit'].text, radius)
