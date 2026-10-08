import { rounded } from '../geometry'
import { check } from '../symbols'
import { success } from '../tone'

// 认证徽章：八瓣波浪形的章 + 中间的勾
// 章的轮廓是 16 个点交替的星形（外 9.25、内 7.75，正上方是外点），外点圆角大、内点圆角小，连起来是起伏的波浪边；
// 尖角模式下就是一圈浅锯齿（像封蜡、奖章的齿边），同样好认
const [R, r] = [9.25, 7.75]

export default ({ radius }) => {
  const points = Array.from({ length: 16 }, (_, i) => {
    const a = -Math.PI / 2 + i * Math.PI / 8
    const d = i % 2 ? r : R
    return [12 + Math.cos(a) * d, 12 + Math.sin(a) * d, i % 2 ? Math.min(radius, 1.5) : Math.min(radius * 1.5, 3)]
  })
  return [
    rounded(points, radius),
    ...success(check([12, 12], 1.4, radius)),
  ]
}
