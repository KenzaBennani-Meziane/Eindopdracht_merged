let KleurWaarde = 1;
let VelgenWaarde = 1;
let BodyWaarde = 1;

let BodyString;
let VelgenString;
let KleurString;

document.addEventListener('DOMContentLoaded', function () {
    const ScrollSpeed = 200;
    const CssSetting = false;

    var swiper1 = new Swiper('#swiper1', {
        effect: "coverflow",
        speed: ScrollSpeed,
        cssMode: CssSetting,
        allowTouchMove: false,
        navigation: {
            nextEl: '#swiper1 .swiper-button-next',
            prevEl: '#swiper1 .swiper-button-prev',
        },
    });

    var swiper2 = new Swiper('#swiper2', {
        effect: "coverflow",
        speed: ScrollSpeed,
        cssMode: CssSetting,
        allowTouchMove: false,
        navigation: {
            nextEl: '#swiper2 .swiper-button-next',
            prevEl: '#swiper2 .swiper-button-prev',
        },
    });

    var swiper3 = new Swiper('#swiper3', {
        effect: "coverflow",
        speed: ScrollSpeed,
        cssMode: CssSetting,
        navigation: {
            nextEl: '#swiper3 .swiper-button-next',
            prevEl: '#swiper3 .swiper-button-prev',
        },
    });
});

// Map

// Initialize the map and set its view to your chosen geographical coordinates and zoom level

const KleurKnopPrev = () => {
    KleurWaarde -= 1;
    ChangeKleur(KleurWaarde);

    console.log("Kleurwaarde = " + KleurWaarde);
}
const KleurKnopNext = () => {
    KleurWaarde += 1;
    ChangeKleur(KleurWaarde);

    console.log("Kleurwaarde = " + KleurWaarde);
}

const VelgKnopPrev = () => {
    VelgenWaarde -= 1;
    ChangeVelg(VelgenWaarde);

    console.log("velgen waarde = " + VelgenWaarde);
}
const VelgKnopNext = () => {
    VelgenWaarde += 1;
    ChangeVelg(VelgenWaarde);

    console.log("velgen waarde = " + VelgenWaarde);
}

const BodyKnopPrev = () => {
    BodyWaarde -= 1;
    ChangeBody(BodyWaarde);

    console.log("body waarde = " + BodyWaarde);
}
const BodyKnopNext = () => {
    BodyWaarde += 1;
    ChangeBody(BodyWaarde);

    console.log("body waarde = " + BodyWaarde);
}

const ChangeBody = (BodyWaarde) => {
    let image = document.querySelector('#CarBody');

    if (BodyWaarde === 1) {
        image.src = '/images/hatchback-02.png';
        BodyString = 'hatchback';
    } else if (BodyWaarde === 2) {
        image.src = '/images/suv.png';
        BodyString = 'suv';
    } else if (BodyWaarde === 3) {
        image.src = '/images/sportcar-02.png';
        BodyString = 'coupe';
    }

}
const ChangeVelg = (VelgenWaarde) => {
    let image = document.querySelector('#CarVelgen');

    if (VelgenWaarde === 1) {
        image.src = '/images/blue.png';
        VelgenString = 'sport';
    } else if (VelgenWaarde === 2) {
        image.src = '/images/red.png';
        VelgenString = 'klassiek';
    } else if (VelgenWaarde === 3) {
        image.src = '/images/green.png';
        VelgenString = 'comfort';
    }
}

const ChangeKleur = (KleurWaarde) => {
    let image = document.querySelector('#CarBody');

    if (KleurWaarde === 1) {
        KleurString = 'rood';
        image.style.filter = 'invert(34%) sepia(49%) saturate(7485%) hue-rotate(345deg) brightness(115%) contrast(102%)';
    } else if (KleurWaarde === 2) {
        KleurString = 'groen';
        image.style.filter = 'invert(72%) sepia(74%) saturate(991%) hue-rotate(64deg) brightness(103%) contrast(101%)';
    } else if (KleurWaarde === 3) {
        KleurString = 'blauw';
        image.style.filter = 'invert(51%) sepia(69%) saturate(6308%) hue-rotate(209deg) brightness(106%) contrast(101%)';
    }
}

ChangeKleur(KleurWaarde);
ChangeVelg(VelgenWaarde);
ChangeBody(BodyWaarde);


// Navigeer naar de 'results' pagina via 'opslaan knop' op build pagina
function navigateToResults() {
    var BodyWaarde = encodeURIComponent(BodyString);
    var VelgenWaarde = encodeURIComponent(VelgenString);
    var KleurWaarde = encodeURIComponent(KleurString);

    try {
        sessionStorage.setItem('Body', BodyString);
        sessionStorage.setItem('Velgen', VelgenString);
        sessionStorage.setItem('Kleur', KleurString);
        console.log("Data stored successfully in session storage.");
    } catch (error) {
        console.error("Error storing data in session storage:", error);
    }

    var url = `/results/?carrosserie=${BodyWaarde}&velgen=${VelgenWaarde}&kleur=${KleurWaarde}`;

    window.location.href = url;
}
function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function showResults() {
    // Function to hide the loading screen and show the main content
    function hideLoadingScreen() {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    }
    
    // Simulate a delay to show the loading screen (replace with your actual loading logic)
    function simulateLoading() {
        setTimeout(() => {
        hideLoadingScreen();
        }, 2000); // Adjust the timeout as needed (in milliseconds)
    }
    
    // Ensure the loading screen hides after 5 seconds regardless of loading status
    function hideLoadingAfterTimeout() {
        setTimeout(() => {
        hideLoadingScreen();
        }, 5000); // 5 seconds timeout
    }
    
    // Call the functions when the window finishes loading
    window.onload = function() {
        simulateLoading();
        hideLoadingAfterTimeout();
    };

    
    // Initialize List.js for sorting and searching
    var options = {
        valueNames: ['merk', 'kilometers', 'Brandstof', 'Bouwjaar']
    };
    var carList = new List('theList', options);

    // Initialize sorting based on button clicks
    var buttons = document.querySelectorAll('.sort');
    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            var sortBy = button.getAttribute('data-sort');
            var currentSortOrder = button.getAttribute('data-default-order') || 'asc';

            carList.sort(sortBy, {
                order: currentSortOrder
            });
            button.setAttribute('data-default-order', currentSortOrder === 'asc' ? 'desc' : 'asc');
        });
    });

    // Initialize search functionality
    var searchField = document.querySelector('.search');
    searchField.addEventListener('input', function () {
        var searchString = this.value.toLowerCase();
        carList.search(searchString);
    });

    let image = document.querySelector('#CarBody');
    let image2 = document.querySelector('#CarVelgen');

    if (sessionStorage.getItem("Body") == 1) {
        image.src = '/images/hatchback-02.png';
    } else if (sessionStorage.getItem("Body") == 2) {
        image.src = '/images/suv.png';
    } else if (sessionStorage.getItem("Body") == 3) {
        image.src = '/images/sportcar-02.png';
    }

    if (sessionStorage.getItem("Velgen") == 1) {
        image2.src = '/images/blue.png';
    } else if (sessionStorage.getItem("Velgen") == 2) {
        image2.src = '/images/red.png';
    } else if (sessionStorage.getItem("Velgen") == 3) {
        image2.src = '/images/green.png';
    }

    if (sessionStorage.getItem("Kleur") == 1) {
        image.style.filter = 'invert(34%) sepia(49%) saturate(7485%) hue-rotate(345deg) brightness(115%) contrast(102%)';
    } else if (sessionStorage.getItem("Kleur") == 2) {
        image.style.filter = 'invert(72%) sepia(74%) saturate(991%) hue-rotate(64deg) brightness(103%) contrast(101%)';
    } else if (sessionStorage.getItem("Kleur") == 3) {
        image.style.filter = 'invert(51%) sepia(69%) saturate(6308%) hue-rotate(209deg) brightness(106%) contrast(101%)';
    };
    
    // Filter functionality

    // Get the current URL
    var currentUrl = window.location.href;

    // // Build the parameter string
    var brandstofParam = '&brandstof=' + encodeURIComponent(brandstofFilter);

    // // Check if there are existing parameters
    // var separator = currentUrl.indexOf('?') !== -1 ? '&' : '?';

    // // Append the parameter to the URL
    // var newUrl = currentUrl + separator + brandstofParam;

    // // Replace the current URL with the new URL
    // window.history.replaceState({}, document.title, newUrl);
    
    function applyFilters() {
        document.getElementById('filterForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission
        // applyFilters();
        var brandstofFilter = document.getElementById('brandstofFilter').value.toLowerCase();        
        carList.filter(function (item) {
            var brandstofMatch = brandstofFilter === '' || this.item.values().Brandstof.toLowerCase() === brandstofFilter;
            return brandstofMatch;
        });
        
    });
    }
    
}

const OnLoadResults = () => {

}

const LoadResults = () => {

    showResults();
    OnLoadResults();
}

var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([4.895168, 52.370216]),  // Longitude, Latitude of Amsterdam
        zoom: 12
    })
});




// var likeIcon = document.getElementById('like-icon');

// var Liked = false;

// document.getElementById("like-icon").addEventListener('click', function() {

//     likeIcon.classList.add('jump');
//     Liked = !Liked;

//     if (Liked) {
//         likeIcon.src = "/images/Heart1.svg";
//         console.log("help");
//     } else {
//         likeIcon.src = '/images/Heart2.svg';
//     }

//     setTimeout(() => {
//     likeIcon.classList.remove('jump');
//     }, 500); 
// });