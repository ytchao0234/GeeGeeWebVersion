// 點上方列表會亮
$("#menu-main-nav a").on("click", function () {
    $("#menu-main-nav a").removeClass("chosen");
    $(this).addClass("chosen");

    var id = $(this).attr('id');
    $("#chosenItems .text-left").removeClass("chosen");
    $("#" + id + " .text-left").addClass("chosen");

    //連動下面的會亮
    $("#chosenItems div").removeClass("chosen");
    $("#chosenItems #" + id).addClass("chosen");
})

//點已選硬體會亮
$("#chosenItems div").on("click", function () {
    $("#chosenItems div").removeClass("chosen");
    $(this).addClass("chosen");

    var id = $(this).attr('id');
    $("#chosenItems .text-left").removeClass("chosen");
    $("#" + id + " .text-left").addClass("chosen");

    //連動上面會亮
    $("#menu-main-nav a").removeClass("chosen");
    $("#menu-main-nav #" + id).addClass("chosen");
})