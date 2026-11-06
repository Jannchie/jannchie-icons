import { license, licenseFill, LICENSES } from '../license'

// 开源协议：BSD 许可证
export default ({ radius, stroke }) => license(LICENSES['bsd'].text, radius, stroke)

export const fill = ({ radius, stroke }) => licenseFill(LICENSES['bsd'].text, radius, stroke)
