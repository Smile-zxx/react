import { Key, Props, Ref } from "../../shared/ReactTypes";
import { Flags, NoFlags } from "./fiberFlags";
import { WorkTag } from "./workTag";

export class FiberNode {
    tag: WorkTag
    key: Key
    stateNode: any
    type: any
    ref: Ref

    return: FiberNode | null
    sibling: FiberNode | null
    child: FiberNode | null
    index: number

    penddingProps: Props
    memorizedProps: Props

    alternate: FiberNode | null
    flags: Flags
    constructor(tag: WorkTag, pendingProps: Props, key: Key) {
        // fibernode 的属性
        this.tag = tag
        this.key = key
        this.stateNode = null // 指向 fiber 所对应的 dom 节点
        this.type = null   // 函数组件的函数，类组件的类
        this.ref = null

        // 关系属性，构成 fiber 树
        this.return = null // 父
        this.sibling = null // 右兄弟
        this.child = null // 子
        this.index = 0 // 自己处在 list 中的第几个 ul li 

        // 工作单元属性
        this.penddingProps = pendingProps // 更新前的状态
        this.memorizedProps = null // 更新后的状态

        this.alternate = null // workingProgress 和 current 互相指向
        // 副作用
        this.flags = NoFlags
    }
}