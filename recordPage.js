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


$("li.nav-item").click(function (){
    if ($(".chosen").length==0){
        alert("還沒有選擇表格歐！");
    }
    else {
        if ($(this).text().trim()=="載入"){
            if ( $(".chosen").length>1){
                alert("一次只能 載入/匯出 一份儲存紀錄歐！");
            }
    
        }
        if ($(this).text().trim()=="匯出"){
            if ( $(".chosen").length>1){
                alert("一次只能 載入/匯出 一份儲存紀錄歐！");
            }
        }
    }
})