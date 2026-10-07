import { crisp } from '../geometry'
import { RUNES } from '../runes'

// 卢恩字母（Elder Futhark）：ᛃ jera
export default ({ radius }) => RUNES.jera.paths(crisp(radius))
