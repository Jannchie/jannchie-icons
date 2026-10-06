import { license, LICENSES } from '../license'

// 开源协议：BSD 许可证
export default ({ radius }) => license(LICENSES['bsd'].text, radius)
