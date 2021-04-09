let headingName = document.querySelector(".headingName");
let moreInfo = document.querySelector(".more-info");
let info = document.querySelector(".more-info");
    
//Switch Mode : Light/Dark
const darkLightMode = document.querySelector(".mode-switcher");

darkLightMode.addEventListener("click" , ()=>{
    document.body.classList.toggle("dark");
    if(document.body.classList.contains("dark")){
        darkLightMode.lastChild.textContent = " Light Mode"
        darkLightMode.firstElementChild.classList.add("fas");
        darkLightMode.firstElementChild.classList.remove("far");

    }
    else {
        darkLightMode.lastChild.textContent = " Dark Mode"
        darkLightMode.firstElementChild.classList.remove("fas");
        darkLightMode.firstElementChild.classList.add("far");

    }
})

//Fetch Data From REST Countries API When Loading The Page
const flagContainer = document.querySelector(".flag-container");
let API_URL = "https://restcountries.eu/rest/v2/all";
window.addEventListener("load", ()=>{
    fetchData(API_URL);
})


//Filter By Region
const regions = document.querySelector(".region");

regions.addEventListener("change", (e)=>{
    let region = e.target.value;
    API_URL = `https://restcountries.eu/rest/v2/region/${region}`;
    fetchData(API_URL);
});

//Search By Name
let inputName = document.querySelector(".search-input");

inputName.addEventListener("keyup", ()=>{
    for(let i = 0; i < flagContainer.childElementCount; i++){
        if(!flagContainer.childNodes[i].childNodes[1].childNodes[0].textContent.toLocaleLowerCase().includes(inputName.value.toLocaleLowerCase())){
            flagContainer.childNodes[i].style.display = "none";
        }
        else {
            flagContainer.childNodes[i].style.display = "block";
        }

    }
})



//My Functions

let countries;
function fetchData(URL){

    fetch(API_URL)
    .then(
        response => response.json()
    )
    .then(
        (data) => {
            useData(data);
        }
    )

}

function useData(data){
    flagContainer.innerHTML = "";
    for(let i = 0 ; i < data.length ; i++ ){
        if(data[i].name === "Israel"){
            continue;
        }
        //Create The Card
        let card = document.createElement("div");
        card.classList.add("card");
        
        let currentCountry = data[i];

        //Add An EventListener To The Card
        card.addEventListener("click", ()=>{
            showDetails(currentCountry);
        });
        
        //Create The Image (Flag)
        let flag = document.createElement("img");
        flag.classList.add("flag");
        flag.src = data[i].flag;
        flag.alt = `${data[i].name}'s Flag`;

        //Create The Info Div
        let info = document.createElement("div");
        info.classList.add("info");
            //The Country Name
            let countryName = document.createElement("h2");
            countryName.classList.add("country-name");
            countryName.textContent = data[i].name;
            //The Population
            let population = document.createElement("p");
            population.classList.add("population");
            let pLabel = document.createElement("label");
            pLabel.classList.add("label");
            pLabel.textContent = "Population : ";
            population.appendChild(pLabel);
            let pInfo = document.createElement("span");
            pInfo.textContent = data[i].population.toLocaleString('en-US');
            population.appendChild(pInfo);
            //The Region
            let region = document.createElement("p");
            region.classList.add("region");
            let rLabel = document.createElement("label");
            rLabel.classList.add("label");
            rLabel.textContent = "Region : ";
            region.appendChild(rLabel);
            let rInfo = document.createElement("span");
            rInfo.textContent = data[i].region;
            region.appendChild(rInfo);
            //The Capital
            let capital = document.createElement("p");
            capital.classList.add("capital");
            let cLabel = document.createElement("label");
            cLabel.classList.add("label");
            cLabel.textContent = "Capital : ";
            capital.appendChild(cLabel);
            let cInfo = document.createElement("span");
            cInfo.textContent = data[i].capital;
            capital.appendChild(cInfo);
        //Append The Info to The Info Div
        info.appendChild(countryName);
        info.appendChild(population);
        info.appendChild(region);
        info.appendChild(capital);

        //Append The Image Flag & The Info Div To The Card
        card.appendChild(flag);
        card.appendChild(info);

        //Append The Card To The Page
        flagContainer.appendChild(card)
    }
    
}

//Show Details Page
let mainContainer = document.querySelector(".container");
function showDetails(country){
    mainContainer.innerHTML = `
        <button class="back-btn">
        <a href="index.html">
            <i class="fas fa-arrow-left"></i>
            Back
        </a>
        </button>
        <div class="flag-details-container">
            <div class="flag">
                <img class="flag-img" src="https://restcountries.eu/data/bel.svg" alt="flag">
            </div>
            <div class="details-container">
                <h1 class="headingName">Belgium</h1>
                <div class="more-info">
                    <p>Native Name: <span class="native-name"></span></p>
                    <p>Population: <span class="population-detail"></span></p>
                    <p>Region: <span class="region-detail"></span></p>
                    <p>Area: <span class="area-detail"></span></p>
                    <p>Sub Region: <span class="sub-region-detail"></span></p>
                    <p>Capital: <span class="capital-detail"></span></p>
                    <p>Top Level Domain: <span class="domain-detail"></span></p>
                    <p>Currencies: <span class="currencies-detail"></span></p>
                    <p>Languages: <span class="languages-detail"></span></p>
                    <p>Time Zone: <span class="time-detail"></span></p>
                </div>
                <div class="border-countries">
                    <p>Border Countries: </p>
                    <div class="border-container">
                    </div>
                </div>
            </div>
            
        </div>
    `
    //The Flag
    let flagImg = document.querySelector(".flag-img");
    flagImg.src = country.flag;
    
    //Country Name
    let headingName  = document.querySelector(".headingName");
    headingName.textContent = country.name

    //************** Details **************

    //Native Name
    let nativeName  = document.querySelector(".native-name");
    nativeName.textContent = country.nativeName

    //Population
    let populationDetail  = document.querySelector(".population-detail");
    populationDetail.textContent = country.population.toLocaleString('en-US');
    
    //Region
    let regionDetail  = document.querySelector(".region-detail");
    regionDetail.textContent = country.region

    //Area
    let areaDetail  = document.querySelector(".area-detail");
    areaDetail.textContent = (country.area !== null) ? `${country.area.toLocaleString('en-US')} KM²` : "Unknown!" ;

    //Sub Region
    let subRegionDetail  = document.querySelector(".sub-region-detail");
    subRegionDetail.textContent = country.subregion

    //Capital
    let capitalDetail  = document.querySelector(".capital-detail");
    capitalDetail.textContent = country.capital;

    //Top Level Domain
    let doaminDetail  = document.querySelector(".domain-detail");
    doaminDetail.textContent = [...country.topLevelDomain];

    //Currencies
    let currenciesDetail  = document.querySelector(".currencies-detail");
    country.currencies.forEach((curr, index) => {
        currenciesDetail.textContent += curr.name;
        if(index !== country.currencies.length - 1){
            currenciesDetail.textContent += ', '
        }
    });

    //Languages
    let launguagesDetail  = document.querySelector(".languages-detail");
    country.languages.forEach((lang, index) => {
        launguagesDetail.textContent += lang.name;
        if(index !== country.languages.length - 1){
            launguagesDetail.textContent += ', '
        }
    });

    //Time Zone
    let timeDetail  = document.querySelector(".time-detail");
    timeDetail.textContent = [...country.timezones];

    //Borders
    let borderContainer = document.querySelector(".border-container");
    country.borders.forEach(bor => {
        let statusCode;
        let currentBorder;
        fetch(`https://restcountries.eu/rest/v2/alpha/${bor}`)
        .then(
            response => {
                statusCode = response.status;
                return response.json();
            }
        )
        .then(
            data => {
                currentBorder = data;
            }
        );

        let newDetails = setInterval(()=>{
            if(statusCode === 200){
                clearInterval(newDetails);
                let border = document.createElement("button");
                border.textContent = currentBorder.name;
                border.addEventListener("click", () => {
                    showDetails(currentBorder);
                })
                borderContainer.appendChild(border)
            
            }
        },500)
    });
}