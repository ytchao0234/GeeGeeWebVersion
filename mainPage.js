// 點上方列表會亮
$("#menu-main-nav a").on("click", function () {
    $("#menu-main-nav a").removeClass("chosen");
    $(this).addClass("chosen");

    //連動下面的會亮
    var id = $(this).attr('id');
    $("#chosenItems div").removeClass("chosen");
    $("#chosenItems #" + id).addClass("chosen");

    $("div.chosen .rounded-pill").removeClass("chosen");
    $("div.chosen .rounded-pill").addClass("chosen");


})

//點已選硬體會亮
$("#chosenItems div").on("click", function () {
    $("#chosenItems div").removeClass("chosen");
    $(this).addClass("chosen");

    var id = $(this).attr('id');
    $("#chosenItems .rounded-pill").removeClass("chosen");
    $("#" + id + " .rounded-pill").addClass("chosen");

    //連動上面會亮
    $("#menu-main-nav a").removeClass("chosen");
    $("#menu-main-nav #" + id).addClass("chosen");

})

//取得左方內容放入中間的列表
$("#listLeft .card-small").on("click", function () {
    var msg = $("h4", this).text();
    $(".d-inline .chosen").text(msg);
})

//儲存到localstorage
$("div.fnt-weight-bold button").on("click", function (){

    var data = new Object;
    data.cpu = $("#cpu div.text-left").text();
    data.cpu_cooler = $("#cpu-cooler div.text-left").text();
    data.mother_board = $("#mother-board div.text-left").text();
    data.memory_block = $("#memory-block div.text-left").text();
    data.disk_block = $("#disk-block div.text-left").text();
    data.graphic = $("#graphic div.text-left").text();
    data.power = $("#power div.text-left").text();
    data.case = $("#case div.text-left").text();

    var time = new Date();
    localStorage.setItem("GeeGee-"+time.getTime(),JSON.stringify(data));

    swal({
        title: "已選清單",
        html: $("#cpu div.text-left").text()+ "<p></p>" + 
              $("#cpu-cooler div.text-left").text()+ "<p></p>" + 
              $("#mother-board div.text-left").text() + "<p></p>" +
              $("#memory-block div.text-left").text()+ "<p></p>" + 
              $("#disk-block div.text-left").text()+ "<p></p>" + 
              $("#graphic div.text-left").text()+ "<p></p>" + 
              $("#power div.text-left").text()+ "<p></p>" + 
              $("#case div.text-left").text()+ "<p></p>"  ,
        confirmButtonText: "確定",
        animation: false

        }).then(( result ) => {
            if ( result ) 
            {
                swal({
                    //儲存
                    title: "已儲存！",
                    text: time,
                    type: "success",
                })
            }
    });



})



