(function () {

/*************** HEADER *****************/
const headerBeforeAppend = document.querySelector('head')

document.querySelector('head').innerHTML = `
  ${headerBeforeAppend.innerHTML}

  <meta charset="UTF-8">
  <meta content="width=device-width,initial-scale=1" name="viewport">

  <!-- CSS -->
  <!-- Google fonts -->
  <link href="https://fonts.googleapis.com/css?family=Montserrat:100,400,700" rel="stylesheet">
  <!-- CSS Bootstrap -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
  <link href="/css/styles.css" media="screen, projection" rel="stylesheet" type="text/css">
  <!-- Materialize -->
  <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css"> -->
  <!-- Custom CSS -->
  <link href="/css/app.css" media="screen, projection" rel="stylesheet" type="text/css">
  <!-- CSS To Print -->
  <!-- <link href="/css/print.css" media="print" rel="stylesheet" type="text/css" /> -->

`

/*************** FOOTER *****************/

const footerBeforeAppend = document.querySelector('footer')
document.querySelector('footer').innerHTML = `
  ${footerBeforeAppend.innerHTML}

  <!-- JQuery (for Bootstrap) -->
  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
  <!-- Bootstrap CDN v4 alpha-->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>
  <!--[if IE]>
      <link href="/css/ie.css" media="screen, projection" rel="stylesheet" type="text/css" />
    <![endif]-->

`

})()
