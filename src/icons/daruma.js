import { circle, oval } from '../geometry'
import { hole, knock, solid } from '../solid'
import { mirror } from '../transform'

// 达摩（不倒翁）：上窄下宽、底部坐平的身子（3.5–20.5 × 2.5–21）；身子上部一个横椭圆的脸窗（圆心 (12, 10)、半径 5.25 × 4.25），
// 窗里两道实心的浓眉（楔形，左右镜像，贴着脸窗上沿，像画在脸边上）和两只空白的圆眼（许愿前还没点睛）；窗下身子上一撇两端上翘的八字胡。
// 脸窗 + 浓眉是记号：只有蛋形和一张脸的话读成鸡蛋或猫头鹰；底部坐平，和 egg 的尖底区分开
const body = 'M12 2.5C16.75 2.5 19.75 6.5 19.75 11C19.75 13.5 20.5 15.5 20.5 17.25C20.5 20 17.5 21 12 21C6.5 21 3.5 20 3.5 17.25C3.5 15.5 4.25 13.5 4.25 11C4.25 6.5 7.25 2.5 12 2.5Z'
const face = oval(12, 10, 5.25, 4.25)
const brow = 'M7.5 8.75C8 7 10 6.25 11.25 7.25C10 7.25 8.75 7.75 7.5 8.75Z'
const brows = [brow, mirror(brow)].map(d => ({ d, fill: true }))
const eyes = [circle(9.75, 11, 1.25), circle(14.25, 11, 1.25)]
const whiskers = 'M8 16.25C9 17.5 11 17.5 12 16.25C13 17.5 15 17.5 16 16.25'

export default () => [body, face, ...brows, ...eyes, whiskers]

// 实心：身子一块，脸窗挖成白脸（洞外扩半个线宽后正好到描边版脸窗的中心线），浓眉、眼圈画回脸里；八字胡挖空
export const fill = ({ stroke }) => [
  solid(body),
  hole(oval(12, 10, 5.25 - stroke / 2, 4.25 - stroke / 2)),
  ...brows,
  ...eyes,
  knock(whiskers),
]
