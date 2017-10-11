// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCjKLn2jhJn9v5u1m9OMAM-1f_IpDny144",
    authDomain: "compteur-9d776.firebaseapp.com",
    databaseURL: "https://compteur-9d776.firebaseio.com",
    projectId: "compteur-9d776",
    storageBucket: "compteur-9d776.appspot.com",
    messagingSenderId: "996305968451"
  };
  firebase.initializeApp(config);
  let firestore = firebase.firestore();

//Variables

  //Collection: users. Document: user. Data: username, compteurValue...
  // const compteurDatabase = firestore.doc("users/user");

  let competitors = [...document.querySelectorAll('.competitor')];
  console.table(competitors);


//Fonction Incrémentation
  function incrementCounter(e) {
    const userName = this.querySelector('.username').innerHTML
    console.log("On s'occupe du compteur de: "+userName);
    let compteurValue = this.querySelector('.counter').innerHTML;
    console.log("Avant de cliquer, le compteur est à: "+parseInt(compteurValue));
    compteurValue++;
    this.querySelector('.counter').innerHTML = compteurValue;
    console.log(compteurValue);

    //On écrit dans la base de donnée
    const compteurDatabase = firestore.doc(`users/${userName}/`)
    compteurDatabase.set({
      firestoreUsername: userName,
      firestoreCounter: compteurValue
    }).then( function() {
      console.log("Compteur sauvegardé !");
    }).catch(function(error) {
      console.log("Got an error: ", error);
    })
  }


  function changeCursor(e) {
    this.style.cursor = `url(../img/counterplus-no-transparent.png) 5 5, auto`;
  }

//Fonction Décrémentation
  function decrementCounter(e) {
    compteurValue = parseInt(this.innerHTML);
    compteurValue--;
    this.innerHTML = compteurValue;

    //...

  }


//Interaction avec la page web
  competitors.forEach((competitor) => {

    //Variables
    const userName = competitor.querySelector('.username').innerHTML;
    const compteurCompetitor = competitor.querySelector('.counter')
    const compteurDatabase = firestore.doc(`users/${userName}/`)


    //Initializer
    compteurDatabase.get().then(function (doc) {
      if (doc && doc.exists) {
        const myData = doc.data();
        compteurCompetitor.innerHTML = myData.firestoreCounter;
      } else {
        console.log("pas encore de compteur");
        compteurCompetitor.innerHTML = 0;
      }
    }).then( function() {
      console.log("Compteur chargé !");
    }).catch(function(error) {
      console.log("loading: got an error: ", error)
    })

    competitor.addEventListener('mouseover', changeCursor)
    //Incrémentation
    competitor.addEventListener('click', incrementCounter);
    competitor.addEventListener('click', decrementCounter);

/*    getRealTimeUpdates = function() {
      compteurDatabase.onSnapshot(function (doc) {
        if (doc && doc.exists) {
          const myData = doc.data();
          console.log("document: ", doc);
          outputHeader.innerText = "Hot dog status: " + myData.hotDogStatus;
        }
      });
    };*/




  });






