import React from "./packages/react"
import ReactDOM from "./packages/react-dom"
let a: any = <div><span>span</span></div>
console.log(a)
// console.log("123123")
const root = document.querySelector("#root")
console.log(root)
const r = ReactDOM.createRoot(root!)
console.log(r)
r.render(a)