/*(function () {*/

	var counter = document.querySelectorAll('.counter')							//On sélectionne les deux compteurs de la page html, à incrémenter

	for (var i = 0; i < counter.length; i++) {									//On démarre une boucle for pour traiter tous les compteurs
		(function(j) {															//On enferme l'opération de la boucle for dans une fonction, tu sais pourquoi

			/*----- Démarrage -----*/
      var countInt = parseInt(counter[j].textContent)           //Soit le compteur existe déjà, et on l'appelle
      if (isNaN(countInt)) {                        //Soit c'est la première fois qu'on charge la page, et on l'initialise à 0
        countInt = 0
      }
      var httpRequest1 = new XMLHttpRequest()              //On crée un objet pour interagir avec les serveurs
      httpRequest1.open('GET', 'https://arnaudambro.github.io/compteur/js/compteur.json') //On initialise une requête pour les serveurs
      httpRequest1.send()
      httpRequest1.onreadystatechange = function () {
        if (httpRequest1.readyState === XMLHttpRequest.DONE /*DONE === 4*/ && httpRequest1.status === 200) {
          var results1 = JSON.parse(httpRequest1.responseText)
          countInt = results1[j].counter
          //countInt++
          console.log(countInt)
          counter[j].textContent = countInt
        }
      }

			/*----- Incrémentation du compteur -----*/
			counter[j].addEventListener('click', function (e) {
				e.preventDefault()												//Faudra qu'on m'explique pourquoi, j'ai pas trop compris encore

				var httpRequest = new XMLHttpRequest()							//On crée un objet pour interagir avec les serveurs

				httpRequest.open('GET', 'https://arnaudambro.github.io/compteur/js/compteur.json') //On initialise une requête pour les serveurs

				httpRequest.send()
				httpRequest.onreadystatechange = function () {
					if (httpRequest.readyState === XMLHttpRequest.DONE /*DONE === 4*/ && httpRequest.status === 200) {
						var results = JSON.parse(httpRequest.responseText)
						countInt = results[j].counter
						//countInt++
						console.log(countInt)
						counter[j].textContent = countInt
					}
				}

			})
		})(i)
	}


/*})()*/
