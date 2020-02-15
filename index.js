/**
 * The MIT License
 * 
 * Copyright (c) 2014 Aurélien RICHAUD
 * Copyright (c) 2020 Gauthier THOMAS
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

const bent = require('bent');
const xmlParser = require('xml-js');

const ApiError = require('./src/ApiError');
const Line = require('./src/Line');

const baseURL = 'http://timeo3.keolis.com/relais/217.php';

/** Main class of the API. */
class DiviaAPI {

	/**
	 * Request to the keolis API.
	 * @param {object} params URL query params
	 * @return {Promise<object>}
	 */
	static async query(params) {
		return new Promise((resolve, reject) => {
			bent('string')(baseURL + '?' + httpBuildQuery(params)).catch(reject).then(response => {
				const xml = JSON.parse(xmlParser.xml2json(response, { compact: true }));

				const code = '' + xml.xmldata.erreur._attributes.code;
				if (code !== '000')
					return reject(new ApiError(code, xml.xmldata.erreur._text));

				resolve(xml);
			});
		});
	}

	/**
	 * List of Lines.
	 * @return {Promise<Line[]>}
	 */
	static async listLines() {
		const response = await DiviaAPI.query({ 'xml': 1 });

		const result = [];

		const alss = response.xmldata.alss;
		for (let als of alss.als) {
			result.push(Line.fromXML(als));
		}

		return result;
	}
	
	/**
	 * URL of the totem XML endpoint.
	 * @return {string}
	 */
	static get baseURL() {
		return baseURL;
	}
	
}

/**
 * Returns HTTP URL query params from an object
 * @param {object} obj 
 */
function httpBuildQuery(obj) {
	let result = [];
	for (let param in obj) {
		result.push(encodeURIComponent(param) + '=' + encodeURIComponent(obj[param]));
	}
	return result.join('&');
}

module.exports = DiviaAPI;