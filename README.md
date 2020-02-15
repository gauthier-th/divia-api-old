
# API DiviaMobilités

J'ai créé cette API pour pouvoir facilement accéder aux horaires en temps réel de Divia (en charge du réseau bus et tram de Dijon), une filiale de Keolis.

## Exemples

Pour récupérer les lignes de bus / tram disponible :
```js
const DiviaAPI = require('divia-api');
const lines = await DiviaAPI.listLines(); // renvoie un tableau d'objets Line
```
Pour récupérer tous les arrêts d'une ligne :
```js
const stops = await line.listStops(); // renvoie un tableau d'objets Stop
```
Pour récupérer les prochains passage d'un bus / tram à un arrêt :
```js
const passages = await stop.getPassages(); // renvoie un tableau d'objets Passage
```
## Documentation

### DiviaAPI
Classe principale de l'API.
-  *static*  **DiviaAPI.query(params)**  &rarr;  `Promise<object>` : Requête à l'API Keolis.
	| Paramètre | Type | Description |
	| --- | --- | --- |
	| params | `object` | [Paramètre de la requête](https://en.wikipedia.org/wiki/Query_string) |
-  *static*  **DiviaAPI.listLines()**  &rarr;  `Promise<Line[]>` : Liste des lignes.
-  *static*  **DiviaAPI.baseURL**  &rarr;  `string` : URL de l'API XML.

### Line
Une ligne de tram / bus.
-  **new Line(code, name, direction, terminus, color)** : Crée un objet Line.
	| Param | Type | Description |
	| --- | --- | --- |
	| code | `string` | Code de la ligne |
	| name | `string` | Nom de la ligne |
	| direction | `string` | Direction de la ligne |
	| terminus | `string` | Terminus de la ligne |
	| color | `number` | Couleur de la ligne |
-  **line.listStops()**  &rarr;  `Stop[]` : Liste tous les arrêts d'une ligne.
-  **line.code**  &rarr;  `string` : Code de la ligne
-  **<span>line.name</span>**  &rarr;  `string` : Nom de la ligne
-  **line.direction**  &rarr;  `string` : Direction de la ligne
-  **line.terminus**  &rarr;  `string` : Terminus de la ligne
-  **line.color**  &rarr;  `number` : Couleur de la ligne
-  *static*  **Line.fromXML(element)**  &rarr;  `Line` : Crée un objet Line depuis des données XML.

### Stop
Un arrêt d'une ligne.
-  **new Stop(code, name, refs, line)** : Crée un objet Stop.
	| Param | Type | Description |
	| --- | --- | --- |
	| code | `string` | Code de l'arrêt |
	| name | `string` | Nom de l'arrêt |
	| refs | `string` | Référence de l'arrêt |
	| line | `Line` | Ligne de l'arrêt |
-  **stop.getPassages()**  &rarr;  `Passage[]` : Liste les prochains passage à cet arrêt.
-  **stop.code**  &rarr;  `string` : Code de l'arrêt
-  **<span>stop.name</span>**  &rarr;  `string` : Nom de l'arrêt
-  **stop.refs**  &rarr;  `string` : Référence de l'arrêt
-  **stop.line**  &rarr;  `Line` : Ligne de l'arrêt
-  *static*  **Stop.fromXML(element)**  &rarr;  `Stop` : Créé un objet Stop depuis des données XML.

### Passage
Un passage sur un arrêt.
- **new Passage(date, hour, destination, stop)** : Crée un objet Passage.
	| Param | Type | Description |
	| --- | --- | --- |
	| date | `Date` | Date du passage (précision à la minute) |
	| hour | `string` | Heure du passage |
	| destination | `string` | Destination du passage |
	| stop | `Stop` | Arrêt du passage |
-  **passage.date**  &rarr;  `Date` : Date du passage (précision à la minute)
-  **passage.hour**  &rarr;  `string` : Heure du passage
-  **passage.destination**  &rarr;  `string` : Destination du passage
-  **passage.stop**  &rarr;  `Stop` : Arrêt du passage
-  *static*  **Passage.fromXML(element)**  &rarr;  `Passage` : Créé un objet Passage depuis des données XML.

## Sources

Ce module est une réécriture ce git : https://github.com/vermi0ffh/divia-totem.
Voici également des documents qui ont été utiles pour comprendre et interagir avec l'API de Keolis :
- https://outadoc.fr/2014/11/keolis-open-data-api/
- https://gist.github.com/outadoc/40060db45c436977a912/
