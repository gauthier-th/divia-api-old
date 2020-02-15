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

/** A Passage on a Stop. */
class Passage {

	/**
	 * Create a Passage object.
	 * @param {Date} date Passage date
	 * @param {string} hour Passage hour
	 * @param {string} destination Passage destination
	 * @param {Stop} stop Passage stop
	 */
	constructor(date, hour, destination, stop) {
		this._date = date;
		this._hour = hour;
		this._destination = destination;
		this._stop = stop;
	}

    /**
	 * Create a Passage object from XML data.
     * @param {object} element
     * @return {Passage}
     */
    static fromXML(element, stop) {
		const hour = element.duree._text;
		const date = new Date();
		date.setMilliseconds(0);
		date.setHours(parseInt(hour.split(':')[0], 10), parseInt(hour.split(':')[1], 10), 0);

        return new Passage(date, hour, element.destination._text, stop);
	}

	/**
	 * Get Passage date.
	 * @return {Date}
	 */
	get date() {
		return this._date;
	}
	/**
	 * Get Passage hour.
	 * @return {string}
	 */
	get hour() {
		return this._hour;
	}
	/**
	 * Get Passage destination.
	 * @return {string}
	 */
	get destination() {
		return this._destination;
	}
	/**
	 * Get Passage stop.
	 * @return {string}
	 */
	get stop() {
		return this._stop;
	}

}

module.exports = Passage;