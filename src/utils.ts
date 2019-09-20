export function thread<A extends any[]>(...args: A) {
  return function through<R>(fn1: (...args: A) => R, ...fns: Array<(a: R) => R>) {
    let res = fn1(...args)
    for (let i = 0, n = fns.length; i < n; i++) res = fns[i](res)
    return res
  }
}
