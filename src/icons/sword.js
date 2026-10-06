import { rotate } from '../transform'
import { sword } from '../weapons'

// 剑：剑身 + 护手 + 剑柄 + 剑首；竖着画再逆时针转 45°，剑尖朝左上
export default () => sword.map(d => rotate(d, -45))
