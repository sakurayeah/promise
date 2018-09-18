import $ from 'jquery';

const getJSON = (opts) => {
  // ajax 需要的参数都可以写在 opts 里
  console.log('opts', opts)
  const {
    url = '',
    type = 'GET',
  } = opts;
  const promise = new Promise(function(resolve, reject) {
    $.ajax({
      url,
      type,
      success: (data = {}) => {
        if (data.success) {
          resolve(data);
        } else {
          reject(data);
        }
      },
      error: (err = {}) => {
        reject(err);
      }
    })
  });
  // 返回一个Promise对象
  return promise;
}

// 这里为了代码看的清除，只写了 then 方法里的第一个函数
// 这样能够按顺序，输出每个异步回调中的内容
// getJSON({url: 'one.json'})
// .then((value) => {
//   // one.json 请求成功拿到的结果
//   console.log('resolved one', value);

//   // 进行 two.json 请求
//   // return 的是 Promise 对象
//   // 这里的数据能在下一个 then 方法中拿到
//   return getJSON({url: 'two.json'});
// })
// .then((value) => {
//   // two.json 请求成功拿到的结果
//   console.log('resolved two', value);
// })



getJSON({url: 'one.json'})
.then((value) => {
  // one.json 请求成功拿到的结果
  console.log('resolved one', value);

  // return 的是 Promise 对象, two.json 请求的数据能在下一个 then 方法中拿到
  return getJSON({url: 'two.json'});
})
.then((value) => {
  // 直接返回数据
  console.log('two', value);
  return value;
})
.then((value) => {
  // two.json 请求成功拿到的结果
  console.log('resolved two', value);
},(value) => {
  // two.json 请求失败拿到的结果
  console.log('rejected two', value);
})