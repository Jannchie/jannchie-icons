import { solid } from '../solid'
import { plug } from '../symbols'

// 插头
export default ({ radius }) => plug([12, 12], 2.3, radius)

// 实心：插头主体填实；主体和电线是同一条路径（电线从底端上到颈口再绕主体一圈），填实时电线那段只是来回的零面积，
// 所以再把整条路径当线画一遍，电线照旧是线；两根插脚也是线
export const fill = ({ radius }) => {
  const [a, b, body] = plug([12, 12], 2.3, radius)
  return [a, b, solid(body), body]
}
