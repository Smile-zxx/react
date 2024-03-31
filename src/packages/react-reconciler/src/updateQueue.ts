import { Action } from "../../shared/ReactTypes";

export interface Update<State> {
    action: Action<State>
}

// 消费 update 
export interface UpdateQueue<State> {
    shared: {
        pendding: Update<State> | null
    }
}


export function createUpdate<State>(action: Action<State>) {
    return {
        action
    }
}


export function createUpdateQueue<State>(): UpdateQueue<State> {
    return {
        shared: {
            pendding: null
        }
    }
}

// Queue 中添加 update
export function enqueueUpdate<Action>(updateQueue: UpdateQueue<Action>, update: Update<Action>) {
    // 怎么链接多个update的呢？
    updateQueue.shared.pendding = update
}

// 消费 update方法

export function processUpdateQueue<State>(
    baseState: State,
    penddingUpdate: Update<State> | null
) {
    const result = {
        memorizedState: baseState
    }

    if (penddingUpdate !== null) {
        const action = penddingUpdate.action

        // action 两种情况
        // 1. 一个值
        // 2. 一个函数
        if (action instanceof Function) {
            result.memorizedState = action(baseState)
        } else {
            result.memorizedState = action
        }
    }

    return result
}