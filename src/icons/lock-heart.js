import { knock, solid } from '../solid'
import { affine } from '../transform'
import { HEART } from './heart'

// 心形锁（独占）：锁身是一颗爱心（heart 缩到 0.85 倍，底尖落在 21.25），锁梁的两条腿（8.5 / 15.5）正好落在两瓣的最高处，
// 梁顶在 2.75；心里一道竖的锁孔线（同 lock）
const K = 0.85
const body = affine(HEART, K, K, 12 - 12 * K, 21.25 - 20 * K)
const shackle = 'M8.5 8.1V6.25A3.5 3.5 0 0 1 15.5 6.25V8.1'
const keyhole = 'M12 13.5V16'

export default () => [body, shackle, keyhole]

// 实心：心形锁身一块，锁孔挖空，锁梁照旧是线
export const fill = () => [solid(body), knock(keyhole), shackle]
