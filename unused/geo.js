window.onload = function() {

  var data = {}
  var long
  var lati
  var username

  document.getElementById('submit').onclick = function() {
    if ("geolocation" in navigator) {
      if (navigator.geolocation == {}) {
        // long = "unknown"
        // lati = "unknown"
        // document.getElementById("index-title").innerHTML = lati + " " + long
        console.log(navigator.geolocation);
        console.log("no geo");
      }
      navigator.geolocation.getCurrentPosition(async position => {


        long = position.coords.longitude
        lati = position.coords.latitude
        document.getElementById("index-title").innerHTML = lati + " " + long

        username = document.getElementById('username').value


        data = {
          lati,
          long,
          username
        }

        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
        const response = await fetch('/api', options)
        const json = await response.json()
        console.log(json)
      })
    } else {
      long = "unknown"
      lati = "unknown"
      document.getElementById("index-title").innerHTML = lati + " " + long
    }
  }
}
