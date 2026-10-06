import { license, LICENSES } from '../license'

// 开源协议：GNU Affero 通用公共许可证
export default ({ radius }) => license(LICENSES['agpl'].text, radius)
