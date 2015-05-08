var map = AmCharts.makeChart( "chartdiv", {

  "type": "map",
  "theme": "dark",
  "pathToImages": "http://www.amcharts.com/lib/3/images/",

  "areasSettings": {
    "unlistedAreasColor": "#000000",
    "autoZoom": true,
    "selectedColor": "green"
  },
  "smallMap": {}
} );

var dataProvider = {
    mapVar: AmCharts.maps.worldLow,
    getAreasFromMap: true,
    areas: AmCharts.maps.worldLow.svg.g.path
}
map.dataProvider = dataProvider;

var areaIndex = {};

var quarter = 0;

var data = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16];

function updateMap() {

  tag = "java";
  var quarterData = data[quarter];
  var tagData = quarterData[tag];
  var countries = Object.keys(tagData);
  map.dataProvider.areas = [];
  var newAreas = AmCharts.maps.worldLow.svg.g.path;
  for(var i = 0; i < countries.length; i++) {
    var countryCode = countries[i];
    var ki = tagData[countryCode];
    var areaId = areaIndex[countryCode];
    var area = newAreas[areaId];
    if(area) {
      colorArea(area, ki);
    }
  }
  quarter++;
  map.dataProvider.areas = newAreas;
  map.validateData();
}


function colorArea(area, ki) {
  if(ki < 0.001) {
    area.color = "#CCEBD6";
  }
  else if(ki < 0.01) {
    area.color = "#80CC99";
  }
  else if(ki < 0.1) {
    area.color = "#4DB870";
  }
  else {
    area.color = "#007A29";
  }
}

function constructAreaIndex() {
  for(var a = 0; a < map.dataProvider.areas.length; a++) {
    var code = map.dataProvider.areas[a].id;
    areaIndex[code] = a;
  }
}

/*function getAreaIndex(code) {
  for(var x in cacheArea) {
        var area = cacheArea[x];
        if(code == area.id) {
          return x;
        }
    }
}*/

constructAreaIndex();