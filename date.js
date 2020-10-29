module.exports = GenerateDate;

function GenerateDate() {
    const today = new Date();
    const currentDay = today.getDay();
    let options = {
        weekday: "long",
        month: "long",
        day: "numeric"
    };
    let day = today.toLocaleDateString("en-US", options);
    return day;
}
