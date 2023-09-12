/* function pictureHTML (postjson, n) {
    return `<img src="${postjson[n].file_url}" alt="">`;
}

async function main () {
    // Per aggiungere i parametri si mette il punto di domanda dopo il formato (json).
    // Per le metatag la stringa "%3A" fa da due punti.
    // Esempio: https://danbooru.donmai.us/posts.json?tags=dragon_ball+son_goku+rating%3Ag
    const post = await fetch(`https://danbooru.donmai.us/posts.json?tags=dragon_ball+son_goku+rating%3Ag`);
    const postjson = await post.json();
    const picture = document.querySelector('.image');
    console.log(postjson);

    for (let i = 0; i < 20; i++) {
    picture.innerHTML += pictureHTML(postjson, i);
    }
}

main () */

let sliderOne = document.getElementById(`myRange1`);
let sliderTwo = document.getElementById(`myRange2`);

let displayValOne = document.getElementById(`range1`);
let displayValTwo = document.getElementById(`range2`);
displayValOne.textContent = `Any date`;
displayValTwo.textContent = `This month`;

let minGap = 0;
let sliderTrack = document.querySelector(`.slider__track`);
let sliderMaxValue = document.getElementById(`myRange1`).max;

/* Per lo slider degli episodi */
let displayValThree = document.getElementById(`range3`);
let sliderThree = document.getElementById(`myRange3`);
let sliderTrack2 = document.querySelector(`.slider__track--2`);

/* Variabile che mi serve per poi usare il contenuto della casella genere per la ricerca tramite API */
let genrevalue;

/* Per le stelle */
let rating;

let anime = document.getElementById(`animelist`)

function autocomplete(inp, arr) {
  /*Argomenti: campo di testo e array di valori "autocompletati"*/
  var currentFocus;
  /*Quando si scrive nel campo di testo (input) si attiva la funzione
  specificata subito dopo (l'anonima "function()). È anche possibile chiamare una
  funzione esterna mettendo quella come secondo parametro. */
  /* L'addEventListener fa si che quando si registri un determinato tipo di "input" (come i click) e una
  funzione da eseguire quando si interagisce con un determinato elemento della pagina. */
  inp.addEventListener("input", function(e) {
    /* this.value = valore dell'input */
    var a, b, i, val = lastWord(this.value);
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {return false}
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
            /*insert the value for the autocomplete text field:*/
            inp.value = removeLastWord(inp.value);
            inp.value += this.getElementsByTagName("input")[0].value;
            /*close the list of autocompleted values,
            (or any other open lists of autocompleted values:*/
            closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });

  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e){
      closeAllLists(e.target);
  });
  }

function slideOne(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
    sliderOne.value = parseInt(sliderTwo.value) - minGap;
    }
    displayValOne.textContent = parseInt((240 - sliderOne.value)/12) + " y" + " " + (240 - sliderOne.value) % 12 + "  m";
    fillColor();
    if (parseInt(sliderOne.value) === 0) {
      displayValOne.textContent = `Any date`
    }
}

function slideTwo(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
        sliderTwo.value = parseInt(sliderOne.value) + minGap;
    }
    displayValTwo.textContent = parseInt((240 - sliderTwo.value)/12) + " y" + " " + (240 - sliderTwo.value) % 12 + "  m";
    fillColor();
    if (parseInt(sliderTwo.value) === 240) {
      displayValTwo.textContent = `This month`
    }
}

function slideThree(){
  sliderThree.value = parseInt(sliderThree.value);
  displayValThree.textContent = sliderThree.value;
  fillColor2();
}

function fillColor() {
    percent1 = (sliderOne.value / sliderMaxValue) * 100;
    percent2 = (sliderTwo.value / sliderMaxValue) * 100;
    /* Non devo infilare il punto e virgola nella stringa che va a settare il background */
    sliderTrack.style.background =
    `linear-gradient(to right, #dadae5 ${percent1}%, #3264fe ${percent1}%
        ,#3264fe ${percent2}%, #dadae5 ${percent2}%)`
}

function fillColor2() {
  percent1 = (sliderThree.value / 60) * 100;
  /* È come dire col linear-gradient: blu da x fino a y, bianco da y fino a z */
  sliderTrack2.style.background =
  `linear-gradient(to right, #3264fe 0%, #3264fe ${percent1}%,
    #dadae5 ${percent1}%, #dadae5 100%)`
}

function litstar(halfstars) {
  let fullstars = parseInt(halfstars / 2);
  let stars = document.querySelector(".stars");
  stars.innerHTML = ``;

  for (let i = 0; i < 5; i++) {

    if (i < fullstars) {
    stars.innerHTML += `
      <div class="half__star--left click star1" onclick="litstar(${i*2+1})">
      <img class="star" src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg" alt=""></div>
      <div class="half__star--right click star2" onclick="litstar(${i*2+2})"></div>`
    }

    if (i === fullstars && halfstars % 2 !== 0) {
    stars.innerHTML += `
      <div class="half__star--left click star1" onclick="litstar(${i*2+1})">
      <img class="star" src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Half_Star_Yellow.svg" alt=""></div>
      <div class="half__star--right click star2" onclick="litstar(${i*2+2})"></div>`
    }

    if (i === fullstars && halfstars % 2 === 0) {
      stars.innerHTML += `
      <div class="half__star--left click star1" onclick="litstar(${i*2+1})">
      <img class="star" src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Empty_Star.svg" alt=""></div>
      <div class="half__star--right click star2" onclick="litstar(${i*2+2})"></div>`
    }

    if (i > fullstars) {
      stars.innerHTML += `
      <div class="half__star--left click star1" onclick="litstar(${i*2+1})">
      <img class="star" src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Empty_Star.svg" alt=""></div>
      <div class="half__star--right click star2" onclick="litstar(${i*2+2})"></div>`
    }

  }

  document.querySelector(".numeric_rating--inner").value = `${halfstars}`;

  rating = halfstars;

}

function litstarFloat(halfstars) {
  litstar(parseInt(halfstars));
  return document.querySelector(".numeric_rating--inner").value = halfstars;
}

/* Metto come variabile globale in quanto mi servirà anche come controllo di correttezza
per i generi inseriti dall'utente */
let postGenres;

async function main() {
    const post = await fetch(`https://api.jikan.moe/v4/genres/anime`);
    postGenres = await post.json();
    postGenres = postGenres.data.map(x => {
        return x.name;
    });
    console.log(postGenres);
    /* Devo aspettare l'async mettendo dentro pure la funzione che inizializza l'autocomplete o far aspettare fuori in qualche modo */
    autocomplete(document.querySelector("#search-genres"), postGenres);
    autocomplete(document.querySelector("#exclude-genres"), postGenres);
}

main();

/* miao è l'handler della promise, diverso dalla funzione miao esterna, in questo caso.
Chiamandola quindi in verità la funzione miao non fa altro che impostare l'handler con
"resolved" considerando quindi la promise risolta. */
async function sleep(time) {
  await new Promise (miao => setTimeout(miao, time));
}

/* function miao() {
  console.log("miao");
} */

/* Qui la funzione viene chiamata ma hello, ovvero il parametro per verificare se la promise è risolta, rimane
undefined causando lo scorretto funzionamento del programma o il blocco. */
/* async function sleep(time) {
  await new Promise (hello => setTimeout(miao, time));
} */

/* Versione corretta. ogni iterazione di Timeout imposta anche la variabile hello a "resolved" in quanto
viene raggiunta correttamente dalla funzione. */
/* async function sleep(time) {
  await new Promise (hello => setTimeout(() => {
    miao();
    hello();
  }, time));
} */

let post = [];

/* Non si può usare il metodo json su un array */
async function updateAnime() {
  /* intendo fare un array in cui tutti gli spazi siano occupati da dati utili */
  let fillcount = 1;
  /* non so esattamente quanti anime ci sono, per cui termino il ciclo se ci sono troppe chiamate andate
  male di fila. */
  let badcount = 0;

  for (let i = 1; i < 100000; i++) {
    let temp = await fetch(`https://api.jikan.moe/v4/anime/${i}/full`);

    if (badcount > 9999) {
      break;
    }
    else if (temp.status === 429) {
      await sleep(500);
      i--;
      badcount++;
    }
    else if (temp.status === 500) {
      await sleep(500);
      badcount++;
    }
    else if (temp.status === 404) {
      await sleep(10);
      fillcount++;
      badcount++;
    }
    else {
      post[i-fillcount] = await temp.json();
      console.log(`Slot ${i - fillcount} dell'array riempito con successo`)
      badcount = 0;
    }

  }
  console.log(post);
}

function download(content, fileName, contentType) {
  /* Crea un nuovo elemento. il nome è la categoria di elemento HTML (a perchè supporta il download) */
  const a = document.createElement(`a`);
  console.log(a);
  /* i parametri sono l'array di stringhe e il tipo di contenuto è text/plain */
  const file = new Blob([content], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  /* click eseguito dalla sull'elemento per avviare il download */
  a.click();
}

function ondownload() {
  download(JSON.stringify(post), `AllAnime.json`, `text/plain`)
}

/* Gestione degli overflow */

var observer = [];

/* Ricerca degli anime. i è una variabile globale per tenere traccia di dove sono arrivato, non
molto elegante ma soluzione facile. */

let i = 0;

function searchAnime(noOfAnimeToSearch, secondOrMoreGen) {

  /* Numero di elementi HTML massimo da generare */
  console.log(noOfAnimeToSearch);

  let laterDate = 240 - sliderOne.value;
  if (laterDate === 240) {
    laterDate = 9999999;
  }
  const recentDate = Math.abs(sliderTwo.value - 240);
  let genre;
  if (document.querySelector("#search-genres").value != ``) {
    genre = genresArray(document.querySelector("#search-genres").value);
  }
  else {
    genre = ``;
  }
  let excludedgenre;
  if (document.querySelector("#exclude-genres").value != ``) {
    excludedgenre = genresArray(document.querySelector("#exclude-genres").value);
  }
  else {
    excludedgenre = ``;
  }
  const episodes = sliderThree.value;
  const halfstars = parseFloat(litstarFloat(toNumeric(document.querySelector(".numeric_rating--inner").value)));
  const title = document.getElementById("search_bar").value.trimStart();

  console.log(laterDate);
  console.log(recentDate);
  console.log(genre);
  console.log(excludedgenre);
  console.log(episodes);
  console.log(halfstars);
  console.log(title);

  for (let j = 5; j < 5; j++) {
    console.log("ciao");
    console.log(window.screen.width);
  }

  /* gli Observer rimangono e rivelano che l'elemento che contengono non è più contenuto nel genitore quando l'HTML
    viene cancellato e poi riscritto. Questo perchè gli observer uscendo dalla funzione NON vengono eliminati perchè stanno
    puntando a qualcosa (gli elementi HTML che ho creato). Quindi devo sconnetterli ed eliminarli un attimo
    prima di creare il nuovo HTML. il metodo "disconnect" elimina l'osservatore. Inoltre per fare ciò devo dichiarare
    l'array observer fuori da questa funzione. */

  observer.forEach(obs => {
    obs.disconnect();
  });

  observer = [];

  let animelist = document.querySelector(`#animelist`);

  /* Misuro l-altezza della pagina attuale per poi attaccare correttamente gli
  sfondi successivi. */

  const pageHeightBeforeSearch = window.innerHeight;
  console.log(pageHeightBeforeSearch);

  if (secondOrMoreGen === 0) {
    i = 0;
    animelist.innerHTML = ``;
  }

  let count = 0;

  if (secondOrMoreGen != 0) {
    document.querySelectorAll(`.anime`).forEach (x => {
      x.classList.remove(`anime--left`);
      x.classList.remove(`anime--right`);
      x.classList.remove(`anime--center`);
    });
  }

  while (i < post.length) {

    if (count >= noOfAnimeToSearch) {
      break;
    }
    if (monthsAgo(post[i].data.aired.from) > recentDate && monthsAgo(post[i].data.aired.from) < laterDate
    && ((title === undefined || title === ``) || title.toLowerCase() === post[i].data.title.slice(0, title.length).toLowerCase())
    && ((genre === undefined || genre === ``) || evaluateGenre(genre, post[i].data.genres, post[i].data.themes, post[i].data.demographics))
    && ((excludedgenre === undefined || excludedgenre === ``) || !evaluateGenre(excludedgenre, post[i].data.genres, post[i].data.themes, post[i].data.demographics))
    && (post[i].data.score >= halfstars && countSequelEpisodes(post[i].data) >= episodes)) {
    if (secondOrMoreGen != 0) {
      addAnime(animelist, ``);
    }
    if (window.screen.width <= 1050 && secondOrMoreGen === 0) {
      if (count % 3 === 0) {
        addAnime(animelist, `anime--left`);
      }
      else if (count % 3 === 1) {
        addAnime(animelist, `anime--center`);
      }
      else addAnime(animelist, `anime--right`);
    }
    else if (secondOrMoreGen === 0){
      if (count % 5 === 0 || count % 5 === 1) {
        addAnime(animelist, `anime--left`);
      }
      else if (count % 5 === 2) {
        addAnime(animelist, `anime--center`);
      }
      else addAnime(animelist, `anime--right`);
    }
    count++;
    }
    i++;
  }

  /* Funzione che verrà chiamata quando il contenuto di un elemento supera i limiti dell'elemento stesso
  Se la percentuale di intersezione tra un elemento e l'altro è minore di 1 (100%) con la funzione
  intersectionRatio vuol dire che c'è un overflow */

  /* Gli observer osservano l'area che han individuato originariamente, non la espadono, quindi
  per ora uso un modo alternativo per calcolare di quanto espandere l'area basato su quante parole
  ci sono nel titolo. */

  function handleOverflow(entries) {
    entries.forEach(x => {
      if (x.intersectionRatio < 1) {
        /* Aggiusto l'altezza della finestra che contiene il titolo in base a quanto di quanto
        overflow ha il testo. Indispensabile fare un unico passaggio in quanto l'observer fotografa
        una sola volta: non terrà conto del cambiamento futuro della dimensione del parent e del child
        se queste vengono cambiate quindi il calcolo va fatto con quello che si ottiene alla prima generazione
        degli elementi.*/

        /* Ottiene dalla finestra del browser lo stile di un elemento dopo che il CSS è stato applicato.
        Recuperarla col metodo "style" permette di leggere solo parametri definiti nell'HTML! */
        /* Per qualche ragione me lo recupera in px, devo troncarli via, idem la % per usi futuri.
        Ho deciso di deprecarlo perchè mi ritorna 60px che è un pò complicato da trasformare per i miei scopi.*/

        /* height = window.getComputedStyle(x.target.parentNode).getPropertyValue(`height`); */

        /* Significa che se qualora dovesse essere vuoto o null, varrà 15. */
        height = x.target.style.height;
        if (height === ``) {
          height = 15;
        }
        /* moltiplico per l'inverso dell'intersection ratio per ottenere una finestra che contiene
        esattamente il titolo, azzerando l'overflow. */
        else height = parseInt(height.replace(/px%/g,``));
        x.target.parentNode.style.height = `${height * 1/x.intersectionRatio}%`;
      }
    });
  }

  var options = {
    /* devo selezionare tutti i genitori, qui ne è selezionato uno solo */
    root: document.querySelector(`.anime__title`),
    rootMargin: `0px`,
    /* se anche un solo pixel è visibile, l'elemento viene valutato dall'observer. Utile in questo caso
    perchè l'overflow della sinossi potrebbe essere molto lungo. 1 vuol dire che ogni singolo
    pixel dell'elemento osservato dev'essere visibile nella viewport (in questo caso la viewport è il padre) */
    threshold: 0
  }

  // Creo tanti observer tanti quanti elementi .anime__title
  for (let i = 0; i < document.querySelectorAll(`.anime__title`).length; i++) {
    observer[i] = new IntersectionObserver(handleOverflow, {root: document.querySelectorAll(`.anime__title--text`)[i].parentNode,
    rootMargin: `0px`, threshold: 0});
  }

  // Seleziona tutti gli elementi .anime__title
  const animeTitles = document.querySelectorAll('.anime__title--text');

  for (let i = 0; i < document.querySelectorAll(`.anime__title--text`).length; i++) {
    observer[i].observe(animeTitles[i]);
  }

  flag++;

  /* Registra l'observer per ciascun elemento .anime__title
  map va usato quando bisogna ritornare un nuovo array, forEach se non c'è da ritornare nulla!
  Metodo non più usato in quanto ho deciso di creare un observer separato per ogni padre. */
/*   animeTitles.forEach(title => {
    observer.observe(title);
  }); */

/* map itera per forza su ogni elemento, soluzione scartata. */
/*   post.map(x => {
    if (count >= 20) {
      console.log("a");
      return;
    }
    console.log(x.data.episodes);
  }); */
}

/* Funzione per aggiungere la classe corretta per animare senza ripetere tante volte lo
stesso codice */

function addAnime(animelist, target) {
  animelist.innerHTML += `<div class="anime ${target}">
  <a href="${post[i].data.url}" target="_blank">
  <img class="anime__poster" src="${post[i].data.images.jpg.large_image_url}" alt=""> 
  <div class="anime__title">
  <p class="anime__title--text">${post[i].data.title}</p></div></div></a>`;
}

/* Funzioni per continuare la ricerca una volta arrivati alla fine della pagina */

let flag = 0;

window.addEventListener(`scroll`, function() {

  if (flag >= 1) {
    /* altezza in pixel. il this non è necessario perchè è già sottointeso l'oggetto globale, che
    è Window (la W maiuscola! che contiene tutto il resto (document, window...)) */
    const pageTotalHeight = this.document.body.scrollHeight;
    /* altezza attuale della finestra in termini assoluti (non dov'è rispetto alla pagina) */
    const windowHeight = this.window.innerHeight;
    /* di quanti pixel ho scrollato in giù da inizio pagina */
    const scrollPosition = this.window.scrollY;

    /* il +1 è necessario visto che a quanto pare lo sfondo non copre esattamente
    tutta la pagina, per un solo pixel! */
    if (pageTotalHeight - (windowHeight + scrollPosition + 1) <= 0) {
      const event = new Event(`generateMoreAnimeOnBottom`);
      window.dispatchEvent(event);
    }
  }
});

window.addEventListener(`generateMoreAnimeOnBottom`, function() {
  searchAnime(20, 1);
});

/* Funzioni di conversione dei dati */

function countSequelEpisodes(anime) {
  let sequel;
  let numberEps = 0;
  if (anime.relations.some(x => {
    if (x.relation === `Sequel`) {
      sequel = x.entry.map (y => {
        return y.mal_id;
      });
      return true;
    }
    return false;
  })) {
    /* non posso usare la map per fare return perchè mi ritornerebbe solo il primo numero se non
    ha come bersaglio un array. */
    post.forEach(x => {
      sequel.forEach(y => {
        if (x.data.mal_id === y) {
          /* visto che numberEps è una variabile locale, riazzerarla a ogni chiamata di funzione non
          ha conseguenze negative nel passo induttivo. (ovvero alla prima chiamata) */
          numberEps = countSequelEpisodes(x.data);
        }
      })
    })
  };
  if (anime.episodes == undefined) {
    return 0;
  }
  else return numberEps + anime.episodes;
}

/* Funzioni necessarie affinchè l'autocomplete funzioni correttamente per più anime */

function lastWord(string) {
  for (let i = 0; i < string.length; i++) {
    if (string[i] === `,`) {
      string = string.slice(i+1, string.length).trimStart();
      i = 0;
    }
  }
  console.log(string);
  return string;
}

function removeLastWord(string) {
  for (let i = string.length-1; i > -1; i--) {
    if (string[i] === `,`) {
      string = string.slice(0, i+1);
      console.log(string);
      return string;
    }
  }
  return ``;
}

function genresArray(genres) {
  /* non è necessario qui l'escape per dire dal meno alla chiocciola */
  genres = genres.replace(/[ -+.-@]/g, ``);
  console.log(genres);
  console.log(postGenres);
  let array = [];
  let i;
  while (genres != ``) {
    for (let j = 0; j < genres.length; j++) {
      if (genres[j] === `,`) {
        break;
      }
      i = j;
    }
    /* il secondo valore della funzione slice è inteso come il primo carattere da escludere.
    Quindi escludo a partire dalla virgola in poi. */
    array.push(genres.slice(0, i+1).toLowerCase());
    /* +2 qui perchè la parte rimanente dell'array deve togliere anche la virgola.*/
    genres = genres.slice(i+2, genres.length).trimStart();
  }
  array = array.map(x => {
    postGenres.forEach(y => {
      if (x === y.replace(/ /g, ``).toLowerCase()) {
        x = y.toLowerCase();
      }
    });
    return x;
  });
  return array;
}

/* Questo perchè i "generi" MAL li ha divisi in generi, temi e demografie...e quindi devo adattarmi */
function evaluateGenre(userGenre, animeGenre, animeTheme, animeDemographics) {
  /* Ritorna true se viene ritornato true almeno una volta.
  Con il forEach arriverà sempre in fondo, ritornando sempre false. */
  /* il "doppio" return serve per far si in modo che il risultato del metodo
  sia ritornato alla funzione chiamate , e non alla funzione di callback interna! */
  const userGenreTruth = userGenre.map(userGenre => {
    if (!animeGenre.some(x => {
      console.log(x.name.slice(0, userGenre.length).toLowerCase());
      return userGenre === x.name.slice(0, userGenre.length).toLowerCase();
    })) {
      if (!animeTheme.some(x => {
        console.log(x.name.slice(0, userGenre.length).toLowerCase());
        return userGenre === x.name.slice(0, userGenre.length).toLowerCase();
      })) {
        return animeDemographics.some (x => {
          console.log(x.name.slice(0, userGenre.length).toLowerCase());
          return userGenre === x.name.slice(0, userGenre.length).toLowerCase();
        });
      }
    }
    console.log("true");
    return true;
  });
  for (let i = 0; i < userGenreTruth.length; i++) {
    if (userGenreTruth[i] === false) {
      return false;
    }
  }
  return true;
}

function monthsAgo(date) {
  if (date === null) {
    /* Anime non ancora trasmesso */
    return -1;
  }
  const today = new Date();
  /* Converte in stringa e assicura che mese e giorno siano a due cifre */
  const amg = today.getFullYear() + today.getMonth().toString().padStart(2,`0`) +
  today.getDate().toString().padStart(2,`0`);
  /* Funzione slice: taglia una stringa tra due intervalli */
  /* Sostituisce tutti i caratteri corrispondenti a quello o al range di quelli indicati
  tra i due slash con quello indicato nel secondo parametro della funzione replace.
  g sta per tutti i caratteri trovati, non solo il primo. */
  date = date.slice(0,10).replace(/-/g,``);
  /* Leading o trailing, sono sequenze a inizio o fine stringa.
  "aaa eee uuu" le 3 a sono leading e le 3 u sono trailing. Commento a scopo didattico, non sto
  usando questi concetti in questo codice.*/
  ///////////////////////////////////////////////////
  /* Calcolo di quanti mesi fa è uscito l'anime VS i mesi inseriti nei parametri */
  let datevalue = parseInt(date.slice(0,4)) * 12 + parseInt(date.slice(4,6));
  return (parseInt(amg.slice(0,4) * 12 + parseInt(amg.slice(4,6))) - datevalue);
}

function toNumeric(number) {
  console.log(number.length);
  if (number.replace(/[!-/:-~]/g,``).length === 1) {
    return document.querySelector(".numeric_rating--inner").value = number.replace(/[!-/:-~]/g,``);
  }
  else if (number === `10`) {
    return number;
  }
  else if (!(number[1] === `,`) && !(number[1] === `.`)) {
    return document.querySelector(".numeric_rating--inner").value = 0;
  }
  /* la stringa tra parentesi è una regex (regular expression). nelle parentesi quadre elenco i caratteri
  da cercare e la g è per dire di non fermarsi solo al primo match ma di passarli tutti.
  È consentito confrontare più range in una singola chiamata con le regex: !-/ :-~ mi conserva solo i numeri
  in quanto ho impostato i due range fuori dal loro posizionamento in ASCII.*/
  const filter = number.replace(/[!-/:-~]/g,``);
  /* Una stringa vuota non è nulla, ma semplicemente di lunghezza 0. */
  console.log(filter);
  if (filter.length === 0) {
    return document.querySelector(".numeric_rating--inner").value = 0;
  }
  /* Aggiungo il punto interno al numero depurato dai corpi estranei */
  else {
    if (filter.length === 1) {
      return filter;
    }
    else {
      let temp = ``;
      for (let i = 0; i < filter.length+1; i++) {
        if (i === 1) {
          temp += `.`;
        }
        else if (i > 1) {
          temp += filter[i-1];
        }
        else {
          temp += filter[i];
        }
      }
      return document.querySelector(".numeric_rating--inner").value = temp;
    }
  }
}

// da riattivare
testpost();

async function testpost() {
  post = await fetch(`./Resources/AllAnime.json`);
  post = await post.json();
  let i = 0;
  let temp = []
    post.forEach(x => {
    if (x.status != 500) {
      temp[i] = x;
      i++;
    }
    else console.log("status è 500");
    post = temp;
  });
  console.log(post);
}

/* let arr = [1, 4, 9, 16]

arr.map((elem) => {
    console.log(elem)
})

let new_arr = arr.map(() => "miao") // Se non c'è bisogno di confronto va bene la parentesi vuota
console.log(new_arr) */

// Devo convertire questi dollari in centesimi, sia col metodo corto che con quello lungo
/* let dollars = [1, 5, 10, 3]
let cents = dollars.map((element) => {
    return element * 100
})
console.log(cents)

let cents2 = dollars.map(elem => elem * 100)
console.log(cents2)

let cents3 = []
for (let i = 0; i < dollars.length; i++) {
    cents3.push(dollars[i] * 100)
}
console.log(cents3) */