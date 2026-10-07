import { crisp } from '../geometry'
import { RUNES } from '../runes'

// 卢恩字母（Elder Futhark）：ᚱ raidho
export default ({ radius }) => RUNES.raidho.paths(crisp(radius))
