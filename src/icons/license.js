import { certificate, certificateFill } from '../license'

// 许可证 / 证书：横放的证书 + 印章
export default ({ radius, stroke }) => certificate(radius, stroke)

export const fill = ({ radius, stroke }) => certificateFill(radius, stroke)
