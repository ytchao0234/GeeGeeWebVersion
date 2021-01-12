function clickTable( thisTable )
{
    $(".card-small", thisTable).toggleClass("chosen");
}

function selectAll()
{
    if( $("#selectAllButton").prop("checked") )
    {
        $(".card-small").not(".invisible").addClass("chosen");
    }
    else
        $(".card-small").not(".invisible").removeClass("chosen");
}

function clickNavLink( thisLink )
{
    if( $(".card-small.chosen").length == 0 ) 
    {
        swal({
            title: "還沒有選擇表格歐！",
            type: "warning",
            confirmButtonText: "確定",
        }).then((result) => {}, (dismiss) => {});
    }
    else
    {
        if( $(thisLink).text().trim() == "載入" || $(thisLink).text().trim() == "匯出" )
        {
            if( $(".card-small.chosen").length > 1 )
            {
                swal({
                    type: "error",
                    title: "一次只能 載入/匯出 一份儲存紀錄歐！",
                    confirmButtonText: "確定",

                }).then((result) => {}, (dismiss) => {});
            }
            else if( $(thisLink).text().trim() == "載入" && $(".chosen").length == 1 ) {
                let thisTableID = $(".chosen").closest(".card-big").attr("id");

                localStorage.setItem( "GeeGee-Remain-Selection", localStorage[ thisTableID ]);
                location.href = "/home";
            }
            else if( $(thisLink).text().trim() == "匯出" && $(".chosen").length == 1 ) {
                let chosenTableID = $(".chosen").closest(".card-big").attr("id");
                let fileName = btoa(chosenTableID) + ".csv";
                let csvData = getHardwareCsv(chosenTableID);
                let link = document.createElement("a");
                link.href = "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csvData);
                link.download = fileName;
                link.click();
            }
        }
        else if( $(thisLink).text().trim() == "刪除" )
        {
            swal({
                title: "確定要刪除這些記錄嗎？",
                type: "warning",
                html: Array.from($(".card-small.chosen")).map( table => $(table).find(".card-text h4").text() ).join("<br/>"),
                showCancelButton: true,
                confirmButtonText: "確定",
                cancelButtonText: "取消",

            }).then(async ( result ) =>
            {
                for( let i in $(".card-small.chosen") )
                {
                    localStorage.removeItem( $(".card-small.chosen").eq(i).closest(".card-big").attr("id") );
                }
                
                await new Promise((resolve, reject) => renderRecordTables(resolve, reject)).catch((e) =>
                {
                    console.log(e);
                });

            }, ( dismiss ) => {});
        }
    }
}

function getHardwareCsv( chosenTableID )
{
    let table = JSON.parse(localStorage[chosenTableID]);
    let chosen = table.chosen;

    let csvData = "";

    let header = ["項目", "型號", "價格", "數量", "備註", "是否已購得"];
    let content = [["CPU", chosen.cpuList[0], "", "1", "", ""],
                   ["CPU散熱器", chosen.coolerList[0], "", "1", "", ""],
                   ["主機板", chosen.mbList[0], "", "1", "", ""],
                   ["記憶體", ((chosen.ramList[0] === undefined) ? "未選取" : chosen.ramList[0]), "", chosen.ramNum[0], "", ""],
                   ["硬碟", ((chosen.diskList[0] === undefined) ? "未選取" : chosen.diskList[0]), "", "1", "", ""],
                   ["顯示卡", ((chosen.graphicList[0] === undefined) ? "未選取" : chosen.graphicList[0]), "", "1", "", ""],
                   ["電源供應器", chosen.powerList[0], "", "1", "", ""],
                   ["機殼", chosen.crateList[0], "", "1", "", ""]];

    let ramIndex = 4;

    if( chosen.ramList.length > 1 )
    {
        for( let i = 1; i < chosen.ramList.length; i++ )
        {
            content.splice(
                ramIndex, 0,
                ["", chosen.ramList[i], "", chosen.ramNum[i], "", ""]
            );
            ramIndex++;
        }
    }

    let diskIndex = ramIndex + 1;

    if( chosen.diskList.length > 1 )
    {
        for( let i = 1; i < chosen.diskList.length; i++ )
        {
            content.splice(
                diskIndex, 0,
                ["", chosen.diskList[i], "", "1", "", ""]
            );
            diskIndex++;
        }
    }

    let graphicIndex = diskIndex + 1;

    if( chosen.graphicList.length > 1 )
    {
        for( let i = 1; i < chosen.graphicList.length; i++ )
        {
            content.splice(
                graphicIndex, 0,
                ["", chosen.graphicList[i], "", "1", "", ""]
            );
            graphicIndex++;
        }
    }

    csvData += header.join(",");
    csvData += "\r\n";

    for( let i in content )
    {
        csvData += content[i].join(",");
        csvData += "\r\n";
    }
    
    return csvData;
}

function renderRecordTables(resolve, reject, forRWD )
{
    let keys = [];

    for( let i = 0; i < localStorage.length; i++ )
    {
        if( localStorage.key(i).startsWith("GeeGee-") && 
            !localStorage.key(i).startsWith("GeeGee-Remain-Selection"))
        {
            keys.push(localStorage.key(i));
        }
    }

    $(".container-fluid").empty();

    if( keys.length == 0 )
    {
        swal({
            title: "還沒有儲存紀錄歐！",
            type: "info",
            confirmButtonText: "確定",

        }).then((result) => {
            $(".container-fluid").append(
                "<span class='h2'>還沒有儲存紀錄歐！</span>"
            );
        }, (dismiss) => {
            $(".container-fluid").append(
                "<span class='h2'>還沒有儲存紀錄歐！</span>"
            );
        });
    }
    else
    {
        let tableNum = 0;
        keys.sort();

        if( forRWD )
        {
            $(".container-fluid").append("<div class='card-column my-3 mx-3' />");
        }

        for( let i in keys )
        {
            let recordData = JSON.parse(localStorage[keys[i]]);
    
            recordTable = makeHardwareTable(recordData.chosen);
    
            if( tableNum % 3 == 0 && !forRWD )
            {
                $(".container-fluid").append("<div class='card-deck my-3 mx-2' />");
            }
    
            if( forRWD )
            {
                $(".container-fluid .card-column").append(
                    "<div class='card card-big my-2' style='height: auto;' id='" + keys[i] + "'>" +
                        "<div class='card-body'>" +
                            "<div class='card mb-2 card-small'>" +
                                "<div class='card-body'>" +
                                    "<div class='card-text'>" +
                                        recordTable + 
                                    "</div>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "</div>");
            }
            else
            {
                $(".container-fluid .card-deck:last").append(
                    "<div class='card overflow-auto card-big' id='" + keys[i] + "'>" +
                        "<div class='card-body'>" +
                            "<div class='card mb-2 card-small'>" +
                                "<div class='card-body'>" +
                                    "<div class='card-text'>" +
                                        recordTable + 
                                    "</div>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "</div>");
            }
    
            $(".container-fluid .card-big:last").click( function(){ clickTable(this); } );
    
            tableNum++;
            if( tableNum == 3 ) tableNum = 0;
        }

        if( !forRWD )
        {
            for( ; tableNum % 3 != 0 && tableNum < 3; tableNum++ )
            {
                $(".container-fluid .card-deck:last").append(
                    "<div class='card overflow-auto card-big invisible'>" +
                    "</div>"
                );
            }
        }
    }

    resolve(0);
}

$(document).ready( async function()
{
    if( $(window).width() < 1245 )
    {
        await new Promise((resolve, reject) => renderRecordTables(resolve, reject, true)).catch((e) =>
        {
            console.log(e);
        });
    }
    else
    {
        await new Promise((resolve, reject) => renderRecordTables(resolve, reject)).catch((e) =>
        {
            console.log(e);
        });
    }

    $( "#selectAllButton" ).click( function () {
        selectAll();
    });

    $(".nav-link").click(function () {
        clickNavLink(this);
    });

    $(window).resize(async function()
    {
        if( $(window).width() < 1245 )
        {
            await new Promise((resolve, reject) => renderRecordTables(resolve, reject, true)).catch((e) =>
            {
                console.log(e);
            });
        }
        else
        {
            await new Promise((resolve, reject) => renderRecordTables(resolve, reject)).catch((e) =>
            {
                console.log(e);
            });
        }
    });
});