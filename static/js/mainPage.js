var currentItem = "cpu";
var currentMode = "smart";
var ramExceed = false;
var currentList = {};

// 點上方列表會亮
$("#menu-main-nav a").on("click", function () {
    clickTopList(this);
});

async function clickTopList( thisItem )
{
    $("#menu-main-nav a").removeClass("chosen");
    $(thisItem).addClass("chosen");

    //連動下面的會亮
    let id = $(thisItem).attr('id');
    $("#chosenItems div").removeClass("chosen");
    $("#chosenItems ." + id).eq(0).addClass("chosen");
    $("#chosenItems ." + id).eq(-1).addClass("chosen");

    if (id == "ram") {
        $("#chosenItems input.ml-2").eq(-1).addClass("chosen");
    }
    else {
        $("input.ml-2").removeClass("chosen");
    }

    if( currentItem != id )
    {
        currentItem = id;

        changeCustom();

        if( currentMode == "smart" )
        {
            $("#listLeftLoading").parent().show();
            $("#listLeft").parent().hide();
            renderListLeft( currentList, currentItem );
            $("#listLeftLoading").parent().hide();
            $("#listLeft").parent().show();
        }
    }
}

//點已選硬體會亮
$("#chosenItems .card-small").on("click", function () {
    clickChosen( this );
});

async function clickChosen( thisItem )
{
    $("#chosenItems div").removeClass("chosen");
    let id = $(thisItem).attr('items');

    $("#chosenItems ." + id).eq(0).addClass("chosen");

    //form-control那塊
    $("#chosenItems ." + id).eq(-1).addClass("chosen");

    //連動上面會亮
    $("#menu-main-nav a").removeClass("chosen");
    $("#menu-main-nav #" + id).addClass("chosen");

    if (id == "ram") {
        $("#chosenItems input.ml-2").eq(-1).addClass("chosen");
    }
    else {
        $("input.ml-2").removeClass("chosen");
    }

    if( currentItem != id )
    {
        currentItem = id;

        changeCustom();

        if( currentMode == "smart" )
        {
            $("#listLeftLoading").parent().show();
            $("#listLeft").parent().hide();
            renderListLeft( currentList, currentItem );
            $("#listLeftLoading").parent().hide();
            $("#listLeft").parent().show();
        }
    }
}

$("#chosenItems .form-control").click(function(e)
{
    clickChosenRow(e, this);
});

async function clickChosenRow( event, thisItem )
{
    event.stopPropagation();

    $("#chosenItems .card-small").removeClass("chosen");
    $("#chosenItems .form-control").removeClass("chosen");
    let items = $(thisItem).closest(".card-small").attr("items");

    $(thisItem).addClass("chosen");
    $(thisItem).closest(".card-small").addClass("chosen");

    if( items == "ram" )
    {
        if( $(thisItem).hasClass("h-auto") )
            $(thisItem).next().find(".form-control").addClass("chosen");
        else
            $(thisItem).parent().prev().addClass("chosen");
    }

    let chosen = getChosen(true);

    if( currentItem != items )
    {
        currentItem = items;

        changeCustom();

        if( currentMode == "smart" )
        {
            $("#listLeftLoading").parent().show();
            $("#listLeft").parent().hide();
            renderListLeft( currentList, currentItem );
            $("#listLeftLoading").parent().hide();
            $("#listLeft").parent().show();
        }
    }

    if( !($(thisItem).hasClass("h-auto")) )
    {
        ramExceed = await new Promise((resolve, reject) => loadSuggestion( resolve, reject, chosen )).catch((e) =>
        {
            console.log(e);
        });
    }
}

//取得左方內容放入中間的列表
$("#listLeft .card-small").on("click", function () {
    clickListLeft( this );
});

async function clickListLeft( thisItem )
{
    var msg = $("h4", thisItem).text();
    $(".d-inline .chosen").text(msg);

    if( currentMode == "smart" )
    {
        let chosen = getChosen(true);

        currentList = await new Promise((resolve, reject) => loadHardwareList( resolve, reject, currentItem, chosen )).catch((e) =>
        {
            console.log(e);
        });

        ramExceed = await new Promise((resolve, reject) => loadSuggestion( resolve, reject, chosen )).catch((e) =>
        {
            console.log(e);
        });
    }
}

function getChosen( forLoad )
{
    let memoryList = Array.from($(".form-control.ram")).map( item => item = $(item).text());
    let memoryNumList = Array.from($("div.ram input[type=number]")).map( item => item = $(item).val());
    let diskList = Array.from($(".form-control.disk")).map( item => item = $(item).text());
    let graphicList = Array.from($(".form-control.graphic")).map( item => item = $(item).text());
    
    let i = 0;
    while( i < memoryList.length )
    {
        if( memoryNumList[i] == 0 || memoryList[i] == "未選取" )
        {
            memoryNumList.splice(i, 1);
            memoryList.splice(i, 1);
        }
        else
            i++;
    }

    i = 0;
    while( i < diskList.length )
    {
        if( diskList[i] == "未選取" )
            diskList.splice(i, 1);
        else
            i++;
    }

    i = 0;
    while( i < graphicList.length )
    {
        if( graphicList[i] == "未選取" )
            graphicList.splice(i, 1);
        else
            i++;
    }

    let chosen = 
    {
        time: new Date().toLocaleString('zh-TW', { hour12: false }),
        cpuList: [$("div.cpu:last").text()],
        coolerList: [$("div.cooler:last").text()],
        mbList: [$("div.motherBoard:last").text()],
        ramList: memoryList,
        ramNum: memoryNumList,
        diskList: diskList,
        graphicList: graphicList,
        powerList: [$("div.power:last").text()],
        crateList: [$("div.crate:last").text()],
    };

    if( forLoad )
    {
        Object.keys(chosen).forEach( key =>
        {
            if( key != "ramList" && key != "diskList" && key != "graphicList" && chosen[key][0] == "未選取" )
                chosen[key] = [];
        });

        memoryList.forEach( (item, index) => 
        {
            for( let i = 0; i < memoryNumList[index] - 1; i++ )
            {
                chosen.ramList.push(item);
            }
        });
    }

    return chosen;
}

function makeHardwareTable( chosen )
{
    let content = "<table class='table table-striped'>" +
                    "<thead>" +
                        "<tr>" +
                            "<th scope='col' colspan='2'><h4>" + chosen.time + "</h4></th>" +
                        "</tr>" +
                    "</thead>" +
                    "<tbody>";

    content += "<tr>" + "<th class='text-nowrap'>CPU</th><td>" + chosen.cpuList[0] + "</td></tr>";
    content += "<tr>" + "<th class='text-nowrap'>CPU散熱器</th><td>" + chosen.coolerList[0] + "</td></tr>";
    content += "<tr>" + "<th class='text-nowrap'>主機板</th><td>" + chosen.mbList[0] + "</td></tr>";

    if( chosen.ramList.length > 0 )
    {
        content += "<tr>" + "<th class='text-nowrap' rowspan='" + chosen.ramList.length + "'>記憶體</th>";
        content += "<td>" + chosen.ramList[0] + " * " + chosen.ramNum[0] + "</td></tr>";

        for( let i = 1; i < chosen.ramList.length; i++ )
        {
            content += "<tr><td>" + chosen.ramList[i] + " * " + chosen.ramNum[i] + "</td></tr>";
        }
    }
    else
    {
        content += "<tr>" + "<th class='text-nowrap'>記憶體</th><td>" + "未選取" + "</td></tr>";
    }
    
    if( chosen.diskList.length > 0 )
    {
        content += "<tr>" + "<th class='text-nowrap' rowspan='" + chosen.diskList.length + "'>硬碟</th>";
        content += "<td>" + chosen.diskList[0] + "</td></tr>";
        for( let i = 1; i < chosen.diskList.length; i++ )
        {
            content += "<tr><td>" + chosen.diskList[i] + "</td></tr>";
        }
    }
    else
    {
        content += "<tr>" + "<th class='text-nowrap'>硬碟</th><td>" + "未選取" + "</td></tr>";
    }
    
    if( chosen.graphicList.length > 0 )
    {
        content += "<tr>" + "<th class='text-nowrap' rowspan='" + chosen.graphicList.length + "'>顯示卡</th>";
        content += "<td>" + chosen.graphicList[0] + "</td></tr>";
        for( let i = 1; i < chosen.graphicList.length; i++ )
        {
            content += "<tr><td>" + chosen.graphicList[i] + "</td></tr>";
        }
    }
    else
    {
        content += "<tr>" + "<th class='text-nowrap'>顯示卡</th><td>" + "未選取" + "</td></tr>";
    }

    content += "<tr>" + "<th class='text-nowrap'>電源供應器</th><td>" + chosen.powerList[0] + "</td></tr>";
    content += "<tr>" + "<th class='text-nowrap'>機殼</th><td>" + chosen.crateList[0] + "</td></tr>";
    content += "</tbody></table>";

    return content;
}

//儲存到localstorage
$(".fa-floppy-o").closest("button").on("click", function () {

    swal({
        title: "已選清單",
        html: makeHardwareTable(getChosen()),
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

            }).then((result) => {}, (dismiss) =>
            {
                localStorage.setItem("GeeGee-" + new Date().getTime(), JSON.stringify(chosen));
            });
            
        }
    }, (dismiss) => {});
});

$( ".plusButton" ).click( function()
{
    let thisItem = $(this).closest("div").parent().attr("items");
    plusButton( thisItem );
});

function plusButton( thisItem )
{
    switch( thisItem )
    {
        case "ram":
            $("div.chosen .text-left").removeClass("chosen");
            $("div.chosen input.ml-2").removeClass("chosen");

            let memory = $("div[items=ram] .card-text");

            memory.append(
                "<form class='form-inline my-2 my-lg-0 w-100 d-inline '>" +
                '<div class="input-group mt-3">'
                + '<span class="input-group-prepend">'
                + '<button class="btn rounded-circle minusButton" type="button">'
                + '<i class="fa fa-minus text-light"></i>'
                + '</button>'
                + '</span>'
                + '<div class="form-control ml-2 rounded-pill text-left h-auto ram chosen">未選取</div>'
                + '<span class="input-group-append">'
                + '<input class="form-control rounded-pill ml-2 chosen" value="0" type="number" min="0" max="64" placeholder="0" >'
                + ' </span>'
                + '</div>'
                + '</form>'
            );

            $(".minusButton", memory ).click(function(){minusButton(this)});
            $(".form-control", memory ).click(function(e){clickChosenRow(e,this)});
            break;

        case "disk":
            $("div.chosen .text-left").removeClass("chosen");

            let disk = $("div[items=disk] .card-text");

            disk.append(
                "<form class='form-inline my-2 my-lg-0 w-100 d-inline '>" +
                '<div class="input-group mt-3">'
                + '<span class="input-group-prepend">'
                + '<button class="btn rounded-circle minusButton" type="button">'
                + '<i class="fa fa-minus text-light"></i>'
                + '</button>'
                + '</span>'
                + '<div class="form-control ml-2 rounded-pill text-left disk chosen">未選取</div>'
                + '</div>'
                + '</form>'
            );

            $(".minusButton", disk ).click(function(){minusButton(this)});
            $(".form-control.disk", disk ).click(function(e){clickChosenRow(e,this)});
            break;

        case "graphic":
            $("div.chosen .text-left").removeClass("chosen");

            let graphic = $("div[items=graphic] .card-text");

            graphic.append(
                "<form class='form-inline my-2 my-lg-0 w-100 d-inline '>" +
                '<div class="input-group mt-3">'
                + '<span class="input-group-prepend">'
                + '<button class="btn rounded-circle minusButton" type="button">'
                + '<i class="fa fa-minus text-light"></i>'
                + '</button>'
                + '</span>'
                + '<div class="form-control ml-2 rounded-pill text-left graphic chosen">未選取</div>'
                + '</div>'
                + '</form>'
            );

            $(".minusButton", graphic ).click(function(){minusButton(this)});
            $(".form-control.graphic", graphic ).click(function(e){clickChosenRow(e,this)});
            break;
    }

    changeRamNum();
}

$(".minusButton").click( function()
{
    minusButton( this );
});

async function minusButton( thisItem )
{
    let items = $(thisItem).closest(".card-small").attr("items");
    let formNum = $(thisItem).closest(".card-small").find("form").length;

    if( items == "ram" || items == "disk" || items == "graphic" )
    {
        formNum -= 1;
    }

    if( formNum == 1 )
    {
        $(thisItem).parent().next().text("未選取");

        if( items == "ram" )
        {
            $("input[type=number]", $(thisItem).closest(".input-group")).val(0);
        }
    }
    else
    {
        $(thisItem).closest("form").remove();
    }
    
    if( $(thisItem).parent().next().text() != "未選取" )
    {
        if( currentMode == "smart" )
        {
            let chosen = getChosen(true);

            ramExceed = await new Promise((resolve, reject) => loadSuggestion( resolve, reject, chosen )).catch((e) =>
            {
                console.log(e);
            });
        }
    }
}

function changeCustom()
{
    let customButton = $(".fa-cog").parent();
    customButton.removeAttr("disabled");

    switch( currentItem )
    {
        case "cooler":
            $( "#customDialog" ).html(coolerModal);
            break;
            
        case "ram":
            $( "#customDialog" ).html(ramModal);
            break;
        
        case "disk":
            $( "#customDialog" ).html(diskModal);
            break;
    
        case "graphic":
            $( "#customDialog" ).html(graphicModal);
            break;
    
        case "power":
            $( "#customDialog" ).html(powerModal);
            break;
    
        case "crate":
            $( "#customDialog" ).html(crateModal);
            break;

        default:
            customButton.attr("disabled", "disabled");
            break;
    }
}

function changeRamNum() {
    let previous;

    $("#chosenItems input[type=number]").on( "focus", function () 
    {
        previous = $(this).val();

    })
    .change( function()
    {
        if( ramExceed )
        {
            $(this).val(previous);

            swal({
                title: "記憶體已達上限",
                type: "error",
                confirmButtonText: "確定",

            }).then(( result ) => {}, ( dismiss ) => {});
        }

        previous = $(this).val();
    });
};

$(document).ready(async function() {

    currentList = await new Promise((resolve, reject) => loadOriginList( resolve, reject, "cpu" )).catch((e) =>
    {
        console.log(e);
    });

    changeRamNum();
})
