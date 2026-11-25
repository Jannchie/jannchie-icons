import { solid } from '../solid'

// 梨：上窄下宽的梨身（脖子 9–15，肚子 6–18，5.5–21.25）+ 顶上的果柄 + 果柄右边一片叶子
const body = 'M12 5.5C10 5.5 9 7.5 9 9.5C9 11.5 6 13 6 16.5C6 19.5 8.5 21.25 12 21.25C15.5 21.25 18 19.5 18 16.5C18 13 15 11.5 15 9.5C15 7.5 14 5.5 12 5.5Z'
const stalk = 'M12 5.5V3.25'
const leaf = 'M12 4.5C13 3 15 2.75 16.5 3.25C16 5 14 5.5 12 4.5Z'

export default () => [body, stalk, leaf]

// 实心：梨身、叶子各一块；果柄照旧是线
export const fill = () => [solid([body, leaf]), stalk]
