export default class Option {
	Index = -1;
	Text = null;
	Value = null;
	Selected = false;
	Title = null;

	/**
	 * @param {number} index
	 * @param {string} text
	 * @param {string|null} value
	 * @param {boolean|null} selected
	 * @param {string|null} title
	 */
	constructor(
		index,
		text,
		value = null,
		selected = false,
		title = null
	) {
		this.Index = index;
		this.Text = text;
		this.Value = value ?? text;
		this.Selected = selected;
		this.Title = title;
	}

	toString() {
		return this.Text;
	}
}
