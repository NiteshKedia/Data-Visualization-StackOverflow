var ki_data = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16];
var cacheArea = AmCharts.maps.worldLow.svg.g.path;
var selectedCell = -1;
var isCellSelected = false;
var curQuarter = -1;
var curTag = "";
var prevTag = "";
var selectedColor = "#F28005";
var backgroundColor = "#4595CB";

var highColor = "#007600";
var medColor = "#199E19";
var lowColor = "#66BE66";
var vLowColor = "#B2DFB2";

function createKiMap(quarter, tag) {

  	curQuarter = quarter;
  	curTag = tag;
  	if(prevTag != curTag) {
    	isCellSelected = false;
    	selectedCell = -1;
  	}
  	prevTag = curTag;
  	var parent = document.getElementById("mapbody");
	var old = document.getElementById("chartTable");
	if(old) {
		parent.removeChild(old);
	}
	var mapTable = document.createElement("table");
	mapTable.style.width = "865px";
	mapTable.style.height = "500px";
	mapTable.id = "chartTable";
	mapTable.style.backgroundColor = backgroundColor;

	var mapCol = document.createElement("td");
	mapCol.style.width = "730px";
	mapCol.style.height = "500px";

	var mapDiv = document.createElement("div");
	mapDiv.style.width = "730px";
	mapDiv.style.height = "500px";
	mapDiv.id = "chart";

	var mapLegendCol = document.createElement("td");
	mapLegendCol.style.width = "135px";
	mapLegendCol.style.height = "500px";

	var newLegend = createLegend();
	var legendTextContainer = document.createElement("div");
	legendTextContainer.style.fontSize = "75%";
	legendTextContainer.style.fontStyle = "italic";
	legendTextContainer.style.color = "#3C453B";
	var legendText = document.createTextNode("*click color to select");
	legendTextContainer.appendChild(legendText);

	mapCol.appendChild(mapDiv);
	mapTable.appendChild(mapCol);
	mapLegendCol.appendChild(newLegend);
	mapLegendCol.appendChild(legendTextContainer);
	mapTable.appendChild(mapLegendCol);

	parent.appendChild(mapTable);
	AmCharts.ready(createMap(quarter - 1 , tag));
}

function createLegend() {
  var legendTable = document.createElement("table");
  var width = "125px";
  var height = "140px";
  legendTable.width = width;
  legendTable.height = height;

  // first row - HIGH
  var highRow = document.createElement("tr");
  var highCol = document.createElement("td");
  highCol.width = "45%";
  highCol.style.backgroundColor = highColor;
  highCol.onclick = function() { cellSelected(1); };
  highCol.hover = function() { alert("High hovered"); };
  if(selectedCell == 1) {
    //highCol.style.border = "1px solid " + selectedColor;
    highCol.style.border = "1px solid black";
    highCol.style.backgroundColor = selectedColor;
  }
  var highColText = document.createElement("td");
  highColText.style.padding = "2px";
  var highText = document.createTextNode("High");
  highColText.appendChild(highText);

  highRow.appendChild(highCol);
  highRow.appendChild(highColText);
  legendTable.appendChild(highRow);

  // second row - MEDIUM
  var medRow = document.createElement("tr");
  var medCol = document.createElement("td");
  medCol.width = "45%";
  medCol.style.backgroundColor = medColor;
  medCol.onclick = function() { cellSelected(2); };
  if(selectedCell == 2) {
    //medCol.style.border = "1px solid " + selectedColor;
    medCol.style.border = "1px solid black";
    medCol.style.backgroundColor = selectedColor;
  }
  var medColText = document.createElement("td");
  medColText.style.padding = "2px";
  var medText = document.createTextNode("Medium");
  medColText.appendChild(medText);

  medRow.appendChild(medCol);
  medRow.appendChild(medColText);
  legendTable.appendChild(medRow);

  // third row - Low
  var lowRow = document.createElement("tr");
  var lowCol = document.createElement("td");
  lowCol.width = "45%";
  lowCol.style.backgroundColor = lowColor;
  lowCol.onclick = function() { cellSelected(3); };
  if(selectedCell == 3) {
    //lowCol.style.border = "1px solid " + selectedColor;
    lowCol.style.border = "1px solid black";
    lowCol.style.backgroundColor = selectedColor;
  }
  var lowColText = document.createElement("td");
  lowColText.style.padding = "2px";
  var lowText = document.createTextNode("Low");
  lowColText.appendChild(lowText);

  lowRow.appendChild(lowCol);
  lowRow.appendChild(lowColText);
  legendTable.appendChild(lowRow);

  // fourth row - very low
  var vLowRow = document.createElement("tr");
  var vLowCol = document.createElement("td");
  vLowCol.width = "45%";
  vLowCol.style.backgroundColor = vLowColor;
  vLowCol.onclick = function() { cellSelected(4); };
  if(selectedCell == 4) {
    //vLowCol.style.border = "1px solid " + selectedColor;
    vLowCol.style.border = "1px solid black";
    vLowCol.style.backgroundColor = selectedColor;
  }
  var vLowColText = document.createElement("td");
  vLowColText.style.padding = "2px";
  var vLowText = document.createTextNode("Very Low");
  vLowColText.appendChild(vLowText);

  vLowRow.appendChild(vLowCol);
  vLowRow.appendChild(vLowColText);
  legendTable.appendChild(vLowRow);

  // fifth row - no data
  var noDataRow = document.createElement("tr");
  var noDataCol = document.createElement("td");
  noDataCol.width = "45%";
  noDataCol.style.backgroundColor = "#FFFFFF";
  noDataCol.onclick = function() { cellSelected(5); };
  if(selectedCell == 5) {
    //noDataCol.style.border = "1px solid " + selectedColor;
    noDataCol.style.border = "1px solid black";
    noDataCol.style.backgroundColor = selectedColor;
  }
  var noDataColText = document.createElement("td");
  noDataColText.style.padding = "2px";
  var noDataText = document.createTextNode("No Data");
  noDataColText.appendChild(noDataText);

  noDataRow.appendChild(noDataCol);
  noDataRow.appendChild(noDataColText);
  legendTable.appendChild(noDataRow);

  /*var legendTextRow = document.createElement("tr");
  legendTextRow.width = "125px";
  var legendText = document.createTextNode("*click on a color to select");
  legendTextRow.appendChild(legendText);

  legendTable.appendChild(legendTextRow);*/

  return legendTable;
}

function cellSelected(cellNumber) {
  if(selectedCell == cellNumber) {
    isCellSelected = false;
    selectedCell = -1;
  }
  else {
    isCellSelected = true;
    selectedCell = cellNumber;
  }
  //alert(isCellSelected + ":: " + selectedCell);
  createKiMap(curQuarter, curTag);
}

function createMap(quarter, tag) {
	AmCharts.theme = AmCharts.themes.dark;
	var map = new AmCharts.AmMap();
  map.pathToImages = "http://www.amcharts.com/lib/3/images/";

  map.zoomOnDoubleClick = false;
  map.backgroundColor = backgroundColor;
  map.backgroundAlpha = 1;

	var dataProvider = {
		mapVar: AmCharts.maps.worldLow,
		getAreasFromMap: true,
		areas: []
	}
	map.dataProvider = dataProvider;

	var quarterData = ki_data[quarter];
	var tagData = quarterData[tag];
	var countries = Object.keys(tagData);
	newAreas = AmCharts.maps.worldLow.svg.g.path;
  for(var i = 0; i < newAreas.length; i++) {
    var area = newAreas[i];
    var countryCode = area.id;
    var tmp = tagData[countryCode];
    var ki = 0;
    if(tmp) {
      ki = tmp;
    }
    if(area) {
        colorArea(area, ki);
    }
  }
	/*for(var i = 0; i < countries.length; i++) {
  	var countryCode = countries[i];
  	var ki = tagData[countryCode];
  	var areaId = getAreaIndex(countryCode);
  	var area = newAreas[areaId];
  	if(area) {
    		colorArea(area, ki);
  	}
	}*/
	map.dataProvider.areas = newAreas;
	map.write("chart");
}

function colorArea(area, ki) {
  if(ki == 0) {
    if(selectedCell == 5) {
      area.color = selectedColor;
    } else {
      area.color = "#FFFFFF";
    }
  }
  else if(ki < 0.001) {
    if(selectedCell == 4) {
      area.color = selectedColor;
    } else {
      area.color = vLowColor;
    }
  }
  else if(ki < 0.01) {
    if(selectedCell == 3) {
      area.color = selectedColor;
    } else {
      area.color = lowColor;
    }
  }
  else if(ki < 0.25) {
    if(selectedCell == 2) {
      area.color = selectedColor;
    } else {
      area.color = medColor;
    }
  }
  else {
    if(selectedCell == 1) {
      area.color = selectedColor;
    } else {
      area.color = highColor;
    }
  }
}

function getAreaIndex(code) {
  for(var x in cacheArea) {
        var area = cacheArea[x];
        if(code == area.id) {
          return x;
        }
    }
}