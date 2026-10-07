import { crisp } from '../geometry'
import { RUNES } from '../runes'

// 卢恩字母（Elder Futhark）：ᛊ sowilo
export default ({ radius }) => RUNES.sowilo.paths(crisp(radius))
