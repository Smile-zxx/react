// FiberNode 上的标记
export type Flags = number
export const NoFlags = 0b0000001;
export const Placement = 0b0000010; // 添加
export const Update = 0b0000100 // 更新属性
export const ChildDeletion = 0b0001000;// 删除子节点