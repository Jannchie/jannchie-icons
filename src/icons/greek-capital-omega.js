import { GREEK_CAPITAL } from '../greek'

// Ω（大写 omega）
export default ({ radius }) => GREEK_CAPITAL.omega(Math.min(radius, 1.5))
