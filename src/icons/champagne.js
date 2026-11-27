import { solid } from '../solid'
import { mirror, rotate, translate } from '../transform'

// 香槟：两只碰在一起的香槟杯（笛形杯），左右对称。左边那只先正着画（杯口右角放在原点）：窄而深的杯身（杯口宽 5，往下收成圆底，深 9）+ 细杯脚（到 15.5）+ 杯底的一横（宽 5），
// 再绕杯口右角顺时针转 15°、挪到 (11.5, 6.25)——两只杯子的杯口内角在正中上方挨在一起；右边那只是左边的镜像
// + 碰杯处上方迸出来的三道短线
// 两只斜着相碰的细长杯是香槟（干杯）的记号：和单只圆肚的 wine、三角杯的 cocktail 区分开
const place = d => translate(rotate(d, 15, [0, 0]), 11.5, 6.25)
const bowl = place('M-5 0H0C0 5.4 -0.875 9 -2.5 9C-4.125 9 -5 5.4 -5 0Z')
const stem = ['M-2.5 9V15.5', 'M-5 15.5H0'].map(place)
const bowls = [bowl, mirror(bowl)]
const stems = [...stem, ...stem.map(d => mirror(d))]
const sparks = ['M12 4.25V2.75', 'M9.25 3.5L8.5 2.5', 'M14.75 3.5L15.5 2.5']

export default () => [...bowls, ...stems, ...sparks]

// 实心：两只杯身各一块；杯脚、杯底、迸出来的短线照旧是线
export const fill = () => [solid(bowls), ...stems, ...sparks]
