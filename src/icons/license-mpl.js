import { license, LICENSES } from '../license'

// 开源协议：Mozilla 公共许可证
export default ({ radius }) => license(LICENSES['mpl'].text, radius)
