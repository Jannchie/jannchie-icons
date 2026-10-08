// 八卦与六十四卦：爻自下而上（初爻在前），1 为阳爻、0 为阴爻
// 阳爻一条长横；阴爻中间断开 4 个单位，粗字重下断口也清楚

// 一组爻画在 ys（自下而上的中心线 y）上
const yao = (lines, ys) => lines.map((l, i) => (l ? `M4 ${ys[i]}H20` : `M4 ${ys[i]}H10M14 ${ys[i]}H20`))

// 三爻间距 5、居中在 12 上；六爻间距 3，落在 .5 上（粗字重下六爻留 1 个单位间隙）
const TRI_Y = [17, 12, 7]
const HEX_Y = [19.5, 16.5, 13.5, 10.5, 7.5, 4.5]

// 先天八卦顺序：乾兑离震巽坎艮坤
const LINES = {
  qian: [1, 1, 1],
  dui: [1, 1, 0],
  li: [1, 0, 1],
  zhen: [1, 0, 0],
  xun: [0, 1, 1],
  kan: [0, 1, 0],
  gen: [0, 0, 1],
  kun: [0, 0, 0],
}
const TRIGRAM_ZH = { qian: '☰ 乾', dui: '☱ 兑', li: '☲ 离', zhen: '☳ 震', xun: '☴ 巽', kan: '☵ 坎', gen: '☶ 艮', kun: '☷ 坤' }

export const TRIGRAMS = Object.fromEntries(Object.entries(LINES).map(([k, lines]) => [k, { zh: TRIGRAM_ZH[k], lines, paths: () => yao(lines, TRI_Y) }]))

// 文王卦序（通行本）：[拼音, 卦名, 上卦, 下卦]
const ORDER = [
  ['qian', '乾', 'qian', 'qian'],
  ['kun', '坤', 'kun', 'kun'],
  ['zhun', '屯', 'kan', 'zhen'],
  ['meng', '蒙', 'gen', 'kan'],
  ['xu', '需', 'kan', 'qian'],
  ['song', '讼', 'qian', 'kan'],
  ['shi', '师', 'kun', 'kan'],
  ['bi', '比', 'kan', 'kun'],
  ['xiaoxu', '小畜', 'xun', 'qian'],
  ['lv', '履', 'qian', 'dui'],
  ['tai', '泰', 'kun', 'qian'],
  ['pi', '否', 'qian', 'kun'],
  ['tongren', '同人', 'qian', 'li'],
  ['dayou', '大有', 'li', 'qian'],
  ['qian', '谦', 'kun', 'gen'],
  ['yu', '豫', 'zhen', 'kun'],
  ['sui', '随', 'dui', 'zhen'],
  ['gu', '蛊', 'gen', 'xun'],
  ['lin', '临', 'kun', 'dui'],
  ['guan', '观', 'xun', 'kun'],
  ['shihe', '噬嗑', 'li', 'zhen'],
  ['bi', '贲', 'gen', 'li'],
  ['bo', '剥', 'gen', 'kun'],
  ['fu', '复', 'kun', 'zhen'],
  ['wuwang', '无妄', 'qian', 'zhen'],
  ['daxu', '大畜', 'gen', 'qian'],
  ['yi', '颐', 'gen', 'zhen'],
  ['daguo', '大过', 'dui', 'xun'],
  ['kan', '坎', 'kan', 'kan'],
  ['li', '离', 'li', 'li'],
  ['xian', '咸', 'dui', 'gen'],
  ['heng', '恒', 'zhen', 'xun'],
  ['dun', '遯', 'qian', 'gen'],
  ['dazhuang', '大壮', 'zhen', 'qian'],
  ['jin', '晋', 'li', 'kun'],
  ['mingyi', '明夷', 'kun', 'li'],
  ['jiaren', '家人', 'xun', 'li'],
  ['kui', '睽', 'li', 'dui'],
  ['jian', '蹇', 'kan', 'gen'],
  ['xie', '解', 'zhen', 'kan'],
  ['sun', '损', 'gen', 'dui'],
  ['yi', '益', 'xun', 'zhen'],
  ['guai', '夬', 'dui', 'qian'],
  ['gou', '姤', 'qian', 'xun'],
  ['cui', '萃', 'dui', 'kun'],
  ['sheng', '升', 'kun', 'xun'],
  ['kun', '困', 'dui', 'kan'],
  ['jing', '井', 'kan', 'xun'],
  ['ge', '革', 'dui', 'li'],
  ['ding', '鼎', 'li', 'xun'],
  ['zhen', '震', 'zhen', 'zhen'],
  ['gen', '艮', 'gen', 'gen'],
  ['jian', '渐', 'xun', 'gen'],
  ['guimei', '归妹', 'zhen', 'dui'],
  ['feng', '丰', 'zhen', 'li'],
  ['lv', '旅', 'li', 'gen'],
  ['xun', '巽', 'xun', 'xun'],
  ['dui', '兑', 'dui', 'dui'],
  ['huan', '涣', 'xun', 'kan'],
  ['jie', '节', 'kan', 'dui'],
  ['zhongfu', '中孚', 'xun', 'dui'],
  ['xiaoguo', '小过', 'zhen', 'gen'],
  ['jiji', '既济', 'kan', 'li'],
  ['weiji', '未济', 'li', 'kan'],
]

// 键是「两位序号-拼音」，按卦序排列；lines 自下而上 = 下卦 + 上卦
export const HEXAGRAMS = Object.fromEntries(ORDER.map(([py, zh, upper, lower], i) => {
  const lines = [...LINES[lower], ...LINES[upper]]
  return [`${String(i + 1).padStart(2, '0')}-${py}`, { zh, upper, lower, lines, paths: () => yao(lines, HEX_Y) }]
}))
