# sf-muni-map

Displays a live map of San Fransisco buses.

### Warning
Currently requires disabled mixed-content blocking in the browser as NextBus only serve their API over HTTP and github pages forces HTTPS.

### Design Considerations
* The app has been tested working in the latest versions of Firefox and Chrome. To have the app run in older browsers we would use Babel in the build-step to transpile to ES5 and include some small polyfills (Fetch, Promise).
* As this was a fairly simple app, I wanted to avoid using any heavy frameworks or libraries. So d3 is the only run-time dependency. If this was to be part of a larger application it would be sensible to use an appropriate framework.
* As there were no design guidelines the design is very simple and (hopefully) fun.


### Future Improvements
With more time available, the following improvements could be made:
* Pull out data requests from the controllers into services
* Separate views from controllers
* Add tests!
* Change tooltips to position themselves based on the bus position, as opposed to the mouse position. For better consisteny.
* Make use of the bus direction property (e.g. use a rectangle + triangle combination to display each bus in the correct postion and heading on the map)
* Use a more precise colour picking method to ensure unique colours for buses
