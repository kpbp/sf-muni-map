import * as d3 from 'd3';
import MapController from './controllers/map';
import BusController from './controllers/bus';
import BusTogglePaneController from './controllers/busTogglePane';

const DEFAULT_CONFIG = {
    refreshRate: 15000, // 15 seconds
    busDataUrl: 'http://webservices.nextbus.com/service/publicXMLFeed?command=vehicleLocations&a=sf-muni',
    mapContainer: '#map-container',
    panelContainer: '#panel-container',
    width: 800,
    height: 800
};

export default class App {

    constructor (config = {}) {

        this.config = Object.assign({}, DEFAULT_CONFIG, config);

        let svg = d3.select(this.config.mapContainer)
            .append('svg')
            .attr('width', this.config.width)
            .attr('height', this.config.height);

        let mapGroup = svg.append('g')
            .attr('class', 'mapGroup');

        let busGroup = svg.append('g')
            .attr('class', 'busGroup');

        this.map = new MapController({
            svg: mapGroup,
            width: this.config.width,
            height: this.config.height
        });

        this.togglePane = new BusTogglePaneController({
            container: this.config.panelContainer,
            onToggle: routes => this.bus.setRouteStatus(routes)
        });

        this.bus = new BusController({
            dataUrl: this.config.busDataUrl,
            svg: busGroup,
            projection: this.map.getProjection(),
            onUpdate: buses => this.togglePane.setRoutes(buses)
        });
    }

    start () {
        this.map.render();
        this.bus.render();
        setInterval(() => this.bus.update(), this.config.refreshRate);
    }
}
window.SFMuniMap = App;