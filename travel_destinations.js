/* const travel_destinations = [
    {country: "Japan", location: "Mount Fuji", google_maps_link: "", arrival_date: "12 Jan, 2021", leave_date: "24 Jan, 2021", description: "Mount Fuji is the tallest mountain in Japan, standing at 3,776 meters (12,380 feet). Mount Fuji is the single most popular tourist site in Japan, for both Japanese and foreign tourists." },
    {country: "Norway", location: "Geirangerfjord", google_maps_link: "", arrival_date: "01 Oct, 2021", leave_date: "18 Nov, 2021", description: "The Geiranger Fjord is a fjord in the Sunnmøre region of Møre og Romsdal county, Norway. It is located entirely in the Stranda Municipality." },
    {country: "Australia", location: "Sydney Opera House", google_maps_link: "", arrival_date: "27 May, 2021", leave_date: "8 Jun, 2021", description: "The Sydney Opera House is a multi-venue performing arts centre in Sydney. Located on the banks of the Sydney Harbour, it is often regarded as one of the 20th century's most famous and distinctive buildings" },  
] */
window.addEventListener("DOMContentLoaded", async () => {
  
  const response = await fetch("http://127.0.0.1:4000/destinations/", {
   method: "GET",
   headers: {
     "Content-type": "application/json",
     "Access-Control-Allow-Origin": "http://127.0.0.1:4000/destinations/",
   },
  })
  const body = await response.json()
  console.log(body)
  transform(body);
})



function transform(data) {
    const elements = data.map((x) => {
      const clone = cloneTemplate();
      clone.querySelector(".country").innerText = x.country;
      clone.querySelector(".location").innerText = x.location;
      clone.querySelector(".description").innerText = x.description;
      clone.querySelector(".arrival-date").innerText = x.arrival_date;
      clone.querySelector(".leave-date").innerText = x.leave_date;
      clone.querySelector(".destination_img").src = "/assets/" + x.country + ".png";
      clone.querySelector(".google-maps").href = "https://www.google.com/maps/place/K%C3%B8benhavn/data=!4m2!3m1!1s0x4652533c5c803d23:0x4dd7edde69467b8?sa=X&ved=2ahUKEwjTh6ry9bOBAxXxSPEDHUeTBGMQ8gF6BAgPEAA&ved=2ahUKEwjTh6ry9bOBAxXxSPEDHUeTBGMQ8gF6BAgSEAI"
      return clone;
    });
  
    document.querySelector(".destinations-container").append(...elements)
  }
  
  function cloneTemplate() {
    const template = document.querySelector(".ui-card");
    const clone = document.importNode(template.content, true);
    return clone;
  }
  
  window.addEventListener("load", transform)
  