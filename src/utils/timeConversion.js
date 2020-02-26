export const toTime = (value) => {
    let Time = new Date(value)
    let Y = Time.getFullYear();
    let M = (Time.getMonth()+1)<10 ? '0' + (Time.getMonth()+1) : Time.getMonth()+1;
    let D = Time.getDate()<10 ? '0' + Time.getDate() : Time.getDate();
    let H = Time.getHours()<10 ? '0' + Time.getHours() : Time.getHours();
    let Minutes = Time.getMinutes()<10 ? '0' + Time.getMinutes() : Time.getMinutes();
    let S = Time.getSeconds()<10 ? '0' + Time.getSeconds() : Time.getSeconds();
    return Y + '-' + M + '-' + D + ' ' + H + ':' + Minutes + ':' + S
}
