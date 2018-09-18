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

getJSON({url: 'one.json'})
.then((value) => {
  // one.json 请求成功拿到的结果
  console.log('resolved', value);
})
.catch((reason) => {
  // one.json 请求失败拿到的结果
  console.log('rejected', reason);
})
.finally(() => {
  console.log('finally')
});
