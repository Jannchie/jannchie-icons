import { rounded } from '../geometry'

// 分享（箭头）：向右的空心粗箭头，箭头两翼 45°，箭杆从左下弯上来
// 箭头部分是折线（跟随圆角），箭杆上下两条边用曲线，下边比上边弯得更低，像从左下甩上来
export default ({ radius }) => {
  const r = Math.min(radius, 1.5)
  const head = rounded([[13.5, 9.5], [13.5, 5], [20.5, 12], [13.5, 19], [13.5, 14.5]], r, false)
  return [
    head,
    'M13.5 9.5C8 9.5 4 13 4 19.5C6 16 9.5 14.5 13.5 14.5',
  ]
}
