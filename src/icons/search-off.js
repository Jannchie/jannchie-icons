import base from './search'

// 关闭搜索。例外：划掉的斜线一般是 \，但搜索手柄也是 \ 且正好在同一条直线上，会被整根裁掉；
// 所以这里斜线改用 /，与手柄交叉
export default opts => [...base(opts), { d: 'M21 3L3 21', cut: true, tone: 'danger' }]
