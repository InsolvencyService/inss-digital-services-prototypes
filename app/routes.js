//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const customerFormsV2Routes = require('./views/customer-forms/v2/routes')
const individualInsolvencyRegisterV4Routes = require('./views/individual-insolvency-register/v4/routes')

const checkAndSubmitChangeFields = {
  'contact-information/contact-details.html': [
    'case-officer-full-name',
    'case-officer-email',
    'case-officer-phone-number'
  ],
  'company-information/trading-name.html': [
    'company-uses-alternative-trading-name-yes',
    'alternative-trading-name'
  ],
  'company-information/dates-traded.html': [
    'dates-traded-from-day',
    'dates-traded-to-day'
  ],
  'company-information/bank-detail-guard.html': [
    'holds-company-banking-details-yes'
  ],
  'company-information/edit-company-bank-account': [
    'bank-provider-name',
    'bank-account-name',
    'bank-sort-code',
    'bank-account-number',
    'holds-unmarked-bank-statements-yes'
  ],
  'company-information/company-bank-accounts.html': [
    'add-another-company-bank-account-yes'
  ],
  'company-information/bank-account-analysis.html': [
    'company-bank-account-analysis-completed-yes'
  ],
  'company-information/electronic-records.html': [
    'holds-electronic-records-yes'
  ],
  'company-information/electronic-records-available-guard.html': [
    'electronic-records-available-yes'
  ],
  'company-information/electronic-records-obtain.html': [
    'electronic-records-obtained-yes'
  ]
}

router.use(function (req, res, next) {
  req.session.data = req.session.data || {}
  req.session.data.companyName = req.session.data.companyName || 'Company 1 Ltd'
  req.session.data.companyNumber = req.session.data.companyNumber || '12345678'
  next()
})

router.use('/ipservice/dcrs/v3', function (req, res, next) {
  const path = req.originalUrl.split('?')[0]
  const followupPaths = [
    '/ipservice/dcrs/v3/company-information/dates-traded',
    '/ipservice/dcrs/v3/company-information/bank-detail-guard',
    '/ipservice/dcrs/v3/company-information/bank-detail-guard-answer',
    '/ipservice/dcrs/v3/company-information/company-bank-accounts-answer',
    '/ipservice/dcrs/v3/company-information/electronic-records'
  ]

  if (
    req.method !== 'POST' ||
    !req.session.data.returnToCheckAndSubmit
  ) {
    return next()
  }

  Object.assign(req.session.data, req.body || {})

  if (
    followupPaths.includes(path) ||
    path === '/ipservice/dcrs/v3/company-information/add-company-bank-details' ||
    path === '/ipservice/dcrs/v3/company-information/save-and-return' ||
    (path === '/ipservice/dcrs/v3/company-information/electronic-records-answer' && req.body.holdsElectronicRecords === 'yes') ||
    (path === '/ipservice/dcrs/v3/company-information/electronic-records-available-answer' && req.body.electronicRecordsAvailable === 'yes')
  ) {
    return next()
  }

  delete req.session.data.returnToCheckAndSubmit
  return res.redirect('/ipservice/dcrs/v3/check-and-submit-report.html')
})

router.use(customerFormsV2Routes)
router.use(individualInsolvencyRegisterV4Routes)

// Add your routes here

function dcrsRoutePaths(path) {
  return [
    `/ipservice/dcrs/v2/${path}`,
    `/ipservice/dcrs/v3/${path}`
  ]
}

function dcrsRedirect(req, path) {
  const version = req.originalUrl.startsWith('/ipservice/dcrs/v3/') ? 'v3' : 'v2'
  return `/ipservice/dcrs/${version}/${path}`
}

const directorRestrictionFirstNames = [
  'Alex', 'Amelia', 'Andrew', 'Aisha', 'Ben', 'Chloe', 'Daniel', 'David',
  'Eleanor', 'Fatima', 'George', 'Hannah', 'Imran', 'James', 'Jasmine',
  'Joseph', 'Leila', 'Liam', 'Maria', 'Michael', 'Niamh', 'Oliver', 'Olivia', 'Thomas'
]
const directorRestrictionLastNames = [
  'Adams', 'Ahmed', 'Baker', 'Brown', 'Campbell', 'Clarke', 'Davies', 'Evans',
  'Foster', 'Garcia', 'Green', 'Hall', 'Harris', 'Jackson', 'Khan', 'Lewis',
  'Morgan', 'Patel', 'Roberts', 'Smith', 'Williams'
]
const directorRestrictionTypes = [
  'Order',
  'Undertaking'
]
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]
const postcodeLetters = 'ABCDEFGHJKMNPQRSTUVWXYZ'
const restrictionStreets = ['Market Street', 'Station Road', 'King Street', 'Mill Lane', 'High Street']
const restrictionLocations = [
  { town: 'London', postcodeDistrict: 'SW1A' },
  { town: 'Birmingham', postcodeDistrict: 'B1' },
  { town: 'Manchester', postcodeDistrict: 'M1' },
  { town: 'Leeds', postcodeDistrict: 'LS1' },
  { town: 'Liverpool', postcodeDistrict: 'L1' },
  { town: 'Sheffield', postcodeDistrict: 'S1' },
  { town: 'Bristol', postcodeDistrict: 'BS1' },
  { town: 'Newcastle upon Tyne', postcodeDistrict: 'NE1' },
  { town: 'Nottingham', postcodeDistrict: 'NG1' },
  { town: 'Leicester', postcodeDistrict: 'LE1' },
  { town: 'Southampton', postcodeDistrict: 'SO14' },
  { town: 'Portsmouth', postcodeDistrict: 'PO1' },
  { town: 'Brighton', postcodeDistrict: 'BN1' },
  { town: 'Plymouth', postcodeDistrict: 'PL1' },
  { town: 'Norwich', postcodeDistrict: 'NR1' },
  { town: 'York', postcodeDistrict: 'YO1' },
  { town: 'Oxford', postcodeDistrict: 'OX1' },
  { town: 'Cambridge', postcodeDistrict: 'CB1' },
  { town: 'Reading', postcodeDistrict: 'RG1' },
  { town: 'Luton', postcodeDistrict: 'LU1' },
  { town: 'Blackpool', postcodeDistrict: 'FY1' },
  { town: 'Bournemouth', postcodeDistrict: 'BH1' },
  { town: 'Swindon', postcodeDistrict: 'SN1' },
  { town: 'Warrington', postcodeDistrict: 'WA1' },
  { town: 'Glasgow', postcodeDistrict: 'G1' },
  { town: 'Edinburgh', postcodeDistrict: 'EH1' },
  { town: 'Aberdeen', postcodeDistrict: 'AB10' },
  { town: 'Dundee', postcodeDistrict: 'DD1' },
  { town: 'Cardiff', postcodeDistrict: 'CF10' },
  { town: 'Swansea', postcodeDistrict: 'SA1' },
  { town: 'Newport', postcodeDistrict: 'NP20' },
  { town: 'Belfast', postcodeDistrict: 'BT1' },
  { town: 'Derry', postcodeDistrict: 'BT48' }
]
const futureUnpublishedRecordCount = 24
const directorRestrictionSeedRecords = Array.from({ length: 504 }, function (unused, index) {
  const firstName = index < 15
    ? directorRestrictionFirstNames[index * 7 % directorRestrictionFirstNames.length]
    : directorRestrictionFirstNames[Math.floor(index / directorRestrictionLastNames.length)]
  const lastName = index < 15
    ? directorRestrictionLastNames[index * 5 % directorRestrictionLastNames.length]
    : directorRestrictionLastNames[index % directorRestrictionLastNames.length]
  const birthDay = String((index * 7) % 28 + 1).padStart(2, '0')
  const birthMonth = monthNames[index * 5 % monthNames.length]
  const birthYear = 1950 + index % 56
  const restrictionLength = 2 + index % 13
  const restrictionType = directorRestrictionTypes[index % directorRestrictionTypes.length]
  const salesIncome = 98697.68 + index * 149.31
  const eligibleLoan = Math.min(50000, Math.round(salesIncome * 25) / 100)
  const declaredTurnover = 231000 + index * 275
  const companyName = `Fictional Trading Company ${index + 1} Ltd`
  const location = restrictionLocations[index % restrictionLocations.length]
  const postcode = `${location.postcodeDistrict} ${index % 9 + 1}${postcodeLetters[index % postcodeLetters.length]}${postcodeLetters[index * 7 % postcodeLetters.length]}`
  const addressLine1 = `${index % 99 + 1} ${restrictionStreets[index % restrictionStreets.length]}`
  const addressLine2 = ''
  const town = location.town
  const companyAccountsTurnover = 69373 + index * 317
  const liquidationLiabilities = 113823.44 + index * 725.5
  const bblLiability = 41118.89 + index * 125.25
  const restrictionStartDateValue = new Date()
  restrictionStartDateValue.setHours(0, 0, 0, 0)
  if (index < futureUnpublishedRecordCount) {
    restrictionStartDateValue.setDate(restrictionStartDateValue.getDate() + index % 21 + 1)
  } else {
    restrictionStartDateValue.setDate(restrictionStartDateValue.getDate() - ((index * 13) % 365 + 1))
  }
  const restrictionEndDateValue = new Date(restrictionStartDateValue)
  restrictionEndDateValue.setFullYear(restrictionEndDateValue.getFullYear() + restrictionLength)
  const restrictionStartDate = `${restrictionStartDateValue.getDate()} ${monthNames[restrictionStartDateValue.getMonth()]} ${restrictionStartDateValue.getFullYear()}`
  const restrictionEndDate = `${restrictionEndDateValue.getDate()} ${monthNames[restrictionEndDateValue.getMonth()]} ${restrictionEndDateValue.getFullYear()}`
  const restrictionStartSort = restrictionStartDateValue.getTime()
  const companyNumber = String(10000000 + index)
  const formatCurrency = function (amount) {
    return amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
  const fullName = `${firstName} ${lastName}`

  return {
    id: index,
    companyNumber,
    name: fullName,
    fullName,
    dateOfBirth: `${birthDay} ${birthMonth} ${birthYear}`,
    postcode,
    addressLine1,
    addressLine2,
    town,
    address: [addressLine1, town].join(', '),
    lastKnownAddress: [addressLine1, town, postcode].join(', '),
    companyName,
    approvalStatus: index < 15 ? 'New' : 'Approved',
    restrictionType,
    restrictionStartDate,
    restrictionEndDate,
    restrictionStartTimestamp: restrictionStartDateValue.getTime(),
    disqualificationLength: `${restrictionLength} years`,
    restrictionStartSort,
    startDate: restrictionStartDate,
    endDate: restrictionEndDate,
    conductReason: [
      `On 12 May 2020, ${fullName} caused ${companyName} to breach the terms and conditions of the Bounce Back Loan (BBL) scheme by overstating the company's turnover when applying for a BBL. The company received a £50,000 loan, although ${fullName} knew or ought to have known that it was not eligible for a loan of that amount.`,
      'Under the BBL scheme, businesses could apply for one loan of between £2,000 and £50,000, subject to a maximum of 25% of turnover. Applicants self-certified their turnover for calendar year 2019. Businesses established after 1 January 2019 could use estimated annual turnover.',
      `${companyName} was incorporated on 22 October 2012 and could not use estimated turnover. Its accounts show turnover of £${companyAccountsTurnover.toLocaleString('en-GB')} for the year ending 31 December 2019. Bank statement analysis shows sales-related income of £${formatCurrency(salesIncome)} during calendar year 2019. Based on that income, the company could have applied for a loan of no more than £${formatCurrency(eligibleLoan)}.`,
      `On 12 May 2020, ${fullName} applied for a £50,000 BBL on behalf of ${companyName}, declaring annual turnover of £${declaredTurnover.toLocaleString('en-GB')}. The loan agreement was signed and the funds were credited to the company's bank account on 13 May 2020. The overstatement meant the company received £${formatCurrency(50000 - eligibleLoan)} more than it was entitled to under the scheme.`,
      `On 29 November 2024, ${companyName} entered creditors' voluntary liquidation with liabilities totalling £${formatCurrency(liquidationLiabilities)}, including £${formatCurrency(bblLiability)} owed in respect of the BBL.`
    ]
  }
})

function cloneDirectorRestrictionRecords(records) {
  return records.map(function (record) {
    return Object.assign({}, record, { conductReason: record.conductReason.slice() })
  })
}

const directorRestrictionRecordsByVersion = {
  v1: cloneDirectorRestrictionRecords(directorRestrictionSeedRecords),
  v2: cloneDirectorRestrictionRecords(directorRestrictionSeedRecords).map(function (record) {
    return record.approvalStatus === 'New'
      ? Object.assign({}, record, { conductReason: [] })
      : record
  })
}

function directorRestrictionRecordsFor(version) {
  return directorRestrictionRecordsByVersion[version]
}

function dateToInputParts(dateText) {
  const dateParts = String(dateText || '').match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/)
  if (!dateParts) {
    return { day: '', month: '', year: '' }
  }

  const month = monthNames.indexOf(dateParts[2]) + 1
  if (month < 1) {
    return { day: '', month: '', year: '' }
  }

  return {
    day: String(Number(dateParts[1])),
    month: String(month).padStart(2, '0'),
    year: dateParts[3]
  }
}

function dateFromInputParts(body, namePrefix) {
  const day = Number(body[`${namePrefix}-day`])
  const month = Number(body[`${namePrefix}-month`])
  const year = Number(body[`${namePrefix}-year`])
  if (!day || month < 1 || month > 12 || !year) {
    return { value: '', timestamp: 0 }
  }

  const date = new Date(Date.UTC(year, month - 1, day))
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
    return { value: '', timestamp: 0 }
  }

  return {
    value: `${day} ${monthNames[month - 1]} ${year}`,
    timestamp: date.getTime()
  }
}

function nextDirectorRestrictionId(records) {
  return records.reduce(function (highestId, record) {
    return Math.max(highestId, record.id)
  }, -1) + 1
}

function nextDirectorRestrictionCompanyNumber(records) {
  const highestCompanyNumber = records.reduce(function (highestNumber, record) {
    return Math.max(highestNumber, Number(record.companyNumber) || 0)
  }, 9999999)
  return String(highestCompanyNumber + 1)
}

function buildAdminRecord(body, id, existingRecord, records) {
  const fullName = String(body.fullName || '').trim()
  const addressLine1 = String(body.addressLine1 || '').trim()
  const addressLine2 = String(body.addressLine2 || '').trim()
  const town = String(body.town || '').trim()
  const postcode = String(body.postcode || '').trim().toUpperCase()
  const dateOfBirth = dateFromInputParts(body, 'dateOfBirth')
  const restrictionStartDate = dateFromInputParts(body, 'restrictionStartDate')
  const restrictionEndDate = dateFromInputParts(body, 'restrictionEndDate')
  const requestedDisqualificationLength = Number.parseInt(body.disqualificationLength, 10)
  const disqualificationLength = Number.isInteger(requestedDisqualificationLength) && requestedDisqualificationLength >= 1 && requestedDisqualificationLength <= 99
    ? `${requestedDisqualificationLength} years`
    : ''
  const companyNumber = /^\d{8}$/.test(String(body.companyNumber || '').trim())
    ? String(body.companyNumber).trim()
    : existingRecord ? existingRecord.companyNumber : nextDirectorRestrictionCompanyNumber(records)
  const conductReason = String(body.conductReason || '').split(/\r?\n/).map(function (paragraph) {
    return paragraph.trim()
  }).filter(Boolean)

  return Object.assign({}, existingRecord, {
    id,
    companyNumber,
    name: fullName,
    fullName,
    dateOfBirth: dateOfBirth.value,
    hideAddress: body.hideAddress === 'yes',
    postcode,
    addressLine1,
    addressLine2,
    town,
    address: [addressLine1, addressLine2, town].filter(Boolean).join(', '),
    lastKnownAddress: [addressLine1, addressLine2, town, postcode].filter(Boolean).join(', '),
    companyName: String(body.companyName || '').trim(),
    approvalStatus: existingRecord
      ? existingRecord.approvalStatus === 'New' && body.approveEntry === 'yes'
        ? 'Approved'
        : existingRecord.approvalStatus || 'Approved'
      : 'New',
    restrictionType: directorRestrictionTypes.includes(body.restrictionType) ? body.restrictionType : directorRestrictionTypes[0],
    restrictionStartDate: restrictionStartDate.value,
    restrictionEndDate: restrictionEndDate.value,
    restrictionStartTimestamp: restrictionStartDate.timestamp,
    restrictionStartSort: restrictionStartDate.timestamp,
    startDate: restrictionStartDate.value,
    endDate: restrictionEndDate.value,
    disqualificationLength,
    conductReason
  })
}

function directorRestrictionBasePath(version) {
  return `/director-disqualifications-register/${version}`
}

function directorRestrictionAdminSessionKey(version) {
  return `directorRegisterAdmin${version.toUpperCase()}`
}

function directorRestrictionIsAdmin(req) {
  return req.session[directorRestrictionAdminSessionKey(req.params.version)] === true
}

router.use('/director-disqualifications-register/:version', function (req, res, next) {
  const version = req.params.version
  if (!directorRestrictionRecordsByVersion[version]) {
    if (['index', 'index.html'].includes(version)) {
      return next()
    }
    return res.redirect('/director-disqualifications-register/index.html')
  }

  const basePath = directorRestrictionBasePath(version)
  res.set('Cache-Control', 'no-store')
  res.locals.registerVersion = version
  res.locals.registerBasePath = basePath
  res.locals.registerPath = `${basePath}/register.html`
  res.locals.registerDashboardPath = `${basePath}/admin/dashboard.html`
  res.locals.registerAdminSignOutPath = `${basePath}/admin/sign-out`
  res.locals.registerAdmin = directorRestrictionIsAdmin(req)
  res.locals.registerIsOnRegisterPage = req.originalUrl.split('?')[0] === `${basePath}/register.html`
  res.locals.registerIsOnDashboardPage = req.originalUrl.split('?')[0] === `${basePath}/admin/dashboard.html`
  next()
})

router.post('/director-disqualifications-register/:version/admin/sign-in', function (req, res) {
  req.session[directorRestrictionAdminSessionKey(req.params.version)] = true
  return res.redirect(`${directorRestrictionBasePath(req.params.version)}/admin/dashboard.html`)
})

router.post('/director-disqualifications-register/:version/admin/sign-out', function (req, res) {
  delete req.session[directorRestrictionAdminSessionKey(req.params.version)]
  return res.redirect(`${directorRestrictionBasePath(req.params.version)}/register.html`)
})

router.use('/director-disqualifications-register/:version/admin', function (req, res, next) {
  const isDashboard = req.method === 'GET' && ['/dashboard', '/dashboard.html'].includes(req.path)
  const isV2ViolenceEditPage = req.params.version === 'v2' && req.method === 'GET' && req.path === '/change-hide-address.html'
  const isV2ViolenceUpdate = req.params.version === 'v2' && req.method === 'POST' && req.path === '/update-hide-address'
  const isV2ConductReasonEditPage = req.params.version === 'v2' && req.method === 'GET' && req.path === '/change-conduct-reason.html'
  const isV2ConductReasonUpdate = req.params.version === 'v2' && req.method === 'POST' && req.path === '/update-conduct-reason'
  const isV2PublicationReadinessUpdate = req.params.version === 'v2' && req.method === 'POST' && req.path === '/update-publication-readiness'
  const isAdmin = directorRestrictionIsAdmin(req)

  if (!isDashboard && !isV2ViolenceEditPage && !isV2ConductReasonEditPage && !isAdmin) {
    return res.redirect(`${directorRestrictionBasePath(req.params.version)}/admin/dashboard.html`)
  }
  if (req.params.version === 'v2' && !isDashboard && !isV2ViolenceEditPage && !isV2ViolenceUpdate && !isV2ConductReasonEditPage && !isV2ConductReasonUpdate && !isV2PublicationReadinessUpdate) {
    return res.redirect(`${directorRestrictionBasePath(req.params.version)}/admin/dashboard.html`)
  }
  next()
})

function directorRestrictionStatusKey(record, currentTimestamp) {
  if (record.approvalStatus === 'New') {
    return 'new'
  }

  return record.restrictionStartTimestamp > currentTimestamp ? 'unpublished' : 'published'
}

function directorRestrictionStatusLabel(status, version) {
  if (status === 'new' && version === 'v1') {
    return 'Ready to approve'
  }

  const statusLabels = {
    new: 'Review and add conduct reason',
    unpublished: 'Ready to be published',
    published: 'Published'
  }
  return statusLabels[status] || status
}

function directorRestrictionStatus(record, currentTimestamp, version) {
  return directorRestrictionStatusLabel(directorRestrictionStatusKey(record, currentTimestamp), version)
}

router.get('/director-disqualifications-register/:version/admin/dashboard.html', function (req, res) {
  const records = directorRestrictionRecordsFor(req.params.version)
  const isAdmin = directorRestrictionIsAdmin(req)
  const searchTerm = String(req.query.searchTerm || '').trim()
  const normalizedSearchTerm = searchTerm.toLowerCase()
  const currentTimestamp = Date.now()
  const publishedCount = records.filter(function (record) {
    return record.approvalStatus === 'Approved' && record.restrictionStartTimestamp <= currentTimestamp
  }).length
  const unpublishedCount = records.filter(function (record) {
    return record.approvalStatus === 'Approved' && record.restrictionStartTimestamp > currentTimestamp
  }).length
  const approvedCount = records.filter(function (record) {
    return record.approvalStatus === 'Approved'
  }).length
  const newCount = records.filter(function (record) {
    return record.approvalStatus === 'New'
  }).length
  const results = isAdmin && normalizedSearchTerm
    ? records.filter(function (record) {
      return [record.fullName, record.companyNumber, record.companyName, record.lastKnownAddress]
        .some(function (value) {
          return String(value || '').toLowerCase().includes(normalizedSearchTerm)
        })
    }).slice(0, 100).map(function (record) {
      return Object.assign({}, record, { status: directorRestrictionStatus(record, currentTimestamp, req.params.version) })
    })
    : []

  return res.render(`director-disqualifications-register/${req.params.version}/admin/dashboard`, {
    searchTerm,
    results,
    totalEntries: records.length,
    publishedCount,
    unpublishedCount,
    approvedCount,
    newCount
  })
})

router.get('/director-disqualifications-register/:version/admin/new.html', function (req, res) {
  const version = req.params.version
  const basePath = directorRestrictionBasePath(version)
  return res.render(`director-disqualifications-register/${version}/admin/entry-form`, {
    pageHeading: 'Create a new register entry',
    formAction: `${basePath}/admin/create`,
    submitText: 'Create entry',
    record: {},
    editing: false,
    dateOfBirthParts: dateToInputParts(''),
    restrictionStartDateParts: dateToInputParts(''),
    restrictionEndDateParts: dateToInputParts(''),
    returnTo: registerReturnUrl(req.query.returnTo, version),
    disqualificationLengthInput: '',
    restrictionTypeOptions: directorRestrictionTypes.map(function (type) {
      return { value: type, text: type, checked: type === directorRestrictionTypes[0] }
    }),
    saved: false
  })
})

router.post('/director-disqualifications-register/:version/admin/create', function (req, res) {
  const version = req.params.version
  const records = directorRestrictionRecordsFor(version)
  const record = buildAdminRecord(req.body, nextDirectorRestrictionId(records), null, records)
  records.push(record)
  if (version === 'v1') {
    return res.redirect(`${directorRestrictionBasePath(version)}/restrictions-details.html?record=${record.id}&saved=created`)
  }
  return res.redirect(`${directorRestrictionBasePath(version)}/register.html?saved=created`)
})

router.get('/director-disqualifications-register/:version/admin/edit.html', function (req, res) {
  const version = req.params.version
  const records = directorRestrictionRecordsFor(version)
  const recordId = Number.parseInt(req.query.id, 10)
  const record = records.find(function (item) {
    return item.id === recordId
  })

  if (!record) {
    return res.redirect(`${directorRestrictionBasePath(version)}/admin/dashboard.html`)
  }

  return res.render(`director-disqualifications-register/${version}/admin/entry-form`, {
    pageHeading: 'Edit register entry',
    formAction: `${directorRestrictionBasePath(version)}/admin/update`,
    submitText: 'Save changes',
    record,
    editing: true,
    dateOfBirthParts: dateToInputParts(record.dateOfBirth),
    restrictionStartDateParts: dateToInputParts(record.restrictionStartDate),
    restrictionEndDateParts: dateToInputParts(record.restrictionEndDate),
    returnTo: registerDetailsReturnUrl(req.query.returnTo, version, recordId),
    disqualificationLengthInput: String(record.disqualificationLength || '').match(/^\d{1,2}/)?.[0] || '',
    restrictionTypeOptions: directorRestrictionTypes.map(function (type) {
      return { value: type, text: type, checked: type === record.restrictionType }
    }),
  })
})

router.post('/director-disqualifications-register/:version/admin/update', function (req, res) {
  const version = req.params.version
  const records = directorRestrictionRecordsFor(version)
  const recordId = Number.parseInt(req.body.id, 10)
  const recordIndex = records.findIndex(function (item) {
    return item.id === recordId
  })

  if (recordIndex === -1) {
    return res.redirect(`${directorRestrictionBasePath(version)}/admin/dashboard.html`)
  }

  records[recordIndex] = buildAdminRecord(req.body, recordId, records[recordIndex], records)
  const returnUrl = new URL(registerDetailsReturnUrl(req.body.returnTo, version, recordId), 'http://localhost')
  returnUrl.searchParams.set('saved', 'updated')
  return res.redirect(`${returnUrl.pathname}${returnUrl.search}`)
})

router.post('/director-disqualifications-register/:version/admin/approve', function (req, res) {
  const version = req.params.version
  const records = directorRestrictionRecordsFor(version)
  const recordId = Number.parseInt(req.body.id, 10)
  const record = records.find(function (item) {
    return item.id === recordId
  })

  if (!record) {
    return res.redirect(`${directorRestrictionBasePath(version)}/admin/dashboard.html`)
  }

  const isApproved = record.approvalStatus === 'New' && req.body.approveEntry === 'yes'
  if (isApproved) {
    record.approvalStatus = 'Approved'
  }

  const returnUrl = new URL(isApproved
    ? registerReturnUrl(req.body.returnTo, version)
    : registerDetailsReturnUrl(req.body.returnToDetails, version, recordId), 'http://localhost')
  if (isApproved) {
    returnUrl.searchParams.set('saved', 'approved')
  }
  return res.redirect(`${returnUrl.pathname}${returnUrl.search}`)
})

router.post('/director-disqualifications-register/v2/admin/update-hide-address', function (req, res) {
  const recordId = Number.parseInt(req.body.id, 10)
  const record = directorRestrictionRecordsFor('v2').find(function (item) {
    return item.id === recordId
  })

  if (!record) {
    return res.redirect('/director-disqualifications-register/v2/admin/dashboard.html')
  }

  if (req.body.hideAddress === 'yes' || req.body.hideAddress === 'no') {
    record.hideAddress = req.body.hideAddress === 'yes'
  }

  const returnUrl = new URL(registerDetailsReturnUrl(req.body.returnTo, 'v2', recordId), 'http://localhost')
  returnUrl.searchParams.set('saved', 'updated')
  return res.redirect(`${returnUrl.pathname}${returnUrl.search}`)
})

function normalizeDirectorRestrictionFilters(query, isRegisterAdmin) {
  const searchTerm = String(query.searchTerm || '').trim()
  const requestedDisqualificationTypes = Array.isArray(query.disqualificationType)
    ? query.disqualificationType
    : [query.disqualificationType]
  const disqualificationTypes = directorRestrictionTypes.filter(function (type) {
    return requestedDisqualificationTypes.includes(type)
  })
  const allowedDateRanges = ['all', '3', '6', '9']
  const dateRange = allowedDateRanges.includes(query.dateRange) ? query.dateRange : 'all'
  const allowedSortOrders = ['name-asc', 'name-desc', 'date-asc', 'date-desc']
  const requestedStatuses = Array.isArray(query.status) ? query.status : [query.status]
  const allowedStatuses = ['published', 'unpublished', 'new']
  const statuses = isRegisterAdmin
    ? allowedStatuses.filter(function (status) { return requestedStatuses.includes(status) })
    : []
  const requestedSortOrder = allowedSortOrders.includes(query.sortOrder) ? query.sortOrder : 'date-desc'
  const sortOrder = statuses.includes('new') ? 'date-asc' : requestedSortOrder

  return { searchTerm, disqualificationTypes, dateRange, sortOrder, statuses }
}

function directorRestrictionQueryString(filters, page) {
  const query = new URLSearchParams()
  query.set('searchTerm', filters.searchTerm)
  filters.disqualificationTypes.forEach(function (type) {
    query.append('disqualificationType', type)
  })
  query.set('dateRange', filters.dateRange)
  query.set('sortOrder', filters.sortOrder)
  filters.statuses.forEach(function (status) {
    query.append('status', status)
  })
  query.set('page', String(page))
  return query.toString()
}

function registerReturnUrl(value, version) {
  const registerPath = `${directorRestrictionBasePath(version)}/register.html`
  if (!value) {
    return registerPath
  }

  try {
    const url = new URL(String(value), 'http://localhost')
    if (url.origin !== 'http://localhost' || url.pathname !== registerPath) {
      return registerPath
    }
    return `${url.pathname}${url.search}`
  } catch {
    return registerPath
  }
}

function registerDetailsReturnUrl(value, version, recordId) {
  const detailsPath = `${directorRestrictionBasePath(version)}/restrictions-details.html`
  const fallback = `${detailsPath}?record=${recordId}`
  if (!value) {
    return fallback
  }

  try {
    const url = new URL(String(value), 'http://localhost')
    if (
      url.origin !== 'http://localhost' ||
      url.pathname !== detailsPath ||
      url.searchParams.get('record') !== String(recordId)
    ) {
      return fallback
    }
    return `${url.pathname}${url.search}`
  } catch {
    return fallback
  }
}

router.get('/director-disqualifications-register/v2/admin/change-hide-address.html', function (req, res) {
  const recordId = Number.parseInt(req.query.id, 10)
  const record = directorRestrictionRecordsFor('v2').find(function (item) {
    return item.id === recordId
  })

  if (!record) {
    return res.redirect('/director-disqualifications-register/v2/admin/dashboard.html')
  }

  return res.render('director-disqualifications-register/v2/admin/change-hide-address', {
    record,
    returnTo: registerDetailsReturnUrl(req.query.returnTo, 'v2', recordId)
  })
})

router.get('/director-disqualifications-register/v2/admin/change-conduct-reason.html', function (req, res) {
  const recordId = Number.parseInt(req.query.id, 10)
  const record = directorRestrictionRecordsFor('v2').find(function (item) {
    return item.id === recordId
  })

  if (!record) {
    return res.redirect('/director-disqualifications-register/v2/admin/dashboard.html')
  }

  return res.render('director-disqualifications-register/v2/admin/change-conduct-reason', {
    record,
    returnTo: registerDetailsReturnUrl(req.query.returnTo, 'v2', recordId),
    conductReasonText: (record.conductReason || []).join('\n\n')
  })
})

router.post('/director-disqualifications-register/v2/admin/update-conduct-reason', function (req, res) {
  const recordId = Number.parseInt(req.body.id, 10)
  const record = directorRestrictionRecordsFor('v2').find(function (item) {
    return item.id === recordId
  })

  if (!record) {
    return res.redirect('/director-disqualifications-register/v2/admin/dashboard.html')
  }

  record.conductReason = String(req.body.conductReason || '').split(/\r?\n/).map(function (paragraph) {
    return paragraph.trim()
  }).filter(Boolean)

  const returnUrl = new URL(registerDetailsReturnUrl(req.body.returnTo, 'v2', recordId), 'http://localhost')
  returnUrl.searchParams.set('saved', 'updated')
  return res.redirect(`${returnUrl.pathname}${returnUrl.search}`)
})

router.post('/director-disqualifications-register/v2/admin/update-publication-readiness', function (req, res) {
  const recordId = Number.parseInt(req.body.id, 10)
  const record = directorRestrictionRecordsFor('v2').find(function (item) {
    return item.id === recordId
  })

  if (!record) {
    return res.redirect('/director-disqualifications-register/v2/admin/dashboard.html')
  }

  const isReadyToPublish = record.approvalStatus === 'New' && record.conductReason.length && req.body.readyToPublish === 'yes'
  if (isReadyToPublish) {
    record.approvalStatus = 'Approved'
  }

  const returnUrl = new URL(isReadyToPublish
    ? registerReturnUrl(req.body.returnTo, 'v2')
    : registerDetailsReturnUrl(req.body.returnToDetails, 'v2', recordId), 'http://localhost')
  if (isReadyToPublish) {
    returnUrl.searchParams.set('saved', 'ready')
  }
  return res.redirect(`${returnUrl.pathname}${returnUrl.search}`)
})

router.get('/director-disqualifications-register/:version/restrictions-details.html', function (req, res) {
  const version = req.params.version
  const records = directorRestrictionRecordsFor(version)
  const basePath = directorRestrictionBasePath(version)
  const recordId = Number.parseInt(req.query.record, 10)
  const record = records[recordId]
  const isRegisterAdmin = directorRestrictionIsAdmin(req)

  if (!Number.isInteger(recordId) || recordId < 0 || !record || (!isRegisterAdmin && record.restrictionStartTimestamp > Date.now())) {
    return res.redirect(`${basePath}/register.html`)
  }

  const filters = normalizeDirectorRestrictionFilters(req.query, isRegisterAdmin)
  const requestedPage = Number.parseInt(req.query.page, 10)
  const page = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1
  const searchHref = `${basePath}/register.html?${directorRestrictionQueryString(filters, page)}`
  const detailsHref = `${basePath}/restrictions-details.html?record=${recordId}&${directorRestrictionQueryString(filters, page)}`
  const editHref = `${basePath}/admin/edit.html?id=${recordId}&returnTo=${encodeURIComponent(detailsHref)}`
  const readinessReturnHref = searchHref
  const violenceEditHref = version === 'v2'
    ? `${basePath}/admin/change-hide-address.html?id=${recordId}&returnTo=${encodeURIComponent(detailsHref)}`
    : ''
  const conductReasonEditHref = version === 'v2'
    ? `${basePath}/admin/change-conduct-reason.html?id=${recordId}&returnTo=${encodeURIComponent(detailsHref)}`
    : ''

  return res.render(`director-disqualifications-register/${version}/restrictions-details`, {
    record,
    status: directorRestrictionStatus(record, Date.now(), version),
    searchHref,
    editHref,
    detailsHref,
    saved: isRegisterAdmin && ['created', 'updated', 'ready', 'approved'].includes(req.query.saved) ? req.query.saved : '',
    readinessReturnHref,
    violenceEditHref,
    conductReasonEditHref
  })
})

router.get('/director-disqualifications-register/:version/register.html', function (req, res) {
  const version = req.params.version
  const records = directorRestrictionRecordsFor(version)
  const basePath = directorRestrictionBasePath(version)
  const isRegisterAdmin = directorRestrictionIsAdmin(req)
  const filters = normalizeDirectorRestrictionFilters(req.query, isRegisterAdmin)
  const normalizedSearchTerm = filters.searchTerm.toLowerCase()
  const currentTimestamp = Date.now()
  const dateCutoff = new Date()
  if (filters.dateRange !== 'all') {
    dateCutoff.setMonth(dateCutoff.getMonth() - Number(filters.dateRange))
  }
  const matchingRecords = records.filter(function (record) {
    const matchesText = !normalizedSearchTerm ||
      record.name.toLowerCase().includes(normalizedSearchTerm) ||
      ((!record.hideAddress || isRegisterAdmin) &&
        record.lastKnownAddress.toLowerCase().includes(normalizedSearchTerm))
    const matchesDisqualificationType = !filters.disqualificationTypes.length || filters.disqualificationTypes.includes(record.restrictionType)
    const matchesDateRange = filters.dateRange === 'all' || record.restrictionStartTimestamp >= dateCutoff.getTime()
    const matchesPublicationVisibility = isRegisterAdmin || record.restrictionStartTimestamp <= currentTimestamp
    const recordStatus = directorRestrictionStatusKey(record, currentTimestamp)
    const matchesStatus = !filters.statuses.length || filters.statuses.includes(recordStatus)

    return matchesText && matchesDisqualificationType && matchesDateRange && matchesPublicationVisibility && matchesStatus
  })
  matchingRecords.sort(function (firstRecord, secondRecord) {
    if (filters.sortOrder.startsWith('date')) {
      return filters.sortOrder === 'date-asc'
        ? firstRecord.restrictionStartSort - secondRecord.restrictionStartSort
        : secondRecord.restrictionStartSort - firstRecord.restrictionStartSort
    }

    const nameOrder = firstRecord.fullName.localeCompare(secondRecord.fullName)
    return filters.sortOrder === 'name-asc' ? nameOrder : -nameOrder
  })
  const resultsPerPage = 10
  const totalResults = matchingRecords.length
  const totalPages = Math.max(1, Math.ceil(totalResults / resultsPerPage))
  const requestedPage = Number.parseInt(req.query.page, 10)
  const currentPage = Number.isInteger(requestedPage)
    ? Math.min(Math.max(requestedPage, 1), totalPages)
    : 1
  const firstRecordIndex = (currentPage - 1) * resultsPerPage
  const results = matchingRecords.slice(firstRecordIndex, firstRecordIndex + resultsPerPage).map(function (record) {
    return Object.assign({}, record, { status: directorRestrictionStatus(record, currentTimestamp, version) })
  })
  const visiblePageNumbers = Array.from(new Set([
    1,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    totalPages
  ].filter(function (pageNumber) {
    return pageNumber >= 1 && pageNumber <= totalPages
  }))).sort(function (firstPage, secondPage) {
    return firstPage - secondPage
  })
  const paginationItems = []
  let previousPageNumber = 0

  visiblePageNumbers.forEach(function (pageNumber) {
    if (pageNumber - previousPageNumber > 1) {
      paginationItems.push({ ellipsis: true })
    }
    paginationItems.push({
      number: pageNumber,
      href: pageHref(pageNumber),
      current: pageNumber === currentPage
    })
    previousPageNumber = pageNumber
  })

  function pageHref(pageNumber) {
    return `?${directorRestrictionQueryString(filters, pageNumber)}`
  }

  results.forEach(function (record) {
    record.detailsHref = `${basePath}/restrictions-details.html?record=${record.id}&${directorRestrictionQueryString(filters, currentPage)}`
  })

  const appliedFilters = []
  const activeFilters = []
  function activeFilterHref(overrides) {
    const updatedFilters = Object.assign({}, filters, overrides)
    return `${basePath}/register.html?${directorRestrictionQueryString(updatedFilters, 1)}`
  }

  if (filters.searchTerm) {
    appliedFilters.push(filters.searchTerm)
    activeFilters.push({
      label: `Name, Postcode or Area: ${filters.searchTerm}`,
      href: activeFilterHref({ searchTerm: '' })
    })
  }
  filters.disqualificationTypes.forEach(function (type) {
    appliedFilters.push(type)
    activeFilters.push({
      label: `Type: ${type}`,
      href: activeFilterHref({
        disqualificationTypes: filters.disqualificationTypes.filter(function (selectedType) {
          return selectedType !== type
        })
      })
    })
  })
  if (filters.dateRange !== 'all') {
    const dateLabel = `Last ${filters.dateRange} months`
    appliedFilters.push(dateLabel)
    activeFilters.push({
      label: `Date: ${dateLabel}`,
      href: activeFilterHref({ dateRange: 'all' })
    })
  }
  filters.statuses.forEach(function (status) {
    activeFilters.push({
      label: `Status: ${directorRestrictionStatusLabel(status, version)}`,
      href: activeFilterHref({ statuses: filters.statuses.filter(function (selectedStatus) { return selectedStatus !== status }) })
    })
  })

  const sortOrderOptions = [
    { value: 'name-asc', text: 'Name (A to Z)', checked: filters.sortOrder === 'name-asc' },
    { value: 'name-desc', text: 'Name (Z to A)', checked: filters.sortOrder === 'name-desc' },
    { value: 'date-asc', text: 'Oldest disqualification date', checked: filters.sortOrder === 'date-asc' },
    { value: 'date-desc', text: 'Newest disqualification date', checked: filters.sortOrder === 'date-desc' }
  ]
  const statusOptions = ['published', 'unpublished', 'new'].map(function (status) {
    return {
      value: status,
      text: directorRestrictionStatusLabel(status, version),
      checked: filters.statuses.includes(status)
    }
  })

  res.render(`director-disqualifications-register/${version}/register`, {
    saved: isRegisterAdmin && ['created', 'updated', 'ready', 'approved'].includes(req.query.saved) ? req.query.saved : '',
    searchTerm: filters.searchTerm,
    disqualificationTypes: filters.disqualificationTypes,
    dateRange: filters.dateRange,
    statuses: filters.statuses,
    statusOptions: isRegisterAdmin ? statusOptions : [],
    appliedFilters,
    activeFilters,
    dateRangeOptions: [
     
      { value: '3', text: 'Last 3 months', checked: filters.dateRange === '3' },
      { value: '6', text: 'Last 6 months', checked: filters.dateRange === '6' },
      { value: '9', text: 'Last 9 months', checked: filters.dateRange === '9' },
      { value: 'all', text: 'All dates', checked: filters.dateRange === 'all' }
    ],
    sortOrder: filters.sortOrder,
    disqualificationTypeOptions: directorRestrictionTypes.map(function (type) {
      return { value: type, text: type, checked: filters.disqualificationTypes.includes(type) }
    }),
    sortOrderOptions,
    results,
    totalResults,
    firstResult: totalResults ? firstRecordIndex + 1 : 0,
    lastResult: Math.min(firstRecordIndex + results.length, totalResults),
    currentPage,
    totalPages,
    paginationItems,
    previousPageHref: currentPage > 1 ? pageHref(currentPage - 1) : null,
    nextPageHref: currentPage < totalPages ? pageHref(currentPage + 1) : null
  })
})

router.get('/ipservice/dcrs/v3/prepare-check-and-submit-change', function (req, res) {
  const destination = req.query.destination
  const focus = req.query.focus
  const allowedFields = checkAndSubmitChangeFields[destination]

  if (!allowedFields || !allowedFields.includes(focus)) {
    return res.redirect('/ipservice/dcrs/v3/check-and-submit-report.html')
  }

  req.session.data.returnToCheckAndSubmit = true

  if (destination === 'company-information/edit-company-bank-account') {
    const index = Number.parseInt(req.query.index, 10)
    const accounts = req.session.data.companyBankAccounts || []
    if (!Number.isInteger(index) || index < 0 || !accounts[index]) {
      delete req.session.data.returnToCheckAndSubmit
      return res.redirect('/ipservice/dcrs/v3/check-and-submit-report.html')
    }

    return res.redirect(`/ipservice/dcrs/v3/${destination}?index=${index}&focus=${encodeURIComponent(focus)}`)
  }

  return res.redirect(`/ipservice/dcrs/v3/${destination}#${encodeURIComponent(focus)}`)
})

router.post('/ipservice/dcrs/v1/company-information/confirm-company', function (req, res) {
  if (req.body.correctCompany === 'yes') {
    return res.redirect('/ipservice/dcrs/v1/company-information/company-details.html')
  }

  return res.redirect('/ipservice/dcrs/v1/company-information/add-company-number.html')
})

router.post('/ipservice/dcrs/v2/company-information/confirm-company', function (req, res) {
  if (req.body.correctCompany === 'yes') {
    return res.redirect('/ipservice/dcrs/v2/company-information/company-details.html')
  }

  return res.redirect('/ipservice/dcrs/v2/company-information/add-company-number.html')
})

router.post(dcrsRoutePaths('director-information/company-directors-answer'), function (req, res) {
  req.session.data.addAnotherDirector = req.body.addAnotherDirector
  if (req.body.addAnotherDirector === 'yes') {
    return res.redirect(dcrsRedirect(req, 'director-information/type-of-director-guard.html'))
  }
  return res.redirect(dcrsRedirect(req, 'report-overview.html'))
})

router.post(dcrsRoutePaths('director-information/type-of-director-answer'), function (req, res) {
  req.session.data.directorType = req.body.directorType
  req.session.data.directorDeceased = ''
  return res.redirect(dcrsRedirect(req, 'director-information/director-details.html'))
})

router.post(dcrsRoutePaths('director-information/deceased-director-answer'), function (req, res) {
  req.session.data.directorDeceased = req.body.directorDeceased
  const director = req.session.data.pendingCompanyDirector
  if (director) {
    director.deceased = req.body.directorDeceased
    req.session.data.addedCompanyDirectors = req.session.data.addedCompanyDirectors || []
    req.session.data.addedCompanyDirectors.push(director)
    delete req.session.data.pendingCompanyDirector
  }
  return res.redirect(dcrsRedirect(req, 'director-information/company-directors.html'))
})

router.post(dcrsRoutePaths('director-information/director-details-answer'), function (req, res) {
  const directorType = req.session.data.directorType || req.body.directorType
  const fullName = directorType === 'corporate'
    ? req.body.directorOrganisationName
    : req.body.directorFullName
  const director = {
    type: directorType,
    title: directorType === 'individual' ? req.body.directorTitle : 'Corporate',
    fullName,
    companyNumber: req.body.directorOrganisationNumber,
    dateOfBirth: [req.body['directorDateOfBirth-day'], req.body['directorDateOfBirth-month'], req.body['directorDateOfBirth-year']].filter(Boolean).join('/'),
    address: [
      req.body.directorAddressLine1,
      req.body.directorAddressLine2,
      req.body.directorAddressTown,
      req.body.directorAddressPostcode
    ].filter(Boolean).join(', '),
    hasEmailAddress: req.body.directorHasEmailAddress,
    email: req.body.directorEmail,
    hasPhoneNumber: req.body.directorHasPhoneNumber,
    phone: req.body.directorPhone
  }

  req.session.data.addedCompanyDirectors = req.session.data.addedCompanyDirectors || []
  if (directorType === 'individual') {
    req.session.data.pendingCompanyDirector = director
    return res.redirect(dcrsRedirect(req, 'director-information/deceased-director-guard.html'))
  }

  req.session.data.addedCompanyDirectors.push(director)

  return res.redirect(dcrsRedirect(req, 'director-information/company-directors.html'))
})

router.post(dcrsRoutePaths('company-information/save-and-return'), function (req, res) {
  Object.assign(req.session.data, req.body)

  if (req.session.data.editingCompanyBankAccount) {
    const editIndex = Number.parseInt(req.session.data.companyBankAccountEditIndex, 10)
    const accounts = req.session.data.companyBankAccounts || []

    if (Number.isInteger(editIndex) && accounts[editIndex]) {
      accounts[editIndex] = {
        companyBankProviderName: req.body.companyBankProviderName,
        companyBankAccountName: req.body.companyBankAccountName,
        companyBankSortCode: req.body.companyBankSortCode,
        companyBankAccountNumber: req.body.companyBankAccountNumber,
        companyBuildingSocietyRollNumber: req.body.companyBuildingSocietyRollNumber,
        holdsUnmarkedBankStatements: req.body.holdsUnmarkedBankStatements,
        companyBankAccountAnalysisCompleted: req.body.companyBankAccountAnalysisCompleted
      }
    }

    delete req.session.data.companyBankAccountEditIndex
    delete req.session.data.editingCompanyBankAccount
  }

  if (req.originalUrl.startsWith('/ipservice/dcrs/v3/') && req.session.data.returnToCheckAndSubmit) {
    delete req.session.data.returnToCheckAndSubmit
    return res.redirect('/ipservice/dcrs/v3/check-and-submit-report.html')
  }

  return res.redirect(dcrsRedirect(req, 'report-overview.html'))
})

router.post('/ipservice/dcrs/v1/company-information/confirm-address', function (req, res) {
  if (req.body.principalTradingAddress === 'yes') {
    return res.redirect('/ipservice/dcrs/v1/company-information/dates-traded.html')
  }

  return res.redirect('/ipservice/dcrs/v1/company-information/address-manual.html')
})

router.post(dcrsRoutePaths('company-information/confirm-address'), function (req, res) {
  if (req.body.principalTradingAddress === 'yes') {
    return res.redirect(dcrsRedirect(req, 'company-information/dates-traded.html'))
  }

  return res.redirect(dcrsRedirect(req, 'company-information/address-manual.html'))
})

router.post('/ipservice/dcrs/v3/company-information/confirm-principle-address-answer', function (req, res) {
  return res.redirect('/ipservice/dcrs/v3/company-information/dates-traded.html')
})

router.post('/ipservice/dcrs/v1/company-information/bank-detail-guard-answer', function (req, res) {
  if (req.body.holdsCompanyBankingDetails === 'Yes') {
    return res.redirect('/ipservice/dcrs/v1/company-information/add-company-bank-details.html')
  }

  return res.redirect('/ipservice/dcrs/v1/report-overview.html')
})

router.post(dcrsRoutePaths('company-information/bank-detail-guard-answer'), function (req, res) {
  if (req.body.holdsCompanyBankingDetails === 'yes') {
    return res.redirect(dcrsRedirect(req, 'company-information/company-bank-accounts.html'))
  }

  return res.redirect(dcrsRedirect(req, 'company-information/electronic-records.html'))
})

router.post(dcrsRoutePaths('company-information/electronic-records-answer'), function (req, res) {
  if (req.body.holdsElectronicRecords === 'yes') {
    return res.redirect(dcrsRedirect(req, 'company-information/electronic-records-available-guard.html'))
  }

  return res.redirect(dcrsRedirect(req, 'report-overview.html'))
})

router.post(dcrsRoutePaths('company-information/electronic-records-available-answer'), function (req, res) {
  if (req.body.electronicRecordsAvailable === 'yes') {
    return res.redirect(dcrsRedirect(req, 'company-information/electronic-records-obtain.html'))
  }

  return res.redirect(dcrsRedirect(req, 'report-overview.html'))
})

router.post(dcrsRoutePaths('company-information/electronic-records-obtain-answer'), function (req, res) {
  return res.redirect(dcrsRedirect(req, 'report-overview.html'))
})

router.post('/ipservice/dcrs/v1/company-information/company-bank-accounts-answer', function (req, res) {
  if (req.body.addAnotherCompanyBankAccount === 'yes') {
    return res.redirect('/ipservice/dcrs/v1/company-information/add-company-bank-details.html')
  }

  return res.redirect('/ipservice/dcrs/v1/report-overview.html')
})

router.post(dcrsRoutePaths('company-information/company-bank-accounts-answer'), function (req, res) {
  if (req.body.addAnotherCompanyBankAccount === 'yes') {
    req.session.data.companyBankProviderName = ''
    req.session.data.companyBankAccountName = ''
    req.session.data.companyBankSortCode = ''
    req.session.data.companyBankAccountNumber = ''
    req.session.data.companyBuildingSocietyRollNumber = ''
    return res.redirect(dcrsRedirect(req, 'company-information/add-company-bank-details.html'))
  }

  if (req.originalUrl.startsWith('/ipservice/dcrs/v3/')) {
    return res.redirect(dcrsRedirect(req, 'company-information/electronic-records.html'))
  }

  return res.redirect(dcrsRedirect(req, 'company-information/bank-account-analysis.html'))
})

router.get(dcrsRoutePaths('company-information/edit-company-bank-account'), function (req, res) {
  const index = Number.parseInt(req.query.index, 10)
  const accounts = req.session.data.companyBankAccounts || []
  const account = accounts[index]

  if (!Number.isInteger(index) || !account) {
    delete req.session.data.returnToCheckAndSubmit
    return res.redirect(dcrsRedirect(req, 'company-information/company-bank-accounts.html'))
  }

  req.session.data.companyBankAccountEditIndex = index
  req.session.data.editingCompanyBankAccount = true
  req.session.data.companyBankProviderName = account.companyBankProviderName || ''
  req.session.data.companyBankAccountName = account.companyBankAccountName || ''
  req.session.data.companyBankSortCode = account.companyBankSortCode || ''
  req.session.data.companyBankAccountNumber = account.companyBankAccountNumber || ''
  req.session.data.companyBuildingSocietyRollNumber = account.companyBuildingSocietyRollNumber || ''
  req.session.data.holdsUnmarkedBankStatements = account.holdsUnmarkedBankStatements || ''
  req.session.data.companyBankAccountAnalysisCompleted = account.companyBankAccountAnalysisCompleted || ''

  const focus = checkAndSubmitChangeFields['company-information/edit-company-bank-account'].includes(req.query.focus)
    ? `#${encodeURIComponent(req.query.focus)}`
    : ''
  return res.redirect(`${dcrsRedirect(req, 'company-information/add-company-bank-details.html')}${focus}`)
})

router.get(dcrsRoutePaths('company-information/prepare-remove-bank-account'), function (req, res) {
  const index = Number.parseInt(req.query.index, 10)
  const accounts = req.session.data.companyBankAccounts || []

  if (!Number.isInteger(index) || index < 0 || !accounts[index]) {
    return res.redirect(dcrsRedirect(req, 'company-information/company-bank-accounts.html'))
  }

  req.session.data.removeCompanyBankAccountIndex = index
  return res.redirect(dcrsRedirect(req, 'company-information/remove-bank-account.html'))
})

router.post(dcrsRoutePaths('company-information/remove-bank-account-answer'), function (req, res) {
  const index = Number.parseInt(req.session.data.removeCompanyBankAccountIndex, 10)
  const accounts = req.session.data.companyBankAccounts || []

  if (req.body.removeCompanyBankAccount === 'yes' && Number.isInteger(index) && index >= 0 && accounts[index]) {
    accounts.splice(index, 1)
  }

  delete req.session.data.removeCompanyBankAccountIndex
  return res.redirect(dcrsRedirect(req, 'company-information/company-bank-accounts.html'))
})

function saveCompanyBankAccount(req, account) {
  req.session.data.companyBankAccounts = req.session.data.companyBankAccounts || []

  const editIndex = Number.parseInt(req.session.data.companyBankAccountEditIndex, 10)
  if (req.session.data.editingCompanyBankAccount && Number.isInteger(editIndex) && req.session.data.companyBankAccounts[editIndex]) {
    req.session.data.companyBankAccounts[editIndex] = account
  } else {
    req.session.data.companyBankAccounts.push(account)
  }

  delete req.session.data.companyBankAccountEditIndex
  delete req.session.data.editingCompanyBankAccount

  req.session.data.companyBankProviderName = ''
  req.session.data.companyBankAccountName = ''
  req.session.data.companyBankSortCode = ''
  req.session.data.companyBankAccountNumber = ''
  req.session.data.companyBuildingSocietyRollNumber = ''
  req.session.data.holdsUnmarkedBankStatements = ''
  req.session.data.companyBankAccountAnalysisCompleted = ''
}

router.post(dcrsRoutePaths('company-information/add-company-bank-details'), function (req, res) {
  const editingCompanyBankAccount = req.session.data.editingCompanyBankAccount
  const account = {
    companyBankProviderName: req.body.companyBankProviderName,
    companyBankAccountName: req.body.companyBankAccountName,
    companyBankSortCode: req.body.companyBankSortCode,
    companyBankAccountNumber: req.body.companyBankAccountNumber,
    companyBuildingSocietyRollNumber: req.body.companyBuildingSocietyRollNumber,
    holdsUnmarkedBankStatements: req.body.holdsUnmarkedBankStatements,
    companyBankAccountAnalysisCompleted: req.body.companyBankAccountAnalysisCompleted
  }

  if (req.originalUrl.startsWith('/ipservice/dcrs/v3/')) {
    saveCompanyBankAccount(req, account)
    if (req.session.data.returnToCheckAndSubmit) {
      if (editingCompanyBankAccount) {
        delete req.session.data.returnToCheckAndSubmit
        return res.redirect('/ipservice/dcrs/v3/check-and-submit-report.html')
      }
      return res.redirect('/ipservice/dcrs/v3/company-information/company-bank-accounts.html')
    }
    return res.redirect(dcrsRedirect(req, 'company-information/company-bank-accounts.html'))
  }

  if (String(req.body.holdsUnmarkedBankStatements).toLowerCase() === 'no') {
    req.session.data.companyBankAccountDraft = account
    return res.redirect(dcrsRedirect(req, 'company-information/bank-account-analysis.html'))
  }

  saveCompanyBankAccount(req, account)
  return res.redirect(dcrsRedirect(req, 'company-information/company-bank-accounts.html'))
})



// Route from upload to form-validation-errors
router.post('/ipservice/ip-upload/v2/upload', function (req, res) {
  // Simulate validation - for demo purposes, always show errors first
  // In a real app, you'd validate the uploaded file here
  res.redirect('/ipservice/ip-upload/v2/form-validation-errors')
})

// Route from form-validation-errors back to upload
router.post('/ipservice/ip-upload/v2/form-validation-errors', function (req, res) {

  req.session.data['form-validation-errors'] = "yes"
  res.redirect('/ipservice/ip-upload/v2/upload')


})

// Route from upload to check-your-answers (when validation passes)
router.post('/ipservice/ip-upload/v2/upload-success', function (req, res) {
  res.redirect('/ipservice/ip-upload/v2/check-your-answers')
})


// Route from upload to form-validation-errors
router.post('/ipservice/ip-upload/v3/uploadV3', function (req, res) {
  // Simulate validation - for demo purposes, always show errors first
  // In a real app, you'd validate the uploaded file here
  res.redirect('/ipservice/ip-upload/v3/form-validation-errors')
})

// Route from form-validation-errors back to upload
router.post('/ipservice/ip-upload/v3/form-validation-errorsV3', function (req, res) { 
  req.session.data['form-validation-errorsV3'] = "yes"
  res.redirect('/ipservice/ip-upload/v3/upload')


})

// Route from upload to check-your-answers (when validation passes)
router.post('/ipservice/ip-upload/v3/upload-successV3', function (req, res) {
  res.redirect('/ipservice/ip-upload/v3/check-your-answers')
})



// Route from upload to form-validation-errors
router.post('/ipservice/ip-upload/v4/uploadV4', function (req, res) {
  // Simulate validation - for demo purposes, always show errors first
  // In a real app, you'd validate the uploaded file here
  res.redirect('/ipservice/ip-upload/v4/form-validation-errors')
})

// Route from form-validation-errors back to upload
router.post('/ipservice/ip-upload/v4/form-validation-errorsV4', function (req, res) { 
  req.session.data['form-validation-errorsV4'] = "yes"
  res.redirect('/ipservice/ip-upload/v4/upload')


})

// Route from upload to check-your-answers (when validation passes)
router.post('/ipservice/ip-upload/v4/upload-successV4', function (req, res) {
  res.redirect('/ipservice/ip-upload/v4/check-your-answers')
})


// Route from upload to form-validation-errors
router.post('/ipservice/ip-upload/v5/uploadV5', function (req, res) {
  // Simulate validation - for demo purposes, always show errors first
  // In a real app, you'd validate the uploaded file here
  res.redirect('/ipservice/ip-upload/v5/form-validation-errors')
})

// Route from form-validation-errors back to upload
router.post('/ipservice/ip-upload/v5/form-validation-errorsV5', function (req, res) { 
  req.session.data['form-validation-errorsV5'] = "yes"
  res.redirect('/ipservice/ip-upload/v5/upload')


})

// Route from upload to check-your-answers (when validation passes)
router.post('/ipservice/ip-upload/v5/upload-successV5', function (req, res) {
  res.redirect('/ipservice/ip-upload/v5/employer-details')
})





router.post('/ipservice/ip-upload/v4/employer',  function(request, response) {
  
    var employerName = request.session.data['employerName']
    if (employerName == "No"){
        response.redirect("/ipservice/ip-upload/v4/incorrect-employer")
    } else {
        response.redirect("/ipservice/ip-upload/v4/form-validation-errors")
    }
})



router.post('/ipservice/ip-upload/v5/employer',  function(request, response) {
  
    var employerName = request.session.data['employerName']
    if (employerName == "No"){
        response.redirect("/ipservice/ip-upload/v5/incorrect-employer")
    } else {
        response.redirect("/ipservice/ip-upload/v5/check-your-answers")
    }
})


// Route from upload to form-validation-errors
router.post('/ipservice/ip-upload/v5b/uploadV5', function (req, res) {
  // Simulate validation - for demo purposes, always show errors first
  // In a real app, you'd validate the uploaded file here
  res.redirect('/ipservice/ip-upload/v5b/form-validation-errors')
})

// Route from form-validation-errors back to upload
router.post('/ipservice/ip-upload/v5b/form-validation-errorsV5', function (req, res) { 
  req.session.data['form-validation-errorsV5'] = "yes"
  res.redirect('/ipservice/ip-upload/v5b/upload')


})

// Route from upload to check-your-answers (when validation passes)
router.post('/ipservice/ip-upload/v5b/upload-successV5', function (req, res) {
  res.redirect('/ipservice/ip-upload/v5b/check-your-answers')
})


router.post('/ipservice/ip-upload/v5b/employer',  function(request, response) {
  
    var employerName = request.session.data['employerName']
    if (employerName == "No"){
        response.redirect("/ipservice/ip-upload/v5b/case-reference-number")
    } else {
        response.redirect("/ipservice/ip-upload/v5b/upload")
    }
})


// Route from upload to form-validation-errors
router.post('/ipservice/ip-upload/v6/uploadV6', function (req, res) {
  // Simulate validation - for demo purposes, always show errors first
  // In a real app, you'd validate the uploaded file here
  res.redirect('/ipservice/ip-upload/v6/form-validation-errors')
})

// Route from form-validation-errors back to upload
router.post('/ipservice/ip-upload/v6/form-validation-errorsV6', function (req, res) { 
  req.session.data['form-validation-errorsV6'] = "yes"
  res.redirect('/ipservice/ip-upload/v6/upload')


})

// Route from upload to check-your-answers (when validation passes)
router.post('/ipservice/ip-upload/v6/upload-successV6', function (req, res) {
  res.redirect('/ipservice/ip-upload/v6/check-your-answers')
})


router.post('/ipservice/ip-upload/v6/employer',  function(request, response) {
  
    var employerName = request.session.data['employerName']
    if (employerName == "No"){
        response.redirect("/ipservice/ip-upload/v6/case-reference-number")
    } else {
        response.redirect("/ipservice/ip-upload/v6/upload")
    }
})











router.post('/customer-forms/v1/uploadDocumentsQuestion', function(request, response) {

    var uploadDocuments = request.session.data['uploadDocuments']
    if (uploadDocuments == "Yes"){
        response.redirect("/customer-forms/v1/upload")
    } else {
        response.redirect("/customer-forms/v1/check-your-answers")
        request.session.data['checkAnswers'] = 'true'
    }
})

router.post('/customer-forms/v1/uploadDocument', function(request, response) {

   
        response.redirect("/customer-forms/v1/check-your-answers")
        request.session.data['checkAnswers'] = 'true'
    
})

router.post('/customer-forms/v1/uploadAnotherDocument', function(request, response) {

    var addAnotherDoc = request.session.data['uploadAnotherDocument']
    if (addAnotherDoc == "yes"){
        response.redirect("/customer-forms/v1/upload")
    } else {
        response.redirect("/customer-forms/v1/check-your-answers")
    }
})

router.post('/customer-forms/v1/checkYourAnswers', function(request, response) {
    response.redirect('/customer-forms/v1/check-your-answers')
    request.session.data['checkAnswers'] = 'true'
})

router.post('/customer-forms/v1/ip-complaint/start-content-route', function(request, response) {

    var complainedBefore = request.session.data['complainedBefore']
    if (complainedBefore == "yes"){
        response.redirect("/customer-forms/v1/ip-complaint/already-reviewed")
    } else {
        response.redirect("/customer-forms/v1/not-eligible-for-this-service")
    }
})


router.post('/customer-forms/v1/ip-complaint/already-reviewed', function(request, response) {

    var complaintConsidered = request.session.data['complaintConsidered']
    if (complaintConsidered == "yes"){
        response.redirect("/customer-forms/v1/not-eligible-for-this-service")
    } else {
        response.redirect("/customer-forms/v1/name")
    }
})


router.post('/customer-forms/v1/ip-complaint/authorising-body', function(request, response) {

    var authorisingBody = request.session.data['authorisingBody']
    if (authorisingBody == "None of the above"){
        response.redirect("/customer-forms/v1/not-eligible-for-this-service")
    } else {
        response.redirect("/customer-forms/v1/ip-complaint/is-your-complaint-about-the-individual-or-a-company")
    }
})

router.post('/customer-forms/v1/ip-complaint/individual-or-company', function(request, response) {

    var individualOrCompany = request.session.data['individualOrCompany']
    if (individualOrCompany == "individual"){
        response.redirect("/customer-forms/v1/ip-complaint/what-type-of-individual-insolvency-procedure-was-it-about")
    } else {
        response.redirect("/customer-forms/v1/ip-complaint/what-type-of-insolvency-was-it-about")
    }
})

router.post('/customer-forms/v1/is-complaint/isComplaint', function(request, response) {

    var isComplaint = request.session.data['isComplaint']
    if (isComplaint == "none"){
        response.redirect("/customer-forms/v1/is-complaint/your-complaint-is-not-about-the-insolvency-service")
    } else {
         response.redirect("/customer-forms/v1/name")
    }
})


router.post('/customer-forms/v1/removeUpload', function(request, response) {

    var removeDocuments = request.session.data['removeDocuments']
    if (removeDocuments == "Yes"){
        response.redirect("/customer-forms/v1/upload-list")
    } else {
        response.redirect("/customer-forms/v1/upload")
    }
})



router.post('/customer-forms/v1/company-complaint/activeDissolved', function(request, response) {

    var removeDocuments = request.session.data['activeOrDissolved']
    if (removeDocuments == "Dissolved"){
        response.redirect("/customer-forms/v1/company-complaint/active-dissolved-companies-house")
    } else {
        response.redirect("/customer-forms/v1/company-complaint/about-you")
    }
})



router.post('/customer-forms/v1/company-complaint/companiesHouse', function(request, response) {

    var removeDocuments = request.session.data['companiesHouse']
    if (removeDocuments == "Yes"){
        response.redirect("/customer-forms/v1/company-complaint/active-dissolved-plc-ltd")
    } else {
        response.redirect("/customer-forms/v1/company-complaint/no-service")
    }
})

router.post('/customer-forms/v1/company-complaint/plcLtd', function(request, response) {

    var removeDocuments = request.session.data['plcLtd']
    if (removeDocuments == "Yes"){
        response.redirect("/customer-forms/v1/company-complaint/active-dissolved-after-3-years")
    } else {
        response.redirect("/customer-forms/v1/company-complaint/no-service")
    }
})


router.post('/customer-forms/v1/company-complaint/afterDissolved3', function(request, response) {

    var removeDocuments = request.session.data['afterDissolved3']
    if (removeDocuments == "Yes"){
        response.redirect("/customer-forms/v1/company-complaint/active-dissolved-after")
    } else {
        response.redirect("/customer-forms/v1/company-complaint/no-service")
    }
})



router.post('/customer-forms/v1/company-complaint/afterDissolved', function(request, response) {

    var removeDocuments = request.session.data['afterDissolved']
    if (removeDocuments == "Yes"){
        response.redirect("/customer-forms/v1/company-complaint/about-you")
    } else {
        response.redirect("/customer-forms/v1/company-complaint/no-service")
    }
})


router.post('/customer-forms/v1/company-complaint/aboutYou', function(request, response) {

    var removeDocuments = request.session.data['aboutYou']
    if (removeDocuments == "Yes"){
        response.redirect("/customer-forms/v1/name")
    } else {
        response.redirect("/customer-forms/v1/company-complaint/company-name")
    }
})

router.post('/customer-forms/v1/company-complaint/financialLoss', function(request, response) {

    var removeDocuments = request.session.data['financialLoss']
    if (removeDocuments == "Yes"){
        response.redirect("/customer-forms/v1/company-complaint/financial-loss-amount")
    } else {
        response.redirect("/customer-forms/v1/company-complaint/question")
    }
})


router.post('/customer-forms/v1/company-complaint/addAnotherCompany', function(request, response) {

    var addCompany = request.session.data['anotherCompany']
    if (addCompany == "Yes"){
        response.redirect("/customer-forms/v1/company-complaint/company-name")
    } else {
        response.redirect("/customer-forms/v1/upload-guard")
    }
})






router.post('/customer-forms/v1/general-enquiry/start', function(request, response) {

    request.session.data['contactReason'] = 'General enquiry'
    request.session.data['organisation'] = 'false'
    request.session.data['address'] = 'false'
    request.session.data['dob'] = 'false'
    request.session.data['phone'] = 'false'
    request.session.data['upload'] = 'false'
    response.redirect("/customer-forms/v1/general-enquiry/start")

})

router.post('/customer-forms/v1/ip-complaint/start', function(request, response) {

    request.session.data['contactReason'] = 'Complain about an insolvency practitioner'
    request.session.data['organisation'] = 'true'
    request.session.data['address'] = 'false'
    request.session.data['dob'] = 'false'
    request.session.data['phone'] = 'false'
    request.session.data['upload'] = 'true'
    response.redirect("/customer-forms/v1/ip-complaint/start")

})


router.post('/customer-forms/v1/company-complaint/start', function(request, response) {

    request.session.data['contactReason'] = 'Company complaints form'
    request.session.data['organisation'] = 'true'
    request.session.data['address'] = 'false'
    request.session.data['dob'] = 'false'
    request.session.data['phone'] = 'true'
    request.session.data['upload'] = 'false'
    response.redirect("/customer-forms/v1/company-complaint/start")

})


router.post('/customer-forms/v1/is-complaint/start', function(request, response) {

    request.session.data['contactReason'] = 'Complain about the Insolvency Service'
    request.session.data['organisation'] = 'false'
    request.session.data['address'] = 'false'
    request.session.data['dob'] = 'false'
    request.session.data['phone'] = 'false'
    request.session.data['upload'] = 'false'
    response.redirect("/customer-forms/v1/is-complaint/start")

})


router.post('/customer-forms/v1/ies-breach/start', function(request, response) {

    request.session.data['contactReason'] = 'Investigations and enforcement services breach questionnaire'
    request.session.data['organisation'] = 'true'
    request.session.data['address'] = 'false'
    request.session.data['dob'] = 'false'
    request.session.data['phone'] = 'false'
    request.session.data['upload'] = 'true'
    response.redirect("/customer-forms/v1/ies-breach/start")

})

router.post('/customer-forms/v1/contentStart', function(request, response) {

    var reason = request.session.data['contactReason']
     
    request.session.data['checkAnswers'] = 'false'

    if (reason == "General enquiry"){

       request.session.data['organisation'] = 'false'
       request.session.data['address'] = 'true'
       request.session.data['dob'] = 'true'
        request.session.data['phone'] = 'true'
       request.session.data['upload'] = 'false'

        response.redirect("/customer-forms/v1/general-enquiry/start")
    } 
    
    else if (reason == "Complain about an insolvency practitioner"){
           
            request.session.data['organisation'] = 'true'
            request.session.data['address'] = 'true'
            request.session.data['dob'] = 'false'
               request.session.data['phone'] = 'false'
            request.session.data['upload'] = 'true'

        response.redirect("/customer-forms/v1/ip-complaint/start")
    }

      else if (reason == "Investigations and Enforcement Services"){

            request.session.data['organisation'] = 'false'
            request.session.data['address'] = 'false'
            request.session.data['dob'] = 'false'
               request.session.data['phone'] = 'false'
            request.session.data['upload'] = 'false'
        
        response.redirect("/customer-forms/v1/ies-complaint/start")
    }


        else if (reason == "Complain about the Insolvency Service"){
 
            request.session.data['organisation'] = 'false'
            request.session.data['address'] = 'false'
            request.session.data['dob'] = 'false'
            request.session.data['phone'] = 'false'
            request.session.data['upload'] = 'false'

        response.redirect("/customer-forms/v1/is-complaint/start")
    }

        else if (reason == "Investigations and Enforcement Services Breach Questionnaire"){
     
            request.session.data['organisation'] = 'false'
            request.session.data['address'] = 'false'
            request.session.data['dob'] = 'false'
            request.session.data['phone'] = 'false'
            request.session.data['upload'] = 'false'

        response.redirect("/customer-forms/v1/ies-breach/start")
    }
})



router.post('/customer-forms/v1/phoneRoute', function(request, response) {

    var reason = request.session.data['contactReason']
    if (reason == "General enquiry"){
        response.redirect("/customer-forms/v1/general-enquiry/question")
    } 
    
    else if (reason == "Complain about an insolvency practitioner"){
        response.redirect("/customer-forms/v1/ip-complaint/who-do-wish-to-complain-about")
    }

      else if (reason == "Company complaints form"){
        response.redirect("/customer-forms/v1/company-complaint/company-name")
    }

        else if (reason == "Complain about the insolvency service"){
        response.redirect("/customer-forms/v1/is-complaint/do-you-have-an-insolvency-reference-number")
    }

        else if (reason == "Investigations and enforcement services breach questionnaire"){
        response.redirect("/customer-forms/v1/ies-breach/question")
    }
})


function applyCaseResultFromQuery(req) {
  req.session.data = req.session.data || {}
  req.session.data['name'] = req.query.name || req.session.data['name'] || ''
  req.session.data['caseResult'] = req.session.data['caseResult'] || {}
  req.session.data['caseResult'].trading = req.query.trading || req.session.data['caseResult'].trading || 'No trading name found'
  req.session.data['caseResult'].postcode = req.query.postcode || req.session.data['caseResult'].postcode || 'B77 2ES'
  req.session.data['caseResult'].dob = req.query.dob || req.session.data['caseResult'].dob || '17/09/1981'
}

function applyCaseSessionData(req, insolvencyType, status, startDate, endDate, registerRemovalDate) {
  req.session.data = req.session.data || {}
  req.session.data['insolvencyType'] = insolvencyType
  req.session.data['startDate'] = startDate
  req.session.data['status'] = status
  req.session.data['endDate'] = endDate
  req.session.data['registerRemovalDate'] = registerRemovalDate
}

function registerPath(req, path) {
  return '/individual-insolvency-register/' + req.params.version + '/' + path
}

router.post('/individual-insolvency-register/:version(v2|v3|v4)/search-the-individual-insolvency-register-results', function (req, res) {
  req.session.data = req.session.data || {}
  req.session.data['searchTerm'] = req.body.searchTerm || ''
  res.redirect(303, registerPath(req, 'search-the-individual-insolvency-register-results'))
})

router.post('/individual-insolvency-register/:version(v2|v3|v4)/search-the-individual-insolvency-register-results-2', function (req, res) {
  req.session.data = req.session.data || {}
  req.session.data['searchTerm'] = req.body.searchTerm || ''
  res.redirect(303, registerPath(req, 'search-the-individual-insolvency-register-results-2'))
})

router.post('/individual-insolvency-register/:version(v2|v3|v4)/search-the-individual-insolvency-register-results-3', function (req, res) {
  req.session.data = req.session.data || {}
  req.session.data['searchTerm'] = req.body.searchTerm || ''
  res.redirect(303, registerPath(req, 'search-the-individual-insolvency-register-results-3'))
})

router.post('/individual-insolvency-register/:version(v2|v3|v4)/search-the-individual-insolvency-register-results-4', function (req, res) {
  req.session.data = req.session.data || {}
  req.session.data['searchTerm'] = req.body.searchTerm || ''
  res.redirect(303, registerPath(req, 'search-the-individual-insolvency-register-results-4'))
})

router.post('/individual-insolvency-register/:version(v2|v3|v4)/search-the-individual-insolvency-register-results-5', function (req, res) {
  req.session.data = req.session.data || {}
  req.session.data['searchTerm'] = req.body.searchTerm || ''
  res.redirect(303, registerPath(req, 'search-the-individual-insolvency-register-results-5'))
})

function renderCaseDetails(req, res, page, insolvencyType, status, startDate, endDate, registerRemovalDate) {
  applyCaseSessionData(req, insolvencyType, status, startDate, endDate, registerRemovalDate)
  applyCaseResultFromQuery(req)
  res.render('individual-insolvency-register/' + req.params.version + '/' + page)
}

router.get('/individual-insolvency-register/:version(v2|v3|v4)/case-details-bankruptcy(.html)?', function (req, res) {
  renderCaseDetails(req, res, 'case-details-bankruptcy', 'Bankruptcy', 'Current', '12 September 2025', '12 September 2026', '12 December 2026')
})

router.get('/individual-insolvency-register/:version(v2|v3|v4)/case-details-bankruptcy-restrictions-undertaking(.html)?', function (req, res) {
  renderCaseDetails(req, res, 'case-details-bankruptcy-restrictions-undertaking', 'Bankruptcy Restrictions Undertaking', 'Current', '21 May 2026', '21 May 2036', '22 May 2036')
})

router.get('/individual-insolvency-register/:version(v2|v3|v4)/case-details-debt-relief-restrictions-undertaking(.html)?', function (req, res) {
  renderCaseDetails(req, res, 'case-details-debt-relief-restrictions-undertaking', 'Debt relief restrictions order (DRRO)', 'Current', '12 June 2022', '12 June 2027', '13 June 2027')
})

router.get('/individual-insolvency-register/:version(v2|v3|v4)/case-details-debt-relief-order(.html)?', function (req, res) {
  renderCaseDetails(req, res, 'case-details-debt-relief-order', 'Debt Relief Order', 'Completed', '27 July 2025', '27 July 2026', '27 October 2026')
})

router.get('/individual-insolvency-register/:version(v2|v3|v4)/case-details-individual-voluntary-arrangement(.html)?', function (req, res) {
  renderCaseDetails(req, res, 'case-details-individual-voluntary-arrangement', 'Individual Voluntary Arrangement', 'Current', '12 June 2022', '12 June 2027', '12 June 2022')
})



router.post('/individual-insolvency-register/:version(v2|v3|v4)/errorIssueGuard', function(request, response) {

    var errorIssue = request.session.data['typeOfErrorOrIssue']
    var insolvencyType = request.session.data['insolvencyType']

  if (errorIssue == "Still on register after the insolvency has ended" && insolvencyType == "Individual Voluntary Arrangement"){
        response.redirect(registerPath(request, 'when-was-the-insolvency-completed'))
    }

    else if (errorIssue == "Still on register after the insolvency has ended"){
        response.redirect(registerPath(request, 'knockout-status-completed'))
    }

    else {
        response.redirect(registerPath(request, 'name'))
    }
})

router.post('/individual-insolvency-register/:version(v2|v3|v4)/insolvencyCompleted', function(request, response) {
  var day = request.body['insolvencyCompletedDate-day']
  var month = request.body['insolvencyCompletedDate-month']
  var year = request.body['insolvencyCompletedDate-year']

  if (!day || !month || !year) {
    response.redirect(registerPath(request, 'name'))
    return
  }

  var completedDate = new Date(Number(year), Number(month) - 1, Number(day))
  var today = new Date()
  today.setHours(0, 0, 0, 0)

  var diffInDays = Math.round((today - completedDate) / 86400000)

  if (completedDate <= today && diffInDays >= 0 && diffInDays <= 28) {
    response.redirect(registerPath(request, 'knockout-status-current-under28'))
  } else {
    response.redirect(registerPath(request, 'provide-evidence-guard'))
  }
})

router.post('/individual-insolvency-register/:version(v2|v3|v4)/provideEvidenceGuard', function(request, response) {
  var provideEvidence = request.session.data['provideEvidence']

  if (provideEvidence == 'No') {
    response.redirect(registerPath(request, 'knockout-status-current-no-evidence'))
  } else {
    response.redirect(registerPath(request, 'name'))
  }
})


router.post('/individual-insolvency-register/:version(v2|v3|v4)/uploadGuard', function(request, response) {
  var uploadDocument = request.session.data['uploadDocument']

  if (uploadDocument == 'Yes') {
    response.redirect(registerPath(request, 'upload'))
  } else {
    response.redirect(registerPath(request, 'check-your-answers'))
  }
})

router.post('/individual-insolvency-register/:version(v2|v3|v4)/searchTypeGuard', function(request, response) {
  var searchType = request.session.data['searchType']

  if (searchType == 'Personal insolvency') {
    response.redirect(registerPath(request, 'search'))
  } else {
    response.redirect(registerPath(request, 'search-the-individual-insolvency-register-results'))
  }
})

