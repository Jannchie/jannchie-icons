import { GREEK_CAPITAL } from '../greek'

// Ψ（大写 psi）
export default ({ radius }) => GREEK_CAPITAL.psi(Math.min(radius, 1.5))
