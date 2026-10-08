import { rounded } from '../geometry'

// 打开的文件夹：后片和往前倾的前片连成一笔，外框和关着的文件夹一样（墨迹左右 2–22、上下 3–21，线宽变粗只往里长）
// 后片的左下角是正常的圆角；前片的斜边往左下伸，停在离左边线 1.5 的地方、不和它相接：
// 斜着接进竖线的话，尖角模式下方头的角会从左边线外侧戳出去
// 后片右边竖到前片顶边为止（T 字接）；前片顶边比本体顶边低 4.25，前片右上角顶到右边外缘
export default ({ radius, stroke }) => {
  const h = stroke / 2
  const [l, t, r, b] = [2 + h, 3 + h, 22 - h, 21 - h]
  const body = t + 3
  const front = body + 4.25
  return [
    rounded([[r - 3, front], [r - 3, body], [12, body], [9, t], [l, t], [l, b], [r - 3.5, b], [r, front], [l + 3, front], [l + 1.5, front + 3]], Math.min(radius, 2), false),
  ]
}
