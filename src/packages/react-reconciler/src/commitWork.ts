import { FiberNode, FiberRootNode } from "./fiber";
import { MutationMask, NoFlags, Placement } from "./fiberFlags";
import { HostComponent, HostRoot, HostText } from "./workTag";
import { Container, appendChildToContainer } from "./hostConfig";

let nextEffect: FiberNode | null = null

export const commitMutationEffects = (finishedWork: FiberNode | null) => {
    nextEffect = finishedWork
    while (nextEffect !== null) {
        const child: FiberNode | null = nextEffect.child

        if ((nextEffect.subTreeFlags & MutationMask) !== NoFlags && child !== null) {
            // 继续向子节点遍历
            nextEffect = child
        } else {
            // 向上便利
            up: while (nextEffect !== null) {

                commitMutationEffectsOnFiber(nextEffect)

                const sibling: FiberNode | null = nextEffect.sibling

                if (sibling !== null) {
                    nextEffect = sibling
                    break up
                }
                nextEffect = nextEffect.return
            }
        }
    }
}

function commitMutationEffectsOnFiber(finishedWork: FiberNode) {
    const flags = finishedWork.flags
    if ((flags & Placement) !== NoFlags) {
        commitPlacement(finishedWork)
        finishedWork.flags &= ~Placement  // 把 Placement 标记 从 flags 中移除
    }

    // if ((flags & Placement) !== NoFlags) {
    //     finishedWork.flags &= ~Placement  // 把 Placement 标记 从 flags 中移除
    // }

    // if ((flags & Placement) !== NoFlags) {
    //     finishedWork.flags &= ~Placement  // 把 Placement 标记 从 flags 中移除
    // }
}


function commitPlacement(finishedWork: FiberNode) {
    // 
    console.log("placement ")

    const hostparent = getHostParent(finishedWork)

    appendPlacementNodeIntoContainer(finishedWork, hostparent)

}

function getHostParent(fiber: FiberNode) {
    let parent = fiber.return
    while (parent) {
        const parentTag = parent.tag
        if (parentTag === HostComponent) {
            return parent.stateNode
        }
        if (parentTag === HostRoot) {
            return (parent.stateNode as FiberRootNode).container
        }

        parent = parent.return
    }

    console.log("未找到 hostparent")
}


function appendPlacementNodeIntoContainer(finishedWork: FiberNode, hostParent: Container) {
    if (finishedWork.tag === HostComponent || finishedWork.tag === HostText) {
        appendChildToContainer(hostParent, finishedWork.stateNode)
        return
    }

    const child = finishedWork.child
    if (child !== null) {
        appendPlacementNodeIntoContainer(child, hostParent)

        let sibling = child.sibling
        while (sibling !== null) {
            appendPlacementNodeIntoContainer(sibling, hostParent)
            sibling = sibling.sibling
        }
    }



}