function loadHardwareList( resolve, reject, whichHardware, chosenHardwares )
{
    $.ajax({
        type: "post",
        url: "/getHardwareList",
        data: JSON.stringify({
                                "hardware": whichHardware,
                                "chosenHardwares": chosenHardwares,
                            }),
        contentType: "application/json",
        dataType: 'json',

        beforeSend: function()
        {
            $( "#listLeft .card-text" ).html( "<img src='/static/img/loading.svg' alt='loading'/>");
        },
    })
    .done((data) =>
    {
        $( "#listLeft" ).empty();

        let hardwareList = "";

        switch( whichHardware )
        {
            case "cpu":
                hardwareList = cpuList( data );
                break;
                
            case "cooler":
                hardwareList = coolerList( data );
                break;

            case "motherBoard":
                hardwareList = mbList( data );
                break;
                
            case "ram":
                hardwareList = ramList( data );
                break;

            case "disk":
                hardwareList = diskList( data );
                break;
                
            case "graphic":
                hardwareList = graphicList( data );
                break;

            case "power":
                hardwareList = powerList( data );
                break;
                
            case "crate":
                hardwareList = crateList( data );
                break;
        }

        $( "#listLeft" ).append( hardwareList );

        resolve( "Successfully get hardware list" );

    })
    .fail(() =>
    {
        reject( "Fail to get hardware list" );
    });
}

function loadOriginList( resolve, reject, whichHardware )
{
    $.ajax({
        type: "post",
        url: "/getOriginList",
        data: JSON.stringify({
                                "hardware": whichHardware,
                            }),
        contentType: "application/json",
        dataType: 'json',

        beforeSend: function()
        {
            $( "#listLeft .card-text" ).html( "<img src='/static/img/loading.svg' alt='loading'/>");
        },
    })
    .done((data) =>
    {
        $( "#listLeft" ).empty();

        let hardwareList = "";

        switch( whichHardware )
        {
            case "cpu":
                hardwareList = cpuList( data );
                break;
                
            case "cooler":
                hardwareList = coolerList( data );
                break;

            case "motherBoard":
                hardwareList = mbList( data );
                break;
                
            case "ram":
                hardwareList = ramList( data );
                break;

            case "disk":
                hardwareList = diskList( data );
                break;
                
            case "graphic":
                hardwareList = graphicList( data );
                break;

            case "power":
                hardwareList = powerList( data );
                break;
                
            case "crate":
                hardwareList = crateList( data );
                break;
        }

        $( "#listLeft" ).append( hardwareList );

        resolve( "Successfully get origin list" );
    })
    .fail(() =>
    {
        reject( "fail to get origin list" );
    });
}

function loadSearch( resolve, reject, whichHardware, chosenHardwares, searchString )
{
    $.ajax({
        type: "post",
        url: "/getSearch",
        data: JSON.stringify({
                                "hardware": whichHardware,
                                "search": searchString,
                                "chosenHardwares": chosenHardwares,
                            }),
        contentType: "application/json",
        dataType: 'json',

        beforeSend: function()
        {
            $( "#listLeft .card-text" ).html( "<img src='/static/img/loading.svg' alt='loading'/>");
        },
    })
    .done((data) =>
    {
        $( "#listLeft" ).empty();

        let hardwareList = "";

        switch( whichHardware )
        {
            case "cpu":
                hardwareList = cpuList( data );
                break;
                
            case "cooler":
                hardwareList = coolerList( data );
                break;

            case "motherBoard":
                hardwareList = mbList( data );
                break;
                
            case "ram":
                hardwareList = ramList( data );
                break;

            case "disk":
                hardwareList = diskList( data );
                break;
                
            case "graphic":
                hardwareList = graphicList( data );
                break;

            case "power":
                hardwareList = powerList( data );
                break;
                
            case "crate":
                hardwareList = crateList( data );
                break;
        }

        $( "#listLeft" ).append( hardwareList );

        resolve( "Successfully get search list" );
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
            $( "#listLeft .card-text" ).html( "<img src='/static/img/loading.svg' alt='loading'/>");
        },
    })
    .done((data) =>
    {
        $( "#suggestions .card-text" ).empty();

        let suggestions = "";

        for( let i in data.suggestion )
        {
            suggestions +=
                "<div class='card mb-2 card-small d-block'>" +
                    "<div class='card-body'>" +
                        "<p class='card-text'>" +
                            data.suggestion[i].split( "\n" ).join( "<br/>") +
                        "</p>" +
                    "</div>" +
                "</div>";
        }

        if( data.suggestion.length == 0 )
        {
            suggestions += 
                "<div class='card mb-2 card-small d-block'>" +
                    "<div class='card-body'>" +
                        "<p class='card-text'>" +
                            "完全相容哦！" +
                        "</p>" +
                    "</div>" +
                "</div>";
        }

        $( "#suggestions .card-text" ).append( suggestions );

        resolve( "Successfully get suggestion list" );
    })
    .fail(() =>
    {
        reject( "fail to get suggestion list" );
    });
}

function cpuList( data )
{
    let hardware;
    let content;

    for( let i in data )
    {
        hardware = $("<div class='card mb-2 card-small px-3' />");
        
        content = "<div class='card-body'>" +
                    "<div class='card-text  text-center'>" +
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
                                    "<td class='col-6'>" + data[i].turboBoost + "GHz</td>" +
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
                "</div>";

        hardware.append(content);
        $( "#listLeft" ).append(hardware);
    }
}

function coolerList( data )
{
    let hardware;
    let content;

    for( let i in data )
    {
        hardware = $("<div class='card mb-2 card-small px-3' />");
        
        content = "<div class='card-body'>" +
                    "<div class='card-text  text-center'>" +
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
                "</div>";

        hardware.append(content);
        $( "#listLeft" ).append(hardware);
    }
}

function mbList( data )
{
    let hardware;
    let content;

    for( let i in data )
    {
        hardware = $("<div class='card mb-2 card-small px-3' />");
        
        content = "<div class='card-body'>" +
                    "<div class='card-text  text-center'>" +
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
                "</div>";

        hardware.append(content);
        $( "#listLeft" ).append(hardware);
    }
}

function ramList( data )
{
    let hardware;
    let content;

    for( let i in data )
    {
        hardware = $("<div class='card mb-2 card-small px-3' />");
        
        content = "<div class='card-body'>" +
                    "<div class='card-text  text-center'>" +
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
                "</div>";

        hardware.append(content);
        $( "#listLeft" ).append(hardware);
    }
}

function diskList( data )
{
    let hardware;
    let content;

    for( let i in data )
    {
        hardware = $("<div class='card mb-2 card-small px-3' />");
        
        content = "<div class='card-body'>" +
                    "<div class='card-text  text-center'>" +
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
                "</div>";

        hardware.append(content);
        $( "#listLeft" ).append(hardware);
    }
}

function graphicList( data )
{
    let hardware;
    let content;

    for( let i in data )
    {
        hardware = $("<div class='card mb-2 card-small px-3' />");
        
        content = "<div class='card-body'>" +
                    "<div class='card-text  text-center'>" +
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
                "</div>";

        hardware.append(content);
        $( "#listLeft" ).append(hardware);
    }
}

function powerList( data )
{
    let hardware;
    let content;

    for( let i in data )
    {
        hardware = $("<div class='card mb-2 card-small px-3' />");
        
        content = "<div class='card-body'>" +
                    "<div class='card-text  text-center'>" +
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
                "</div>";

        hardware.append(content);
        $( "#listLeft" ).append(hardware);
    }
}

function crateList( data )
{
    let hardware;
    let content;

    for( let i in data )
    {
        hardware = $("<div class='card mb-2 card-small px-3' />");
        
        content = "<div class='card-body'>" +
                    "<div class='card-text  text-center'>" +
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
                "</div>";

        hardware.append(content);
        $( "#listLeft" ).append(hardware);
    }
}