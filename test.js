const DiviaAPI = require('./');

(async () => {
	const line = findLine(await DiviaAPI.listLines().catch(console.error), 'T1', 'QUETIGNY Centre');
	console.log(line);
	const stop = findStop(await line.listStops(), 'Grésilles');
	console.log(stop);
	const passages = await stop.getPassages();
	console.log(passages);
})();

/**
 * Find a Line by its name
 * @param {import('./src/Line')[]} lines 
 * @param {string} name 
 * @return {import('./src/Line')}
 */
function findLine(lines, name, terminus) {
	for (let line of lines) {
		if (line.name === name && line.terminus === terminus)
			return line;
	}
}
/**
 * Find a stop by its name
 * @param {import('./src/Stop')[]} stops 
 * @param {string} name 
 * @return {import('./src/Stop')}
 */
function findStop(stops, name) {
	for (let stop of stops) {
		if (stop.name === name)
			return stop;
	}
}