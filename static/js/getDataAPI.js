function loadHardwareList( resolve, reject, whichHardware, chosenHardwares, notSearching )
{
    $.ajax({
        type: "post",
        url: "/getHardwareList",
        data: JSON.stringify({
                                "chosenHardwares": chosenHardwares,
                            }),
        contentType: "application/json",
        dataType: 'json',

        beforeSend: function()
        {
            if( notSearching )
            {
                $("#listLeftLoading").parent().show();
                $("#listLeft").parent().hide();
            }
        },
    })
    .done(async (data) =>
    {
        if( notSearching )
        {
            await renderListLeft( data, whichHardware );
    
            $("#listLeftLoading").parent().hide();
            $("#listLeft").parent().show();
        }

        chosenRamList = Array.from($("#chosenItems .form-control.ram" )).map( item => $(item).text() );

        for( let i in chosenRamList )
        {
            if( !data.ramList.find(ram => ram.name == chosenRamList[i]) )
            {
                Array.from($("#chosenItems .form-control.ram" )).forEach( item =>
                {
                    if( $(item).text() == chosenRamList[i] && !($(item).text().startsWith("custom")) )
                    {
                        $(item).text( "未選取" );
                    }
                });
            }
        }
    
        resolve( data );
    })
    .fail(() =>
    {
        reject( "Fail to get hardware list" );
    });
}

function loadOriginList( resolve, reject, whichHardware )
{
    $.ajax({
        type: "get",
        url: "/getOriginList",
        dataType: 'json',

        beforeSend: function()
        {
            $("#listLeftLoading").parent().show();
            $("#listLeft").parent().hide();
        },
    })
    .done(async (data) =>
    {
        await renderListLeft( data, whichHardware );

        $("#listLeftLoading").parent().hide();
        $("#listLeft").parent().show();

        resolve( data );
    })
    .fail(() =>
    {
        reject( "fail to get origin list" );
    });
}

function loadSearch( resolve, reject, whichHardware, currentHardwares, searchString )
{
    $.ajax({
        type: "post",
        url: "/getSearch",
        data: JSON.stringify({
                                "hardwareList": currentHardwares,
                                "search": searchString,
                            }),
        contentType: "application/json",
        dataType: 'json',

        beforeSend: function()
        {
            $("#listLeftLoading").parent().show();
            $("#listLeft").parent().hide();
        },
    })
    .done(async (data) =>
    {
        await renderListLeft( data, whichHardware, true );

        $("#listLeftLoading").parent().hide();
        $("#listLeft").parent().show();

        resolve(data);
    })
    .fail(() =>
    {
        reject( "fail to get search list" );
    });
}

function loadSuggestion( resolve, reject, chosenHardwares )
{
    $.ajax({
        type: "post",
        url: "/getSuggestion",
        data: JSON.stringify({
                                "chosenHardwares": chosenHardwares,
                            }),
        contentType: "application/json",
        dataType: 'json',

        beforeSend: function()
        {
            $("#suggestionsLoading").show();
            $("#suggestions").hide();
        },
    })
    .done((data) =>
    {
        $( "#suggestions .text-left.card-text" ).empty();

        let suggestions = "";

        for( let i in data.suggestion )
        {
            suggestions +=
                "<div class='card mb-2 card-small d-block'>" +
                    "<div class='card-body'>" +
                        "<div class='card-text'>" +
                            data.suggestion[i].split( "\n" ).join( "<br/>") +
                        "</div>" +
                    "</div>" +
                "</div>";
        }

        if( data.suggestion.length == 0 )
        {
            suggestions += 
                "<div class='card mb-2 card-small d-block'>" +
                    "<div class='card-body'>" +
                        "<div class='card-text'>" +
                            "完全相容歐！" +
                        "</div>" +
                    "</div>" +
                "</div>";
        }

        $( "#suggestions .text-left.card-text" ).append( suggestions );

        $("#suggestionsLoading").hide();
        $("#suggestions").show();

        resolve( {'conflict': data.conflict,
                  'ramExceed': data.ramExceed,
                  'graphicExceed': data.graphicExceed,
                  'diskExceed': data.diskExceed,
                  'ramType': data.ramType,
                  'diskType': data.diskType } );
    })
    .fail(() =>
    {
        reject( "fail to get suggestion list" );
    });
}

function cpuList( data, resolve  )
{
    if( data.length == 0 )
    {
        let emptyMessage = "<div class='card mb-2 card-small px-3' style='cursor: default;' />" +
                                "<div class='card-body'>" +
                                    "<div class='card-text  text-center'>" +
                                        "沒有可用的硬體！" +
                                    "</div>" +
                                "</div>" +
                            "</div>";
        $( "#listLeft" ).append( emptyMessage );

        return;
    }

    let hardware = "";

    for( let i in data )
    {
        hardware += "<div class='card mb-2 card-small px-3' />" +
                    "<div class='card-body'>" +
                        "<div class='card-text'>" +
                            "<table class='table table-striped'>" +
                                "<thead>" +
                                    "<tr class='row'>" +
                                        "<th scope='col' colspan='2'>" +
                                            "<h4>" + data[i].name + "</h4>" +
                                        "</th>" +
                                    "</tr>" +
                                "</thead>" +

                                "<tbody>" +
                                    "<tr class='row'>" +
                                        "<th class='col-6'>價位</th>" +
                                        "<td class='col-6'>n/a</td>" +
                                    "</tr>" +
                                    "<tr class='row'>" +
                                        "<th class='col-6'>腳位</th>" +
                                        "<td class='col-6'>" + data[i].pin + "</td>" +
                                    "</tr>" +
                                    "<tr class='row'>" +
                                        "<th class='col-6'>核心數</th>" +
                                        "<td class='col-6'>" + ((data[i].cores == 999) ? "n/a" : data[i].cores) + "</td>" +
                                    "</tr>" +
                                    "<tr class='row'>" +
                                        "<th class='col-6'>線程數</th>" +
                                        "<td class='col-6'>" + ((data[i].threads == 999) ? "n/a" : data[i].threads) + "</td>" +
                                    "</tr>" +
                                    "<tr class='row'>" +
                                        "<th class='col-6'>基礎頻率</th>" +
                                        "<td class='col-6'>" + data[i].frequency + "GHz</td>" +
                                    "</tr>" +
                                    "<tr class='row'>" +
                                        "<th class='col-6'>boots頻率</th>" +
                                        "<td class='col-6'>" + (data[i].turboBoost == 'n/a' ? "n/a" : data[i].turboBoost + "GHz") + "</td>" +
                                    "</tr>" +
                                    "<tr class='row'>" +
                                        "<th class='col-6'>最大記憶體容量</th>" +
                                        "<td class='col-6'>" + ((data[i].ramMaximumSupport == 999) ? "n/a" : data[i].ramMaximumSupport + "GB") + "</td>" +
                                    "</tr>" +
                                    "<tr class='row'>" +
                                        "<th class='col-6'>記憶體代數</th>" +
                                        "<td class='col-6'>" + data[i].ramGenerationSupport + "</td>" +
                                    "</tr>" +
                                    "<tr class='row'>" +
                                        "<th class='col-6'>內顯</th>" +
                                        "<td class='col-6'>" + data[i].internalGraphic + "</td>" +
                                    "</tr>" +
                                    "<tr class='row'>" +
                                        "<th class='col-6'>TDP</th>" +
                                        "<td class='col-6'>n/a</td>" +
                                    "</tr>" +
                                "</tbody>" +
                            "</table>" +
                        "</div>" +
                    "</div>" +
                "</div>";
    }
    $( "#listLeft" ).append(hardware);
    $( "#listLeft .card-small").click(function(){clickListLeft(this)});

    resolve(0);
}

function coolerList( data , resolve )
{
    if( data.length == 0 )
    {
        let emptyMessage = "<div class='card mb-2 card-small px-3' style='cursor: default;' />" +
                                "<div class='card-body'>" +
                                    "<div class='card-text  text-center'>" +
                                        "沒有可用的硬體！" +
                                    "</div>" +
                                "</div>" +
                            "</div>";
        $( "#listLeft" ).append( emptyMessage );

        return;
    }

    let hardware = "";

    for( let i in data )
    {
        hardware += "<div class='card mb-2 card-small px-3' />" +
                        "<div class='card-body'>" +
                            "<div class='card-text'>" +
                                "<table class='table table-striped'>" +
                                    "<thead>" +
                                        "<tr class='row'>" +
                                            "<th scope='col' colspan='2'>" +
                                                "<h4>" + data[i].name + "</h4>" +
                                            "</th>" +
                                        "</tr>" +
                                    "</thead>" +

                                    "<tbody>" +
                                        "<tr class='row'>" +
                                            "<th class='col-6'>價位</th>" +
                                            "<td class='col-6'>n/a</td>" +
                                        "</tr>" +
                                        "<tr class='row'>" +
                                            "<th class='col-6'>高度</th>" +
                                            "<td class='col-6'>" + ((data[i].height == 999) ? "n/a" : data[i].height + "cm") + "</td>" +
                                        "</tr>" +
                                    "</tbody>" +
                                "</table>" +
                            "</div>" +
                        "</div>" +
                    "</div>";
    }
    $( "#listLeft" ).append(hardware);
    $( "#listLeft .card-small").click(function(){clickListLeft(this)});

    resolve(0);
}

function mbList( data , resolve )
{
    if( data.length == 0 )
    {
        let emptyMessage = "<div class='card mb-2 card-small px-3' style='cursor: default;' />" +
                                "<div class='card-body'>" +
                                    "<div class='card-text  text-center'>" +
                                        "沒有可用的硬體！" +
                                    "</div>" +
                                "</div>" +
                            "</div>";
        $( "#listLeft" ).append( emptyMessage );

        return;
    }

    let hardware = "";

    for( let i in data )
    {
        hardware += "<div class='card mb-2 card-small px-3' />" +
                        "<div class='card-body'>" +
                            "<div class='card-text'>" +
                                "<table class='table table-striped'>" +
                                    "<thead>" +
                                        "<tr class='row'>" +
                                            "<th scope='col' colspan='2'>" +
                                                "<h4>" + data[i].name + "</h4>" +
                                            "</th>" +
                                        "</tr>" +
                                    "</thead>" +

                                    "<tbody>" +
                                        "<tr class='row'>" +
                                            "<th class='col-6'>價位</th>" +
                                            "<td class='col-6'>n/a</td>" +
                                        "</tr>" +
                                        "<tr class='row'>" +
                                            "<th class='col-6'>大小</th>" +
                                            "<td class='col-6'>" + data[i].size + "</td>" +
                                        "</tr>" +
                                        "<tr class='row'>" +
                                            "<th class='col-6'>腳位</th>" +
                                            "<td class='col-6'>" + data[i].pin + "</td>" +
                                        "</tr>" +
                                        "<tr class='row'>" +
                                            "<th class='col-6'>PCIe接口數</th>" +
                                            "<td class='col-6'>" + ((data[i].pcieQuantity == 999) ? "n/a" : data[i].pcieQuantity) + "</td>" +
                                        "</tr>" +
                                        "<tr class='row'>" +
                                            "<th class='col-6'>記憶體插槽數</th>" +
                                            "<td class='col-6'>" + ((data[i].ramQuantity == 999) ? "n/a" : data[i].ramQuantity) + "</td>" +
                                        "</tr>" +
                                        "<tr class='row'>" +
                                            "<th class='col-6'>記憶體代數</th>" +
                                            "<td class='col-6'>" + data[i].ramType + "</td>" +
                                        "</tr>" +
                                        "<tr class='row'>" +
                                            "<th class='col-6'>最大記憶體容量</th>" +
                                            "<td class='col-6'>" + ((data[i].ramMaximum == 999) ? "n/a" : data[i].ramMaximum + "GB") + "</td>" +
                                        "</tr>" +
                                        "<tr class='row'>" +
                                            "<th class='col-6'>SATA3接口數</th>" +
                                            "<td class='col-6'>" + ((data[i].sata3Quantity == 999) ? "n/a" : data[i].sata3Quantity) + "</td>" +
                                        "</tr>" +
                                        "<tr class='row'>" +
                                            "<th class='col-6'>M.2類型</th>" +
                                            "<td class='col-6'>" + data[i].m2Type + "</td>" +
                                        "</tr>" +
                                        "<tr class='row'>" +
                                            "<th class='col-6'>M.2接口數</th>" +
                                            "<td class='col-6'>" + ((data[i].m2Quantity == 999) ? "n/a" : data[i].m2Quantity) + "</td>" +
                                        "</tr>" +
                                    "</tbody>" +
                                "</table>" +
                            "</div>" +
                        "</div>" +
                    "</div>";
    }
    $( "#listLeft" ).append(hardware);
    $( "#listLeft .card-small").click(function(){clickListLeft(this)});

    resolve(0);
}

function ramList( data , resolve )
{
    if( data.length == 0 )
    {
        let emptyMessage = "<div class='card mb-2 card-small px-3' style='cursor: default;' />" +
                                "<div class='card-body'>" +
                                    "<div class='card-text  text-center'>" +
                                        "沒有可用的硬體！" +
                                    "</div>" +
                                "</div>" +
                            "</div>";
        $( "#listLeft" ).append( emptyMessage );

        return;
    }

    let hardware = "";

    for( let i in data )
    {
        hardware += "<div class='card mb-2 card-small px-3' />" +
                        "<div class='card-body'>" +
                            "<div class='card-text'>" +
                                "<table class='table table-striped'>" +
                                    "<thead>" +
                                        "<tr class='row'>" +
                                            "<th scope='col' colspan='2'>" +
                                                "<h4>" + data[i].name + "</h4>" +
                                            "</th>" +
                                        "</tr>" +
                                    "</thead>" +

                                    "<tbody>" +
                                        "<tr class='row'>" +
                                            "<th class='col-6'>價位</th>" +
                                            "<td class='col-6'>n/a</td>" +
                                        "</tr>" +
                                        "<tr class='row'>" +
                                            "<th class='col-6'>記憶體代數</th>" +
                                            "<td class='col-6'>" + data[i].ramType + "</td>" +
                                        "</tr>" +
                                        "<tr class='row'>" +
                                            "<th class='col-6'>記憶體容量</th>" +
                                            "<td class='col-6'>" + ((data[i].capacity == 999) ? "n/a" : data[i].capacity + "GB") + "</td>" +
                                        "</tr>" +
                                    "</tbody>" +
                                "</table>" +
                            "</div>" +
                        "</div>" +
                    "</div>";
    }
    $( "#listLeft" ).append(hardware);
    $( "#listLeft .card-small").click(function(){clickListLeft(this)});

    resolve(0);
}

function diskList( data , resolve )
{
    if( data.length == 0 )
    {
        let emptyMessage = "<div class='card mb-2 card-small px-3' style='cursor: default;' />" +
                                "<div class='card-body'>" +
                                    "<div class='card-text  text-center'>" +
                                        "沒有可用的硬體！" +
                                    "</div>" +
                                "</div>" +
                            "</div>";
        $( "#listLeft" ).append( emptyMessage );

        return;
    }

    let hardware = "";

    for( let i in data )
    {
        hardware += "<div class='card mb-2 card-small px-3' />" +
                        "<div class='card-body'>" +
                            "<div class='card-text'>" +
                                "<table class='table table-striped'>" +
                                    "<thead>" +
                                        "<tr class='row'>" +
                                            "<th scope='col' colspan='2'>" +
                                                "<h4>" + data[i].name + "</h4>" +
                                            "</th>" +
                                        "</tr>" +
                                    "</thead>" +

                                    "<tbody>" +
                                        "<tr class='row'>" +
                                            "<th class='col-6'>價位</th>" +
                                            "<td class='col-6'>n/a</td>" +
                                        "</tr>" +
                                        "<tr class='row'>" +
                                            "<th class='col-6'>類型</th>" +
                                            "<td class='col-6'>" + data[i].size + ((data[i].size == 'm.2') ? " " : "吋 ") + data[i].diskType + "</td>" +
                                        "</tr>" +
                                        "<tr class='row'>" +
                                            "<th class='col-6'>容量</th>" +
                                            "<td class='col-6'>" + ((data[i].capacity < 1000) ? (data[i].capacity + "GB") : (data[i].capacity / 1000 + "TB") ) + "</td>" +
                                        "</tr>" +
                                    "</tbody>" +
                                "</table>" +
                            "</div>" +
                        "</div>" +
                    "</div>";
    }
    $( "#listLeft" ).append(hardware);
    $( "#listLeft .card-small").click(function(){clickListLeft(this)});

    resolve(0);
}

function graphicList( data , resolve )
{
    if( data.length == 0 )
    {
        let emptyMessage = "<div class='card mb-2 card-small px-3' style='cursor: default;' />" +
                                "<div class='card-body'>" +
                                    "<div class='card-text  text-center'>" +
                                        "沒有可用的硬體！" +
                                    "</div>" +
                                "</div>" +
                            "</div>";
        $( "#listLeft" ).append( emptyMessage );

        return;
    }

    let hardware = "";

    for( let i in data )
    {
        hardware += "<div class='card mb-2 card-small px-3' />" +
                        "<div class='card-body'>" +
                            "<div class='card-text'>" +
                                "<table class='table table-striped'>" +
                                    "<thead>" +
                                        "<tr class='row'>" +
                                            "<th scope='col' colspan='2'>" +
                                                "<h4>" + data[i].name + "</h4>" +
                                            "</th>" +
                                        "</tr>" +
                                    "</thead>" +

                                    "<tbody>" +
                                        "<tr class='row'>" +
                                            "<th class='col-6'>價位</th>" +
                                            "<td class='col-6'>n/a</td>" +
                                        "</tr>" +
                                        "<tr class='row'>" +
                                            "<th class='col-6'>長度</th>" +
                                            "<td class='col-6'>" + ((data[i].length == 999) ? "n/a" : data[i].length + "cm") + "</td>" +
                                        "</tr>" +
                                        "<tr class='row'>" +
                                            "<th class='col-6'>TDP</th>" +
                                            "<td class='col-6'>n/a</td>" +
                                        "</tr>" +
                                    "</tbody>" +
                                "</table>" +
                            "</div>" +
                        "</div>" +
                    "</div>";
    }
    $( "#listLeft" ).append(hardware);
    $( "#listLeft .card-small").click(function(){clickListLeft(this)});

    resolve(0);
}

function powerList( data , resolve )
{
    if( data.length == 0 )
    {
        let emptyMessage = "<div class='card mb-2 card-small px-3' style='cursor: default;' />" +
                                "<div class='card-body'>" +
                                    "<div class='card-text  text-center'>" +
                                        "沒有可用的硬體！" +
                                    "</div>" +
                                "</div>" +
                            "</div>";
        $( "#listLeft" ).append( emptyMessage );

        return;
    }

    let hardware = "";

    for( let i in data )
    {
        hardware += "<div class='card mb-2 card-small px-3' />" +
                        "<div class='card-body'>" +
                            "<div class='card-text'>" +
                                "<table class='table table-striped'>" +
                                    "<thead>" +
                                        "<tr class='row'>" +
                                            "<th scope='col' colspan='2'>" +
                                                "<h4>" + data[i].name + "</h4>" +
                                            "</th>" +
                                        "</tr>" +
                                    "</thead>" +

                                    "<tbody>" +
                                        "<tr class='row'>" +
                                            "<th class='col-6'>價位</th>" +
                                            "<td class='col-6'>n/a</td>" +
                                        "</tr>" +
                                        "<tr class='row'>" +
                                            "<th class='col-6'>長度</th>" +
                                            "<td class='col-6'>" + ((data[i].length == 999) ? "n/a" : data[i].length + "cm") + "</td>" +
                                        "</tr>" +
                                        "<tr class='row'>" +
                                            "<th class='col-6'>瓦數</th>" +
                                            "<td class='col-6'>" + ((data[i].watts == 999) ? "n/a" : data[i].watts + "W") + "</td>" +
                                        "</tr>" +
                                        "<tr class='row'>" +
                                            "<th class='col-6'>大小</th>" +
                                            "<td class='col-6'>" + data[i].size + "</td>" +
                                        "</tr>" +
                                    "</tbody>" +
                                "</table>" +
                            "</div>" +
                        "</div>" +
                    "</div>";
    }
    $( "#listLeft" ).append(hardware);
    $( "#listLeft .card-small").click(function(){clickListLeft(this)});

    resolve(0);
}

function crateList( data , resolve )
{if( data.length == 0 )
    {
        let emptyMessage = "<div class='card mb-2 card-small px-3' style='cursor: default;' />" +
                                "<div class='card-body'>" +
                                    "<div class='card-text  text-center'>" +
                                        "沒有可用的硬體！" +
                                    "</div>" +
                                "</div>" +
                            "</div>";
        $( "#listLeft" ).append( emptyMessage );

        return;
    }

    let hardware = "";

    for( let i in data )
    {
        hardware += "<div class='card mb-2 card-small px-3' />" +
                        "<div class='card-body'>" +
                            "<div class='card-text'>" +
                                "<table class='table table-striped'>" +
                                    "<thead>" +
                                        "<tr class='row'>" +
                                            "<th scope='col' colspan='2'>" +
                                                "<h4>" + data[i].name + "</h4>" +
                                            "</th>" +
                                        "</tr>" +
                                    "</thead>" +

                                    "<tbody>" +
                                        "<tr class='row'>" +
                                            "<th class='col-6'>價位</th>" +
                                            "<td class='col-6'>n/a</td>" +
                                        "</tr>" +
                                        "<tr class='row'>" +
                                            "<th class='col-6'>支援的主機板大小</th>" +
                                            "<td class='col-6'>" + data[i].mbSize + "</td>" +
                                        "</tr>" +
                                        "<tr class='row'>" +
                                            "<th class='col-6'>支援的顯卡長度</th>" +
                                            "<td class='col-6'>" + ((data[i].vgaLength == 999) ? "n/a" : data[i].vgaLength + "cm") + "</td>" +
                                        "</tr>" +
                                        "<tr class='row'>" +
                                            "<th class='col-6'>支援的電源大小</th>" +
                                            "<td class='col-6'>" + data[i].psuSize + "</td>" +
                                        "</tr>" +
                                        "<tr class='row'>" +
                                            "<th class='col-6'>支援的電源長度</th>" +
                                            "<td class='col-6'>n/a</td>" +
                                        "</tr>" +
                                        "<tr class='row'>" +
                                            "<th class='col-6'>支援的散熱器高度</th>" +
                                            "<td class='col-6'>" + ((data[i].coolerHeight == 999) ? "n/a" : data[i].coolerHeight + "cm") + "</td>" +
                                        "</tr>" +
                                        "<tr class='row'>" +
                                            "<th class='col-6'>3.5吋硬碟架數量</th>" +
                                            "<td class='col-6'>" + ((data[i].diskQuantity == 999) ? "n/a" : data[i].diskQuantity) + "</td>" +
                                        "</tr>" +
                                    "</tbody>" +
                                "</table>" +
                            "</div>" +
                        "</div>" +
                    "</div>";
    }
    $( "#listLeft" ).append(hardware);
    $( "#listLeft .card-small").click(function(){clickListLeft(this)});

    resolve(0);
}

function renderListLeft( data, whichHardware, search )
{
    return new Promise((resolve, reject) => {
            
        $( "#listLeft" ).empty();

        switch( whichHardware )
        {
            case "cpu":
                if( search )
                    cpuList( data, resolve );
                else
                    cpuList( data.cpuList , resolve);
                break;
                
            case "cooler":
                if( search )
                    coolerList( data, resolve );
                else
                    coolerList( data.coolerList , resolve);
                break;

            case "motherBoard":
                if( search )
                    mbList( data, resolve );
                else
                    mbList( data.mbList , resolve);
                break;
                
            case "ram":
                if( search )
                    ramList( data, resolve );
                else
                    ramList( data.ramList , resolve);
                break;

            case "disk":
                if( search )
                    diskList( data, resolve );
                else
                    diskList( data.diskList , resolve);
                break;
                
            case "graphic":
                if( search )
                    graphicList( data, resolve );
                else
                    graphicList( data.graphicList , resolve);
                break;

            case "power":
                if( search )
                    powerList( data, resolve );
                else
                    powerList( data.powerList , resolve);
                break;
                
            case "crate":
                if( search )
                    crateList( data, resolve );
                else
                    crateList( data.crateList , resolve);
                break;
        }

        resolve(1);
    })
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

$('form').submit(function(e){
    e.preventDefault();
});