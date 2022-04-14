const mymap = L.map('mapid').setView([0, 0], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

let locationIcon = L.icon({
    iconUrl: '/IP-Address-Tracker/images/icon-location.svg',
    iconSize: [30, 45],
    iconAnchor: [26.47, 54]
});


let ip = '';
let domain = '';
const api_key = 'at_udqU3AVVicMujkURhDkkHciDgU47U';
const api_url = 'https://geo.ipify.org/api/v2/country,city?';
let url = api_url + 'apiKey=' + api_key + '&ipAddress=' + ip + '&domain=' + domain;

async function myFunction() {
    let inputvalue = document.getElementById('ipAddress').value;
    document.getElementById('error').innerHTML = '';
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(inputvalue)) {
        console.log('its an IP address');
        ip = inputvalue;
    } else if (/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(inputvalue)) {
        console.log("its a domain name");
        domain = inputvalue;
    } else {
        document.getElementById("error").style.display = "block";
        document.getElementById('error').innerHTML = 'Please enter a valid IP address or domain!';
        ip = '';
        domain = '';
    }

    url = await api_url + 'apiKey=' + api_key + '&ipAddress=' + ip + '&domain=' + domain;
    console.log(url);

    getData();
}

let input = document.getElementById("ipAddress");
input.addEventListener("keyup", function (event) {
    if (event.which === 13) {
        event.preventDefault();
        document.getElementById("myButton").click();
    }
});

const marker = L.marker([0, 0], { icon: locationIcon }).addTo(mymap);

//fetch API & add data into element
async function getData() {
    const response = await fetch(url);
    const data = await response.json();
    const lat = data.location.lat;
    const lon = data.location.lng;

    console.log(data);

    marker.setLatLng([lat, lon]);
    mymap.setView([lat, lon], 5);

    document.getElementById('box1').innerText = data.ip;
    document.getElementById('box2').innerText = data.location.region + ', ' + data.location.country + ' ' + data.location.postalCode;
    document.getElementById('box3').innerText = 'UTC' + data.location.timezone;
    document.getElementById('box4').innerText = data.isp;
}
getData();
