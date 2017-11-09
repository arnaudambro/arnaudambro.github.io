// import transformSVG from './transform-svg';

/*------------------------------ Variables -----------------------------------*/
const bannerLogo = document.querySelector('.banner-image');
const banner = document.querySelector('.banner');
const bannerCompetenceName = document.querySelector('.banner-text');
const background = document.querySelector('.bg');
const competenceAvenirDSI = document.querySelector('.avenir-dsi');
const translateYDistance = competenceAvenirDSI.parentElement.parentElement.getBoundingClientRect().height;
const buttonArrowSize = competenceAvenirDSI.nextElementSibling.width;
const menuDepannage = document.querySelector('.menu-item-1').firstElementChild.firstElementChild;
const buttonMoreInfos = document.querySelector('.main-description-button');
const menu = document.querySelector('.menu-competences');
const lis = [...document.querySelectorAll('.item-competences')];
let links = [...document.querySelectorAll('.link-competences')];
let itemsContent = [...document.querySelectorAll('.content-competence')];


const colorBlack = `rgba(41,44,45,1.00)`;
const colorWhite = `rgba(240,240,240,1)`;
const colorBlue = `rgba(52,152,219,1.00)`;
const colorRed = `rgba(233,79,55,1.00)`;
const colorBrown = `rgba(57,63,65,1.00)`;
const colorGreen = `rgba(68,187,163,1.00)`;
const colorPurpleDSI = `rgba(20,85,180,1.00)`;

const competences = [
{
  menuPosition: 0,
  menuContent: `Avenir DSI`,
  logoURL: `/img/Logo+nom-purple.svg`,
  bannerContent: ``,
  isAlone: true,
  backgroundProperty: `linear-gradient(to bottom, #F8F4A6, #F0EC57)`,
  textColor: colorPurpleDSI,
  depannageColor: colorRed,
  btnBackgroundColor: colorPurpleDSI,
  btnTextColor: colorWhite
},
{
  menuPosition: 1,
  menuContent: `Urgence & Dépannage`,
  logoURL: `/img/Logo+nom-purple.svg`,
  bannerContent: `Urgence & Depannage`,
  isAlone: true,
  backgroundProperty: `url(/img/depannage_banner_blue.png) center / cover no-repeat`,
  textColor: colorPurpleDSI,
  depannageColor: colorWhite,
  btnBackgroundColor: colorPurpleDSI,
  btnTextColor: colorWhite
},
{
  menuPosition: 2,
  menuContent: `Achat & Location`,
  logoURL: `/img/Logo+nom-black.svg`,
  bannerContent: `Achat & Location`,
  isAlone: true,
  backgroundProperty: `url(/img/impression_banner-red.png) center / cover no-repeat`,
  textColor: colorBlack,
  depannageColor: colorWhite,
  btnBackgroundColor: colorBlack,
  btnTextColor: colorWhite
},
{
  menuPosition: 3,
  menuContent: `Infogérance`,
  logoURL: `/img/Logo+nom-white.svg`,
  bannerContent: `Infogerance`,
  isAlone: true,
  backgroundProperty: `url(/img/cloud_banner-black.png) center / cover no-repeat`,
  textColor: colorWhite,
  depannageColor: colorRed,
  btnBackgroundColor: colorBlack,
  btnTextColor: colorWhite
},
{
  menuPosition: 4,
  menuContent: `GED`,
  logoURL: `/img/Logo+nom-black.svg`,
  bannerContent: `GED`,
  isAlone: true,
  backgroundProperty: `url(/img/ged_banner-green.png) center / cover no-repeat`,
  textColor: colorBlack,
  depannageColor: colorPurpleDSI,
  btnBackgroundColor: colorBlack,
  btnTextColor: colorWhite
},
];



const menuItemsNumber = 5;
let clickedMenuPos;
let clicked;
let clickedItemIndex;
const transitionInSeconds = 1;
const transitionInMilliSeconds = transitionInSeconds * 1000;
let transitionPerUnitInSeconds;
let transitionPerUnitInMilliSeconds;
const backgroundTranslationDistance = 15;

let fakeBanner;
let fakeBannerLogo;
let fakeBannerCompetenceName;





init(0);

/*--------------------------- Functions - callbacks --------------------------*/

/*---------------------------------INIT--------------------------------*/
function init (initialPosition) {

  clickedMenuPos = initialPosition;

  /*                 MENU COMPETENCES            */
  itemsContent.forEach(item => {
    item.nextElementSibling.firstElementChild.firstElementChild.setAttribute('fill', competences.filter(competence => competence.menuPosition == clickedMenuPos)[0].textColor, "important")
    if ((itemsContent.indexOf(item) < menuItemsNumber) && (itemsContent.indexOf(item) >= (menuItemsNumber - clickedMenuPos))) {
      item.textContent = competences[clickedMenuPos + itemsContent.indexOf(item) - menuItemsNumber].menuContent;
      item.dataset.menuPosition = competences[clickedMenuPos + itemsContent.indexOf(item) - menuItemsNumber].menuPosition;
    } else if (itemsContent.indexOf(item) < (menuItemsNumber - clickedMenuPos)) {
      item.textContent = competences[clickedMenuPos + itemsContent.indexOf(item)].menuContent;
      item.dataset.menuPosition = competences[clickedMenuPos + itemsContent.indexOf(item)].menuPosition;
    } else {
      item.textContent = '';
    }
  })

  /*                 BANNER COMPETENCES            */
  bannerCompetenceName.firstElementChild.textContent = competences.filter(competence => competence.menuPosition == clickedMenuPos)[0].bannerContent;
  bannerCompetenceName.firstElementChild.style.color = competences.filter(competence => competence.menuPosition == clickedMenuPos)[0].textColor;

  if ((clickedMenuPos === 0) && (bannerLogo.classList.contains('alone') === false)) {
    bannerLogo.firstElementChild.classList.add('alone');
    bannerCompetenceName.classList.add('without');
  }
  else if (bannerLogo.classList.contains('alone') === true) {
    bannerLogo.firstElementChild.classList.remove('alone');
    bannerCompetenceName.classList.remove('without');
  }

  /*                 BACKGROUND                    */
  background.style.background = competences.filter(competence => competence.menuPosition == clickedMenuPos)[0].backgroundProperty;
  // background.style.border = `3px solid #f00`;
  background.style.width = `100vw`;
  background.style.height = `${100 + 2 * backgroundTranslationDistance}vh`;
  // window.
  background.style.position = `absolute`;
  background.style.zIndex = -2;
  background.style.top = `-${backgroundTranslationDistance}vh`;
  background.style.left = 0;


  /*                 TEXTES               */
  document.querySelectorAll('p').forEach(text => {
    text.style.color = competences.filter(competence => competence.menuPosition == clickedMenuPos)[0].textColor;
  })

  /*                 DEPANNAGE BUTTON               */
  menuDepannage.style.setProperty('color', competences.filter(competence => competence.menuPosition == clickedMenuPos)[0].depannageColor, "important") ;

  /*                 LOGO                          */
  bannerLogo.firstElementChild.src = competences.filter(competence => competence.menuPosition == clickedMenuPos)[0].logoURL;

  /*                 BUTTON                          */
  const buttonTextColor = competences.filter(competence => competence.menuPosition == clickedMenuPos)[0].btnTextColor;
  buttonMoreInfos.firstElementChild.style.setProperty('color', buttonTextColor, "important");
  buttonMoreInfos.lastElementChild.firstElementChild.firstElementChild.setAttribute('fill', buttonTextColor, "important")
  buttonMoreInfos.style.backgroundColor = competences.filter(competence => competence.menuPosition == clickedMenuPos)[0].btnBackgroundColor;

}

/*------------------ GET THE CLICKED ITEM ----------------------------*/
function getTheIndexOfTheClickedItem (e) {
  //Variable


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

  clickedItemIndex = lis.indexOf(clicked.parentElement.parentElement);
  clickedMenuPos = competences.filter(competence => competence.menuContent == clicked.textContent.trim())[0].menuPosition;
  if(clickedItemIndex === 0) {
    return;
  }

  //We return the index we want
  transitionPerUnitInSeconds = transitionInSeconds / clickedItemIndex;
  transitionPerUnitInMilliSeconds = transitionInMilliSeconds / clickedItemIndex;

  translateAndFadeMenu();
  buildFakeDOM();
}

/*------------------ ROLLING MENU - STEP 1 --------------------------*/
function translateAndFadeMenu () {
  links.forEach(link => {
    if ((links.indexOf(link) >= menuItemsNumber) && (links.indexOf(link) < (menuItemsNumber + clickedItemIndex))) {
      link.parentElement.style = "";
    }
  });

  window.setTimeout( () => {
    links.forEach(link => {

    //We translate everything
    link.style.transform = `translateY(-${translateYDistance * clickedItemIndex}px)`;
    link.style.transition = `transform ${transitionInSeconds}s`;

    if (links.indexOf(link) === clickedItemIndex) {
      link.lastElementChild.style.transform = `translateX(${buttonArrowSize}px)`;
      link.lastElementChild.style.opacity = 0;
      link.firstElementChild.style.transform = `translateX(0)`;
    }

    //We fade-out the items before the one clicked
    window.setTimeout( () => {
      if (links.indexOf(link) < clickedItemIndex) {
        transitionStyle = 'ease-out';
        link.style.opacity = 0;
        link.style.transition = `opacity ${transitionPerUnitInSeconds}s ${transitionStyle}, transform ${transitionInSeconds}s`;
      }
    }, links.indexOf(link) * transitionPerUnitInMilliSeconds);

    //We fade-in the items after the one clicked
    window.setTimeout( () => {
      if ((links.indexOf(link) >= menuItemsNumber) && (links.indexOf(link) < (menuItemsNumber + clickedItemIndex))) {
        link.firstElementChild.textContent = links[links.indexOf(link) - menuItemsNumber].firstElementChild.textContent;
        transitionStyle = 'ease-in';
        link.style.opacity = 1;
        link.style.transition = `opacity ${transitionPerUnitInSeconds}s ${transitionStyle}, transform ${transitionInSeconds}s`;
      }
    }, (links.indexOf(link) - menuItemsNumber) * transitionPerUnitInMilliSeconds);

  });
  });

  repopulateMenu();
}

/*------------------ ROLLING MENU - STEP 2 --------------------------*/
function repopulateMenu () {
  window.setTimeout( () => {
    links.forEach(link => {
      link.style.transform = ``;
      link.style.transition = ``;
      link.lastElementChild.style = ``;
      link.firstElementChild.style = ``;
      if (links.indexOf(link) < menuItemsNumber) {
        //We remove the fade-out for the first menu-item
        link.style.opacity = 1;
      } else {
        //We remove the translation of all of them
        link.style.opacity = 0;
        link.parentElement.style.display = 'none';
      }
    });

    itemsContent.forEach(item => {
      item.style.color = competences.filter(competence => competence.menuPosition == clickedMenuPos)[0].textColor;
      // We put back emptiness for the last menu-item
      if ((itemsContent.indexOf(item) < menuItemsNumber) && (itemsContent.indexOf(item) >= (menuItemsNumber - clickedMenuPos))) {
        item.textContent = competences[clickedMenuPos + itemsContent.indexOf(item) - menuItemsNumber].menuContent;
        item.dataset.menuPosition = competences[clickedMenuPos + itemsContent.indexOf(item) - menuItemsNumber].menuPosition;
      } else if (itemsContent.indexOf(item) < (menuItemsNumber - clickedMenuPos)) {
        item.textContent = competences[clickedMenuPos + itemsContent.indexOf(item)].menuContent;
        item.dataset.menuPosition = competences[clickedMenuPos + itemsContent.indexOf(item)].menuPosition;
      } else {
        item.textContent = '';
      }
      // We put avenir-dsi class where it needs to be
      if ((item.textContent === 'Avenir DSI') && !(item.classList.contains('avenir-dsi'))) {
        item.classList.add('avenir-dsi');
      } else if (!(item.textContent === 'Avenir DSI') && (item.classList.contains('avenir-dsi'))) {
        item.classList.remove('avenir-dsi');
      }
    });

  }, transitionInMilliSeconds + 100);
}

/*------------------ ROLLING BANNER --------------------------*/
function buildFakeDOM () {
  //Create a fake banner at the dimensions of the existing banner, for transition purpose
  fakeBanner = banner.cloneNode(true);
  fakeBanner.style.position = `absolute`
  fakeBanner.style.marginLeft = window.getComputedStyle(banner).getPropertyValue('margin-left');
  fakeBanner.style.marginRight = window.getComputedStyle(banner).getPropertyValue('margin-right');
  fakeBanner.style.height = `${banner.getBoundingClientRect().height}px`;
  fakeBanner.style.top = `${banner.getBoundingClientRect().top + window.scrollY}px`;
  fakeBanner.style.width = `${banner.getBoundingClientRect().width}px`;

  // fakeBanner.style.border = `3px solid #F00`;

  //Init bannerLogo and competence styles
  fakeBannerCompetenceName = fakeBanner.lastElementChild;
  fakeBannerCompetenceName.firstElementChild.textContent = competences.filter(competence => competence.menuPosition == clickedMenuPos)[0].bannerContent;
  fakeBannerCompetenceName.firstElementChild.style.color = competences.filter(competence => competence.menuPosition == clickedMenuPos)[0].textColor;
  fakeBannerCompetenceName.style.opacity = 0.5;

  fakeBannerLogo = fakeBanner.firstElementChild;
  fakeBannerLogo.firstElementChild.src = competences.filter(competence => competence.menuPosition == clickedMenuPos)[0].logoURL;
  fakeBannerLogo.style.opacity = 1;


  translateAndFadeBanner();
  translateAndFadeBackground();
}

function translateAndFadeBanner () {

  banner.dataset.menuPosition = clickedMenuPos;

  const bannerTranslationDistance = banner.getBoundingClientRect().height;

  fakeBannerCompetenceName.style.transform = `translateY(${bannerTranslationDistance / 1.15}px)`;
  fakeBannerLogo.style.transform = `translateY(${bannerTranslationDistance / 1.15}px)`;

  document.body.append(fakeBanner);

  //If we click on avenir-DSI
  if (clickedMenuPos == 0) {
    window.setTimeout(() => {
      //The fake banner will have the proper appearance
      fakeBannerLogo.firstElementChild.classList.add('alone');
      fakeBannerCompetenceName.classList.add('without');

      //Transition for fakeBanner
      fakeBannerLogo.style.opacity = 1;
      fakeBannerLogo.firstElementChild.src = competences.filter(competence => competence.menuPosition == clickedMenuPos)[0].logoURL;
      fakeBannerLogo.style.transform = `translateY(0)`;
      fakeBannerLogo.style.transition = `all ${transitionInSeconds}s ease-in-out`;

      bannerLogo.style.transform = `translateY(-${bannerTranslationDistance}px)`;
      bannerLogo.style.opacity = 0.5;
      bannerLogo.style.transition = `all ${transitionInSeconds}s ease-in-out`;

      //Transition for real banner
      bannerCompetenceName.style.transform = `translateY(-${bannerTranslationDistance}px)`;
      bannerCompetenceName.style.opacity = 0.5;
      bannerCompetenceName.style.transition = `all ${transitionInSeconds}s ease-in-out`;
    });
    window.setTimeout(() => {
      //All text
      document.querySelectorAll('p').forEach(text => {
        text.style.transition = `color ${transitionInSeconds / 3}s ease-in-out`;
        text.style.color = competences.filter(competence => competence.menuPosition == clickedMenuPos)[0].textColor;
        if (!!text.nextElementSibling && text.nextElementSibling.tagName === `svg`) {
          console.log(text.nextElementSibling.firstElementChild.firstElementChild)
          text.nextElementSibling.firstElementChild.firstElementChild.setAttribute('fill', competences.filter(competence => competence.menuPosition == clickedMenuPos)[0].textColor, "important")
        }
      })
      //Menu Dépannage
      menuDepannage.style.setProperty('color', competences.filter(competence => competence.menuPosition == clickedMenuPos)[0].depannageColor, "important") ;
      menuDepannage.style.transition = `all ${transitionInSeconds / 3} ease-in-out`;

      //Bouton
      const buttonTextColor = competences.filter(competence => competence.menuPosition == clickedMenuPos)[0].btnTextColor;
      buttonMoreInfos.firstElementChild.style.setProperty('color', buttonTextColor, "important");
      buttonMoreInfos.lastElementChild.firstElementChild.firstElementChild.setAttribute('fill', buttonTextColor, "important")
      buttonMoreInfos.style.backgroundColor = competences.filter(competence => competence.menuPosition == clickedMenuPos)[0].btnBackgroundColor;
      buttonMoreInfos.style.transition = `all ${transitionInSeconds / 3} ease-in-out`;
    }, transitionInMilliSeconds / 3)

    window.setTimeout(() => {
      //After transition, make the real banner look good
      bannerLogo.firstElementChild.classList.add('alone');
      bannerCompetenceName.classList.add('without');

      bannerLogo.style.transform = ``;
      bannerLogo.style.opacity = 1;
      bannerLogo.style.transition = ``;
      bannerLogo.firstElementChild.src = competences.filter(competence => competence.menuPosition == clickedMenuPos)[0].logoURL;

      //Remove the fake banner
      document.body.removeChild(fakeBanner);
    }, transitionInMilliSeconds);
  }
  //All the other menus
  else {
    window.setTimeout(() => {

      //If we come from avenir-dsi
      if (bannerLogo.firstElementChild.classList.contains('alone')) {
        //Make the fake banner look good
        fakeBannerLogo.firstElementChild.classList.remove('alone');
        fakeBannerCompetenceName.classList.remove('without');

        //Translate the fake and old logo
        fakeBannerLogo.style.opacity = 1;
        fakeBannerLogo.style.transform = `translateY(0)`;
        fakeBannerLogo.style.transition = `all ${transitionInSeconds}s ease-in-out`;

        bannerLogo.style.transform = `translateY(-${bannerTranslationDistance}px)`;
        bannerLogo.style.opacity = 0.5;
        bannerLogo.style.transition = `all ${transitionInSeconds}s ease-in-out`;
      }

      fakeBannerLogo.style.transform = ``;
      fakeBannerLogo.style.zIndex = `1`;
      bannerLogo.style.zIndex = `2`;

      //Translate the banner
      fakeBannerCompetenceName.style.opacity = 1;
      fakeBannerCompetenceName.style.transform = `translateY(0)`;
      fakeBannerCompetenceName.style.transition = `all ${transitionInSeconds}s ease-in-out`;

      bannerCompetenceName.style.transform = `translateY(-${bannerTranslationDistance}px)`;
      bannerCompetenceName.style.opacity = 0.5;
      bannerCompetenceName.style.transition = `all ${transitionInSeconds}s ease-in-out`;
    });

    // Once the background is in position
    window.setTimeout(() => {
      //Banner
      bannerLogo.style.opacity = 0;
      bannerLogo.style.transition = `opacity ${transitionInSeconds / 3}s ease-in-out`;
      //All text
      document.querySelectorAll('p').forEach(text => {
        text.style.transition = `color ${transitionInSeconds / 3}s ease-in-out`;
        text.style.color = competences.filter(competence => competence.menuPosition == clickedMenuPos)[0].textColor;
        if (!!text.nextElementSibling && text.nextElementSibling.tagName === `svg`) {
          console.log(text.nextElementSibling.firstElementChild.firstElementChild)
          text.nextElementSibling.firstElementChild.firstElementChild.setAttribute('fill', competences.filter(competence => competence.menuPosition == clickedMenuPos)[0].textColor, "important")
        }
      })
      //Menu Dépannage
      menuDepannage.style.setProperty('color', competences.filter(competence => competence.menuPosition == clickedMenuPos)[0].depannageColor, "important") ;
      menuDepannage.style.transition = `all ${transitionInSeconds / 3} ease-in-out`;

      //Bouton
      const buttonTextColor = competences.filter(competence => competence.menuPosition == clickedMenuPos)[0].btnTextColor;
      buttonMoreInfos.firstElementChild.style.setProperty('color', buttonTextColor, "important");
      buttonMoreInfos.lastElementChild.firstElementChild.firstElementChild.setAttribute('fill', buttonTextColor, "important")
      buttonMoreInfos.style.backgroundColor = competences.filter(competence => competence.menuPosition == clickedMenuPos)[0].btnBackgroundColor;
      buttonMoreInfos.style.transition = `all ${transitionInSeconds / 3} ease-in-out`;

      bannerCompetenceName.style.color = competences.filter(competence => competence.menuPosition == clickedMenuPos)[0].textColor;
      // bannerCompetenceName.style.transition = `opacity ${transitionInSeconds}s ease-in-out, translate  ${transitionInSeconds}s ease-in-out, color ${transitionInSeconds / 3}s ease-in-out`;
      // fakeBannerCompetenceName.style.transition = `opacity ${transitionInSeconds}s ease-in-out, translate  ${transitionInSeconds}s ease-in-out, color ${transitionInSeconds / 3}s ease-in-out`;
    }, transitionInMilliSeconds / 3)

    //Once the transition is done
    window.setTimeout(() => {
      //Remove the avenir-dsi paramaters if we come from avenir-dsi
      if (bannerLogo.firstElementChild.classList.contains('alone')) {
        bannerLogo.firstElementChild.classList.remove('alone');
        bannerCompetenceName.classList.remove('without');
      }

      //Replace the banner by what it should be replaced by
      bannerCompetenceName.firstElementChild.textContent = fakeBannerCompetenceName.firstElementChild.textContent.trim();
      bannerLogo.firstElementChild.src = fakeBannerLogo.firstElementChild.src;

      //Re-init all the transitions parameters
      bannerLogo.style.transform = ``;
      bannerLogo.style.opacity = 1;
      bannerLogo.style.transition = ``;

      bannerCompetenceName.style.transform = ``;
      bannerCompetenceName.style.opacity = 1;
      bannerCompetenceName.style.transition = ``;
      bannerCompetenceName.style.color = ``
      bannerCompetenceName.firstElementChild.style.color = fakeBannerCompetenceName.firstElementChild.style.color

      //Delete the fake banner
      document.body.removeChild(fakeBanner);
    }, transitionInMilliSeconds);
  }
}

function translateAndFadeBackground () {
  // debugger

  const fakeBackground = background.cloneNode(true);
  fakeBackground.style.transform = `translateY(${backgroundTranslationDistance}vh)`
  fakeBackground.style.background = competences.filter(competence => competence.menuPosition == clickedMenuPos)[0].backgroundProperty;
  fakeBackground.style.opacity = 1;
  fakeBackground.style.zIndex = -10;
  document.body.appendChild(fakeBackground);
  window.setTimeout(() => {
   fakeBackground.style.transition = `transform ${transitionInSeconds}s ease-in-out`;
   fakeBackground.style.transform = `translateY(0)`;

   background.style.transition = `transform ${transitionInSeconds}s ease-in-out`;
   background.style.transform = `translateY(-${backgroundTranslationDistance}vh)`;
 })

  window.setTimeout(() => {
    background.style.transition = `opacity ${transitionInSeconds / 3}s ease-in-out, transform ${transitionInSeconds}s ease-in-out`;
    background.style.opacity = 0;
  }, transitionInMilliSeconds / 3)

  window.setTimeout(() => {
    background.style.background = fakeBackground.style.background;
    background.style.transition = ``;
    background.style.transform = ``;
    background.style.opacity = 1;

    document.body.removeChild(fakeBackground);

  }, transitionInMilliSeconds)

}
/*------------------ ROLLING BACKGROUND --------------------------*/


/*--------------------------- Event listeners --------------------------------*/
// menu.addEventListener('click', rollTheMenu, true);
menu.addEventListener('click', function (e) {
  e.preventDefault();
  getTheIndexOfTheClickedItem(e);
});

