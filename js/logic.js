$(window).on("load", function () {
    $("#contentBar").load("./pages/search.html");
});

$("#searchBtn").click(function (e) { 
    e.preventDefault();
    // $("#contentBar").css("background-color", "lightpink");
    // $("#contentBar").load("./pages/search.html");
});


