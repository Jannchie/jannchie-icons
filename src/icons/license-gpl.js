import { license, licenseFill, LICENSES } from '../license'

// 开源协议：GNU 通用公共许可证
export default ({ radius, stroke }) => license(LICENSES['gpl'].text, radius, stroke)

export const fill = ({ radius, stroke }) => licenseFill(LICENSES['gpl'].text, radius, stroke)
