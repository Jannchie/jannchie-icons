import cube from './cube'

// 包裹：30° 等距视角的箱子 + 顶面一道封箱胶带
export default opts => [...cube(opts), 'M8.1 5.25L15.9 9.75']
