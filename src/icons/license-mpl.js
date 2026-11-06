import { license, licenseFill, LICENSES } from '../license'

// 开源协议：Mozilla 公共许可证
export default ({ radius, stroke }) => license(LICENSES['mpl'].text, radius, stroke)

export const fill = ({ radius, stroke }) => licenseFill(LICENSES['mpl'].text, radius, stroke)
