import css from "./style.css";

const form = document.querySelector("form");
form.style.display = "none";

const signs = {
  "Mar 21 - Apr 20": "aries",
  "Apr 21 - May 20": "taurus",
  "May 21 - Jun 21": "gemini",
  "Jun 22 - Jul 22": "cancer",
  "Jul 23 - Aug 22": "leo",
  "Aug 23 - Sep 22": "virgo",
  "Sep 23 - Oct 22": "libra",
  "Oct 23 - Nov 22": "scorpio",
  "Nov 23 - Dec 21": "sagittarius",
  "Dec 22 - Jan 19": "capricorn",
  "Jan 20 - Feb 18": "aquarius",
  "Feb 19 - Mar 20": "pisces",
};

// const days = ["today", "yesterday", "tomorrow"];
// const chosen_day = days[0];

export function displayForDay(day) {
  document.getElementById("zodiac-signs").innerHTML = "";

  const requests = Object.values(signs).map((sign) => {
    const URL = `https://aztro.sameerkumar.website/?sign=${sign}&day=${day}`;
    return fetch(URL, {
      method: "POST",
    });
  });

  Promise.all(requests).then((requests) => {
    Promise.all(requests.map((result) => result.json())).then((results) => {
      results.forEach((result) => {
        const date = result.date_range;
        const forecast = result.description;
        const mood = result.mood;
        const luckyColor = result.color;
        const time = result.lucky_time;

        insertSignElement(signs[date], forecast, date, mood, luckyColor, time);
      });
    });
  });
}

function insertSignElement(sign, forecast, date, mood, luckyColor, time) {
  document.getElementById("zodiac-signs").innerHTML += `
    <div>
      <h2>${sign}</h2>
      <h5>Born between ${date}</h5>
      <p>Forecast: ${forecast}</p>
      <h6>Mood: ${mood}</h6>
      <h6>Lucky color: ${luckyColor}</h6>
      <h6>Lucky time: ${time} </h6>
    </div>
    `;
}

displayForDay("today");

const contact = document.getElementById("contact-astro");
contact.addEventListener("click", function onClick() {
  document.querySelector("section").style.display = "none";
  document.querySelector("h1").style.display = "none";
  document.querySelector(".buttons").style.display = "none";
  document.querySelector("form").style.display = "block";
});

