import cube from './cube'

// 包裹：30° 等距视角的箱子 + 顶面一道封箱胶带
export default opts => [...cube(opts), 'M8 5.31L16 9.93']
