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

const Stop = require('./Stop');

/** A tram / bus line. */
class Line {

	/**
	 * Create a Line object.
	 * @param {string} code Line code
	 * @param {string} name Line name
	 * @param {string} direction Line direction
	 * @param {string} terminus Line terminus
	 * @param {number} color Line color
	 */
	constructor(code, name, direction, terminus, color) {
		this._code = code;
		this._name = name;
		this._direction = direction;
		this._terminus = terminus;
		this._color = color;
	}

    /**
	 * Create a Line object from XML data.
     * @param {object} element
     * @return {Line}
     */
    static fromXML(element) {
        const color = parseInt(element.ligne.couleur._text, 10).toString(16);
        return new Line(element.ligne.code._text, element.ligne.nom._text, element.ligne.sens._text, element.ligne.vers._text, color);
    }

    /**
     * List of all Stops on this Line.
     * @return {Stop[]}
     */
    async listStops() {
        const response = await require('../').query({ 'xml': 1, 'ligne': this.code, 'sens': this.direction });
        const result = [];

        if (typeof response.xmldata === 'object') {
            const alss = response.xmldata.alss;
			for (let als of alss.als) {
                result.push(Stop.fromXML(this, als));
            }
        }

        return result;
	}
	
	/**
	 * Get Line code.
	 * @return {string}
	 */
	get code() {
		return this._code;
	}
	/**
	 * Get Line name.
	 * @return {string}
	 */
	get name() {
		return this._name;
	}
	/**
	 * Get Line direction.
	 * @return {string}
	 */
	get direction() {
		return this._direction;
	}
	/**
	 * Get Line terminus.
	 * @return {string}
	 */
	get terminus() {
		return this._terminus;
	}
	/**
	 * Get Line color.
	 * @return {number}
	 */
	get color() {
		return this._color;
	}
} 

module.exports = Line;