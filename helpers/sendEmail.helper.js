var nodemailer = require("nodemailer");


var parseData = function (data) {
    console.log(data)
    var importantTask = data.filter(val => {
        return (val.starred == true && val.status == false)
   }).map(val => val.text)

    var doneTask = data.filter(val => {
        return val.status
    }).map(val => val.text)

    var undoneTask = data.filter(val => {
        return (val.starred == false && val.status == false) 
    }).map(val => val.text)

    var stringImportant = '<strong>Important Task:</strong><br>'
    var stringUndone = '<br><strong>Undone Task:</strong><br>'
    var stringDone = '<br><strong>Done Task:</strong><br>'

    importantTask.forEach(val => {
        stringImportant += ('□ '+val+'<br>')
    })

    undoneTask.forEach(val => {
        stringUndone += ('□ '+val+'<br>')
    })

    doneTask.forEach(val => {
        stringDone += ('✔ '+val+'<br>')
    })

    return `<h1>#todo</h1>
        <h3>This is your task list</h3>`+stringImportant + stringUndone + stringDone
}

// send mail with defined transport object
    var sendingEmail = function(data, email) {
    // create reusable transport method (opens pool of SMTP connections)
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'fadhilmch.sampah@gmail.com',
            clientId: '919548115379-9pj5b3poarqqu5kec2apjbdlma4aaric.apps.googleusercontent.com',
            clientSecret: 'KRsls8EjlpWdqL1zbw9Ri_uR',
            refreshToken: '1/XY1M6Np9OHaxqxPTogpn-xBHMzBu2xgOlS7vb-ppCvU',
            // accessToken: 'ya29.GlyJBYX_-e3HrBys4P2fOLtv0RwL5cJvBklKRlqIi7my_60_frs8EsnRt63ctqVN5kXH67GdDj59hMh0fMKdoz-1VYPASfWho4C27ZUYq813MR5rOfHDt4aTg6U6SA'
        }
    })
    let emailContent = parseData(data)
    

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: "#todo service ✔ <fadhilmch.sampah@gmail.com>", // sender address
        to: email, // list of receivers
        subject: "#todo: This is your todo list ✔", // Subject line
        html: emailContent, // plaintext body
    }

  transporter.sendMail(mailOptions, function(error, response){
      if(error){
          console.log('masuk error')
          console.log(error);
      }else{
          console.log('ga erorr')
          console.log("Message sent: " + response.message);
          console.log(response)
      }

      // if you don't want to use this transport object anymore, uncomment following line
      //smtpTransport.close(); // shut down the connection pool, no more messages
  });
}

module.exports = sendingEmail;
