

function getChartType(){
    let chartType;

    let x = document.getElementById("chartType").selectedIndex;
    let y = document.getElementById("chartType").options;

    chartType = y[x].text;

    return chartType;

}

function getSecondaryChartType(){
    let secondChartType;

    let x = document.getElementById("secondChartType").selectedIndex;
    let y = document.getElementById("secondChartType").options;

    secondChartType = y[x].text;

    return secondChartType;

}

function getPDF(){
    let PDF;

    let x = document.getElementById("PDF").selectedIndex;
    let y = document.getElementById("PDF").options;

    PDF = y[x].text;

    return PDF;

}

function getYear(){
    let year;

    let x = document.getElementById("year").selectedIndex;
    let y = document.getElementById("year").options;

    year = y[x].text;

    return year;

}

function testAlert() {
    alert("First Chart Type is:  " + getChartType() + " " + "The Second Chart Type is "+ getSecondaryChartType()+ " "  + "The PDF is "+ getPDF()
        + " " + "The Year is "+ getYear());
}


var file = document.getElementById('csv').files[0];


function testParse(file){

    return new Promise(function(resolve,reject) {
        var reader = new FileReader();
        reader.onload = function (){

            let data = reader.result;
            resolve(data);


        };

        reader.readAsText(document.getElementById('csv').files[0]);

    });

};



function afterChosen() {
    testParse(file).then(function (data) {
        console.log(data);
    });

    console.log("after Choser Working")
}


