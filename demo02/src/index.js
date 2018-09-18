import $ from 'jquery';

const promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  $.ajax({
    url: 'one.json',
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

promise.then(function(value) {
  console.log('resolved', value)
}, function(error) {
  console.log('rejected', '请求失败')
});