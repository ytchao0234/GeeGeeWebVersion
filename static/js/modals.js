var coolerModal = 
"<div class='modal-dialog' role='document'>" +
    "<div class='modal-content'>" +

        "<div class='modal-header' style='background-color: rgb(64, 84, 104);'>" +
            "<h5 class='modal-title'>自訂CPU散熱器</h5>" +
            "<button type='button' class='close' data-dismiss='modal'>" +
                "<span class='text-light'>&times;</span>" +
            "</button>" +
        "</div>" +

        "<div class='modal-body px-5' style='background-color: rgb(234, 240, 248);'>" +
            "<table class='table'>" +
                "<tbody>" +
                    "<tr class='row'>" +
                        "<td class='col-2'>" +
                            "<div class='input-group mt-3'>" +
                                "<span class='input-group-text border-0' style='background-color: transparent;'>高度</span>" +
                            "</div>" +
                        "</td>" +
                        "<td class='col-10'>" +
                            "<div class='input-group mt-3'>" +
                                "<input class='form-control rounded-pill' type='number' min='1' max='999' placeholder='1' />" +
                                "<div class='input-group-append'>" +
                                    "<span class='input-group-text border-0' style='background-color: transparent;'>cm</span>" +
                                "</div>" +
                            "</div>" +
                        "</td>" +
                    "</tr>" +
                "</tbody>" +
            "</table>" +
        "</div>" +

        "<div class='modal-footer'>" +
            "<button type='button' class='btn btn-primary' data-dismiss='modal'>確定</button>" +
            "<button type='button' class='btn btn-secondary ml-2' data-dismiss='modal'>取消</button>" +
        "</div>" +
    "</div>" +
"</div>";

var ramModal = 
"<div class='modal-dialog' role='document'>" +
    "<div class='modal-content'>" +

        "<div class='modal-header' style='background-color: rgb(64, 84, 104);'>" +
            "<h5 class='modal-title'>自訂記憶體</h5>" +
            "<button type='button' class='close' data-dismiss='modal'>" +
                "<span class='text-light'>&times;</span>" +
            "</button>" +
        "</div>" +

        "<div class='modal-body px-5' style='background-color: rgb(234, 240, 248);'>" +
            "<table class='table'>" +
                "<tbody>" +
                    "<tr class='row'>" +
                        "<td class='col-2'>" +
                            "<div class='input-group mt-3'>" +
                                "<span class='input-group-text border-0' style='background-color: transparent;'>代數</span>" +
                            "</div>" +
                        "</td>" +
                        "<td class='col-10'>" +
                            "<div class='input-group mt-3'>" +
                                "<select class='form-control pr-5 rounded-pill'>" +
                                    "<option>DDR4</option>" +
                                    "<option>DDR3</option>" +
                                    "<option>DDR2</option>" +
                                    "<option>DDR1</option>" +
                                "</select>" +
                            "</div>" +
                        "</td>" +
                    "</tr>" +

                    "<tr class='row'>" +
                        "<td class='col-2'>" +
                            "<div class='input-group mt-3'>" +
                                "<span class='input-group-text border-0' style='background-color: transparent;'>容量</span>" +
                            "</div>" +
                        "</td>" +
                        "<td class='col-10'>" +
                            "<div class='input-group mt-3'>" +
                                "<select class='form-control pr-5 rounded-pill'>" +
                                    "<option>1</option>" +
                                    "<option>2</option>" +
                                    "<option>4</option>" +
                                    "<option>8</option>" +
                                    "<option>16</option>" +
                                    "<option>32</option>" +
                                "</select>" +
                                "<div class='input-group-append'>" +
                                    "<span class='input-group-text border-0' style='background-color: transparent;'>GB</span>" +
                                "</div>" +
                            "</div>" +
                        "</td>" +
                    "</tr>" +
                "</tbody>" +
            "</table>" +
        "</div>" +

        "<div class='modal-footer'>" +
            "<button type='button' class='btn btn-primary' data-dismiss='modal'>確定</button>" +
            "<button type='button' class='btn btn-secondary ml-2' data-dismiss='modal'>取消</button>" +
        "</div>" +
    "</div>" +
"</div>";

var diskModal = 
"<div class='modal-dialog' role='document'>" +
    "<div class='modal-content'>" +

        "<div class='modal-header' style='background-color: rgb(64, 84, 104);'>" +
            "<h5 class='modal-title'>自訂硬碟</h5>" +
            "<button type='button' class='close' data-dismiss='modal'>" +
                "<span class='text-light'>&times;</span>" +
            "</button>" +
        "</div>" +

        "<div class='modal-body px-5' style='background-color: rgb(234, 240, 248);'>" +
            "<table class='table'>" +
                "<tbody>" +
                    "<tr class='row'>" +
                        "<td class='col-2'>" +
                            "<div class='input-group mt-3'>" +
                                "<span class='input-group-text border-0' style='background-color: transparent;'>種類</span>" +
                            "</div>" +
                        "</td>" +
                        "<td class='col-10'>" +
                            "<div class='input-group mt-3'>" +
                                "<select class='form-control pr-5 rounded-pill'>" +
                                    "<option>M.2</option>" +
                                    "<option>SSD</option>" +
                                    "<option>HDD</option>" +
                                "</select>" +
                            "</div>" +
                        "</td>" +
                    "</tr>" +

                    "<tr class='row'>" +
                        "<td class='col-2'>" +
                            "<div class='input-group mt-3'>" +
                                "<span class='input-group-text border-0' style='background-color: transparent;'>接口</span>" +
                            "</div>" +
                        "</td>" +
                        "<td class='col-10'>" +
                            "<div class='input-group mt-3'>" +
                                "<select class='form-control rounded-pill w-auto'>" +
                                    "<option>PCIe</option>" +
                                    "<option>SATA</option>" +
                                "</select>" +
                            "</div>" +
                        "</td>" +
                    "</tr>" +

                    "<tr class='row'>" +
                        "<td class='col-2'>" +
                            "<div class='input-group mt-3'>" +
                                "<span class='input-group-text border-0' style='background-color: transparent;'>容量</span>" +
                            "</div>" +
                        "</td>" +
                        "<td class='col-10'>" +
                            "<div class='input-group mt-3'>" +
                                "<input class='form-control rounded-pill' type='number' min='1' max='999' placeholder='1' />" +
                                "<span class='input-group-append'>" +
                                    "<select class='form-control ml-2 rounded-pill w-auto'>" +
                                        "<option>G</option>" +
                                        "<option>T</option>" +
                                    "</select>" +
                                "</span>" +
                            "</div>" +
                        "</td>" +
                    "</tr>" +
                "</tbody>" +
            "</table>" +
        "</div>" +

        "<div class='modal-footer'>" +
            "<button type='button' class='btn btn-primary' data-dismiss='modal'>確定</button>" +
            "<button type='button' class='btn btn-secondary ml-2' data-dismiss='modal'>取消</button>" +
        "</div>" +
    "</div>" +
"</div>";

var graphicModal =
"<div class='modal-dialog' role='document'>" +
    "<div class='modal-content'>" +

        "<div class='modal-header' style='background-color: rgb(64, 84, 104);'>" +
            "<h5 class='modal-title'>自訂顯示卡</h5>" +
            "<button type='button' class='close' data-dismiss='modal'>" +
                "<span class='text-light'>&times;</span>" +
            "</button>" +
        "</div>" +

        "<div class='modal-body px-5' style='background-color: rgb(234, 240, 248);'>" +
            "<table class='table'>" +
                "<tbody>" +
                    "<tr class='row'>" +
                        "<td class='col-2'>" +
                            "<div class='input-group mt-3'>" +
                                "<span class='input-group-text border-0' style='background-color: transparent;'>長度</span>" +
                            "</div>" +
                        "</td>" +
                        "<td class='col-10'>" +
                            "<div class='input-group mt-3'>" +
                                "<input class='form-control rounded-pill' type='number' min='1' max='999' placeholder='1' />" +
                                "<div class='input-group-append'>" +
                                    "<span class='input-group-text border-0' style='background-color: transparent;'>cm</span>" +
                                "</div>" +
                            "</div>" +
                        "</td>" +
                    "</tr>" +

                    "<tr class='row'>" +
                        "<td class='col-2'>" +
                            "<div class='input-group mt-3'>" +
                                "<span class='input-group-text border-0' style='background-color: transparent;'>TDP</span>" +
                            "</div>" +
                        "</td>" +
                        "<td class='col-10'>" +
                            "<div class='input-group mt-3'>" +
                                "<input class='form-control rounded-pill' type='number' min='1' max='999' placeholder='1' />" +
                                "<div class='input-group-append'>" +
                                    "<span class='input-group-text border-0' style='background-color: transparent;'>W</span>" +
                                "</div>" +
                            "</div>" +
                        "</td>" +
                    "</tr>" +
                "</tbody>" +
            "</table>" +
        "</div>" +

        "<div class='modal-footer'>" +
            "<button type='button' class='btn btn-primary' data-dismiss='modal'>確定</button>" +
            "<button type='button' class='btn btn-secondary ml-2' data-dismiss='modal'>取消</button>" +
        "</div>" +
    "</div>" +
"</div>";

var powerModal =
"<div class='modal-dialog' role='document'>" +
    "<div class='modal-content'>" +

        "<div class='modal-header' style='background-color: rgb(64, 84, 104);'>" +
            "<h5 class='modal-title'>自訂電源供應器</h5>" +
            "<button type='button' class='close' data-dismiss='modal'>" +
                "<span class='text-light'>&times;</span>" +
            "</button>" +
        "</div>" +

        "<div class='modal-body px-5' style='background-color: rgb(234, 240, 248);'>" +
            "<table class='table'>" +
                "<tbody>" +
                    "<tr class='row'>" +
                        "<td class='col-2'>" +
                            "<div class='input-group mt-3'>" +
                                "<span class='input-group-text border-0' style='background-color: transparent;'>長度</span>" +
                            "</div>" +
                        "</td>" +
                        "<td class='col-10'>" +
                            "<div class='input-group mt-3'>" +
                                "<input class='form-control rounded-pill' type='number' min='1' max='999' placeholder='1' />" +
                                "<div class='input-group-append'>" +
                                    "<span class='input-group-text border-0' style='background-color: transparent;'>cm</span>" +
                                "</div>" +
                            "</div>" +
                        "</td>" +
                    "</tr>" +

                    "<tr class='row'>" +
                        "<td class='col-2'>" +
                            "<div class='input-group mt-3'>" +
                                "<span class='input-group-text border-0' style='background-color: transparent;'>瓦數</span>" +
                            "</div>" +
                        "</td>" +
                        "<td class='col-10'>" +
                            "<div class='input-group mt-3'>" +
                                "<input class='form-control rounded-pill' type='number' min='1' max='999' placeholder='1' />" +
                                "<div class='input-group-append'>" +
                                    "<span class='input-group-text border-0' style='background-color: transparent;'>W</span>" +
                                "</div>" +
                            "</div>" +
                        "</td>" +
                    "</tr>" +

                    "<tr class='row'>" +
                        "<td class='col-2'>" +
                            "<div class='input-group mt-3'>" +
                                "<span class='input-group-text border-0' style='background-color: transparent;'>大小</span>" +
                            "</div>" +
                        "</td>" +
                        "<td class='col-10'>" +
                            "<div class='input-group mt-3'>" +
                                "<select class='form-control pr-5 rounded-pill'>" +
                                    "<option>ATX</option>" +
                                    "<option>SFX</option>" +
                                "</select>" +
                            "</div>" +
                        "</td>" +
                    "</tr>" +
                "</tbody>" +
            "</table>" +
        "</div>" +

        "<div class='modal-footer'>" +
            "<button type='button' class='btn btn-primary' data-dismiss='modal'>確定</button>" +
            "<button type='button' class='btn btn-secondary ml-2' data-dismiss='modal'>取消</button>" +
        "</div>" +
    "</div>" +
"</div>";

var crateModal =
"<div class='modal-dialog' role='document'>" +
    "<div class='modal-content'>" +

        "<div class='modal-header' style='background-color: rgb(64, 84, 104);'>" +
            "<h5 class='modal-title'>自訂機殼</h5>" +
            "<button type='button' class='close' data-dismiss='modal'>" +
                "<span class='text-light'>&times;</span>" +
            "</button>" +
        "</div>" +

        "<div class='modal-body px-5' style='background-color: rgb(234, 240, 248);'>" +
            "<table class='table'>" +
                "<tbody>" +
                    "<tr class='row'>" +
                        "<td class='col-4'>" +
                            "<div class='input-group mt-3'>" +
                                "<span class='input-group-text border-0' style='background-color: transparent;'>主機板大小</span>" +
                            "</div>" +
                        "</td>" +
                        "<td class='col-8'>" +
                            "<div class='input-group mt-3'>" +
                                "<select class='form-control pr-5 rounded-pill'>" +
                                    "<option>EATX</option>" +
                                    "<option>ATX</option>" +
                                    "<option>MATX</option>" +
                                    "<option>ITX</option>" +
                                    "<option>MITX</option>" +
                                "</select>" +
                            "</div>" +
                        "</td>" +
                    "</tr>" +

                    "<tr class='row'>" +
                        "<td class='col-4'>" +
                            "<div class='input-group mt-3'>" +
                                "<span class='input-group-text border-0' style='background-color: transparent;'>顯卡長度</span>" +
                            "</div>" +
                        "</td>" +
                        "<td class='col-8'>" +
                            "<div class='input-group mt-3'>" +
                                "<input class='form-control rounded-pill' type='number' min='1' max='999' placeholder='1' />" +
                                "<div class='input-group-append'>" +
                                    "<span class='input-group-text border-0' style='background-color: transparent;'>cm</span>" +
                                "</div>" +
                            "</div>" +
                        "</td>" +
                    "</tr>" +

                    "<tr class='row'>" +
                        "<td class='col-4'>" +
                            "<div class='input-group mt-3'>" +
                                "<span class='input-group-text border-0' style='background-color: transparent;'>電源大小</span>" +
                            "</div>" +
                        "</td>" +
                        "<td class='col-8'>" +
                            "<div class='input-group mt-3'>" +
                                "<select class='form-control pr-5 rounded-pill'>" +
                                    "<option>ATX</option>" +
                                    "<option>SFX</option>" +
                                "</select>" +
                            "</div>" +
                        "</td>" +
                    "</tr>" +

                    "<tr class='row'>" +
                        "<td class='col-4'>" +
                            "<div class='input-group mt-3'>" +
                                "<span class='input-group-text border-0' style='background-color: transparent;'>電源長度</span>" +
                            "</div>" +
                        "</td>" +
                        "<td class='col-8'>" +
                            "<div class='input-group mt-3'>" +
                                "<input class='form-control rounded-pill' type='number' min='1' max='999' placeholder='1' />" +
                                "<div class='input-group-append'>" +
                                    "<span class='input-group-text border-0' style='background-color: transparent;'>cm</span>" +
                                "</div>" +
                            "</div>" +
                        "</td>" +
                    "</tr>" +

                    "<tr class='row'>" +
                        "<td class='col-4'>" +
                            "<div class='input-group mt-3'>" +
                                "<span class='input-group-text border-0' style='background-color: transparent;'>散熱器高度</span>" +
                            "</div>" +
                        "</td>" +
                        "<td class='col-8'>" +
                            "<div class='input-group mt-3'>" +
                                "<input class='form-control rounded-pill' type='number' min='1' max='999' placeholder='1' />" +
                                "<div class='input-group-append'>" +
                                    "<span class='input-group-text border-0' style='background-color: transparent;'>cm</span>" +
                                "</div>" +
                            "</div>" +
                        "</td>" +
                    "</tr>" +

                    "<tr class='row'>" +
                        "<td class='col-4'>" +
                            "<div class='input-group mt-3'>" +
                                "<span class='input-group-text border-0' style='background-color: transparent;'>3.5吋硬碟架</span>" +
                            "</div>" +
                        "</td>" +
                        "<td class='col-8'>" +
                            "<div class='input-group mt-3'>" +
                                "<input class='form-control rounded-pill' type='number' min='1' max='999' placeholder='1' />" +
                                "<div class='input-group-append'>" +
                                    "<span class='input-group-text border-0' style='background-color: transparent;'>個</span>" +
                                "</div>" +
                            "</div>" +
                        "</td>" +
                    "</tr>" +
                "</tbody>" +
            "</table>" +
        "</div>" +

        "<div class='modal-footer'>" +
            "<button type='button' class='btn btn-primary' data-dismiss='modal'>確定</button>" +
            "<button type='button' class='btn btn-secondary ml-2' data-dismiss='modal'>取消</button>" +
        "</div>" +
    "</div>" +
"</div>";

var smartModal =
"<div class='modal-dialog' role='document'>" +
    "<div class='modal-content'>" +
        "<div class='modal-header' style='background-color: rgb(64, 84, 104);'>" +
            "<h5 class='modal-title'>更換相容性模式</h5>" +
            "<button type='button' class='close' data-dismiss='modal'>" +
                "<span class='text-light'>&times;</span>" +
            "</button>" +
        "</div>" +

        "<div class='modal-body px-5' style='background-color: rgb(234, 240, 248);'>" +
            "<p>是否確定要更換為一般模式？</p>" +
        "</div>" +

        "<div class='modal-footer'>" +
            "<button type='button' class='btn btn-primary' data-dismiss='modal'>確定並清空</button>" +
            "<button type='button' class='btn btn-primary remainChosen' data-dismiss='modal'>確定並保留</button>" +
            "<button type='button' class='btn btn-secondary ml-2' data-dismiss='modal'>取消</button>" +
        "</div>" +
    "</div>" +
"</div>";

var normalModal =
"<div class='modal-dialog' role='document'>" +
    "<div class='modal-content'>" +
        "<div class='modal-header' style='background-color: rgb(64, 84, 104);'>" +
            "<h5 class='modal-title'>更換相容性模式</h5>" +
            "<button type='button' class='close' data-dismiss='modal'>" +
                "<span class='text-light'>&times;</span>" +
            "</button>" +
        "</div>" +

        "<div class='modal-body px-5' style='background-color: rgb(234, 240, 248);'>" +
            "<p>是否確定要更換為智慧模式？</p>" +
        "</div>" +

        "<div class='modal-footer'>" +
            "<button type='button' class='btn btn-primary' data-dismiss='modal'>確定</button>" +
            "<button type='button' class='btn btn-secondary ml-2' data-dismiss='modal'>取消</button>" +
        "</div>" +
    "</div>" +
"</div>";