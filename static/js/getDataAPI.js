function getHardwareList( resolve, reject, whichHardware, chosenHardwares )
{
    $.ajax({
        type: "post",
        url: "/hardwareList",
        data: JSON.stringify({
                                "hardware": whichHardware,
                                "chosenHardwares": chosenHardwares,
                            }),
        contentType: "application/json",
        dataType: 'json',
    })
    .done((data) =>
    {
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

        resolve( hardwareList );
    })
    .fail(() =>
    {
        reject( "fail to get hardware list" );
    });
}

function cpuList( data )
{
    let hardwareList = "";

    for( let i in data )
    {
        hardwareList +=
            "<div class='card mb-2 card-small'>" +
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
                                    "<td class='col-6'>" + data[i].cores + "</td>" +
                                "</tr>" +
                                "<tr class='row'>" +
                                    "<th class='col-6'>線程數</th>" +
                                    "<td class='col-6'>" + data[i].threads + "</td>" +
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
                                    "<td class='col-6'>" + data[i].ramMaximumSupport + "GB</td>" +
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

    return hardwareList;
}

function coolerList( data )
{
    let hardwareList = "";

    for( let i in data )
    {
        hardwareList +=
            "<div class='card mb-2 card-small'>" +
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
                                    "<td class='col-6'>" + data[i].height + "cm</td>" +
                                "</tr>" +
                            "</tbody>" +
                        "</table>" +
                    "</div>" +
                "</div>" +
            "</div>";
    }

    return hardwareList;
}

function mbList( data )
{
    let hardwareList = "";

    for( let i in data )
    {
        hardwareList +=
            "<div class='card mb-2 card-small'>" +
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
                                    "<td class='col-6'>" + data[i].pcieQuantity + "</td>" +
                                "</tr>" +
                                "<tr class='row'>" +
                                    "<th class='col-6'>記憶體插槽數</th>" +
                                    "<td class='col-6'>" + data[i].ramQuantity + "</td>" +
                                "</tr>" +
                                "<tr class='row'>" +
                                    "<th class='col-6'>記憶體代數</th>" +
                                    "<td class='col-6'>" + data[i].ramType + "</td>" +
                                "</tr>" +
                                "<tr class='row'>" +
                                    "<th class='col-6'>最大記憶體容量</th>" +
                                    "<td class='col-6'>" + data[i].ramMaximum + "GB</td>" +
                                "</tr>" +
                                "<tr class='row'>" +
                                    "<th class='col-6'>SATA3接口數</th>" +
                                    "<td class='col-6'>" + data[i].sata3Quantity + "</td>" +
                                "</tr>" +
                                "<tr class='row'>" +
                                    "<th class='col-6'>M.2類型</th>" +
                                    "<td class='col-6'>" + data[i].m2Type + "</td>" +
                                "</tr>" +
                                "<tr class='row'>" +
                                    "<th class='col-6'>M.2接口數</th>" +
                                    "<td class='col-6'>" + data[i].m2Quantity + "</td>" +
                                "</tr>" +
                            "</tbody>" +
                        "</table>" +
                    "</div>" +
                "</div>" +
            "</div>";
    }

    return hardwareList;
}

function ramList( data )
{
    let hardwareList = "";

    for( let i in data )
    {
        hardwareList +=
            "<div class='card mb-2 card-small'>" +
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
                                    "<td class='col-6'>" + data[i].capacity + "GB</td>" +
                                "</tr>" +
                            "</tbody>" +
                        "</table>" +
                    "</div>" +
                "</div>" +
            "</div>";
    }

    return hardwareList;
}

function diskList( data )
{
    let hardwareList = "";

    for( let i in data )
    {
        hardwareList +=
            "<div class='card mb-2 card-small'>" +
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

    return hardwareList;
}

function graphicList( data )
{
    let hardwareList = "";

    for( let i in data )
    {
        hardwareList +=
            "<div class='card mb-2 card-small'>" +
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
                                    "<td class='col-6'>" + data[i].length + "cm</td>" +
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

    return hardwareList;
}

function powerList( data )
{
    let hardwareList = "";

    for( let i in data )
    {
        hardwareList +=
            "<div class='card mb-2 card-small'>" +
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
                                    "<td class='col-6'>" + data[i].length + "cm</td>" +
                                "</tr>" +
                                "<tr class='row'>" +
                                    "<th class='col-6'>瓦數</th>" +
                                    "<td class='col-6'>" + data[i].watts + "W</td>" +
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

    return hardwareList;
}

function crateList( data )
{
    let hardwareList = "";

    for( let i in data )
    {
        hardwareList +=
            "<div class='card mb-2 card-small'>" +
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
                                    "<td class='col-6'>" + data[i].vgaLength + "cm</td>" +
                                "</tr>" +
                                "<tr class='row'>" +
                                    "<th class='col-6'>支援的電源大小</th>" +
                                    "<td class='col-6'>" + data[i].psuSize + "</td>" +
                                "</tr>" +
                                "<tr class='row'>" +
                                    "<th class='col-6'>支援的電源長度</th>" +
                                    "<td class='col-6'>" + data[i].psuLength + "cm</td>" +
                                "</tr>" +
                                "<tr class='row'>" +
                                    "<th class='col-6'>支援的散熱器高度</th>" +
                                    "<td class='col-6'>" + data[i].coolerHeight + "cm</td>" +
                                "</tr>" +
                                "<tr class='row'>" +
                                    "<th class='col-6'>3.5吋硬碟架數量</th>" +
                                    "<td class='col-6'>" + data[i].diskQuantity + "</td>" +
                                "</tr>" +
                            "</tbody>" +
                        "</table>" +
                    "</div>" +
                "</div>" +
            "</div>";
    }

    return hardwareList;
}