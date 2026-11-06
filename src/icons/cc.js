import { CC, ccFill } from '../cc'

// 知识共享 CC
export default ({ radius }) => CC['cc'].paths(radius)

export const fill = ({ radius, stroke }) => ccFill('cc', radius, stroke)
