import { crisp } from '../geometry'
import { RUNES } from '../runes'

// 卢恩字母（Elder Futhark）：ᚨ ansuz
export default ({ radius }) => RUNES.ansuz.paths(crisp(radius))
