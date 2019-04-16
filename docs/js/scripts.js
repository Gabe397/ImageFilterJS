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



var file = document.getElementById('csv').files[0];


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





function filterImage() {
    fileContentIntoVar(file).then(function (results) {
        let parsedData = Papa.parse(results,{header:true});

        let chartType = getChartType();
        let secondaryChartType = getSecondaryChartType();
        let pdf = getPDF();
        let year = getYear();
        let imgNum;



        let testObj = parsedData.data[0]

    });


}

