window.onload = init;

function init(){
  // EPSG:3416  for Austria
  proj4.defs("EPSG:3416","+proj=lcc +lat_1=49 +lat_2=46 +lat_0=47.5 +lon_0=13.33333333333333 +x_0=400000 +y_0=400000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
  // EPSG:27700 for the UK
  proj4.defs("EPSG:27700","+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs");
  ol.proj.proj4.register(proj4);

  // Map Controls
  const attributionControl = new ol.control.Attribution({
    collapsible: true
  })

  const scaleLineControl = new ol.control.ScaleLine({
    units: 'metric',
    minWidth: 200,
    bar: true,
    steps: 4,
    text: true
  }) 

  const overViewMapControl = new ol.control.OverviewMap({
    tipLabel: 'Custom Overview Map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ]
  })

  const zoomControl = new ol.control.Zoom()
  const mapControls = [attributionControl, scaleLineControl, overViewMapControl, zoomControl]


  const map = new ol.Map({
    view: new ol.View({
      center: ol.proj.fromLonLat([14.62, 47.89], 'EPSG:3857'),
      zoom: 8,      
    }),    
    target: 'js-map',
    controls: ol.control.defaults({attribution: false}).extend(mapControls)
  })
 
  // Base Layers
  // Openstreet Map Standard
  const openstreetMapStandard = new ol.layer.Tile({
    source: new ol.source.OSM(),    
    visible: true,
    title: 'OSMStandard'        
  })

  // Openstreet Map Humanitarian
  const openstreetMapHumanitarian = new ol.layer.Tile({
    source: new ol.source.OSM({
      url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
    }),
    visible: false,
    title: 'OSMHumanitarian'
  })

  // Bing Maps Basemap Layer
  const bingMaps = new ol.layer.Tile({
    source: new ol.source.BingMaps({
      key: "Your Bingmaps API Key Here",
      imagerySet: 'CanvasGray'  // Road, CanvasDark, CanvasGray
    }),
    visible: false,
    title: 'BingMaps'
  })

  // CartoDB BaseMap Layer
  const cartoDBBaseLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: 'http://{1-4}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png',
      attributions: '© CARTO'
    }),
    visible: false,
    title: 'CartoDarkAll'
  })

  // Stamen basemap layer
  const StamenTerrainWithLabels = new ol.layer.Tile({
    source: new ol.source.Stamen({
      layer: 'terrain-labels',
      attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    visible: false,
    title: 'StamenTerrainWithLabels'
  })
  
  const StamenTerrain = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg',
      attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    visible: false,
    title: 'StamenTerrain'
  })

  // Base Vector Layers
  // Vector Tile Layer OpenstreetMap
  const openstreetMapVectorTile = new ol.layer.VectorTile({
    source: new ol.source.VectorTile({
      url:'Your Maptiler Layer URL',
      format: new ol.format.MVT(),
      attributions:'<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>'
    }),
    visible: false,
    title: 'VectorTileLayerOpenstreetMap'
  })
 
  const openstreetMapVectorTileStyles = 'Your Maptiler Style URL';
  fetch(openstreetMapVectorTileStyles).then(function(response) {    
    response.json().then(function(glStyle) {       
      olms.applyStyle(openstreetMapVectorTile, glStyle, 'Your Maptiler Layer ID');
    });
  });


  // Base Layer Group
  const baseLayerGroup = new ol.layer.Group({
    layers: [
      openstreetMapStandard, openstreetMapHumanitarian, bingMaps, cartoDBBaseLayer,
      StamenTerrainWithLabels, StamenTerrain, openstreetMapVectorTile
    ]
  })
  map.addLayer(baseLayerGroup);

  // Layer Switcher Logic for BaseLayers
  const baseLayerElements = document.querySelectorAll('.sidebar > input[type=radio]')
  for(let baseLayerElement of baseLayerElements){
    baseLayerElement.addEventListener('change', function(){
      let baseLayerElementValue = this.value;
      baseLayerGroup.getLayers().forEach(function(element, index, array){
        let baseLayerName = element.get('title');
        element.setVisible(baseLayerName === baseLayerElementValue)
      })
    })
  }
  

  // TileDebug
  const tileDebugLayer = new ol.layer.Tile({
    source: new ol.source.TileDebug(),
    visible: false,
    title: 'TileDebugLayer'
  })

  // tile ArcGIS REST API Layer
  const tileArcGISLayer = new ol.layer.Tile({
    source: new ol.source.TileArcGISRest({
      url: "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Louisville/LOJIC_LandRecords_Louisville/MapServer",
      attributions: 'Copyright© 2008, MSD, PVA, Louisville Water Company, Louisville Metro Government'
    }),
    visible: false,
    title: 'TileArcGISLayer'
  })
  

  // NOAA WMS Layer
  const NOAAWMSLayer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url:'https://nowcoast.noaa.gov/arcgis/services/nowcoast/forecast_meteoceanhydro_sfc_ndfd_dailymaxairtemp_offsets/MapServer/WMSServer?',
      params:{
        LAYERS: 5,
        FORMAT: 'image/png',
        TRANSPARENT: true
      },
      attributions: '<a href=https://nowcoast.noaa.gov/>© NOAA<a/>'
    }),
    visible: false,
    title: 'NOAAWMSLayer'
  })

  // Static Image OpenstreetMap
  const openstreetMapFragmentStatic = new ol.layer.Image({
    source: new ol.source.ImageStatic({
      url: './data/static_images/openlayers_static_humanitarian.PNG',
      imageExtent: [4991698.9328313675, 5050292.393744084, 10008191.828130603, 10013417.911357462],
      attributions: '<a href=https://www.openstreetmap.org/copyright/>© OpenStreetMap contributors<a/>',
    }),
    title: 'openstreetMapFragmentStatic',
    visible: false,
  })

  // Vector Layers
  // Styling of vector features
  // Points Style
  const pointStyle = new ol.style.Style({
    image: new ol.style.Circle({
      fill: new ol.style.Fill({
        color: [245, 10, 14, 1]
      }),
      radius: 7,
      stroke: new ol.style.Stroke({
        color: [245, 10, 14, 1],
        width: 2
      })

    })
  })
  // Lines Style
  const lineStringStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: [59, 59, 59, 1],
      width: 2
    })
  })

  // Polygon Style
  // Blue polygons
  const blueCountriesStyle = new ol.style.Style({
    fill: new ol.style.Fill({
      color: [56, 41, 194, 1]
    })
  })

  // Purple polygons
  const purpleCountriesStyle = new ol.style.Style({
    fill: new ol.style.Fill({
      color: [164, 63, 204, 1]
    })
  })

  const EUCountriesStyle = function(feature){
    let geometryType = feature.getGeometry().getType();
    let incomeProperty = feature.get('income');

    // Text Styles
    let featureID = feature.get('ID');
    let featureIDString = featureID.toString();
    
    let textStyles = new ol.style.Style({
      text: new ol.style.Text({
        text: featureIDString,
        scale: 1.5,
        fill: new ol.style.Fill({
          color: [18, 18, 18, 1]
        })
      })
    })     

    if(geometryType === 'Point'){
      feature.setStyle([pointStyle, textStyles]);
    }

    if(geometryType === 'LineString'){
      feature.setStyle([lineStringStyle, textStyles])
    }

    if(geometryType === 'Polygon'){
      if(incomeProperty === 'Blue'){
        feature.setStyle([blueCountriesStyle, textStyles])
      };
      if(incomeProperty === 'Purple'){
        feature.setStyle([purpleCountriesStyle, textStyles])
      }
    }
  }

  // Austrian Cities EPSG:27700 
  const AustrianCities = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: './data/vector_data/austrian_cities_EPSG_27700.geojson',
      format: new ol.format.GeoJSON({
        dataProjection: 'EPSG:27700'
      })
    }),
    visible: true,
    title: 'AustrianCities',
    style: new ol.style.Style({
      image: new ol.style.Circle({
        fill: new ol.style.Fill({
          color: [15,15,15, 1]
        }),
        radius: 10,
        stroke: new ol.style.Stroke({
          color: [15, ,15 ,15,1],
          width: 2
        })
      })
    })
  })
  map.addLayer(AustrianCities)

  
  // Central EU Countries GeoJSON VectorImage Layer
  const EUCountriesGeoJSONVectorImage = new ol.layer.VectorImage({
    source: new ol.source.Vector({
      url: './data/vector_data/Central_EU_countries_GEOJSON.geojson',
      format: new ol.format.GeoJSON()
    }),
    visible: true,
    title: 'CentralEUCountriesGeoJSON' ,
    style: EUCountriesStyle
  })
  
  // Central EU Countries KML
  const EUCountriesKML = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: './data/vector_data/Central_EU_countries_KML.kml',
      format: new ol.format.KML()
    }),
    visible: false,
    title: 'CentralEUCountriesKML'
  })
  
  // HeatMap
  const heatMapOnlineFBUsers = new ol.layer.Heatmap({
    source: new ol.source.Vector({
      url: './data/vector_data/onlineFBUsers.geojson',
      format: new ol.format.GeoJSON()
    }),
    radius: 20,
    blur: 12,
    gradient: ['#DC143C', '#DC143C', '#000000', '#000000', '#000000'],
    title: 'OnlineFBUsers',
    visible: false
  })
  
  // Layer Group
  const layerGroup = new ol.layer.Group({
    layers:[
      tileArcGISLayer, NOAAWMSLayer, tileDebugLayer, openstreetMapFragmentStatic,
      EUCountriesGeoJSONVectorImage, EUCountriesKML, heatMapOnlineFBUsers
    ]
  })
  map.addLayer(layerGroup);

  // Layer Switcher Logic for Raster Tile Layers
  const tileRasterLayerElements = document.querySelectorAll('.sidebar > input[type=checkbox]');
  for(let tileRasterLayerElement of tileRasterLayerElements){
    tileRasterLayerElement.addEventListener('change', function(){
      let tileRasterLayerElementValue = this.value;
      let tileRasterLayer;

      layerGroup.getLayers().forEach(function(element, index, array){
        if(tileRasterLayerElementValue === element.get('title')){
          tileRasterLayer = element;
        }
      })
      this.checked ? tileRasterLayer.setVisible(true) : tileRasterLayer.setVisible(false)
    })
  }

  // Vector Feature Popup Information
  const overlayContainerElement = document.querySelector('.overlay-container')
  const overlayLayer = new ol.Overlay({
    element: overlayContainerElement
  })
  map.addOverlay(overlayLayer);
  const overlayFeatureName = document.getElementById('feature-name');
  const overlayFeatureAdditionInfo = document.getElementById('feature-additional-info');


  // Vector Feature Popup Logic
  map.on('click', function(e){
    overlayLayer.setPosition(undefined);
    map.forEachFeatureAtPixel(e.pixel, function(feature, layer){
      let clickedCoordinate = e.coordinate;
      let clickedFeatureName = feature.get('name');
      let clickedFeatureAdditionInfo = feature.get('additionalinfo');
      //if(clickedFeatureName && clickedFeatureAdditionInfo != undefined){
        overlayLayer.setPosition(clickedCoordinate);
        overlayFeatureName.innerHTML = clickedFeatureName;
        overlayFeatureAdditionInfo.innerHTML = clickedFeatureAdditionInfo;
      //}
    },
    {
      layerFilter: function(layerCandidate){
        return layerCandidate.get('title')  === 'CentralEUCountriesGeoJSON'
      }
    })
  })

  // Select Interaction - For Styling Selected Points
  const selectInteractionV2 = new ol.interaction.Select();
  map.addInteraction(selectInteractionV2);
  selectInteractionV2.on('select', function(e){ 
    let selectedFeature = e.selected;   
    if(selectedFeature.length > 0 && selectedFeature[0].getGeometry().getType() === 'Point'){
      selectedFeature[0].setStyle(
        new ol.style.Style({
          image: new ol.style.Circle({
            fill: new ol.style.Fill({
              color: [247, 26, 10, 1]
            }),
            radius: 12,
            stroke: new ol.style.Stroke({
              color: [247, 26, 10, 1],
              width: 3
            })
          })
        })
      )
    };
  })

  // Switch ON/OFF Controls Logic
  const controlButtonElements = document.querySelectorAll('.sidebar > button[type=button]')
  for(let controlButton of controlButtonElements){
    controlButton.addEventListener('click', function(e){
      let buttonElement = e.target;
      if(buttonElement.className === 'btn-success'){        
        map.getControls().forEach(function(controlElement){
          if(controlElement instanceof ol.control[buttonElement.innerHTML]){
            map.removeControl(controlElement);
          }
        })
        buttonElement.className = buttonElement.className.replace(
          'btn-success', 'btn-default'
        );
      } else {
        mapControls.forEach(function(controlElement){
          if(controlElement instanceof ol.control[buttonElement.innerHTML]){
            map.addControl(controlElement);            
          }
        })
        buttonElement.className = buttonElement.className.replace(
          'btn-default', 'btn-success'
        );
      }
    })
  }

  // Geolocation API
  const viewProjection = map.getView().getProjection();  
  const geolocation = new ol.Geolocation({
    tracking: true,
    trackingOptions: {
      enableHighAccuracy: true
    },
    projection: viewProjection
  })

  const geolocationElement = document.getElementById('geolocation');
  geolocation.on('change:position', function(e){     
    let geolocation = this.getPosition();
    let LongLatGeolocation = ol.proj.toLonLat(geolocation, viewProjection);
    map.getView().setCenter(geolocation);
    geolocationElement.innerHTML = 'Longitude:' + LongLatGeolocation[0].toFixed(2) + ', ' + 'Latitude: ' + LongLatGeolocation[1].toFixed(2) 
  })

}


