import { questionMark } from '../ai'
import { crisp, rounded } from '../geometry'

// Hugging Face 任务：问答。一个大问号，底下的点换成了一个对勾：问题有了答案
// 不用「气泡 + 问号」：库里的 chat-question 就是那样画的，会一模一样。这是和用户确认过的方案
// 问号的钩：圆心 (12, 7.5)、半径 3.75，墨迹上缘在 3，竖笔停在 13.3；
// 对勾：拐点 (10.75, 20.25)，墨迹下缘在 21，左臂短、右臂长（45°），整个对勾左右以 12 为中（墨迹 7.25–17）；
// 竖笔的末端离对勾 3 以上
const hook = questionMark(12, 7.5, 3.75, 0)[0]

// 纯线条图标，实心版和描边版相同，不单独导出 fill
export default ({ radius }) => [hook, rounded([[8, 17.5], [10.75, 20.25], [16.25, 14.75]], crisp(radius), false)]
