import { crisp } from '../geometry'
import { RUNES } from '../runes'

// 卢恩字母（Elder Futhark）：ᛚ laguz
export default ({ radius }) => RUNES.laguz.paths(crisp(radius))
