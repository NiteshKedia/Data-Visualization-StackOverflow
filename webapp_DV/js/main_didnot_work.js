var map;
var data = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16];
curQuarter = 0;
tag = "java";

function update(q, t) {
  curQuarter = q;
  tag = t;
  updateMap();
}

AmCharts.ready(updateMap);
function updateMap() {
  //alert("map");
  AmCharts.theme = AmCharts.themes.dark;
  map = new AmCharts.AmMap();
  map.pathToImages = "http://www.amcharts.com/lib/3/images/";

  //map.addTitle("Country Performance in Australian Open over the last 11 years", 14);
  map.areasSettings = {
    unlistedAreasColor: "#000000",
    unlistedAreasAlpha: 0.1
  };

  var dataProvider = {
    mapVar: AmCharts.maps.worldLow,
    getAreasFromMap: true,
    areas: []
  }

  map.dataProvider = dataProvider;

  map.addListener("init", function (event) {
    
    curQuarter = 0;
    tag = "java";
    var quarterData = data[curQuarter];
    var tagData = quarterData[tag];
    var countries = Object.keys(tagData);
    for(var i = 0; i < countries.length; i++) {
      var countryCode = countries[i];
      var ki = tagData[countryCode];
      var areaId = getAreaIndex(countryCode);
      var area = map.dataProvider.areas[areaId];
      if(area) {
        colorArea(area, ki);
      }
    }
    map.validateData();
  });

  map.write("chartdiv");
}

function getAreaIndex(code) {
  for(var x in map.dataProvider.areas) {
        var area = map.dataProvider.areas[x];
        if(code == area.id) {
          return x;
        }
    }
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