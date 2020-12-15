// 點上方列表會亮
$("#menu-main-nav a").on("click", function () {
    $("#menu-main-nav a").removeClass("chosen");
    $(this).addClass("chosen");

    //連動下面的會亮
    var id = $(this).attr('id');
    $("#chosenItems div").removeClass("chosen");
    $("#chosenItems ." + id).eq(0).addClass("chosen");
    $("#chosenItems ." + id).eq(-1).addClass("chosen");

    if (id == "memory-block") {
        $("#chosenItems input.ml-2").eq(-1).addClass("chosen");
    }
    else {
        $("input.ml-2").removeClass("chosen");
    }


})

//點已選硬體會亮
$("#chosenItems div").on("click", function () {
    $("#chosenItems div").removeClass("chosen");
    var id = $(this).attr('items');

    $("#chosenItems ." + id).eq(0).addClass("chosen");
    $("#chosenItems ." + id).eq(-1).addClass("chosen");

    //連動上面會亮
    $("#menu-main-nav a").removeClass("chosen");
    $("#menu-main-nav #" + id).addClass("chosen");

    if (id == "memory-block") {
        $("#chosenItems input.ml-2").eq(-1).addClass("chosen");
    }
    else {
        $("input.ml-2").removeClass("chosen");
    }


})

//取得左方內容放入中間的列表
$("#listLeft .card-small").on("click", function () {
    var msg = $("h4", this).text();
    $(".d-inline .chosen").text(msg);
})

//儲存到localstorage
$("div.fnt-weight-bold button").on("click", function () {

    var data = new Object;
    data.time = new Date().toLocaleString('zh-TW', { hour12: false });
    data.cpu = $("#cpu div.text-left").text();
    data.cpu_cooler = $("#cpu-cooler div.text-left").text();
    data.mother_board = $("#mother-board div.text-left").text();
    data.memory_block = $("#memory-block div.text-left").text();
    data.memory_block_num = $("#memory-block input.ml-2").val();
    if (data.memory_block_num == 0) data.memory_block_num = "未選取";
    data.disk_block = $("#disk-block div.text-left").text();
    data.graphic = $("#graphic div.text-left").text();
    data.power = $("#power div.text-left").text();
    data.case = $("#case div.text-left").text();


    swal({
        title: "已選清單",
        html: '<table class="table table-striped">'
            + '<thead>'
            + '<tr>'
            + '<th scope="col" colspan="2"><h4>' + data.time + '</h4></th>'

            + '</tr>'
            + '</thead>'
            + '<tbody>'
            + '<tr>'
            + '<th class="text-nowrap">CPU</th>'
            + '<td>' + $("#cpu div.text-left").text() + '</td>'
            + '</tr>'
            + '<tr>'
            + '<th class="text-nowrap">CPU散熱器</th>'
            + '<td>' + $("#cpu-cooler div.text-left").text() + '</td>'
            + '</tr>'
            + '<tr>'
            + '<th class="text-nowrap">主機板</th>'
            + '<td>' + $("#mother-board div.text-left").text() + '</td>'
            + '</tr>'
            + '<tr>'
            + '<th class="text-nowrap">記憶體</th>'
            + '<td>' + $("#memory-block div.text-left").text() + '*' + document.getElementById("memoryNum").value + '</td>'
            + '</tr>'
            + '<tr>'
            + '<th class="text-nowrap">硬碟</th>'
            + '<td>' + $("#disk-block div.text-left").text() + '</td>'
            + '</tr>'
            + '<tr>'
            + '<th class="text-nowrap">顯示卡</th>'
            + '<td>' + $("#graphic div.text-left").text() + '</td>'
            + '</tr>'
            + '<tr>'
            + '<th class="text-nowrap">電源供應器</th>'
            + '<td>' + $("#power div.text-left").text() + '</td>'
            + '</tr>'
            + '<tr>'
            + '<th class="text-nowrap">機殼</th>'
            + '<td>' + $("#case div.text-left").text() + '</td>'
            + '</tr>'
            + '</tbody>'
            + '</table>',
        showCancelButton: true,
        confirmButtonText: "確定",
        cancelButtonText: "取消",
        animation: false

    }).then((result) => {
        if (result) {
            swal({
                //儲存
                title: "已儲存！",
                type: "success",
                showConfirmButton: false,
                timer: 1000,
            }).then((result) => { }, (dismiss) => { });
            var time = new Date();
            localStorage.setItem("GeeGee-" + time.getTime(), JSON.stringify(data));
        }
    }, (dismiss) => { });
})

//案加
function btnMemory(){
    setTimeout(function () {
        $("div.chosen .text-left").removeClass("chosen");
        $("div.chosen input.ml-2").removeClass("chosen");

        $("div.chosen form.w-100").append(    
            '<div class="input-group mt-2">'
            +'<span class="input-group-prepend">'
            +'<button class="btn rounded-circle minusButton" type="button">'
            +'<i class="fa fa-minus text-light"></i>'
            +'</button>'
            +'</span>'
            +'<div class="form-control ml-2 rounded-pill text-left h-auto memory-block chosen">未選取</div>'
            +'<span class="input-group-append">'
            +'<input class="form-control rounded-pill ml-2 chosen" value="0" type="number" min="0" max="64" placeholder="0" >'
            +' </span>'
            +'</div>'
        );

    }, 1);

}

function btn() {
    setTimeout(function () {
        $("div.chosen .text-left").removeClass("chosen");

        $("div.chosen form.w-100").append(
            '<div class="input-group mt-2">'
            + '<span class="input-group-prepend">'
            + '<button class="btn rounded-circle minusButton" type="button">'
            + '<i class="fa fa-minus text-light"></i>'
            + '</button>'
            + '</span>'
            + '<div class="form-control ml-2 rounded-pill text-left graphic chosen">未選取</div>'
            + '</div>'
        );
    }, 1);
}

function btnDisk() {
    setTimeout(function () {
        $("div.chosen .text-left").removeClass("chosen");

        $("div.chosen form.w-100").append(
            '<div class="input-group mt-2">'
            + '<span class="input-group-prepend">'
            + '<button class="btn rounded-circle minusButton" type="button">'
            + '<i class="fa fa-minus text-light"></i>'
            + '</button>'
            + '</span>'
            + '<div class="form-control ml-2 rounded-pill text-left disk-block chosen">未選取</div>'
            + '</div>'
        );
    }, 1);
}






