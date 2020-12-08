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