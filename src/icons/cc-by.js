import { CC, ccFill } from '../cc'

// 署名 BY
export default ({ radius }) => CC['cc-by'].paths(radius)

export const fill = ({ radius, stroke }) => ccFill('cc-by', radius, stroke)
