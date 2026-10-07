import { crisp } from '../geometry'
import { RUNES } from '../runes'

// 卢恩字母（Elder Futhark）：ᛏ tiwaz
export default ({ radius }) => RUNES.tiwaz.paths(crisp(radius))
