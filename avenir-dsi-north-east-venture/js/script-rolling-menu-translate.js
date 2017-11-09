
/*------------------------------ Variables -----------------------------------*/
const logo = document.querySelector('.banner-company-img');
const bannerCompetenceName = document.querySelector('.banner-competence-name');

const competenceAvenirDSI = document.querySelector('.avenir-dsi');
const translateYDistance = competenceAvenirDSI.parentElement.parentElement.scrollHeight;
const buttonArrowSize = competenceAvenirDSI.nextElementSibling.width;

const menu = document.querySelector('.menu-competences');
const items = [...document.querySelectorAll('.item-competences')];
let itemsLink = [...document.querySelectorAll('.link-competences')];
let itemsContent = [...document.querySelectorAll('.content-competence')];

const menuItemsNumber = 5;
let textContentItemAtTheTopOfTheStack;
const transitionInSeconds = 0.5;
const transitionInMilliSeconds = transitionInSeconds * 1000;
let transitionPerUnitInSeconds;
let transitionPerUnitInMilliSeconds;
let clickedItemIndex;

/*--------------------------- Functions - callbacks --------------------------*/


/*--------------------------- STEP 1 --------------------------*/

function getTheIndexOfTheClickedItem (e) {
  //Variable
  let clicked;


  //We select the <p> only
  if (e.target.tagName == "LI") {
    clicked = e.target.firstElementChild.firstElementChild;
  } else if (e.target.tagName == "A") {
    clicked = e.target.firstElementChild;
  } else if (e.target.tagName == "P") {
    clicked = e.target;
  } else if (e.target.tagName == "IMG") {
    clicked = e.target.parentElement.firstElementChild;
  } else {
    return;
  }

  clickedItemIndex = items.indexOf(clicked.parentElement.parentElement);

  if(clickedItemIndex === 0) {
    return;
  }

  if (clicked.classList.contains('avenir-dsi')) {
    if (logo.classList.contains('alone') === false) {
      logo.classList.add('alone');
      bannerCompetenceName.classList.add('without');
    }
  } else {
    if (logo.classList.contains('alone') === true) {
      logo.classList.remove('alone');
      bannerCompetenceName.classList.remove('without');
    }
    bannerCompetenceName.textContent = clicked.textContent;
  }

  //We return the index we want
  textContentItemAtTheTopOfTheStack = itemsContent[clickedItemIndex].textContent;
  transitionPerUnitInSeconds = transitionInSeconds / clickedItemIndex;
  transitionPerUnitInMilliSeconds = transitionInMilliSeconds / clickedItemIndex;

  translateAndFade();
}

/*--------------------------- STEP 4 --------------------------*/


function translateAndFade () {
  itemsLink.forEach(link => {
    if ((itemsLink.indexOf(link) >= menuItemsNumber) && (itemsLink.indexOf(link) < (menuItemsNumber + clickedItemIndex))) {
      link.parentElement.style = "";
    }
  });

  window.setTimeout( () => {
    itemsLink.forEach(link => {

    //We translate everything
    link.style.transform = `translateY(-${translateYDistance * clickedItemIndex}px)`;
    link.style.transition = `transform ${transitionInSeconds}s`;

    if (itemsLink.indexOf(link) === clickedItemIndex) {
      link.lastElementChild.style.transform = `translateX(${buttonArrowSize}px)`;
      link.lastElementChild.style.opacity = 0;
      link.firstElementChild.style.transform = `translateX(0)`;
    }

    //We fade-out the items before the one clicked
    window.setTimeout( () => {
      if (itemsLink.indexOf(link) < clickedItemIndex) {
        transitionStyle = 'ease-out';
        link.style.opacity = 0;
        link.style.transition = `opacity ${transitionPerUnitInSeconds}s ${transitionStyle}, transform ${transitionInSeconds}s`;
      }
    }, itemsLink.indexOf(link) * transitionPerUnitInMilliSeconds);

    //We fade-in the items after the one clicked
    window.setTimeout( () => {
      if ((itemsLink.indexOf(link) >= menuItemsNumber) && (itemsLink.indexOf(link) < (menuItemsNumber + clickedItemIndex))) {
        link.firstElementChild.textContent = itemsLink[itemsLink.indexOf(link) - menuItemsNumber].textContent.trim();
        transitionStyle = 'ease-in';
        link.style.opacity = 1;
        link.style.transition = `opacity ${transitionPerUnitInSeconds}s ${transitionStyle}, transform ${transitionInSeconds}s`;
      }
    }, (itemsLink.indexOf(link) - menuItemsNumber) * transitionPerUnitInMilliSeconds);

  });
  });

  repopulateMenu();
}

/*--------------------------- STEP 5 --------------------------*/


function repopulateMenu () {

  window.setTimeout( () => {
    itemsLink.forEach(link => {
      link.style.transform = ``;
      link.style.transition = ``;
      link.lastElementChild.style = ``;
      link.firstElementChild.style = ``;
      if (itemsLink.indexOf(link) < menuItemsNumber) {
        //We remove the fade-out for the first menu-item
        console.log('ah ouais ?')
        link.style.opacity = 1;
      } else {
        //We remove the translation of all of them
        link.style.opacity = 0;
        link.parentElement.style.display = 'none';
      }
    });

    itemsContent.forEach(item => {
            // We put back emptiness for the last menu-item
            if (itemsContent.indexOf(item) === 0) {
              item.textContent = itemsContent[clickedItemIndex].textContent.trim();
            } else if (itemsContent.indexOf(item) < menuItemsNumber ){
              //We replace the content of the item by the one below it
              item.textContent = itemsContent[itemsContent.indexOf(item)+clickedItemIndex].textContent.trim();
            } else {
              item.textContent = '';
            }
            //We put avenir-dsi class where it needs to be
            if ((item.textContent === 'Avenir DSI') && !(item.classList.contains('avenir-dsi'))) {
              item.classList.add('avenir-dsi');
            } else if (!(item.textContent === 'Avenir DSI') && (item.classList.contains('avenir-dsi'))) {
              item.classList.remove('avenir-dsi');
            }
          });

  }, transitionInMilliSeconds + 100);



}




/*--------------------------- Event listeners --------------------------------*/
// menu.addEventListener('click', rollTheMenu, true);
menu.addEventListener('click', function (e) {
  getTheIndexOfTheClickedItem(e);
});
