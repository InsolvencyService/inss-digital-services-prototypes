//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

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










router.post('/customer-forms/v1/uploadDocumentsQuestion', function(request, response) {

    var uploadDocuments = request.session.data['uploadDocuments']
    if (uploadDocuments == "Yes"){
        response.redirect("/customer-forms/v1/upload")
    } else {
        response.redirect("/customer-forms/v1/check-your-answers")
        request.session.data['checkAnswers'] = 'true'
    }
})

router.post('/customer-forms/v1/checkYourAnswers', function(request, response) {
    response.redirect('/customer-forms/v1/check-your-answers')
    request.session.data['checkAnswers'] = 'true'
})

router.post('/customer-forms/v1/ip-complaint/start-content', function(request, response) {

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



router.post('/customer-forms/v1/phoneRoute', function(request, response) {

    var reason = request.session.data['contactReason']
    if (reason == "General enquiry"){
        response.redirect("/customer-forms/v1/general-enquiry/question")
    } 
    
    else if (reason == "Complain about an insolvency practitioner"){
        response.redirect("/customer-forms/v1/ip-complaint/who-do-wish-to-complain-about")
    }

      else if (reason == "Investigations and Enforcement Services"){
        response.redirect("/customer-forms/v1/ies-complaint/question")
    }

        else if (reason == "Complain about The Insolvency Service"){
        response.redirect("/customer-forms/v1/is-complaint/question")
    }

        else if (reason == "Investigations and Enforcement Services Breach Questionnaire"){
        response.redirect("/customer-forms/v1/ies-breach/question")
    }
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

        response.redirect("/customer-forms/v1/general-enquiry/start-content")
    } 
    
    else if (reason == "Complain about an insolvency practitioner"){
           
            request.session.data['organisation'] = 'true'
            request.session.data['address'] = 'true'
            request.session.data['dob'] = 'false'
               request.session.data['phone'] = 'false'
            request.session.data['upload'] = 'true'

        response.redirect("/customer-forms/v1/ip-complaint/start-content")
    }

      else if (reason == "Investigations and Enforcement Services"){

            request.session.data['organisation'] = 'false'
            request.session.data['address'] = 'false'
            request.session.data['dob'] = 'false'
               request.session.data['phone'] = 'false'
            request.session.data['upload'] = 'false'
        
        response.redirect("/customer-forms/v1/ies-complaint/start-content")
    }


        else if (reason == "Complain about The Insolvency Service"){
 
            request.session.data['organisation'] = 'false'
            request.session.data['address'] = 'false'
            request.session.data['dob'] = 'false'
            request.session.data['phone'] = 'false'
            request.session.data['upload'] = 'false'

        response.redirect("/customer-forms/v1/is-complaint/start-content")
    }

        else if (reason == "Investigations and Enforcement Services Breach Questionnaire"){
     
            request.session.data['organisation'] = 'false'
            request.session.data['address'] = 'false'
            request.session.data['dob'] = 'false'
            request.session.data['phone'] = 'false'
            request.session.data['upload'] = 'false'

        response.redirect("/customer-forms/v1/ies-breach/start-content")
    }
})








    
           