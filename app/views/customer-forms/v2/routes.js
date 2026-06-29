// Routes for customer-forms v2
// Add any v2-specific form logic here.

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function formatSize(bytes) {
  var megabytes = bytes / (1024 * 1024)

  if (megabytes >= 1) {
    return megabytes.toFixed(2).replace(/\.00$/, '') + 'MB'
  }

  return Math.ceil(bytes / 1024) + 'KB'
}

router.post('/customer-forms/v2/is-complaint/complaintType', function (request, response) {
 
    var isNotListed = request.session.data['complaint']
    
    if (isNotListed == "my complaint is not listed") {
    response.redirect('/customer-forms/v2/is-complaint/wrong-form')
  } else {
    // If this flow was started from check-your-answers, return there after update
    if (request.session.data['returnTo'] === 'check-your-answers') {
      delete request.session.data['returnTo']
      response.redirect('/customer-forms/v2/is-complaint/check-your-answers')
    } else {
      response.redirect('/customer-forms/v2/is-complaint/name')
    }
  }
})

router.post('/customer-forms/v2/company-complaint/complaintType', function (request, response) {
 
    var isNotListed = request.session.data['complaint']
    
    if (isNotListed == "my complaint is not listed") {
    response.redirect('/customer-forms/v2/company-complaint/wrong-form')
  } else {
    // If this flow was started from check-your-answers, return there after update
    if (request.session.data['returnTo'] === 'check-your-answers') {
      delete request.session.data['returnTo']
      response.redirect('/customer-forms/v2/company-complaint/check-your-answers')
    } else {
      response.redirect('/customer-forms/v2/company-complaint/name')
    }
  }
})

router.post('/customer-forms/v2/general-enquiry/complaintType', function (request, response) {
 
    var isNotListed = request.session.data['complaint']
    
    if (isNotListed == "my complaint is not listed") {
    response.redirect('/customer-forms/v2/general-enquiry/wrong-form')
  } else {
    // If this flow was started from check-your-answers, return there after update
    if (request.session.data['returnTo'] === 'check-your-answers') {
      delete request.session.data['returnTo']
      response.redirect('/customer-forms/v2/general-enquiry/check-your-answers')
    } else {
      response.redirect('/customer-forms/v2/general-enquiry/name')
    }
  }
})

router.post('/customer-forms/v2/ip-complaint/complaintType', function (request, response) {
 
    var isNotListed = request.session.data['complaint']
    
    if (isNotListed == "my complaint is not listed") {
    response.redirect('/customer-forms/v2/ip-complaint/wrong-form')
  } else {
    // If this flow was started from check-your-answers, return there after update
    if (request.session.data['returnTo'] === 'check-your-answers') {
      delete request.session.data['returnTo']
      response.redirect('/customer-forms/v2/ip-complaint/check-your-answers')
    } else {
      response.redirect('/customer-forms/v2/ip-complaint/name')
    }
  }
})

// When user navigates to editing pages via a "Change" link, they may have
// a `returnTo=check-your-answers` query. Capture that on GET so POST handlers
// can redirect back after saving.
function captureReturnTo(req, res, next) {
  if (req.query && req.query.returnTo) {
    req.session.data['returnTo'] = req.query.returnTo
  }
  next()
}

router.get('/customer-forms/v2/is-complaint/name', captureReturnTo, function (request, response) {
  response.render('customer-forms/v2/is-complaint/name')
})

router.post('/customer-forms/v2/is-complaint/email', function (request, response) {
  // standard flow would go to the next page, but if returnTo is set go back
  if (request.session.data['returnTo'] === 'check-your-answers') {
    delete request.session.data['returnTo']
    response.redirect('/customer-forms/v2/is-complaint/check-your-answers')
  } else {
    response.redirect('/customer-forms/v2/is-complaint/do-you-have-an-insolvency-reference-number')
  }
})

router.get('/customer-forms/v2/is-complaint/email', captureReturnTo, function (request, response) {
  response.render('customer-forms/v2/is-complaint/email')
})

router.post('/customer-forms/v2/is-complaint/do-you-have-an-insolvency-reference-number', function (request, response) {
  if (request.session.data['returnTo'] === 'check-your-answers') {
    delete request.session.data['returnTo']
    response.redirect('/customer-forms/v2/is-complaint/check-your-answers')
  } else {
    response.redirect('/customer-forms/v2/is-complaint/have-you-complained-about-this-before')
  }
})

router.get('/customer-forms/v2/is-complaint/do-you-have-an-insolvency-reference-number', captureReturnTo, function (request, response) {
  response.render('customer-forms/v2/is-complaint/do-you-have-an-insolvency-reference-number')
})

router.post('/customer-forms/v2/is-complaint/have-you-complained-about-this-before', function (request, response) {
  if (request.session.data['returnTo'] === 'check-your-answers') {
    delete request.session.data['returnTo']
    response.redirect('/customer-forms/v2/is-complaint/check-your-answers')
  } else {
    response.redirect('/customer-forms/v2/is-complaint/complaint-details')
  }
})

router.get('/customer-forms/v2/is-complaint/have-you-complained-about-this-before', captureReturnTo, function (request, response) {
  response.render('customer-forms/v2/is-complaint/have-you-complained-about-this-before')
})

router.post('/customer-forms/v2/is-complaint/complaint-details', function (request, response) {
  if (request.session.data['returnTo'] === 'check-your-answers') {
    delete request.session.data['returnTo']
    response.redirect('/customer-forms/v2/is-complaint/check-your-answers')
  } else {
    response.redirect('/customer-forms/v2/is-complaint/upload-guard')
  }
})

router.get('/customer-forms/v2/is-complaint/complaint-details', captureReturnTo, function (request, response) {
  response.render('customer-forms/v2/is-complaint/complaint-details')
})


router.post('/customer-forms/v2/is-complaint/uploadDocumentsRoute', function (request, response) {
 
    var uploadDocuments = request.session.data['uploadDocuments']
    
    if (uploadDocuments == "Yes") {
    response.redirect('/customer-forms/v2/is-complaint/upload')
  } else {
    response.redirect('/customer-forms/v2/is-complaint/check-your-answers')
  }
})

router.post('/customer-forms/v2/is-complaint/upload-list', function (request, response) {
  var uploadedFiles = request.body.fileUpload

  if (typeof uploadedFiles === 'string') {
    uploadedFiles = [uploadedFiles]
  }

  if (!Array.isArray(uploadedFiles)) {
    uploadedFiles = []
  }

  var existingFiles = request.session.data['uploadedFiles'] || []

  if (!Array.isArray(existingFiles)) {
    existingFiles = []
  }

  uploadedFiles = existingFiles.concat(uploadedFiles.filter(function (fileName) {
    return fileName && existingFiles.indexOf(fileName) === -1
  }))

  var currentFileSizes = []

  try {
    currentFileSizes = JSON.parse(request.body.uploadedFileSizes || '[]')
  } catch (error) {
    currentFileSizes = []
  }

  var existingFileSizes = request.session.data['uploadedFileSizes'] || []

  if (!Array.isArray(existingFileSizes)) {
    existingFileSizes = []
  }

  var currentUploadBytes = currentFileSizes.reduce(function (sum, file) {
    return sum + (parseInt(file.size, 10) || 0)
  }, 0)

  var existingUploadBytes = parseInt(request.session.data['totalUploadedSizeBytes'] || 0, 10)

  var newFileSizes = existingFileSizes.concat(currentFileSizes)
  var totalUploadedBytes = existingUploadBytes + currentUploadBytes

  request.session.data['uploadedFiles'] = uploadedFiles
  request.session.data['uploadedFileSizes'] = newFileSizes
  request.session.data['fileUpload1'] = uploadedFiles[0] || request.session.data['fileUpload1']
  request.session.data['fileUpload2'] = uploadedFiles[1] || request.session.data['fileUpload2']
  request.session.data['totalUploadedSizeBytes'] = totalUploadedBytes
  request.session.data['totalUploadedSize'] = formatSize(totalUploadedBytes)

  response.redirect('/customer-forms/v2/is-complaint/upload-list')
})

router.post('/customer-forms/v2/is-complaint/uploadAnotherDocument', function (request, response) {
  delete request.session.data['fileRemoved']
  if (request.session.data['uploadAnotherDocument'] === 'yes') {
    response.redirect('/customer-forms/v2/is-complaint/upload')
  } else {
    response.redirect('/customer-forms/v2/is-complaint/check-your-answers')
  }
})

router.get('/customer-forms/v2/is-complaint/remove-upload', function (request, response) {
  var fileToRemove = request.query.file || request.session.data['fileToRemove'] || ''

  request.session.data['fileToRemove'] = fileToRemove
  response.render('customer-forms/v2/is-complaint/remove-upload', {
    fileToRemove: fileToRemove
  })
})

router.post('/customer-forms/v2/is-complaint/removeUpload', function (request, response) {
  var removeDocuments = request.session.data['removeDocuments']
  var fileToRemove = request.session.data['fileToRemove'] || ''

  if (removeDocuments === 'Yes') {
    var uploadedFiles = request.session.data['uploadedFiles'] || []

    if (!Array.isArray(uploadedFiles)) {
      uploadedFiles = []
    }

    uploadedFiles = uploadedFiles.filter(function (fileName) {
      return fileName !== fileToRemove
    })

    request.session.data['uploadedFiles'] = uploadedFiles
    request.session.data['fileUpload1'] = uploadedFiles[0] || ''
    request.session.data['fileUpload2'] = uploadedFiles[1] || ''
    request.session.data['fileRemoved'] = true
  }

  delete request.session.data['fileToRemove']
  delete request.session.data['removeDocuments']

  response.redirect('/customer-forms/v2/is-complaint/upload-list')
})

router.post('/customer-forms/v2/is-complaint/confirm-submission', function (request, response) {
  response.redirect('/customer-forms/v2/is-complaint/confirmation')
})


router.post('/customer-forms/v2/general-enquiry/generalEnquiries', function (request, response) {
 
    var enquiryChoice = request.session.data['generalEnquiry']
    
    if (enquiryChoice == "redundancy") {
    response.redirect('/customer-forms/v2/general-enquiry/redundancy')
  } 
  
  else if (enquiryChoice == "debt relief order") {
    response.redirect('/customer-forms/v2/general-enquiry/dro')
  }

    else if (enquiryChoice == "bankruptcy") {
    response.redirect('/customer-forms/v2/general-enquiry/bankruptcy')
  }


  else if (enquiryChoice == "breathing space") {
    response.redirect('/customer-forms/v2/general-enquiry/breathing-space')
  }

  else if (enquiryChoice == "I want to make a complaint") {
    response.redirect('/customer-forms/v2/general-enquiry/wrong-form')
  }
  
  else {
    response.redirect('/customer-forms/v2/general-enquiry/name')
  }
})


module.exports = router
