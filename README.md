# MultiSelect

A small multiple selection component built on Svelte 5.

Setup is simple:

1. Clone this repo
2. Run `npm install` in the project directory.
3. Run `vite dev` to develop, OR;
4. Run `vite build` to build.

Usage example:

```javascript
import { mount, MultiSelect } from '/dist/MultiSelect.min.js';

mount(MultiSelect, {
	target: document.getElementById('app'), // where you want the component to render
	props: {
		// the options you want to choose from
		options: ['Item 1', 'Item 2'],
		// the CSS classes on the input in the control
		inputCssClass: 'form-control',
		// the CSS classes on the selected option in the control
		selectedOptionCssClass: 'badge',
		// the placeholder text when the control has no items selected
		placeholder: 'Select an option',
		// The callback when the value of the control changes.
		// "e" is a string array.
		oninput: (e) => {
			console.log(e);
		}
	}
});
```
