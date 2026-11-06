import { CC, ccFill } from '../cc'

// CC0 放弃权利
export default ({ radius }) => CC['cc-zero'].paths(radius)

export const fill = ({ radius, stroke }) => ccFill('cc-zero', radius, stroke)
