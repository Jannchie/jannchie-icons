import { CC, ccFill } from '../cc'

// 相同方式共享 SA
export default ({ radius }) => CC['cc-sa'].paths(radius)

export const fill = ({ radius, stroke }) => ccFill('cc-sa', radius, stroke)
