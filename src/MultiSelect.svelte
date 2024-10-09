<script>
	let {
		options = [],
		inputCssClass = 'form-control',
		selectedOptionCssClass = 'badge',
		placeholder = 'Select an option',
		oninput,
	} = $props();

	let selectedItems = $state([]);
	let search = $state('');
	let menuItems = $derived(
		options
			.filter((x) => !selectedItems.some((si) => si == x))
			.filter((x) => search.trim() === '' || x.includes(search))
	);
	let showMenu = $state(false);

	function removeItem(e, item) {
		e.preventDefault();
		e.stopPropagation();
		selectedItems = selectedItems.filter((x) => x !== item);
		oninput?.($state.snapshot(selectedItems));
		showMenu = false;
	}

	function onSelect(item) {
		selectedItems.push(item);
		search = '';
		showMenu = false;
		oninput?.($state.snapshot(selectedItems));
	}

	function openMenu() {
		if (menuItems.length !== 0) {
			showMenu = true;
		}
	}

	function closeMenu(e = null) {
		if (e === null) {
			showMenu = false;
			return;
		}

		if (
			showMenu === false ||
			e.target.closest('.multi-select__items') !== null ||
			e.target.closest('.form-control') !== null
		) {
			return;
		}

		showMenu = false;
	}

	function onKeydown(e) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			e.stopPropagation();
		}
	}

	$effect(() => {
		document.addEventListener('click', closeMenu);

		return () => document.removeEventListener('click', closeMenu);
	});
</script>

<div
	class="{(inputCssClass + ' multi-select').trim()}"
	tabindex="1"
	onclick={() => openMenu()}
	onkeydown={() => {}}
	role="button"
>
	{#if selectedItems.length}
		{#each selectedItems as item}
			<span class="{(selectedOptionCssClass + ' multi-select__selected').trim()}">
				{item}
				<button class="multi-select__remove" onclick={(e) => removeItem(e, item)}>&times;</button>
			</span>
		{/each}
	{:else}
		<span class="multi-select__placeholder">{placeholder}</span>
	{/if}
</div>

{#if showMenu}
	<div class="multi-select__items">
		<div class="multi-select__search-box">
			<input
				class="{(inputCssClass + ' multi-select__search').trim()}"
				type="search"
				placeholder="Search"
				onkeydown={onKeydown}
				bind:value={search}
			/>
		</div>

		<ul>
			{#each menuItems as item}
				<li><button onclick={() => onSelect(item)}>{item}</button></li>
			{/each}
		</ul>
	</div>
{/if}

<style>
	.multi-select {
		display: flex;
		flex-flow: row wrap;
		gap: 4px;
		anchor-name: --multiselect;
		height: auto;
		user-select: none;

		.multi-select__selected {
			cursor: default;
		}

		.multi-select__remove {
			all: unset;
			cursor: pointer;
			display: inline-flex;
			font-family: inherit;
			font-size: inherit;
			font-weight: 400;
			line-height: 0.6;
		}
	}

	.multi-select__placeholder {
		color: #999;
	}

	.multi-select__items {
		background-color: #fff;
		box-sizing: border-box;
		border: 1px solid #ccc;
		display: grid;
		grid-template-rows: min-content fit-content(78%);
		position-anchor: --multiselect;
		position: fixed;
		top: anchor(bottom);
		left: anchor(left);
		right: anchor(right);
		max-height: 200px;

		ul {
			all: unset;
			box-sizing: border-box;
			list-style: none outside none;
			overflow: auto;

			button {
				all: unset;
				display: block;
				cursor: pointer;
				width: 100%;
				padding: 2px 5px;
				box-sizing: border-box;
				text-align: left;

				&:hover,
				&:focus {
					background-color: #ccc;
				}
			}
		}
	}

	.multi-select__search-box {
		border-bottom: 1px solid #ccc;
		padding: 5px;
	}

	.multi-select__search {
		border: 1px solid #ccc;
		border-radius: 3px;
		background-color: #fff;
		display: block;
		width: 100%;
	}
</style>
