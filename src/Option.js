export default class Option {
	Index = -1;
	Text = null;
	Value = null;
	Selected = false;

	constructor(index, text, value = null, selected = false) {
		this.Index = index;
		this.Text = text;
		this.Value = value ?? text;
		this.Selected = selected;
	}

	toString() {
		return this.Text;
	}
}
