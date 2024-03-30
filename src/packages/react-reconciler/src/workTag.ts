// worktag 表示 一个 FiberNode 的类型
export type WorkTag = typeof FunctionComponent | typeof HostRoot | typeof HostComponent | typeof HostText
// 函数组件
export const FunctionComponent = 0
// 根节点
export const HostRoot = 3
// 原生html 节点  div span 
export const HostComponent = 5
// 文本节点  
export const HostText = 6
