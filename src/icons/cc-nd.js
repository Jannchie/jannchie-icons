import { CC, ccFill } from '../cc'

// 禁止演绎 ND
export default ({ radius }) => CC['cc-nd'].paths(radius)

export const fill = ({ radius, stroke }) => ccFill('cc-nd', radius, stroke)
