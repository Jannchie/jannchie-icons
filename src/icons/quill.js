import { solid } from '../solid'

// 羽毛笔（作者注释、写作）：和 feather 同一片羽片，羽轴伸到左下变成笔尖，笔尖右边一道书写的波浪线
const vane = 'M19.5 4.5C19.5 10.5 15.5 15.5 8.5 16L10 13.25L7.5 13.5L9.25 10.5L7.25 10.5C9.25 7 13.5 4.5 19.5 4.5Z'
const shaft = 'M4 20L16.5 7.5'
const ink = 'M10.5 20.5C12 19.25 13.25 21.25 14.75 20.25C16 19.4 17 20 18 20.5'

export default () => [vane, shaft, ink]

// 实心：羽片一块；羽轴、书写线照旧是线（羽轴穿过实心的羽片，看不出来）
export const fill = () => [solid(vane), shaft, ink]
