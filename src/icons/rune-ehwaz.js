import { crisp } from '../geometry'
import { RUNES } from '../runes'

// 卢恩字母（Elder Futhark）：ᛖ ehwaz
export default ({ radius }) => RUNES.ehwaz.paths(crisp(radius))
