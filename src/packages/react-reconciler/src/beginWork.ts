import { ReactElementType } from "../../shared/ReactTypes";
import { mountChildFibers, reconcileChildFibers } from "./childFibers";
import { FiberNode } from "./fiber";
import { UpdateQueue, processUpdateQueue } from "./updateQueue";
import { HostComponent, HostRoot, HostText } from "./workTag";

export const beginWork = (wip: FiberNode) => {
    console.log('beginWork',wip,wip.tag)
    switch (wip.tag) {
        case HostRoot:
            return updateHostRoot(wip)
        case HostComponent:
            return updateHostComponent(wip)
        case HostText:
            // hosttext 没有子节点，不用 beginwork
            return null

        default:
            console.log("其余未实现类型")
            break

    }
    return null
    // 比较 reactElement 和 fiberNode 返回 子 fiberNode
}

function updateHostRoot(wip: FiberNode) {
    // hostRoot 类型的 beginWork 工作
    // 计算状态最新值
    // 创造子 fiberNode

    const baseState = wip.memorizedState
    const updateQueue = wip.updateQueue as UpdateQueue<Element>
    const pendding = updateQueue.shared.pendding

    updateQueue.shared.pendding = null

    const { memorizedState } = processUpdateQueue(baseState, pendding)

    wip.memorizedState = memorizedState

    const nextChildren = wip.memorizedState

    reconcileChildren(wip, nextChildren)

    return wip.child
}

function updateHostComponent(wip: FiberNode) {
    // 创造子fibernode
    const nextProps = wip.penddingProps
    const nextChildren = nextProps.children

    reconcileChildren(wip, nextChildren)
    return wip.child

}

function reconcileChildren(wip: FiberNode, children?: ReactElementType) {
    const current = wip.alternate

    if (current !== null) {
        wip.child = reconcileChildFibers(wip, current?.child, children)
    } else {
        wip.child = mountChildFibers(wip, null, children)
    }

}