import * as d3 from 'd3';
import { fetchJSON } from '../utils/fetchUtils';

const SF_COORDINATES = [122.419, 37.775];

export default class MapController {

    constructor ({ svg, width, height, scale=300000, position=SF_COORDINATES }) {
        this.svg = svg;
        this.projection = d3.geoAlbers()
            .rotate([position[0], 0])
            .center([0, position[1]])
            .scale(scale)
            .translate([width / 2, height / 2]);
    }

    _drawMapLayer (name, geoJSON) {
        let path = d3.geoPath()
            .projection(this.projection);

        this.svg.append('path').datum(geoJSON)
            .attr('class', name)
            .attr('d', path)
            .style('opacity', 0)
            .transition()
                .style('opacity', 1)
    }

    _fetchMapLayer (layer) {
        return fetchJSON(`data/${layer}.json`);
    }

    getProjection () {
        return this.projection;
    }

    /*
        Loads the map layers in priority order
        Layers are drawn sequentially once all layers in the group are ready
     */
    render () {
        var layerPriorities = [['neighborhoods'], ['streets', 'arteries', 'freeways']];

        layerPriorities.forEach(layerGroup => {
            Promise.all(layerGroup.map(this._fetchMapLayer.bind(this)))
                .then(layers => {
                    layers.forEach((layer, i) =>this._drawMapLayer(layerGroup[i], layer))
                })
        })
    }
}