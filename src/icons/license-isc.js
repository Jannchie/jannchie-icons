import { license, licenseFill, LICENSES } from '../license'

// 开源协议：ISC 许可证
export default ({ radius, stroke }) => license(LICENSES['isc'].text, radius, stroke)

export const fill = ({ radius, stroke }) => licenseFill(LICENSES['isc'].text, radius, stroke)
