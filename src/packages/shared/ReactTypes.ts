export type Type = any;
export type Key = any;
export type Ref = any;
export type Props = any;
export type ElementType = any;

export interface ReactElement {
    $$typeof: symbol | number,
    key: Key;
    ref: Ref;
    type: ElementType;
    props: Props;
}

// 更新单元类型
export type Action<State> = State | ((preState: State) => State)