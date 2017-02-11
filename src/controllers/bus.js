import * as d3 from 'd3';
import { fetchXMLAsJSON } from '../utils/fetchUtils';
import Bus from '../models/bus';
import Tooltip from './busTooltip';

const ENTRY_TRANSITION_TIME = 1000;
const MOVE_TRANSITION_TIME = 1000;

export default class BusController {

    constructor ({ svg, projection, dataUrl, onUpdate=()=>{} }) {
        this.svg = svg;
        this.onUpdate = onUpdate;
        this.projection = projection;
        this.buses = [];
        this.dataUrl = dataUrl;
        this.routeStatus = {};
        this.tooltip = new Tooltip();
    }

    get activeBuses () {
        return this.buses.filter(({routeTag}) => !this.routeStatus[routeTag] || this.routeStatus[routeTag].active)
    }
    
    _drawBuses () {
        let busNodes = this.svg
            .selectAll('.bus')
            .data(this.activeBuses, d => d.id);

        // update
        busNodes.transition()
            .duration(MOVE_TRANSITION_TIME)
            .attr('cx', bus => bus.cx)
            .attr('cy', bus => bus.cy);

        // add new buses
        busNodes.enter().append('circle')
            .attr('cx', bus => bus.cx)
            .attr('cy', bus => bus.cy)
            .on('mouseover', this.tooltip.show)
            .on('mouseout', this.tooltip.hide)
            .attr('class', 'bus')
            .attr('fill', bus => bus.color)
            .transition()
                .duration(ENTRY_TRANSITION_TIME)
                .attr('r', 5);

        // remove old buses
        busNodes
            .exit()
            .remove();
    }

    setRouteStatus (routeStatus) {
        this.routeStatus = routeStatus;
        this._drawBuses();
    }

    update () {
        fetchXMLAsJSON(this.dataUrl)
            .then(json => json.body.vehicle)
            .then(busData => busData.map(
                busDatum => new Bus({ config: busDatum, projection: this.projection}))
            )
            .then(buses => {
                this.buses = buses;
                this._drawBuses();
                this.onUpdate(buses);
            })
    }

    render () {
        this.update();
    }

}