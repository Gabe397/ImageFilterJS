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
    var results = 0;

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

    let filteredArray = [];
    let arrayCount = countArrays(sampleObj);



    for (i = 0; i < arrayCount; i++)
    {

        let testObj = sampleObj[i];
        let chartBool = userChart == testObj["Type of Chart"] || userChart == "All";
        let secondChartBool = userSecondChart == testObj["Secondary Type Of Chart"] || userSecondChart == "All";
        let yearBool = userYear == testObj["Year"] || userYear == "All";
        let pdfBool = userPdf == testObj['Source PDF']||userPdf == 'All'


        if(chartBool && secondChartBool && yearBool & pdfBool)
        {
            filteredArray.push(sampleObj[i]["Image#"]);
        }

        else{
            console.log();
        }
    }


    return filteredArray;


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

        let filteredResult = filterArray(chartType,secondaryChartType,pdf,year,sampleObj);


        for(i=0; i<filteredResult.length;i++)
        {
            img_create("docs/data/ImageList/" + filteredResult[i] + ".png");
        }



    });


}

function img_create(id,src) {
    var img = document.createElement('img');
    img.src = src;
    img.setAttribute("class","img");



    document.getElementById(id).appendChild(img);
}


function link_create(id,src) {
    var link = document.createElement('a');
    link.id = id;
    link.download = id;
    link.href = src;


    document.getElementById('imgDiv').appendChild(link);
}

function update()
{
    d3.csv("docs/data/imageIndex.csv", function test(data){
        document.getElementById("imgDiv").innerHTML = "";

        let sampleObj = Array.from(data);

        let chartType = getChartType();
        let secondaryChartType = getSecondaryChartType();
        let pdf = getPDF();
        let year = getYear();


        let filteredResult = filterArray(chartType,secondaryChartType,pdf,year,sampleObj);

        for(i=0; i<filteredResult.length;i++)
        {

            link_create(filteredResult[i],"docs/data/ImageList/" + filteredResult[i] + ".png");
            img_create(filteredResult[i],"docs/data/ImageList/" + filteredResult[i] + ".png");
        }


    });

}

