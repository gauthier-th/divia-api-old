
# API DiviaMobilités

I created this API to be able to easily access the real-time timetables of Divia (manager of the bus and tram network of Dijon), a subsidiary of Keolis.

## Examples

To retrieve all availables bus / tram lines:
```js
const DiviaAPI = require('divia-api');
const lines = await DiviaAPI.listLines(); // returns an Array of Line objects
```
To retrieve all stop of a line:
```js
const stops = await line.listStops(); // returns an Array of Stop objects
```
To retrieve the next times a bus/tram will go by a stop:
```js
const passages = await stop.getPassages(); // returns an Array of Passage objects
```
## Documentation

### DiviaAPI
Main class of the API.
-  *static*  **DiviaAPI.query(params)**  &rarr;  `Promise<object>` : Request to the keolis API.
	| Param | Type | Description |
	| --- | --- | --- |
	| params | `object` | URL query params |
-  *static*  **DiviaAPI.listLines()**  &rarr;  `Promise<Line[]>` : List of Lines.
-  *static*  **DiviaAPI.baseURL**  &rarr;  `string` : URL of the totem XML endpoint.

### Line
A tram / bus line.
-  **new Line(code, name, direction, terminus, color)** : Create a Line object.
	| Param | Type | Description |
	| --- | --- | --- |
	| code | `string` | Line code |
	| name | `string` | Line name |
	| direction | `string` | Line direction |
	| terminus | `string` | Line terminus |
	| color | `number` | Line color |
-  **line.listStops()**  &rarr;  `Stop[]` : List of all Stops on this Line.
-  **line.code**  &rarr;  `string` : Line code
-  **<span>line.name</span>**  &rarr;  `string` : Line name
-  **line.direction**  &rarr;  `string` : Line direction
-  **line.terminus**  &rarr;  `string` : Line terminus
-  **line.color**  &rarr;  `number` : Line color
-  *static*  **Line.fromXML(element)**  &rarr;  `Line` : Create a Line object from XML data.

### Stop
A Stop on a Line.
-  **new Stop(code, name, refs, line)** : Create a Stop object.
	| Param | Type | Description |
	| --- | --- | --- |
	| code | `string` | Stop code |
	| name | `string` | Stop name |
	| refs | `string` | Stop refs |
	| line | `Line` | Stop Line |
-  **stop.getPassages()**  &rarr;  `Passage[]` : List next Passages on this Stop.
-  **stop.code**  &rarr;  `string` : Stop code
-  **<span>stop.name</span>**  &rarr;  `string` : Stop name
-  **stop.refs**  &rarr;  `string` : Stop refs
-  **stop.line**  &rarr;  `Line` : Stop line
-  *static*  **Stop.fromXML(element)**  &rarr;  `Stop` : Create a Stop object from XML data.

### Passage
A Passage on a Stop.
- **new Passage(date, hour, destination, stop)** : Create a Passage object.
	| Param | Type | Description |
	| --- | --- | --- |
	| date | `Date` | Passage date |
	| hour | `string` | Passage hour |
	| destination | `string` | Passage destination |
	| stop | `Stop` | Passage stop |
-  **passage.date**  &rarr;  `Date` : Passage date
-  **passage.hour**  &rarr;  `string` : Passage hour
-  **passage.destination**  &rarr;  `string` : Passage destination
-  **passage.stop**  &rarr;  `Stop` : Passage stop
-  *static*  **Passage.fromXML(element)**  &rarr;  `Passage` : Create a Passage object from XML data.

## Sources

This package is a rewrite of this git: https://github.com/vermi0ffh/divia-totem.
Here are also some documents that were helpful in building the API:
- https://outadoc.fr/2014/11/keolis-open-data-api/
- https://gist.github.com/outadoc/40060db45c436977a912/
