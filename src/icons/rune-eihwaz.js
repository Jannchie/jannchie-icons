import { crisp } from '../geometry'
import { RUNES } from '../runes'

// 卢恩字母（Elder Futhark）：ᛇ eihwaz
export default ({ radius }) => RUNES.eihwaz.paths(crisp(radius))
