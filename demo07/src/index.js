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
          console.log('请求成功', url)
        } else {
          reject(data);
          console.log('请求失败', url)
        }
      },
      error: (err = {}) => {
        reject(err);
        console.log('请求失败', url)
      }
    })

    // setTimeout(()=>{
    //   $.ajax({
    //     url,
    //     type,
    //     success: (data = {}) => {
    //       if (data.success) {
    //         resolve(data);
    //       } else {
    //         reject(data);
    //       }
    //     },
    //     error: (err = {}) => {
    //       reject(err);
    //     }
    //   })
    // }, url === 'one.json' ? 1000 : 0)

  });
  // 返回一个Promise对象
  return promise;
}


// all接收一个数组参数
Promise
.race([getJSON({url: 'one.json'}), getJSON({url: 'two.json'})])
.then((data) => {
  console.log('resolved', data);
})
.catch((err) => {
  console.log('rejected', err);
})
.finally(() => {
  console.log('finally')
});