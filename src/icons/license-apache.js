import { license, licenseFill, LICENSES } from '../license'

// 开源协议：Apache 许可证（Apache Software License）
export default ({ radius, stroke }) => license(LICENSES['apache'].text, radius, stroke)

export const fill = ({ radius, stroke }) => licenseFill(LICENSES['apache'].text, radius, stroke)
