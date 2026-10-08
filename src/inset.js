// 旧版角标的内收量：符号中心从外框角往内收 inset（symbols.js 用它定叉的大小；文件、对话框等系列还按它定角标位置）
// 单独成一个模块：folder.js 要 import symbols.js，symbols.js 又要用 inset，放在 folder.js 里会循环导入
export const inset = 2.5
