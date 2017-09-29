/*(function () {*/

	var counter = document.querySelectorAll('.counter')							//On sélectionne les deux compteurs de la page html, à incrémenter
  var JSONurl ='https://arnaudambro.github.io/compteur/js/compteur.json'

	for (var i = 0; i < counter.length; i++) {									//On démarre une boucle for pour traiter tous les compteurs
		(function(j) {															//On enferme l'opération de la boucle for dans une fonction, tu sais pourquoi

			/*----- Démarrage -----*/
      var countInt = parseInt(counter[j].textContent)           //Soit le compteur existe déjà, et on l'appelle

      var httpRequest1 = new XMLHttpRequest()              //On crée un objet pour interagir avec les serveurs
      httpRequest1.open('GET', JSONurl) //On initialise une requête pour les serveurs
      httpRequest1.send()
      httpRequest1.onreadystatechange = function () {
        if (httpRequest1.readyState === XMLHttpRequest.DONE /*DONE === 4*/ && httpRequest1.status === 200) {
          var results1 = JSON.parse(httpRequest1.responseText)
          countInt = results1[j].counterKey                        //Dans le JSON, on chope la key "counterKey" de l'élément results1[j] associé à counter[j]
          console.log(countInt)
          counter[j].textContent = countInt                     //On montre dans la span counter[j] la valeur récupérée dans le JSON
        } else if (isNaN(countInt)) {
                countInt = 0                      //Soit c'est la première fois qu'on charge la page, et on l'initialise à 0
        }
      }
      /*----- Incrémentation du compteur -----*/
      counter[j].addEventListener('click', function (e) {
      e.preventDefault()                        //Faudra qu'on m'explique pourquoi, j'ai pas trop compris encore
      countInt++                                //On incrémente countInt
      counter[j].textContent = countInt         //On change la span counter[j] avec la nouvelle valeur
      })
		})(i)
	}


        /*------ Modification du JSON avec l'incrémentation -----*/
        /*var httprequest2 = new XMLHttpRequest()
        httprequest2.open('POST', JSONurl)
        console.log('on a réussi httprequest2.open()')

        httprequest2.setRequestHeader("Content-Type", "application/json")
        console.log('on a réussi httprequest2.setRequestHeader()')

        httprequest2.send(JSON.stringify({counterKey:countInt}))
        console.log('on a réussi httprequest2.send()')*/

        /*var httpRequest = new XMLHttpRequest()              //On crée un objet pour interagir avec les serveurs

        httpRequest.onreadystatechange = function () {
          if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {
            var results = JSON.parse(httpRequest.responseText)
            countInt = results[j].counter
            //countInt++
            console.log(countInt)
            counter[j].textContent = countInt
          }
        }*/
