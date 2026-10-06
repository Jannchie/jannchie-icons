import { crisp, rounded } from '../geometry'

// 打开的文件夹：后片 + 往前倾的前片
// 两片在左下角 (3, 19) 汇合：前片这个角只用 crisp 小圆角，后片竖边的端点正好落在角上，被圆头盖住；
// 后片右边竖到前片顶边为止（T 字接）
export default ({ radius }) => [
  rounded([[3, 19], [3, 5], [9, 5], [11, 7], [18, 7], [18, 10.5]], Math.min(radius, 2), false),
  rounded([[3, 19, crisp(radius)], [6.5, 10.5], [21.5, 10.5], [18, 19]], Math.min(radius, 1.5)),
]
