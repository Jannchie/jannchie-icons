import { GREEK_CAPITAL } from '../greek'

// Φ（大写 phi）
export default ({ radius }) => GREEK_CAPITAL.phi(Math.min(radius, 1.5))
