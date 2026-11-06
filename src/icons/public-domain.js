import { CC, ccFill } from '../cc'

// 公有领域
export default ({ radius }) => CC['public-domain'].paths(radius)

export const fill = ({ radius, stroke }) => ccFill('public-domain', radius, stroke)
