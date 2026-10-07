import { crisp } from '../geometry'
import { RUNES } from '../runes'

// 卢恩字母（Elder Futhark）：ᛞ dagaz
export default ({ radius }) => RUNES.dagaz.paths(crisp(radius))
