import { beginWork } from "./beginWork";
import { completeWork } from "./completeWork";
import { FiberNode, FiberRootNode, createWorkInprogress } from "./fiber";
import { HostRoot } from "./workTag";

let workingProgress: FiberNode | null = null



function prepareFreshStack(root: FiberRootNode) {
    workingProgress = createWorkInprogress(root.current, {})

}
function renderRoot(root: FiberRootNode) {
    // 初始化
    prepareFreshStack(root)

    do {
        // 执行工作循环
        try {
            workLoop()
        } catch (err) {
            console.log(err, "workloop err")
        }
    } while (true)

    const finishedWork = root.current.alternate

    root.finishedWork = finishedWork

    commitRoot(root)
}

function workLoop() {
    while (workingProgress) {
        performUnitOfWork(workingProgress)
    }
}

function performUnitOfWork(fiber: FiberNode) {
    // next 为 fiber 的子节点
    const next = beginWork(fiber)

    fiber.memorizedProps = fiber.penddingProps

    if (next === null) {
        // 没有子节点，开始归阶段
        completeUnitOfwork(fiber)
    } else {
        // 还有子节点，则继续对子节点执行  performUnitOfWork
        workingProgress = next
    }
}

function completeUnitOfwork(fiber: FiberNode) {
    let node: FiberNode | null = fiber
    do {
        completeWork(node)
        const sibling = node.sibling
        if (sibling !== null) {
            workingProgress = sibling
            return
        }
        node = node?.return
        workingProgress = node
    } while (node !== null)
}


export function scheduleUpdateOnFiber(fiber: FiberNode) {
    // 调度
    const root = markUpdateFromFiberToRoot(fiber)
    renderRoot(root)
}

function markUpdateFromFiberToRoot(fiber: FiberNode) {
    let node = fiber
    let parent = node.return
    // 从 fiber 树找到 最上面的节点

    while (parent !== null) {
        node = parent
        parent = node.return
    }

    if (node.tag === HostRoot) {
        //  fiber 树的根节点 就是 hostRootfiber stateNode对应的就是 fiberRootNode
        return node.stateNode
    }

    return null


}