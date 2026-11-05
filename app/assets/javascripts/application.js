//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
	const toggleButton = document.querySelector('#toggle-filters')
	const filterPanel = document.querySelector('#filter-panel')

	if (!toggleButton || !filterPanel) {
		return
	}

	const closeFilters = () => {
		toggleButton.setAttribute('aria-expanded', 'false')
		filterPanel.hidden = true
	}

	closeFilters()
	toggleButton.hidden = false
	filterPanel.closest('form').addEventListener('submit', closeFilters)
	toggleButton.addEventListener('click', () => {
		const expanded = toggleButton.getAttribute('aria-expanded') === 'true'
		toggleButton.setAttribute('aria-expanded', String(!expanded))
		filterPanel.hidden = expanded
	})
})

