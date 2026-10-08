import { crisp, rounded } from '../geometry'
import { arrow } from '../media'
import base from './clipboard'

// 粘贴进来：剪贴板 + 从右边外面往里指的箭头（横杆 13.5 落在 .5 上，尖在 11.5，翼 3）；
// 箭头作为 cut，把板子右边在箭杆附近断开，读成「从外面放进板子里」
export default (opts) => {
  const { radius } = opts
  return [
    ...base(opts),
    { d: 'M11.5 13.5H21.5', cut: true },
    { d: rounded(arrow(11.5, 13.5, 'left', 3), crisp(radius), false), cut: true },
  ]
}
