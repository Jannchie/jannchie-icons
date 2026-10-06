import { GREEK_CAPITAL } from '../greek'

// Δ（大写 delta）
export default ({ radius }) => GREEK_CAPITAL.delta(Math.min(radius, 1.5))
