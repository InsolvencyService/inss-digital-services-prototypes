//
// For guidance on how to create filters see:
// https://prototype-kit.service.gov.uk/docs/filters
//

const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

// Add your filters here

// Preserve line breaks in text
addFilter('preserveLineBreaks', function(text) {
  if (!text) return ''
  return text.replace(/\n/g, '<br>')
})

