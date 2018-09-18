const obj = {
  a: 1,
  b: 2
}

const promise = Promise.resolve(obj);

console.log(promise)

promise.then((v) => {
  console.log(v)
})
