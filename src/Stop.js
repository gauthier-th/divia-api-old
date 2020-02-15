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

const Passage = require('./Passage');

/** A Stop on a Line. */
class Stop {

	/**
	 * Create a Stop object.
	 * @param {string} code Stop code
	 * @param {string} name Stop name
	 * @param {string} refs Stop refs
	 * @param {Line} line Stop Line
	 */
	constructor(code, name, refs, line) {
        this._code = code;
        this._name = name;
        this._refs = refs;
        this._line = line;
	}

    /**
	 * Create a Stop object from XML data.
     * @param {object} element
     * @return {Stop}
     */
    static fromXML(line, element) {
        return new Stop(element.arret.code._text, element.arret.nom._text, element.refs._text, line);
    }

    /**
     * List next Passages on this Stop.
     * @return {Passage[]}
     */
	async getPassages() {
        const response = await require('../').query({ 'xml': 3, 'refs': this.refs, 'ran': 1 });
		const result = [];
		
		if (typeof response.xmldata === 'object') {
			const horaires = response.xmldata.horaires;
			for (let passage of horaires.horaire.passages.passage) {
				result.push(Passage.fromXML(passage, this));
			}
		}
		
        return result;
	}

	/**
	 * Get Stop code.
	 * @return {string}
	 */
	get code() {
		return this._code;
	}
	/**
	 * Get Stop name.
	 * @return {string}
	 */
	get name() {
		return this._name;
	}
	/**
	 * Get Stop refs.
	 * @return {string}
	 */
	get refs() {
		return this._refs;
	}
	/**
	 * Get Stop line.
	 * @return {Line}
	 */
	get line() {
		return this._line;
	}
}

module.exports = Stop;