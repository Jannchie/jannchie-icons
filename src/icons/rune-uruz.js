import { crisp } from '../geometry'
import { RUNES } from '../runes'

// 卢恩字母（Elder Futhark）：ᚢ uruz
export default ({ radius }) => RUNES.uruz.paths(crisp(radius))
