import { CC, ccFill } from '../cc'

// 非商业 NC
export default ({ radius }) => CC['cc-nc'].paths(radius)

export const fill = ({ radius, stroke }) => ccFill('cc-nc', radius, stroke)
