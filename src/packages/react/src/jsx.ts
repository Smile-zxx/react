import { REACT_ELEMENT_TYPE } from "../../shared/ReactSymbols"
import { ElementType, Key, Props, ReactElement as ReactElementType, Ref, Type } from "../../shared/ReactTypes"

// 返回一个 ReactElemnent 
const ReactElement = function (type: Type, key: Key, ref: Ref, props: Props): ReactElementType {
    const element = {
        $$typeof: REACT_ELEMENT_TYPE, // 表示这是一个 react 元素
        key,
        ref,
        props,
        type
    }
    return element
}

/* 
接受一个jsx编辑的结果 
<div id=123 ></div>
=>
jsx('div',{
    id:123
})
返回一个 reactElement
*/
export const jsx = (type: ElementType, config: any, ...maybeChildren: any[]): ReactElementType => {
    // 要生成一个 ReactElement
    //react 中有两个属性要进行特殊的处理  key  ref
    let key: Key = null
    let ref: Ref = null
    const props: Props = {}

    // 遍历 jsx 的属性

    for (const prop in config) {
        const val = config[prop]
        // key
        if (prop === 'key' && val !== undefined) {
            // 转换成字符串
            key = "" + val
        }
        // ref
        if (prop === 'ref' && val !== undefined) {
            // 转换成字符串
            ref = val
        }
        // 判断是不是 config 自己的属性而不是其原型上的属性 TODO 为啥？
        if ({}.hasOwnProperty.call(config, prop)) {
            props[prop] = val
        }
    }

    // 处理 子节点
    const maybeChildrenLength = maybeChildren.length

    if (maybeChildrenLength === 1) {
        // 一个的时候 props 的 children 直接就是其子节点
        props.children = maybeChildren[0]
    } else {
        // 多个的时候是子节点构成的数组
        props.children = maybeChildren

    }


    // 将一个 jsx 对象 转换成 react element
    return ReactElement(type, key, ref, props)
}