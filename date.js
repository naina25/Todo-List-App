exports.getDate = function() {
    const today = new Date();
    const currentDay = today.getDay();
    const options = {
        weekday: "long",
        month: "long",
        day: "numeric"
    };
    return date = today.toLocaleDateString("en-US", options);
}

exports.getDay = function() {
    const today = new Date();
    const currentDay = today.getDay();
    const options = {
        weekday: "long",
    };
    return day = today.toLocaleDateString("en-US", options);
    
}
