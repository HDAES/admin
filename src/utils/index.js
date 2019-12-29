

export function formatTime(time){
    const dateTime = new Date(time)
    const year = dateTime.getFullYear()
    const month = dateTime.getMonth() + 1
    const date = dateTime.getDate()
    const hour = dateTime.getHours()
    const minute = dateTime.getMinutes()
    const second = dateTime.getSeconds()
    return year+'-'+month+'-'+date+' '+hour+':'+minute +':'+ second
}

export function defaultPage(data,callback) {
    return  {
        onChange: (current) =>{
            callback(current)
        },
        current:data.page,
        pageSize:10,
        total:data.total,
        showTotal:()=> `共有${data.total}条数据`
    }
}