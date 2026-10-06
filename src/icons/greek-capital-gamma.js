import { GREEK_CAPITAL } from '../greek'

// Γ（大写 gamma）
export default ({ radius }) => GREEK_CAPITAL.gamma(Math.min(radius, 1.5))
