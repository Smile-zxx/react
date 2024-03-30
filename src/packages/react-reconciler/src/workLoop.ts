import { beginWork } from "./beginWork";
import { completeWork } from "./completeWork";
import { FiberNode } from "./fiber";

let workingProgress: FiberNode | null = null



function prepareFreshStack(fiber: FiberNode) {
    workingProgress = fiber
}
function renderRoot(root: FiberNode) {
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