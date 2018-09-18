const obj = {
  a: 1,
  b: 2
}

const promise = Promise.reject(obj);

console.log(promise)

promise.then(v => {
  // do nothing
}, v => {
  console.log(v)
})

promise.catch(v => {
  console.log(v)
})