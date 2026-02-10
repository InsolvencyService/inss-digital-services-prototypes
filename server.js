
// Force the GOV.UK Prototype Kit to honour Azure's PORT

process.env.PORT = process.env.PORT || 3000;

// Load the kit
require('govuk-prototype-kit').start();
