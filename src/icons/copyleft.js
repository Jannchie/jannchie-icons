import { CC, ccFill } from '../cc'

// Copyleft
export default ({ radius }) => CC['copyleft'].paths(radius)

export const fill = ({ radius, stroke }) => ccFill('copyleft', radius, stroke)
