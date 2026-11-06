import { license, licenseFill, LICENSES } from '../license'

// 开源协议：MIT 许可证
export default ({ radius, stroke }) => license(LICENSES['mit'].text, radius, stroke)

export const fill = ({ radius, stroke }) => licenseFill(LICENSES['mit'].text, radius, stroke)
