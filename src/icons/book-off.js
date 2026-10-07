import { off } from '../off'
import { cover } from '../book'

// 无书：页线只画到斜线经过的地方（x 15.5），免得斜线右边留下一小截页线头，和封面右边挤成一个小钩
export default off(() => [cover, 'M5.5 18A2.5 2.5 0 0 1 8 15.5H15.5'])
