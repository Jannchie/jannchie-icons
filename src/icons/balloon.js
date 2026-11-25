import { knock, solid } from '../solid'

// 气球：上圆下收的球体（6–18 × 2.75–15.75）+ 球底的小三角结（实心，顶角藏在球体的线里）+ 一条 S 形的线（落到 21.25）；球体左上一道短高光弧（细节线）
const body = 'M12 2.75C15.75 2.75 18 5.5 18 9C18 12.75 14.75 15.75 12 15.75C9.25 15.75 6 12.75 6 9C6 5.5 8.25 2.75 12 2.75Z'
const knot = 'M12 15.5L10.5 17.75H13.5Z'
const string = 'M12 17.75C10.5 19 13.5 19.75 12 21.25'
const glint = { d: 'M9 8C9 6.75 9.75 5.75 11 5.5', detail: true }

export default () => [body, { d: knot, fill: true }, string, glint]

// 实心：球体、小结各一块，高光挖空；线照旧是线
export const fill = () => [solid(body), { d: knot, fill: true }, knock(glint), string]
