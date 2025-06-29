// /scripts/req.js

/**
 * 模拟 axios.get 请求，使用 uni.request 实现，并支持 await。
 *
 * @param {string} url 请求的 URL。
 * @param {object} [config] 请求配置，目前仅支持 params（查询参数）。
 * @param {object} [config.params] 将作为 URL 查询参数附加到请求中的对象。
 * @returns {Promise<object>} 返回一个 Promise，成功时解析为一个对象，
 * 其结构模拟 axios.get 的响应：
 * { data: {}, status: 200, statusText: 'OK', headers: {}, config: {} }
 * 失败时解析为一个模拟 axios 错误的 Error 对象。
 */
const uniGet = (url, config = {}) => { // 这里可以使用 function 或 const
  return new Promise((resolve, reject) => {
    let requestUrl = url;

    // 处理查询参数
    if (config.params) {
      const params = new URLSearchParams(config.params).toString();
      requestUrl = `${url}${url.includes('?') ? '&' : '?'}${params}`;
    }

    uni.request({
      url: requestUrl,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: (res) => {
        resolve({
          data: res.data,
          status: res.statusCode,
          statusText: 'OK',
          headers: res.header,
          config: config,
          request: {}
        });
      },
      fail: (err) => {
        reject({
          message: err.errMsg || 'Network Error',
          name: 'Error',
          stack: new Error().stack,
          config: config,
          code: err.errno || null,
          request: {},
          response: {
            data: err.data || null,
            status: err.statusCode || null,
            statusText: err.errMsg || 'Network Error',
            headers: err.header || {}
          }
        });
      }
    });
  });
};

// **重点：在这里添加 default 导出**
export default uniGet;