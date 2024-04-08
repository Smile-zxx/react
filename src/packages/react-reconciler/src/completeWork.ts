import { FiberNode } from "./fiber";
import { NoFlags } from "./fiberFlags";
import { appendInitialChild, createInstance, createTextInstance } from "./hostConfig";
import { HostComponent, HostRoot, HostText } from "./workTag";

export const completeWork = (wip: FiberNode) => {
    const current = wip.alternate
    const newProps = wip.penddingProps
    switch (wip.tag) {
        case HostComponent:
            if (current !== null && wip.stateNode) {
                //update
            } else {
                // 1. 构建 DOM
                const instance = createInstance(wip.type, newProps)
                // 2. 将 dom 插入 dom 树中
                appendAllChildren(instance, wip)

                wip.stateNode = instance
            }
            bubbleProperties(wip)
            return null
        case HostText:
            if (current !== null && wip.stateNode) {
                //update
            } else {
                // 1. 构建 DOM
                const instance = createTextInstance(newProps.content)

                wip.stateNode = instance
            }
            bubbleProperties(wip)
            return null
        case HostRoot:
            bubbleProperties(wip)
            return null
    }

}

function appendAllChildren(parent: FiberNode, wip: FiberNode) {
    // 在 parent 下插入 wip
    let node = wip.child
    while (node !== null) {
        if (node.tag === HostComponent || node.tag === HostText) {
            appendInitialChild(parent, node.stateNode)
        } else if (node.child !== null) {
            node.child.return = node
            node = node.child
            continue
        }
        if (node === wip) {
            return
        }

        while (node.sibling === null) {
            if (node.return === null || node.return === wip) {
                return;
            }
            node = node?.return
        }
        node.sibling.return = node.return
    }
}


function bubbleProperties(wip: FiberNode) {
    let subTreeFlags = NoFlags
    let child = wip.child

    while (child !== null) {
        subTreeFlags |= child.subTreeFlags
        subTreeFlags |= child.flags

        child.return = wip
        child = child.sibling
    }

    wip.subTreeFlags |= subTreeFlags
}