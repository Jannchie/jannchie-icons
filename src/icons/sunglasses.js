import { knock, solid } from '../solid'

// 墨镜：顶上一道横梁 + 两片下垂的镜片 + 镜片上的反光
const bar = 'M2.5 9.5H21.5'
const lenses = [
  'M3.5 9.5V12.5C3.5 15.5 5.25 17 7 17C9 17 10.5 15.5 10.5 13V9.5',
  'M13.5 9.5V13C13.5 15.5 15 17 17 17C18.75 17 20.5 15.5 20.5 12.5V9.5',
]
const glints = [
  { d: 'M5.5 12.5L7.5 11', detail: true },
  { d: 'M16 12.5L18 11', detail: true },
]

export default () => [
  bar,
  ...lenses,
  ...glints,
]

// 实心：两片镜片填实，反光挖空；横梁照旧是线
export const fill = () => [
  solid(lenses.map(d => `${d}Z`)),
  bar,
  knock(glints),
]
