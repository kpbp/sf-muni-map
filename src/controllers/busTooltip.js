import * as d3 from 'd3';

const TOOLTIP_SIZE = 80; //px
const OFFSET = 10; //px

export default class BusTooltip {

    constructor() {
        this.tooltip = d3.select("body").append("div")
            .attr("class", "tooltip hidden");
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    show (bus) {
        this.tooltip
            .html(this.template(bus))
            .classed('hidden', false)
            .style('background-color', bus.color)
            .style("left", (d3.event.pageX - TOOLTIP_SIZE / 2) + "px")
            .style("top", (d3.event.pageY - TOOLTIP_SIZE - OFFSET) + "px");
    }

    hide () {
        this.tooltip.classed('hidden', true)
    }

    template (bus) {
        return (`
            <div>Bus: ${bus.id}</div>
            <div>Route: ${bus.routeTag}</div>
            <div>${bus.speed} km/h</div>
        `);
    }
}
