import * as d3 from 'd3';
export default class BusTogglePaneController {

    constructor({ container, onToggle=()=>{} }) {
        this.onToggle = onToggle;
        this.toggles = d3.select(container)
            .append('ul')
            .attr('class', 'toggles');
        this.routeMap = {};
    }

    setRoutes (buses) {
        // get the unique routes from the list of buses
        buses.forEach(({ routeTag, color }) => {
            this.routeMap[routeTag] = this.routeMap[routeTag] || {
                tag: routeTag,
                color,
                active: true
            }
        });
        this.render();
    }

    handleToggle (clickedRoute, _index, nodes) {
        let routes = d3.selectAll(nodes).data();
        let activeRoutes = routes.filter(route => route.active);

        // if all routes were previously active, just activate the clicked route
        if (activeRoutes.length === routes.length) {
            routes.forEach(route => {
                if(route.tag !== clickedRoute.tag) {
                    route.active = false;
                }
            });
        // if the only active route was the clicked route, active everything
        } else if (activeRoutes.every(route => route.tag === clickedRoute.tag)) {
            routes.forEach(route => { route.active = true; });
        }
        // otherwise simply toggle the route status
        else {
            clickedRoute.active = !clickedRoute.active;
        }

        d3.selectAll(nodes)
            .classed('active', route => route.active);

        this.onToggle(this.routeMap);
    }

    render () {
       this.toggles.selectAll('.toggle')
            .data(Object.values(this.routeMap), route => route.tag)
            .enter()
            .append('li')
            .text(route => route.tag)
            .attr('class', 'toggle active')
            .on('click', this.handleToggle.bind(this))
            .style('background-color', route => route.color);
    }
}