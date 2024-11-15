// // import axios from "axios";
// // index.js
// axios.get('https://api.example.com/data')
//   .then(response => console.log(response.data))
//   .catch(error => console.error(error));




// // form fields
// const form = document.querySelector(".form-data");
// const region = document.querySelector(".region-name");
// const apiKey = document.querySelector(".api-key");
// // results
// const errors = document.querySelector(".errors");
// const loading = document.querySelector(".loading");
// const results = document.querySelector(".result-container");
// const usage = document.querySelector(".carbon-usage");
// const fossilfuel = document.querySelector(".fossil-fuel");
// const myregion = document.querySelector(".my-region");
// const clearBtn = document.querySelector(".clear-btn");

// const displayCarbonUsage = async (apiKey, region) => {
//   try {
//     await axios
//       .get("https://api.co2signal.com/v1/latest", {
//         params: {
//           countryCode: region,
//         },
//         headers: {
//           //please get your own token from CO2Signal https://www.co2signal.com/
//           "auth-token": "FN4xGmxOj38e5",
//         },
//       })
//       .then((response) => {
//         let CO2 = Math.floor(response.data.data.carbonIntensity);
//         calculateColor(CO2);
//         loading.style.display = "none";
//         form.style.display = "none";
//         myregion.textContent = region;
//         usage.textContent =
//           Math.round(response.data.data.carbonIntensity) +
//           " grams (grams C02 emitted per kilowatt hour)";
//         fossilfuel.textContent =
//           response.data.data.fossilFuelPercentage.toFixed(2) +
//           "% (percentage of fossil fuels used to generate electricity)";
//         results.style.display = "block";
//       });
//   } catch (error) {
//     console.log(error);
//     loading.style.display = "none";
//     results.style.display = "none";
//     errors.textContent =
//       "Sorry, we have no data for the region you have requested.";
//   }
// };

// const calculateColor = async (value) => {
//   let co2Scale = [0, 150, 600, 750, 800];
//   let colors = ['#2AA364', '#F5EB4D', '#9E4229', '#381D02', '#381D02'];

//   let closestNum = co2Scale.sort((a, b) => {
//     return Math.abs(a - value) - Math.abs(b - value);
//   })[0];
//   console.log(value + ' is closest to ' + closestNum);
//   let num = (element) => element > closestNum;
//   let scaleIndex = co2Scale.findIndex(num);

//   let closestColor = colors[scaleIndex];
//   console.log(scaleIndex, closestColor);

//   chrome.runtime.sendMessage({ action: 'updateIcon', value: { color: closestColor } });
// };


// function setUpUser(apiKey, regionName) {
//   localStorage.setItem("apiKey", apiKey);
//   localStorage.setItem("regionName", regionName);
//   loading.style.display = "block";
//   errors.textContent = "";
//   clearBtn.style.display = "block";
//   displayCarbonUsage(apiKey, regionName);
// }

// function handleSubmit(e) {
//   e.preventDefault();
//   setUpUser(apiKey.value, region.value);
// }

// function init() {
//   const storedApiKey = localStorage.getItem("apiKey");
//   const storedRegion = localStorage.getItem("regionName");
//   //set icon to be generic green
//   chrome.runtime.sendMessage({
//     action: 'updateIcon',
//     value: {
//       color: 'green',
//     },
//   });
//   //todo
//   if (storedApiKey === null || storedRegion === null) {
//     form.style.display = "block";
//     results.style.display = "none";
//     loading.style.display = "none";
//     clearBtn.style.display = "none";
//     errors.textContent = "";
//   } else {
//     displayCarbonUsage(storedApiKey, storedRegion);
//     results.style.display = "none";
//     form.style.display = "none";
//     clearBtn.style.display = "block";
//   }
// }

// function reset(e) {
//   e.preventDefault();
//   localStorage.removeItem("regionName");
//   init();
// }

// form.addEventListener("submit", (e) => handleSubmit(e));
// clearBtn.addEventListener("click", (e) => reset(e));
// init();

// form fields
const form = document.querySelector(".form-data");
const region1 = document.querySelector(".region-name-1");
const region2 = document.querySelector(".region-name-2");
const region3 = document.querySelector(".region-name-3");
const apiKey = document.querySelector(".api-key");
// results
const errors = document.querySelector(".errors");
const loading = document.querySelector(".loading");
const results = document.querySelector(".result-container");
const usage = document.querySelector(".carbon-usage");
const fossilfuel = document.querySelector(".fossil-fuel");
const myregion = document.querySelector(".my-region");
const clearBtn = document.querySelector(".clear-btn");

const displayCarbonUsageForRegions = async (apiKey, regions) => {
  try {
    // 여러 지역에 대해 동시에 API 요청을 보냄
    const responses = await Promise.all(
      regions.map((region) =>
        axios.get("https://api.co2signal.com/v1/latest", {
          params: { countryCode: region },
          headers: { "auth-token": apiKey },
        })
      )
    );

    // 각 지역에 대한 데이터를 처리하여 출력
    responses.forEach((response, index) => {
      const data = response.data.data;
      const CO2 = Math.floor(data.carbonIntensity);
      const fossilFuel = data.fossilFuelPercentage.toFixed(2);

      // 각 지역의 결과를 콘솔에 출력합니다 (필요에 따라 화면에 표시할 수 있음)
      console.log(`Region ${index + 1}:`);
      console.log(`CO2: ${CO2} grams per kWh`);
      console.log(`Fossil Fuel: ${fossilFuel}%`);

      // 결과를 화면에 표시
      const regionResult = document.createElement("div");
      regionResult.innerHTML = `
        <p><strong>Region ${index + 1}: ${regions[index]}</strong></p>
        <p>Carbon Usage: ${CO2} grams per kWh</p>
        <p>Fossil Fuel Percentage: ${fossilFuel}%</p>
      `;
      results.appendChild(regionResult);
    });

    loading.style.display = "none";
    results.style.display = "block";

  } catch (error) {
    console.error("Error fetching data for one or more regions:", error);
    loading.style.display = "none";
    errors.textContent = "Error fetching data for one or more regions.";
  }
};

function setUpUser(apiKey) {
  // 사용자 입력으로부터 지역 이름을 가져옴
  const regions = [
    region1.value.trim(),
    region2.value.trim(),
    region3.value.trim(),
  ];

  // 로딩 표시
  loading.style.display = "block";
  errors.textContent = "";
  clearBtn.style.display = "block";
  results.innerHTML = ""; // 이전 결과 초기화
  displayCarbonUsageForRegions(apiKey, regions);
}

function handleSubmit(e) {
  e.preventDefault();
  setUpUser(apiKey.value);
}

function init() {
  const storedApiKey = localStorage.getItem("apiKey");
  const storedRegion1 = localStorage.getItem("regionName1");
  const storedRegion2 = localStorage.getItem("regionName2");
  const storedRegion3 = localStorage.getItem("regionName3");

  if (storedApiKey && storedRegion1 && storedRegion2 && storedRegion3) {
    apiKey.value = storedApiKey;
    region1.value = storedRegion1;
    region2.value = storedRegion2;
    region3.value = storedRegion3;
    setUpUser(storedApiKey);
  } else {
    form.style.display = "block";
    results.style.display = "none";
    loading.style.display = "none";
    clearBtn.style.display = "none";
    errors.textContent = "";
  }
}

function reset(e) {
  e.preventDefault();
  localStorage.removeItem("apiKey");
  localStorage.removeItem("regionName1");
  localStorage.removeItem("regionName2");
  localStorage.removeItem("regionName3");
  init();
}

form.addEventListener("submit", (e) => handleSubmit(e));
clearBtn.addEventListener("click", (e) => reset(e));
init();
