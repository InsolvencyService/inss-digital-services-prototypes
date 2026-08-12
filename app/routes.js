//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const customerFormsV2Routes = require('./views/customer-forms/v2/routes')

router.use(customerFormsV2Routes)

// Add your routes here

router.post('/individual-insolvency-register/search-the-individual-insolvency-register-results', function (req, res) {
  req.session.data.searchTerm = req.body.searchTerm || 'Smith'
  res.redirect('/individual-insolvency-register/search-the-individual-insolvency-register-results')
})

router.post('/individual-insolvency-register/search-the-individual-insolvency-register-results-2', function (req, res) {
  req.session.data.searchTerm = req.body.searchTerm || 'Smith'
  res.redirect('/individual-insolvency-register/search-the-individual-insolvency-register-results-2')
})

router.post('/individual-insolvency-register/search-the-individual-insolvency-register-results-3', function (req, res) {
  req.session.data.searchTerm = req.body.searchTerm || 'Smith'
  res.redirect('/individual-insolvency-register/search-the-individual-insolvency-register-results-3')
})

router.post('/individual-insolvency-register/search-the-individual-insolvency-register-results-4', function (req, res) {
  req.session.data.searchTerm = req.body.searchTerm || 'Smith'
  res.redirect('/individual-insolvency-register/search-the-individual-insolvency-register-results-4')
})

router.post('/individual-insolvency-register/search-the-individual-insolvency-register-results-5', function (req, res) {
  req.session.data.searchTerm = req.body.searchTerm || 'Smith'
  res.redirect('/individual-insolvency-register/search-the-individual-insolvency-register-results-5')
})

router.post('/individual-insolvency-register/v2/search-the-individual-insolvency-register-results', function (req, res) {
  req.session.data.searchTerm = req.body.searchTerm || 'Smith'
  res.redirect('/individual-insolvency-register/v2/search-the-individual-insolvency-register-results')
})

router.post('/individual-insolvency-register/v2/search-the-individual-insolvency-register-results-2', function (req, res) {
  req.session.data.searchTerm = req.body.searchTerm || 'Smith'
  res.redirect('/individual-insolvency-register/v2/search-the-individual-insolvency-register-results-2')
})

router.post('/individual-insolvency-register/v2/search-the-individual-insolvency-register-results-3', function (req, res) {
  req.session.data.searchTerm = req.body.searchTerm || 'Smith'
  res.redirect('/individual-insolvency-register/v2/search-the-individual-insolvency-register-results-3')
})

router.post('/individual-insolvency-register/v2/search-the-individual-insolvency-register-results-4', function (req, res) {
  req.session.data.searchTerm = req.body.searchTerm || 'Smith'
  res.redirect('/individual-insolvency-register/v2/search-the-individual-insolvency-register-results-4')
})

router.post('/individual-insolvency-register/v2/search-the-individual-insolvency-register-results-5', function (req, res) {
  req.session.data.searchTerm = req.body.searchTerm || 'Smith'
  res.redirect('/individual-insolvency-register/v2/search-the-individual-insolvency-register-results-5')
})

router.get('/individual-insolvency-register/v2/case-details', function (req, res) {
  const caseId = req.query.caseId || req.session.data.caseDetails?.caseId
  const caseDetailsMap = {
    bankruptcy: {
      caseId: 'bankruptcy',
      name: 'Amelia Smith',
      title: 'Ms',
      gender: 'Female',
      workStatus: 'Self-employed',
      dob: '12 March 2003',
      lastAddress: '14 High Street, London, GBR <br> E1 6AN',
      previousAddresses: 'No previous addresses found',
      aliases: 'No other names found',
      caseName: 'Amelia Smith',
      type: 'Bankruptcy',
      arrangementDate: '08/05/2022',
      status: 'Current',
      notificationDate: '12/08/2023',
      practitioner: 'Harriet Lane',
      firm: 'East Recovery Ltd',
      practitionerAddress: '2 Tileyard Road, London <br> N7 9AH',
      practitionerTelephone: '020 1234 5678'
    },
    'debt-relief-order': {
      caseId: 'debt-relief-order',
      name: 'Benjamin Smith',
      title: 'Mr',
      gender: 'Male',
      workStatus: 'Unemployed',
      dob: '14 August 1998',
      lastAddress: '22 Riverside, Liverpool, GBR <br> L1 8JQ',
      previousAddresses: 'No previous addresses found',
      aliases: 'No other names found',
      caseName: 'Benjamin Smith',
      type: 'Debt Relief Order',
      arrangementDate: '10/11/2021',
      status: 'Closed',
      notificationDate: '09/02/2024',
      practitioner: 'Sarah Jenkins',
      firm: 'Riverbank Solutions',
      practitionerAddress: '7 Bank Street, Liverpool <br> L1 1HB',
      practitionerTelephone: '0151 555 1234'
    },
    'bankruptcy-restrictions-undertaking': {
      caseId: 'bankruptcy-restrictions-undertaking',
      name: 'Chloe Smith',
      title: 'Miss',
      gender: 'Female',
      workStatus: 'Part-time',
      dob: '09 November 1991',
      lastAddress: '8 Park Lane, Bristol, GBR <br> BS1 5DP',
      previousAddresses: 'No previous addresses found',
      aliases: 'No other names found',
      caseName: 'Chloe Smith',
      type: 'Bankruptcy restrictions undertaking',
      arrangementDate: '15/04/2023',
      status: 'Current',
      notificationDate: '20/05/2024',
      practitioner: 'Michael Turner',
      firm: 'Southfield Advisory',
      practitionerAddress: '10 Castle Street, Bristol <br> BS1 1HX',
      practitionerTelephone: '0117 987 6543'
    },
    'debt-relief-restrictions-undertaking': {
      caseId: 'debt-relief-restrictions-undertaking',
      name: 'Daniel Smith',
      title: 'Mr',
      gender: 'Male',
      workStatus: 'Employed',
      dob: '27 May 1968',
      lastAddress: '3 King Street, Manchester, GBR <br> M3 2ER',
      previousAddresses: 'No previous addresses found',
      aliases: 'No other names found',
      caseName: 'Daniel Smith',
      type: 'Debt relief restrictions undertaking',
      arrangementDate: '01/01/2024',
      status: 'Current',
      notificationDate: '30/06/2024',
      practitioner: 'Claire Roberts',
      firm: 'Northfield Insolvency',
      practitionerAddress: '6 Union Street, Manchester <br> M2 4DJ',
      practitionerTelephone: '0161 654 3210'
    },
    'individual-voluntary-arrangement': {
      caseId: 'individual-voluntary-arrangement',
      name: 'Ella Smith',
      title: 'Ms',
      gender: 'Female',
      workStatus: 'Self-employed',
      dob: '03 February 1974',
      lastAddress: '18 Queens Road, Leeds, GBR <br> LS1 5QT',
      previousAddresses: 'No previous addresses found',
      aliases: 'No other names found',
      caseName: 'Ella Smith',
      type: 'Individual Voluntary Arrangement',
      arrangementDate: '01/02/2024',
      status: 'Current',
      notificationDate: '06/03/2024',
      practitioner: 'Racheal Marsh',
      firm: 'Riverbank Advisors',
      practitionerAddress: 'Suite 6, 4th Floor, Universal Square, Manchester <br> M12 6JH',
      practitionerTelephone: '0161 850 1018'
    }
  }
  const caseDetails = caseDetailsMap[caseId]
  if (!caseDetails) {
    return res.redirect('/individual-insolvency-register/search-the-individual-insolvency-register-results')
  }
  req.session.data.caseDetails = caseDetails
  res.render('individual-insolvency-register/v2/case-details')
})

const staticCaseResultPages = [
  'case-details-bankruptcy',
  'case-details-debt-relief-order',
  'case-details-debt-relief-restrictions-undertaking',
  'case-details-bankruptcy-restrictions-undertaking',
  'case-details-individual-voluntary-arrangement'
]

staticCaseResultPages.forEach((page) => {
  router.get(`/individual-insolvency-register/v2/${page}.html`, function (req, res) {
    const { name, trading, postcode, dob } = req.query
    if (name || trading || postcode || dob) {
      req.session.data.caseResult = {
        name: name || req.session.data.caseResult?.name || '',
        trading: trading || req.session.data.caseResult?.trading || '',
        postcode: postcode || req.session.data.caseResult?.postcode || '',
        dob: dob || req.session.data.caseResult?.dob || ''
      }
    }
    res.render(`individual-insolvency-register/v2/${page}`)
  })
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













    
           