import { crisp } from '../geometry'
import { RUNES } from '../runes'

// 卢恩字母（Elder Futhark）：ᛜ ingwaz
export default ({ radius }) => RUNES.ingwaz.paths(crisp(radius))
