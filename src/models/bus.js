import * as d3 from 'd3';

export default class Bus {
    
    constructor ({ config, projection }) {
        const position = projection([config.lon, config.lat]);
        this.cx = position[0];
        this.cy = position[1];
        this.id = config.id;
        this.routeTag = config.routeTag;
        this.speed = config.speedKmHr;
        this.color = Bus.getColor(config.routeTag);
        this.active = true;
    }

    static getColor (routeTag) {
        let seed = routeTag;
        if (isNaN(routeTag)) {
            seed = routeTag.charCodeAt(0);
        }
        return d3.interpolateRainbow(seed / 10)
    }

}
