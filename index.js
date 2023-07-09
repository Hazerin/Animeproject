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

let genres;

function autocomplete(inp, arr) {
  /*Argomenti: campo di testo e array di valori "autocompletati"*/
  var currentFocus;
  /*Quando si scrive nel campo di testo (input) si attiva la funzione
  specificata subito dopo (l'anonima "function()). È anche possibile chiamare una
  funzione esterna mettendo quella come secondo parametro. */
  /* L'addEventListener fa si che quando si registri un determinato tipo di "input" (come i click) e una
  funzione da eseguire quando si interagisce con un determinato elemento della pagina. */
  inp.addEventListener("input", function() {
      /* this.value = valore dell'input */
      var a, b, i, val = this.value;
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
              inp.value = this.getElementsByTagName("input")[0].value;
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
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }

function slideOne(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
    sliderOne.value = parseInt(sliderTwo.value) - minGap;
    }
    displayValOne.textContent = 240 - sliderOne.value;
    fillColor();
    if (parseInt(sliderOne.value) === 0) {
      displayValOne.textContent = `Any date`
    }
}
function slideTwo(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
        sliderTwo.value = parseInt(sliderOne.value) + minGap;
    }
    displayValTwo.textContent = 240 - sliderTwo.value;
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

async function main() {
    const post = await fetch(`https://api.jikan.moe/v4/genres/anime`);
    const postjson = await post.json();
    console.log(postjson);
    genres = postjson.data.map(x => {
        return x.name;
    })
    console.log(genres);
    /* Devo aspettare l'async mettendo dentro pure la funzione che inizializza l'autocomplete o far aspettare fuori in qualche modo */
    autocomplete(document.getElementById("search-genres"), genres);
}

main();

/* let arr = [1, 4, 9 , 16]

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