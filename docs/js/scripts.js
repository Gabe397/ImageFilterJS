var file = document.getElementById('csv').files[0];

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

function fileContentIntoVar(file){

    return new Promise(function(resolve,reject) {
        var reader = new FileReader();
        reader.onload = function (){

            let results = reader.result;
            resolve(results);


        };

        reader.readAsText(document.getElementById('csv').files[0]);

    });

}

function countArrays(sampleObj){
    var results = 0

    for(var prop in sampleObj)
    {
        if(sampleObj.hasOwnProperty(prop))
        {
            results++;
        }
    }

    return results;

}


function filterArray(chart,secondChart,pdfSrc,yr, sampleObj){
    let userChart = chart;
    let userSecondChart = secondChart;
    let userPdf = pdfSrc;
    let userYear = yr;

    let arrayCount = countArrays(sampleObj);


    for (i = 0; i < arrayCount; i++)
    {

        let testObj = sampleObj[i];
        let chartBool = userChart == testObj["Type of Chart"] || userChart == "All";
        let secondChartBool = userSecondChart == testObj["Secondary Type Of Chart"] || userSecondChart == "All";
        let yearBool = userYear == testObj["Year"] || userYear == "All";


        if(chartBool && secondChartBool && yearBool)
        {
            console.log(sampleObj[i]);
        }

        else{
            console.log("Not Allowed")
        }
    }


}


function application() {
    fileContentIntoVar(file).then(function (results) {
        let parsedData = Papa.parse(results,{header:true});

        let chartType = getChartType();
        let secondaryChartType = getSecondaryChartType();
        let pdf = getPDF();
        let year = getYear();
        let imgNum;

        let sampleObj = parsedData.data;

        let arrCount = countArrays(sampleObj);


        filterArray(chartType,secondaryChartType,pdf,year,sampleObj);

    });


}



