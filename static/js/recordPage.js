function clickTable( thisTable )
{
    $(".card-small", thisTable).toggleClass("chosen");
}

function selectAll()
{
    if( $("#selectAllButton").prop("checked") )
    {
        $(".card-small").addClass("chosen");
    }
    else
        $(".card-small").removeClass("chosen");
}

async function clickNavLink( thisLink )
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
                console.log($(".card-small.chosen").text());
            }
            else if( $(thisLink).text().trim() == "匯出" && $(".chosen").length == 1 ) {
                console.log($(".card-small.chosen").text());
            }
        }
        else if( $(thisLink).text().trim() == "刪除" )
        {
            localStorage.removeItem( $(".card-small.chosen").closest(".card-big").attr("id") );
            
            await new Promise((resolve, reject) => renderRecordTables(resolve, reject)).catch((e) =>
            {
                console.log(e);
            });
        }
    }
}

function renderRecordTables(resolve, reject)
{
    let keys = [];

    for( let i = 0; i < localStorage.length; i++ )
    {
        if( localStorage.key(i).startsWith("GeeGee-"))
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

        for( let i in keys )
        {
            let recordData = JSON.parse(localStorage[keys[i]]);
    
            recordTable = makeHardwareTable(recordData);
    
            if( tableNum % 3 == 0 )
            {
                $(".container-fluid").append("<div class='card-deck my-3 mx-2' />");
            }
    
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
                "</div>"
            );
    
            $(".container-fluid .card-big:last").click( function(){ clickTable(this); } );
    
            tableNum++;
            if( tableNum == 3 ) tableNum = 0;
        }
    
        for( ; tableNum % 3 != 0 && tableNum < 3; tableNum++ )
        {
            $(".container-fluid .card-deck:last").append(
                "<div class='card overflow-auto card-big invisible'>" +
                "</div>"
            );
        }
    }

    resolve(0);
}

$(document).ready( async function()
{
    await new Promise((resolve, reject) => renderRecordTables(resolve, reject)).catch((e) =>
    {
        console.log(e);
    });

    $( "#selectAllButton" ).click( function () {
        selectAll();
    });

    $(".nav-link").click(function () {
        clickNavLink(this);
    });
});