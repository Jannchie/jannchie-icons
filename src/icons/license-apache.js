import { license, LICENSES } from '../license'

// 开源协议：Apache 许可证（Apache Software License）
export default ({ radius }) => license(LICENSES['apache'].text, radius)
