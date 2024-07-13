type ErrorLevel = 'info' | 'warn' | 'error' | 'fatal'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const newError = (error: any, desc: string, level: ErrorLevel = 'info') => {
    // 发送邮件
    console.log(error, desc, level)
}

const error = {
    new: newError
}

export default error
