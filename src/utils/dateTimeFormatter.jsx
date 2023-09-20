export function dateFormatter(dateString) {
    console.log(Date.now())
    const date = new Date(
        Date.parse(dateString)
        )
    const dateFormatted = date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear()
    return dateFormatted
}