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

let minGap = 0;
let sliderTrack = document.querySelector(`.slider-track`);
let sliderMaxValue = document.getElementById(`myRange1`).max;

let genres;

function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener(`input`,function(e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) return false;
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute(`id`, this.id + `autocomplete-list`);
        this.parentNode.appendChild(a);

        /* Verifica se la parola per ora digitata appare nella lista */
        for (i = 0; i < arr.lenght; i++)
    })
}

function slideOne(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
    sliderOne.value = parseInt(sliderTwo.value) - minGap;
    }
    displayValOne.textContent = sliderOne.value;
    fillColor();
}
function slideTwo(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
        sliderTwo.value = parseInt(sliderOne.value) + minGap;
    }
    displayValTwo.textContent = sliderTwo.value;
    fillColor();
}

function fillColor() {
    percent1 = (sliderOne.value / sliderMaxValue) * 100;
    percent2 = (sliderTwo.value / sliderMaxValue) * 100;
    /* Non devo infilare il punto e virgola nella stringa che va a settare il background */
    sliderTrack.style.background =
    `linear-gradient(to right, #dadae5 ${percent1}%, #3264fe ${percent1}%
        ,#3264fe ${percent2}%, #dadae5 ${percent2}%)`
}

async function main() {
    const post = await fetch(`https://api.jikan.moe/v4/genres/anime`);
    const postjson = await post.json();
    console.log(postjson);
    genres = postjson.data.map(x => {
        return x.name;
    })
    console.log(genres);
}

main();

autocomplete(document.getElementById("myInput"), genres);

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