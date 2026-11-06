import { CC, ccFill } from '../cc'

// 非商业 NC（欧元）
export default ({ radius }) => CC['cc-nc-eu'].paths(radius)

export const fill = ({ radius, stroke }) => ccFill('cc-nc-eu', radius, stroke)
