import { FiberNode, FiberRootNode } from "./fiber";
import { HostRoot } from "./workTag";
import { UpdateQueue, createUpdate, createUpdateQueue, enqueueUpdate } from "./updateQueue";
import { ReactElementType } from "../../shared/ReactTypes";
import { scheduleUpdateOnFiber } from "./workLoop";
import { Container } from "./hostConfig";

export function createContainer(container: Container) {
    const hostRootFiber = new FiberNode(HostRoot, {}, null)
    const root = new FiberRootNode(container, hostRootFiber)

    hostRootFiber.updateQueue = createUpdateQueue()

    return root
}

export function updateContainer(element: ReactElementType, root: FiberRootNode) {
    console.log("updateContainer")
    const hostRootFiber = root.current
    const update = createUpdate(element)
    enqueueUpdate(hostRootFiber.updateQueue as UpdateQueue<ReactElementType>, update)

    scheduleUpdateOnFiber(hostRootFiber)

    return element
}