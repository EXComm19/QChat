var ip

window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection; //compatibility for Firefox and chrome
var pc = new RTCPeerConnection({
    iceServers: []
  }),
  noop = function() {};
pc.createDataChannel(''); //create a bogus data channel
pc.createOffer(pc.setLocalDescription.bind(pc), noop); // create offer and set local description
pc.onicecandidate = function(ice) {
  if (ice && ice.candidate && ice.candidate.candidate) {
    var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
    console.log('my IP: ', myIP);
    document.getElementById('ip-dis').textContent = "Your IP is: " + myIP
    pc.onicecandidate = noop;
  }
};

window.onload = function() {
  document.getElementById('submit').onclick = function() {
    username = document.getElementById('username').value

    data = {
      username,
      ip
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    fetch('/iplog', options).then(response => {
      const json = response.json()
      console.log(json);
    })
  }
}
