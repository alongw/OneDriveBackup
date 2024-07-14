type ErrorLevel = 'info' | 'warn' | 'error' | 'fatal'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const newError = (error: any, desc: string, level: ErrorLevel = 'info') => {
    // 发送邮件
    console.log(error, desc, level)
    // 如果是 fatal 级别的错误，直接退出
    if (level === 'fatal') {
        process.exit(1)
    }
}

const throwError = {
    new: newError
}

export default throwError
