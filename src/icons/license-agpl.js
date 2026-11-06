import { license, licenseFill, LICENSES } from '../license'

// 开源协议：GNU Affero 通用公共许可证
export default ({ radius, stroke }) => license(LICENSES['agpl'].text, radius, stroke)

export const fill = ({ radius, stroke }) => licenseFill(LICENSES['agpl'].text, radius, stroke)
