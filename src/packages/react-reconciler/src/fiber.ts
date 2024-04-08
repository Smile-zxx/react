import { type } from "os";
import { Key, Props, ReactElementType, Ref } from "../../shared/ReactTypes";
import { Flags, NoFlags } from "./fiberFlags";
import { FunctionComponent, HostComponent, WorkTag } from "./workTag";
import { Container } from "./hostConfig";

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
    subTreeFlags: Flags

    updateQueue: unknown
    memorizedState: any
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
        this.subTreeFlags = NoFlags

        //更新队列
        this.updateQueue = null

        this.memorizedState = null
    }
}


export class FiberRootNode {
    container: Container; // 宿主环境挂载节点
    current: FiberNode;
    finishedWork: FiberNode | null
    constructor(container: Container, hostRootFiber: FiberNode) {
        this.container = container
        this.current = hostRootFiber
        hostRootFiber.stateNode = this
        this.finishedWork = null
    }
}


export function createWorkInprogress(current: FiberNode, penddingProps: Props): FiberNode {
    let wip = current.alternate
    if (wip === null) {
        //首屏渲染
        wip = new FiberNode(current.tag, penddingProps, current.key)
        wip.type = current.type
        wip.stateNode = current.stateNode
        wip.alternate = current
        current.alternate = wip
    } else {
        wip.penddingProps = penddingProps
        wip.flags = NoFlags
    }
    wip.type = current.type
    wip.updateQueue = current.updateQueue
    wip.child = current.child
    wip.memorizedState = current.memorizedState
    wip.memorizedProps = current.memorizedProps
    return wip

}

export function createFiberFromElement(element: ReactElementType) {
    const { type, key, props } = element

    let fiberTag: WorkTag = FunctionComponent

    if (typeof type === 'string') {
        fiberTag = HostComponent
    } else if (typeof type !== 'function') {
        console.log('未定义的type类型')
    }

    const fiber = new FiberNode(fiberTag, props, key)

    fiber.type = type
    return fiber
}