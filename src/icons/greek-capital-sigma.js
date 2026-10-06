import { GREEK_CAPITAL } from '../greek'

// Σ（大写 sigma）
export default ({ radius }) => GREEK_CAPITAL.sigma(Math.min(radius, 1.5))
