'use strict';

/*
mapboxgl.accessToken = 'pk.eyJ1IjoiY2F0Y2gyMi0iLCJhIjoiY2xnNWd6Y3VyMDNoMzNsbzd1N3pwM25tMCJ9.Lihja_tmPkwHGTslwKqcig';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    //center: [0, 0],
    projection: 'globe'
});

const marker = new mapboxgl.Marker()
    .setLngLat([-97.19, 49.8]) 
    .addTo(map);

let long = '';
let lat = '';
const getLocation = () => new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(
        position => {
            const location = [
                long = position.coords.longitude,
                lat = position.coords.latitude 
            ];
            marker.setLngLat([long, lat]) 
            console.log([long, lat]);
            map.flyTo({
                center: location,
                zoom: 14,
                speed: 0.8,
                essential: true
            })
            resolve(location);
        },
        err => reject(err)
    );
    if(longitude && latitude) {
        map.setCenter([longitude, latitude]);
        marker.setLngLat([longitude, latitude]).addTo(map);
        setTimeout(() => {
            loading.style.display = 'none';
        }, 120000);
    }    
})
*/
/* Forbid some functions */
/*
map.dragPan.disable();
map.doubleClickZoom.disable();
map.dragRotate.disable();
map.keyboard.disable();
map.scrollZoom.disable();
map.touchZoomRotate.disable();
*/
/*
let wait = ms => new Promise(
    r => setTimeout(r, ms)
);
let repeat = (ms, func) => new Promise(
    r => (
        setInterval(func, ms),
        wait(ms).then(r)
    )
);

repeat(1500, () => Promise.all([getLocation()]))
    .catch(err => console.log('Geolocation encountered an error'));

*/
const mapBox = document.querySelector('.map');
const loader = document.querySelectorAll('.lds-roller');
const overlay = document.querySelector('.loading');












mapboxgl.accessToken = 'pk.eyJ1IjoiY2F0Y2gyMi0iLCJhIjoiY2xnNWd6Y3VyMDNoMzNsbzd1N3pwM25tMCJ9.Lihja_tmPkwHGTslwKqcig';

function getLocation(position) {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [0, 0],
        zoom: 14,
        pitch: 40,
        projection: 'globe'
    });

    const {longitude, latitude} = position.coords;
    
    if(longitude && latitude) {
        map.setCenter([longitude, latitude]);
        marker.setLngLat([longitude, latitude]).addTo(map);
        console.log([longitude, latitude]);
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 100);
    }   
    
    /* Forbid some functions */
    map.dragPan.disable();
    map.doubleClickZoom.disable();
    map.dragRotate.disable();
    map.keyboard.disable();
    map.scrollZoom.disable();
    map.touchZoomRotate.disable();
}

const marker = new mapboxgl.Marker({ 
    color: '#2B4162',
})

const options = {
    enableHighAccuracy: true,
    maximumAge: 0
}

function errorHandler(error) {
    loader.style.animationPlayState = 'paused';
    console.log(error.message);
}

/**
 * The watchPosition() method is used to register a handler function that will be called automatically, 
 * each time the position of the device changes
 */
if(navigator.geolocation) {
    navigator.geolocation.watchPosition(getLocation, errorHandler, options);
} else {
    console.log('Geolocation is not supported by your browser');
}
