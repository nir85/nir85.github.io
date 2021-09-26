window.onload = init;

function init(){

    var pt = turf.point([1060947.6923, 4152227.3563]);
    var center = turf.toWgs84(pt);
    //console.log(center.geometry.coordinates);
    const map = new ol.Map({
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


  /*const popupContainerElement = document.getElementById('popup-coordinates');
  const popup = new ol.Overlay({
    element: popupContainerElement,
    positioning: 'top-right'
  })

  map.addOverlay(popup);

  map.on('click', function(e){
    const clickedCoordinate = e.coordinate;
    popup.setPosition(undefined);
    popup.setPosition(clickedCoordinate);
    popupContainerElement.innerHTML = clickedCoordinate;
  })*/

    // Basemaps Layers 
    const openStreetMapStandard = new ol.layer.Tile({
        source: new ol.source.OSM(),
        visible: false,
        title: 'OSMStandard'
    })
  
    const openStreetMapHumanitarian = new ol.layer.Tile({
        source: new ol.source.OSM({
        url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        }),
        visible: false,
        title: 'OSMHumanitarian'
    })

    const stamenTerrain = new ol.layer.Tile({
        source: new ol.source.XYZ({
        url: 'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg',
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
        }),
        visible: true ,
        title: 'StamenTerrain'
    })

    //Layer Group
    const baseLayerGroup = new ol.layer.Group({
        layers: [
            openStreetMapStandard,  openStreetMapHumanitarian, stamenTerrain
        ]
    })

    map.addLayer(baseLayerGroup);
  /* map.on('click', function(e){
       console.log(e);
   })*/

    //Layer switcher logic for Basemaps
    const baseLayerElements = document.querySelectorAll('.sidebar > input[type=radio]');
    for(let baseLayerElement of baseLayerElements){
        baseLayerElement.addEventListener('change', function(){
            let baseLayerElementValue = this.value;
            baseLayerGroup.getLayers().forEach(function(element, index, array){
                let baseLayerTitle = element.get('title');
                element.setVisible(baseLayerTitle === baseLayerElementValue);
            })	      
        })
    }

    // Vector Layers
	
	/*const fillStyle = new ol.style.Fill({
		color: [0, 0, 0, 0]
	})*/

	const strokeStyle = new ol.style.Stroke({
		color: [46, 45, 45, 1],
		width: 1.5
	})

	/*const circleStyle = new ol.style.Circle({
		fill: new ol.style.Fill({
			color: [245, 49, 5, 1]
		}),
		radius:7,
		stroke: strokeStyle
	})*/
	
    const CountryBorders = new ol.layer.VectorImage({
        source: new ol.source.Vector({
            url:'./data/vector_data/CountryBorders.geojson',
            format: new ol.format.GeoJSON()
        }),
        visible: true,
        title:'CountryBorders',
		style: new ol.style.Style({
			//fill: new ol.style.Fill({color: [0, 0, 0, 0]}),
			stroke: new ol.style.Stroke({ color: [0, 0, 255, 1], width: 1.5 })
			//image: circleStyle
		})
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
		style: new ol.style.Style({
			fill: new ol.style.Fill({color: [84, 118, 255, 0.3]}),
			stroke: strokeStyle,
			//image: circleStyle
		})
    })
    map.addLayer(AeroTMA);
    //************************
    //*********************** */
    var checkboxAeroTMA = document.querySelector('input[id="AeroTMA"]');
	checkboxAeroTMA.onchange=function(e) {
		if(checkboxAeroTMA.checked===false) {map.removeLayer(AeroTMA);}
        else{map.addLayer(AeroTMA);}
        
	};

	//****************************
	

    //****************************

    const AeroDanger = new ol.layer.VectorImage({
        source: new ol.source.Vector({
            url:'./data/vector_data/AeroDanger.geojson',
            format: new ol.format.GeoJSON()
        }),
        visible: true,
        title:'AeroDanger',
		style: new ol.style.Style({
			fill: new ol.style.Fill({color: [255, 0, 0, 0.5]}),
			stroke: strokeStyle,
			//image: circleStyle
		})
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
		style: new ol.style.Style({
			fill: new ol.style.Fill({color: [127, 255, 0, 0.7]}),
			stroke: strokeStyle,
			//image: circleStyle
		})
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
		style: new ol.style.Style({
			fill: new ol.style.Fill({color: [255, 69, 0, 0.5]}),
			stroke: strokeStyle,
			//image: circleStyle
		})
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
		style: new ol.style.Style({
			fill: new ol.style.Fill({color: [255, 0, 0, 0.5]}),
			stroke: strokeStyle,
			//image: circleStyle
		})
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
		style: new ol.style.Style({
			fill: new ol.style.Fill({color: [255, 0, 0, 0.5]}),
			stroke: strokeStyle,
			//image: circleStyle
		})
    })
    map.addLayer(AeroProhibited);
    var checkboxAeroProhibited = document.querySelector('input[id="AeroProhibited"]');
	checkboxAeroProhibited.onchange=function(e) {
		if(checkboxAeroProhibited.checked===false) {map.removeLayer(AeroProhibited);}
        else{map.addLayer(AeroProhibited);}
	};

	//Vector Feature PopUp Logic
	const overlayContainerElement = document.querySelector('.overlay-container');
	const overlayLayer = new ol.Overlay({
		element: overlayContainerElement
	})
	
	//map.addOverlay(overlayLayer);
	
	const overlayFeatureName = document.getElementById('feature-name');
	const overlayFeatureAdditionInfo = document.getElementById('feature-additional-info');
	
	map.on('click', function(e){
		overlayLayer.setPosition(undefined);
		map.forEachFeatureAtPixel(e.pixel, function(feature,layer){
			let clickedCoordinate = e.coordinate;
			let clickedFeatureName = feature.get('zone no fly');
			let clickedFeatureAdditionalInfo = feature.get('additionalinfo');
			overlayLayer.setPosition(clickedCoordinate);
			overlayFeatureName.innerHTML = clickedFeatureName;
			overlayFeatureAdditionInfo.innerHTML = clickedFeatureAdditionalInfo;
		},
		{
			layerFilter: function(layerCandidate){
				return layerCandidate.get('title') === 'ZoneNoFly'
			
			}
		})
		
	})


    // create a vector layer used for draw
    var vector_layer = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: new ol.style.Style({
            fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: [245, 49, 5, 1],
                width: 3
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#ffcc33'
                })
            })
        })
    });
    map.addLayer(vector_layer);
      
    var drawinteraction;
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
            if(geom_type==='Square'){
                geom_type='Circle';
                geometryFunction = ol.interaction.Draw.createRegularPolygon(4);
            }else if(geom_type ==='Box'){
                geom_type ='Circle';
                geometryFunction = ol.interaction.Draw.createBox();
            } 
			drawinteraction = new ol.interaction.Draw({
				source: vector_layer.getSource(),
				type: geom_type, geometryFunction: geometryFunction
			});
		}else{
            drawinteraction.setActive(false);
        }
        map.addInteraction(drawinteraction);

        drawinteraction.on('drawend', function(e){
            let parser = new ol.format.GeoJSON();
            //let drawnFeatures = parser.writeFeaturesObject([e.geometry.coordinates]);
            let drawnFeatures = parser.writeFeaturesObject([e.feature]);
            if(drawnFeatures.features[0].geometry.type === "Polygon")
            {
                var polygon1 = turf.polygon(drawnFeatures.features[0].geometry.coordinates);
                var data = [features_json];
                var lengthdata = data[0].features.length;
                for(var i=0; i<lengthdata; ++i)
                {    
                    var polygon2 = turf.polygon(data[0].features[i].geometry.coordinates[0]);
                    var intersect = turf.intersect(polygon1, polygon2);
                    if(Boolean(intersect)===true)
                    {
                        alert("il y a intersection");
                        break;    
                    }
                }  
            }

            if(drawnFeatures.features[0].geometry.type === "LineString")
            {
                //var polygon = turf.polygon([ [ [ 10.5166667, 36.3666667 ], [ 10.6166667, 36.3666667 ], [ 10.55, 36.2833333 ], [ 10.5166667, 36.3666667 ] ] ]);
                var linestring = turf.lineString(drawnFeatures.features[0].geometry.coordinates);
                var data = [features_json];
                var lengthdata = data[0].features.length;
                
                
                for(var i=0; i<lengthdata; ++i)
                {
                    var polygon = turf.polygon(data[0].features[i].geometry.coordinates[0]);
                    var intersect = turf.lineIntersect(linestring, polygon);
                    if(intersect.features.length){
                        alert("il y a intersection"); 
                        break;
                    }else{

                        var x = false;
                        for(var j=0; j<drawnFeatures.features[0].geometry.coordinates.length; ++j)
                        {
                            if(turf.inside(drawnFeatures.features[0].geometry.coordinates[j], polygon)){
                                alert("il y a intersection"); 
                                x=true;
                                break; 
                            }
                        }
                        if(x){ break; }
                    }
                }
                  
            }
            //const overlaycoord = document.getElementById('coordinates');
	        //overlaycoord.innerHTML = drawnFeatures;
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

    
}