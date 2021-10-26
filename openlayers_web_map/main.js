window.onload = init;

function init(){

    const mousePositionControl = new ol.control.MousePosition({
        //coordinateFormat: ol.coordinate.createStringXY(4),
        projection: 'EPSG:4326',
        className: 'custom-mouse-position',
        target: document.getElementById('mouse-position'),
    });
    var pt = turf.point([1067406.4915, 4132787.0588]);
    var center = turf.toWgs84(pt);
    const map = new ol.Map({
        controls: ol.control.defaults().extend([mousePositionControl]),
        view: new ol.View({
            projection: 'EPSG:4326',
            center: center.geometry.coordinates,
            zoom: 6,
           //maxZoom: 14,
           //minZoom: 8,
           //rotation: 0.5
         }),
        target: 'js-map'
    })   

    // Basemaps Layers 
    const openStreetMapStandard = new ol.layer.Tile({
        source: new ol.source.OSM(),
        visible: true,
        title: 'OSMStandard'
    })
  
    const openStreetMapHumanitarian = new ol.layer.Tile({
        source: new ol.source.OSM({
        url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'}),
        visible: false,
        title: 'OSMHumanitarian'
    })

    const stamenTerrain = new ol.layer.Tile({
        source: new ol.source.XYZ({
        url: 'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg',
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'}),
        visible: false,
        title: 'StamenTerrain'
    })

    //Layer Group
    const baseLayerGroup = new ol.layer.Group({layers: [openStreetMapStandard,  openStreetMapHumanitarian, stamenTerrain]})
    map.addLayer(baseLayerGroup);

    //Layer switcher logic for Basemaps
    const baseLayerElements = document.querySelectorAll('#layers > .form-check > input[type=radio]');
    for(let baseLayerElement of baseLayerElements){
        baseLayerElement.addEventListener('change', function(){
            let baseLayerElementValue = this.value;
            baseLayerGroup.getLayers().forEach(function(element, index, array){
                let baseLayerTitle = element.get('title');
                element.setVisible(baseLayerTitle === baseLayerElementValue);
            })	      
        })
    }

	const strokeStyle = new ol.style.Stroke({color: [46, 45, 45, 1],width: 1.5})
	
    const CountryBorders = new ol.layer.VectorImage({
        source: new ol.source.Vector({
            url:'./data/vector_data/CountryBorders.geojson',
            format: new ol.format.GeoJSON()
        }),
        visible: true,
        title:'CountryBorders',
		style: new ol.style.Style({stroke: new ol.style.Stroke({ color: [0, 0, 255, 1], width: 1.5 })})
    })
    map.addLayer(CountryBorders);
    var checkboxCountryBorders = document.querySelector('input[id="CountryBorders"]');
	checkboxCountryBorders.onchange=function(e) {
		if(checkboxCountryBorders.checked===false) {map.removeLayer(CountryBorders);}
        else{map.addLayer(CountryBorders);}
	};
    
    const AeroTMA = new ol.layer.VectorImage({
        source: new ol.source.Vector({
            url:'./data/vector_data/AeroTMA.geojson',
            format: new ol.format.GeoJSON()
        }),
        visible: true,
        title:'AeroTMA',
		style: new ol.style.Style({fill: new ol.style.Fill({color: [84, 118, 255, 0.3]}),stroke: strokeStyle,})
    })
    map.addLayer(AeroTMA);
    var checkboxAeroTMA = document.querySelector('input[id="AeroTMA"]');
	checkboxAeroTMA.onchange=function(e) {
		if(checkboxAeroTMA.checked===false) {map.removeLayer(AeroTMA);}
        else{map.addLayer(AeroTMA);}   
	};

    const AeroDanger = new ol.layer.VectorImage({
        source: new ol.source.Vector({
            url:'./data/vector_data/AeroDanger.geojson',
            format: new ol.format.GeoJSON()
        }),
        visible: true,
        title:'AeroDanger',
		style: new ol.style.Style({fill: new ol.style.Fill({color: [255, 0, 0, 0.5]}),stroke: strokeStyle,})
    })
    map.addLayer(AeroDanger);
    var checkboxAeroDanger = document.querySelector('input[id="AeroDanger"]');
	checkboxAeroDanger.onchange=function(e) {
		if(checkboxAeroDanger.checked===false) {map.removeLayer(AeroDanger);}
        else{map.addLayer(AeroDanger);}
	};

    const AeroShooting = new ol.layer.VectorImage({
        source: new ol.source.Vector({
            url:'./data/vector_data/AeroShooting.geojson',
            format: new ol.format.GeoJSON()
        }),
        visible: true,
        title:'AeroShooting',
		style: new ol.style.Style({fill: new ol.style.Fill({color: [127, 255, 0, 0.7]}),stroke: strokeStyle,})
    })
    map.addLayer(AeroShooting);
    var checkboxAeroShooting = document.querySelector('input[id="AeroShooting"]');
	checkboxAeroShooting.onchange=function(e) {
		if(checkboxAeroShooting.checked===false) {map.removeLayer(AeroShooting);}
        else{map.addLayer(AeroShooting);}
	};

    const AeroRestricted = new ol.layer.VectorImage({
        source: new ol.source.Vector({
            url:'./data/vector_data/AeroRestricted.geojson',
            format: new ol.format.GeoJSON()
        }),
        visible: true,
        title:'AeroRestricted',
		style: new ol.style.Style({fill: new ol.style.Fill({color: [255, 69, 0, 0.5]}),stroke: strokeStyle,})
    })
    map.addLayer(AeroRestricted);
    var checkboxAeroRestricted = document.querySelector('input[id="AeroRestricted"]');
	checkboxAeroRestricted.onchange=function(e) {
		if(checkboxAeroRestricted.checked===false) {map.removeLayer(AeroRestricted);}
        else{map.addLayer(AeroRestricted);}
	};

    const AeroSector = new ol.layer.VectorImage({
        source: new ol.source.Vector({
            url:'./data/vector_data/AeroSector.geojson',
            format: new ol.format.GeoJSON()
        }),
        visible: true,
        title:'AeroSector',
		style: new ol.style.Style({fill: new ol.style.Fill({color: [255, 0, 0, 0.5]}),stroke: strokeStyle,})
    })
    map.addLayer(AeroSector);
    var checkboxAeroSector = document.querySelector('input[id="AeroSector"]');
	checkboxAeroSector.onchange=function(e) {
		if(checkboxAeroSector.checked===false) {map.removeLayer(AeroSector);}
        else{map.addLayer(AeroSector);}
	};

    const AeroProhibited = new ol.layer.VectorImage({
        source: new ol.source.Vector({
            url:'./data/vector_data/AeroProhibited.geojson',
            format: new ol.format.GeoJSON()
        }),
        visible: true,
        title:'AeroProhibited',
		style: new ol.style.Style({fill: new ol.style.Fill({color: [255, 0, 0, 0.5]}),stroke: strokeStyle,})
    })
    map.addLayer(AeroProhibited);
    var checkboxAeroProhibited = document.querySelector('input[id="AeroProhibited"]');
	checkboxAeroProhibited.onchange=function(e) {
		if(checkboxAeroProhibited.checked===false) {map.removeLayer(AeroProhibited);}
        else{map.addLayer(AeroProhibited);}
	};

    // create a vector layer used for draw
    var style = new ol.style.Style({
        fill: new ol.style.Fill({color: [220, 140, 240, 0.5]}),
        stroke: new ol.style.Stroke({color: [121, 5, 149, 1],width: 3}),
        image: new ol.style.Circle({radius: 7,fill: new ol.style.Fill({color: '#ffcc33'})})
    });
    var vectorSource = new ol.source.Vector();
    var vector_layer = new ol.layer.Vector({
        source: vectorSource,
        style: style
    });
    map.addLayer(vector_layer);
      
    var drawinteraction;
    console.log(!!drawinteraction);
	var geom_liste = document.getElementById("geom_liste");
	var geom_type;
	geom_liste.addEventListener('change', function(e) {
		geom_type = geom_liste.options[geom_liste.selectedIndex].value;
		map.removeInteraction(drawinteraction);
		addDrawInteraction();
	});
	
	var reset_draw = document.getElementById("reset_draw");
	reset_draw.addEventListener('click', function(e) {
		vector_layer.getSource().clear();
        drawinteraction.setActive(false);
        geom_liste.options[0].selected=true;
	});

    var end_draw = document.getElementById("end_draw");
	end_draw.addEventListener('click', function(e) {
        drawinteraction.setActive(false);
        geom_liste.options[0].selected=true;
	});
	
    function addDrawInteraction() {
		if(geom_type!="choose"){
            let geometryFunction;
            if(geom_type==='Square'){geom_type='Circle';geometryFunction = ol.interaction.Draw.createRegularPolygon(4);
            }else if(geom_type ==='Box'){geom_type ='Circle';geometryFunction = ol.interaction.Draw.createBox();} 
			drawinteraction = new ol.interaction.Draw({source: vector_layer.getSource(),type: geom_type, geometryFunction: geometryFunction});
		}else{drawinteraction.setActive(false);}
        map.addInteraction(drawinteraction);

        drawinteraction.on('drawend', function(e){
            let parser = new ol.format.GeoJSON();
            let drawnFeatures = parser.writeFeaturesObject([e.feature]);
            console.log(drawnFeatures.features[0].geometry.coordinates);
            console.log(drawinteraction.getActive());
            if(drawnFeatures.features[0].geometry.type === "Polygon"){
                var polygon1 = turf.polygon(drawnFeatures.features[0].geometry.coordinates);
                var data = [features_json];
                var lengthdata = data[0].features.length;
                for(var i=0; i<lengthdata; ++i){    
                    var polygon2 = turf.polygon(data[0].features[i].geometry.coordinates[0]);
                    var intersect = turf.intersect(polygon1, polygon2);
                    if(Boolean(intersect)===true){alert("there is an intersection");break;}
                }  
            }

            if(drawnFeatures.features[0].geometry.type === "LineString"){
                var linestring = turf.lineString(drawnFeatures.features[0].geometry.coordinates);
                var data = [features_json];
                var lengthdata = data[0].features.length;                
                for(var i=0; i<lengthdata; ++i){
                    var polygon = turf.polygon(data[0].features[i].geometry.coordinates[0]);
                    var intersect = turf.lineIntersect(linestring, polygon);
                    if(intersect.features.length){alert("there is an intersection"); break;}
                    else{
                        var x = false;
                        for(var j=0; j<drawnFeatures.features[0].geometry.coordinates.length; ++j){
                            if(turf.inside(drawnFeatures.features[0].geometry.coordinates[j], polygon)){
                                alert("there is an intersection");x=true;break; 
                            }
                        }
                        if(x){ break; }
                    }
                }    
            }
        })
      
        // when a new feature has been drawn...
        /*drawinteraction.on('drawstart', function(evt) {
          var feature = evt.feature;
          var geom = feature.getGeometry();
          document.addEventListener('keyup', function() {
            if (event.keyCode === 27) {
              if (geom.getType() === "LineString") {
                var coords = geom.getCoordinates();
                var len = coords.length;
                console.log("undo");
                if (len > 1) {
                 geom.setCoordinates(geom.getCoordinates().slice(0, len - 1));
                }
              }
            }
          });
        });*/
        
        // when a new feature has been drawn...
        /*draw_interaction.on('drawend', function(event) {
          // create a unique id
          // it is later needed to delete features
          var id = uid();
          // give the feature his id
          event.feature.setId(id);
        });*/
    }

    function geoFindMe() {
		function success(position) {
			const latitude  = position.coords.latitude;
			const longitude = position.coords.longitude;
            const startMarker = new ol.Feature({type: 'icon',geometry: new ol.geom.Point([longitude, latitude]),});
            const vectorLayer = new ol.layer.Vector({
                source: new ol.source.Vector({features: [startMarker],}),
                style: new ol.style.Style({image: new ol.style.Icon({anchor: [0.5, 1],src: 'data/icon.png',}),})
            });
            map.addLayer(vectorLayer);
			map.getView().setCenter([longitude, latitude]);
			map.getView().setZoom(10);
		}

		function error() {alert('Unable to retrieve your location');}
		if (!navigator.geolocation) {alert('Geolocation is not supported by your browser');}
        else {navigator.geolocation.getCurrentPosition(success, error);}
	}
	document.querySelector('#find-me').addEventListener('click', geoFindMe);

    var i =0;var id_long_input;var id_lat_input;var tabcoord=new Array();
    
    map.on('click', function(e){ 
        if(i){          
            const longpt = document.getElementById(id_long_input);
            const latpt = document.getElementById(id_lat_input);
            longpt.value = e.coordinate[0];
            latpt.value = e.coordinate[1]; 
        }
    });

    function draw_manual()  {
        if(!!drawinteraction){if(drawinteraction.getActive()==true){drawinteraction.setActive(false);}}
        i=1;
        id_long_input = 'longpt'+i;
        id_lat_input = 'latpt'+i;
        if(document.getElementById("draw_manual").style.width === ""){
            document.getElementById("zones").style.width = "";
            document.getElementById("layers").style.width = "";
            document.getElementById("draw").style.width = "";
            document.getElementById("draw_manual").style.width = "30vw";
        }
        else{document.getElementById("draw_manual").style.width = "";}
    }
    document.querySelector('#manual').addEventListener('click', draw_manual);

    function add_div(){
        if(i<4){
            if(document.getElementById(id_long_input).value==""  || document.getElementById(id_lat_input).value==""){alert("empty field exist");}
            else{
                i++;
                var div = document.getElementById('input_points');		
                var new_div = document.createElement("div");
                new_div.className = 'x form-group';
                var x = '<br><input type="text" id="longpt'
                x +=i;
                x+='" class="form-control form-control-sm" placeholder="longitude"><input type="text" id="latpt';
                x +=i;
                x+='" class="form-control form-control-sm" placeholder="latitude">';
                new_div.innerHTML += x;
                div.appendChild(new_div);   
                id_long_input = 'longpt'+i;
                id_lat_input = 'latpt'+i;  
            }
        }
    }
    document.querySelector('#add-div').addEventListener('click', add_div);

    function draw2(){
        for(var j=1; j<=i; ++j){
            id_long_input = 'longpt'+j;
            id_lat_input = 'latpt'+j;
            if(document.getElementById(id_long_input).value==""  || document.getElementById(id_lat_input).value==""){     
                tabcoord=[];alert('empty field exist');break;
            }else{
                var pt = new Array();
                pt[0] = parseFloat(document.getElementById(id_long_input).value);
                pt[1] = parseFloat(document.getElementById(id_lat_input).value);
                tabcoord[j-1] = pt;
            }
        }
        if(tabcoord.length){
            var geom_liste = document.getElementById("geom_liste2");
            var geom_type = geom_liste.options[geom_liste.selectedIndex].value;
            if(geom_type=="choose"){alert('choose geometry');}
            else{
                if(geom_type=="LineString"){
                    var featureLine = new ol.Feature({geometry: new ol.geom.LineString(tabcoord)});
                    var sourceLine = new ol.source.Vector({features: [featureLine]});
                    var vectorLine = new ol.layer.Vector({source: sourceLine,style : style});
                    map.addLayer(vectorLine);
                }
                if(geom_type=="Polygon"){
                    var featureLine = new ol.Feature({geometry: new ol.geom.Polygon([tabcoord])});
                    var sourceLine = new ol.source.Vector({features: [featureLine]});
                    var vectorLine = new ol.layer.Vector({source: sourceLine,style : style});
                    map.addLayer(vectorLine);
                }
                creatediv();
            }
        }
    }
    document.querySelector('#draw2').addEventListener('click', draw2);
    function creatediv(){
        tabcoord=[];
        i=1;
        id_long_input = 'longpt'+i;
        id_lat_input = 'latpt'+i;
        var div = document.getElementById('input_points');
        div.innerHTML = "";	
        var h5 = document.createElement("h5");
        h5.innerHTML = 'Points';
        var new_div = document.createElement("div");
        new_div.className = 'x form-group';
        var x = '<input type="text" id="longpt1" class="form-control form-control-sm" placeholder="longitude"><input type="text" id="latpt1" class="form-control form-control-sm" placeholder="latitude">';
        new_div.innerHTML += x;
        div.appendChild(h5);
        div.appendChild(new_div);
    }
    
}
