import { GREEK_CAPITAL } from '../greek'

// Θ（大写 theta）
export default ({ radius }) => GREEK_CAPITAL.theta(Math.min(radius, 1.5))
