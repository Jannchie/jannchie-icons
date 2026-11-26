import { boolean, booleanFill } from '../boolean'

// 布尔运算·减去顶层（左上的图形减掉被右下挡住的部分）：几何见 boolean.js
export default boolean('subtract')

export const fill = booleanFill('subtract')
