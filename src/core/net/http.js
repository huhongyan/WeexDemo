import { TOKEN_KEY, DEBUG } from '../../config/Config'
import { getCache, removeCache, setCache } from '../common/storageUtils'

export const CONTENT_TYPE_JSON = 'application/json'
export const CONTENT_TYPE_FORM = 'application/x-www-form-urlencoded'

//网络错误
export const NETWORK_ERROR = 1
//网络超时
export const NETWORK_TIMEOUT = 2
//网络返回数据格式错误
export const NETWORK_JSON_EXCEPTION = 3

export const SUCCESS = 200

export const TIMEOUT_MS = 15000

class HttpManager {
    constructor() {
        this.optionParams = {
            timeoutMs: TIMEOUT_MS,
            token: null,
            sessionId: null
        }
    }

    async getFetch(url, header, type) {
        return this.netFetch(url, 'GET', null, null, header, type)
    }

    async netFetch(url, method = 'GET', params, json = false, header, type) {
        //let isConnected = await NetInfo.isConnected.fetch().done;
        let isConnected = true
        if (!isConnected) {
            return {
                /*result: false,
                code: NETWORK_ERROR,
                msg: I18n('netError')*/
            }
        }

        let headers = {} //
        if (header) {
            headers = Object.assign({}, headers, header)
        }

        let requestParams

        if (method === 'POST') {
            if (json) {
                requestParams = this.formParamsJson(method, params, headers)
            } else {
                requestParams = this.formParams(method, params, headers)
            }
        } else {
            requestParams = this.formParams(method, params, headers)
        }

        // 在此做request拦截处理

        let response = await this.requestWithTimeout(
            this.optionParams.timeoutMs,
            this.fetch(url, requestParams, type)
        )

        if (DEBUG) {
            console.info('请求url: ', url)
            console.info('请求参数: ', requestParams)
            console.info('返回参数: ', response)
        }

        if (response && response.status === NETWORK_TIMEOUT) {
            return {
                result: false,
                code: response.status,
                data: ''
            }
        }
        try {
            let responseJson = response.data
            // 在此做resp拦截处理

            if (
                response.status === 200 ||
                response.status === 201 ||
                response.status === 204 ||
                response.status === 202
            ) {
                return {
                    result: true,
                    code: SUCCESS,
                    data: responseJson,
                    headers: response.headers
                }
            }
        } catch (e) {
            console.log(e, url)
            return {
                data: response._bodyText,
                result: response.ok,
                code: response.status
                    ? response.status
                    : NETWORK_JSON_EXCEPTION,
                response
            }
        }

        // 后台出错
        return {
            result: false,
            code: response.status,
            data: ''
        }
    }

    formParamsJson(method, params, headers) {
        const body = JSON.stringify(params)
        const req = {
            method: method,
            headers: {
                'Content-Type': CONTENT_TYPE_JSON,
                ...(headers || {})
            },
            body
        }
        return req
    }

    formParams(method, params, headers) {
        const str = []
        for (let p in params) {
            str.push(
                encodeURIComponent(p) + '=' + encodeURIComponent(params[p])
            )
        }
        let body = null
        if (str.length > 0) {
            body = str.join('&')
        }
        const req = {
            method: method,
            headers: {
                'Content-Type': CONTENT_TYPE_FORM,
                ...(headers || {})
            },
            body
        }
        return req
    }

    requestWithTimeout(ms, promise) {
        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                resolve({
                    status: NETWORK_TIMEOUT,
                    message: ''
                })
            }, ms)
            promise.then(
                res => {
                    clearTimeout(timeoutId)
                    resolve(res)
                },
                err => {
                    clearTimeout(timeoutId)
                    resolve(err)
                }
            )
        })
    }

    fetch(path, requestParams, type = 'json') {
        const stream = weex.requireModule('stream')
        return new Promise((resolve, reject) => {
            stream.fetch(
                {
                    method: requestParams.method,
                    url: path,
                    headers: requestParams.headers,
                    type: type,
                    body:
                        requestParams.method === 'GET' ? '' : requestParams.body
                },
                response => {
                    if (
                        response.status == 200 ||
                        response.status === 201 ||
                        response.status === 204 ||
                        response.status === 202
                    ) {
                        resolve(response)
                    } else {
                        reject(response)
                    }
                },
                // 关于请求状态的回调
                () => {}
            )
        })
    }
}

export default new HttpManager()
