import { rotate } from '../transform'
import { sword, swordFill } from '../weapons'

// 剑：剑身 + 护手 + 剑柄 + 剑首；竖着画再逆时针转 45°，剑尖朝左上
export default () => sword.map(d => rotate(d, -45))

// 实心：剑身、剑首填实（见 weapons.js 的 swordFill）
export const fill = () => swordFill.map(p => (typeof p === 'string' ? rotate(p, -45) : { ...p, d: rotate(p.d, -45) }))
