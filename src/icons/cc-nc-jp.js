import { CC, ccFill } from '../cc'

// 非商业 NC（日元）
export default ({ radius }) => CC['cc-nc-jp'].paths(radius)

export const fill = ({ radius, stroke }) => ccFill('cc-nc-jp', radius, stroke)
