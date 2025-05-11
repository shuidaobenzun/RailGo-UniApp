declare const axios: AxiosStatic
export default axios

/**
 * 请求Method类型
 */
declare enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    HEAD = 'HEAD',
    DELETE = 'DELETE',
    TRACE = 'TRACE',
    CONNECT = 'CONNECT',
    OPTIONS = 'OPTIONS',
}

/**
 * 响应的数据类型
 */
declare enum HttpResponseType {
    TEXT = 'text',
    ARRAYBUFFER = 'arraybuffer',
}

/**
 * 对象显式标签
 */
interface ImplicitlyAny {
    [key: string]: any
}
/**
 * 请求头接口
 */
/**
 * Axios 请求参数
 */
interface AxiosRequestConfig {
    [key: string]: any
    baseURL?: string
    url?: string
    header?: ImplicitlyAny
    method?: Method
    data?: object
    cancelToken?: CancelToken
    responseType?: HttpResponseType
    validataStatus?: (status: number) => boolean
}

/**
 * Axios 响应参数
 */
interface AxiosResponse<T = any> {
    data: T // 服务端返回的数据
    header: any // 响应头
    statusCode: number // HTTP 状态码
    // cookies: Array<object>,
    // errMsg: string,// 状态消息
    // config: AxiosRequestConfig; // 请求配置对象
    // request: any; // 请求的 XMLHttpRequest 对象实例
}

/**
 * AxiosPromise 对象
 */
interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}
// export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> { }

/**
 * Axios 对象
 */
interface Axios {
    /**
     * 默认配置
     */
    defaults: AxiosRequestConfig
    /**
     * 拦截器模块
     */
    interceptors: {
        request: AxiosInterceptorManager<AxiosRequestConfig>
        response: AxiosInterceptorManager<AxiosResponse>
    }
    request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>
    /**
     * Get 请求
     * @param url 请求地址
     * @param config 请求配置
     */
    get<T = any>(url: string, data?: object, config?: AxiosRequestConfig): AxiosPromise<T>
    /**
     * Post 请求
     * @param url 请求地址
     * @param data 请求参数
     * @param config 请求配置
     */
    post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): AxiosPromise<T>
    /**
     * Put 请求
     * @param url 请求地址
     * @param data 请求参数
     * @param config 请求配置
     */
    put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): AxiosPromise<T>
    /**
     * 根据传入的请求配置对象返回一个请求的`URL`
     * @param config 请求配置
     * @returns {string} 请求`URL`
     */
    /**
     * Delete 请求
     * @param url 请求地址
     * @param config 请求配置
     */
    delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
    /**
     * Connect 请求
     * @param url 请求地址
     * @param config 请求配置
     */
    connect<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
    /**
     * Head 请求
     * @param url 请求地址
     * @param config 请求配置
     */
    head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
    /**
     * Options 请求
     * @param url 请求地址
     * @param config 请求配置
     */
    options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
    /**
     * Trace 请求
     * @param url 请求地址
     * @param config 请求配置
     */
    trace<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
    getUri: (config: AxiosRequestConfig) => string
}

/**
 * Axios 实例
 */
interface AxiosInstance extends Axios {
    <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
}

interface AxiosStatic extends AxiosInstance {
    /**
     * 创建Axios实例
     * @param config
     */
    create(config?: AxiosRequestConfig): AxiosInstance
    /**
     * 请求令牌
     */
    CancelToken: CancelTokenStatic
    /**
     * 请求取消实例
     */
    Cancel: CancelStatic
    /**
     * 请求是否取消
     */
    isCancel: (value: any) => boolean
    /**
     * 执行所有请求
     * @param promises
     */
    all<T>(promises: Array<T | Promise<T>>): Promise<T[]>
    spread<T, R>(callback: (...args: T[]) => R): (arr: T[]) => R
}

/**
 * AxiosError 错误类
 */
interface AxiosError extends Error {
    // errMsg: string,
    /**
     * 错误代码
     */
    statusCode: number
    /**
     * 请求参数
     */
    config: AxiosRequestConfig
    /**
     * 请求实例
     */
    request?: any
    /**
     * 响应参数
     */
    response?: AxiosResponse
}

/**
 * 拦截器管理类
 */
interface ResolvedFn<T = any> {
    (val: T): T | Promise<T>
}
interface RejectedFn {
    (error: any): any
}
interface AxiosInterceptor<T> {
    resolved: ResolvedFn<T>
    rejected?: RejectedFn
}
interface AxiosInterceptorManager<T> {
    /**
     * 注册拦截器
     * @param resolved 成功拦截
     * @param rejected 失败拦截
     * @returns 拦截器ID
     */
    use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number
    /**
     * 注销拦截器
     * @param id 拦截器ID
     */
    eject(id: number): void
    forEach(fn: Function): void
}

/**===========================
 * 请求取消类
 * ===========================
 */
/**
 * 请求取消令牌类型
 */
interface CancelToken {
    promise: Promise<Cancel>
    reason?: Cancel // 取消原因
    throwIfRequested(): void
}
/**
 * 取消函数类型
 */
interface Canceler {
    (message?: string): void
}
/**
 * 取消令牌构造函数的参数类型
 */
interface CancelExecutor {
    (cancel: Canceler): void
}
/**
 * 取消请求令牌静态类
 */
interface CancelTokenStatic {
    new (executor: CancelExecutor): CancelToken
    source(): CancelTokenSource
}
interface CancelTokenSource {
    token: CancelToken
    cancel: Canceler
}
interface Cancel {
    message?: string
}
interface CancelStatic {
    new (message?: string): Cancel
}
