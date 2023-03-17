module.exports.getdate = () =>
{
    const date = new Date();
    const weekday = ["Chủ nhật","Thứ hai","Thứ ba","Thứ tư","Thứ năm","Thứ sáu","Thứ bảy"];

    let day = weekday[date.getDay()];

    //var date = new Date();

    var options = {
        weekday: "long",
        year: "numeric",
        month: "2-digit",
        day: "numeric"
    };

    console.log(
        date.toLocaleDateString("en-US", options) //en is language option, you may specify..
    );

    return date.toLocaleDateString("vi-VN", options);
}