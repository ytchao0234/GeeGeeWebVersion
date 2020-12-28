//選表格
$("div.card-deck div.card-body").on("click", function () {
    if ($(".card-small", this).hasClass("chosen"))
        $(".card-small", this).removeClass("chosen");
    else $("div.card-small", this).addClass("chosen");
})

//全選
$("input.form-check-input").click(function () {
    if ($(this).prop("checked")) {
        $("div.card-deck div.card-small").addClass("chosen");
    }
    else $("div.card-deck div.card-small").removeClass("chosen");
})


$("li.nav-item").click(function () {
    if ($(".chosen").length == 0) {
        alert("還沒有選擇表格歐！");
    }
    else {
        if (($(this).text().trim() == "載入") || ($(this).text().trim() == "匯出")) {
            if ($(".chosen").length > 1) {
                swal({
                    type: "error",
                    title: 'Oops...',
                    text: "一次只能 載入/匯出 一份儲存紀錄歐！",
                    timer: 1000,
                })
            }
            else if (($(this).text().trim() == "匯出") && ($(".chosen").length == 1)) {
                console.log($(".chosen").text());
            }
        }
    }
})

//顯示畫面

function start() {
    var a = 0;
    while (1) {
        var obj = JSON.parse(localStorage.getItem(localStorage.key(a)));
        if (obj) {
            var msg =
                '<div class="card overflow-auto card-big">'
                + '<div class="card-body">'
                + '<div class="card mb-2 card-small">'
                + '<div class="card-body">'
                + '<div class="card-text">'
                + '<table class="table table-striped">'
                + '<thead>'
                + '<tr>'
                + ' <th scope="col" colspan="2">'
                + '<h4>' + obj.time + '</h4>'
                + '</th>'
                + '</tr>'
                + '</thead>'
                + '<tbody>'
                + '<tr>'
                + '<th class="text-nowrap">CPU</th>'
                + '<td>Intel Core i3-10100</td>'
                + '</tr>'
                + '<tr>'
                + '<th class="text-nowrap">CPU散熱器</th>'
                + '<td>' + obj.cpu + '</td>'
                + '</tr>'
                + '<tr>'
                + '<th class="text-nowrap">主機板</th>'
                + '<td>' + obj.cpu_cooler + '</td>'
                + '</tr>'
                + '<tr>'
                + '<th class="text-nowrap">記憶體</th>'
                + '<td>' + obj.mother_board + ' *' + obj.memory_block_num + '</td>'
                + '</tr>'
                + '<tr>'
                + '<th class="text-nowrap">硬碟</th>'
                + '<td>' + obj.disk_block + '</td>'
                + '</tr>'
                + '<tr>'
                + '<th class="text-nowrap">顯示卡</th>'
                + '<td>' + obj.graphic + '</td>'
                + '</tr>'
                + '<tr>'
                + '<th class="text-nowrap">電源供應器</th>'
                + '<td>' + obj.power + '</td>'
                + '</tr>'
                + '<tr>'
                + '<th class="text-nowrap">機殼</th>'
                + '<td>' + obj.case + '</td>'
                + '</tr>'
                + '</tbody>'
                + '</table>'
                + '</div>'
                + '</div>'
                + '</div>'
                + '</div>'
                + ' </div>';

            if (a % 3 != 0) {
                if (a == 0) {
                    $("body").append('<div class="card-deck my-3 mx-2"></div>');
                    $("div.card-deck:last").append(msg);
                }
                else
                    $("div.card-deck:last").append(msg);
            }
            else {
                $("body").append('<div class="card-deck my-3 mx-2"></div>');
                $("div.card-deck:last").append(msg);
            }

        }
        else break;
        a++;
    }
    while (a % 3 != 0) {
        $("div.card-deck:last").append(
            '<div class="card overflow-auto card-big" style="visibility: hidden;">'
            +'<div class="card-body">'
            +'<div class="card mb-2 card-small">'
            +'<div class="card-body">'
            +'<div class="card-text">'
            +'</div>'
            +'</div>'
            +'</div>'
            +'</div>'
            +'</div>'
        );
        a++;
    }
}

