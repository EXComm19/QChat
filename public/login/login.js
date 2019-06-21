window.onload = function() {
  document.getElementById('submit').onclick = function() {
    username = document.getElementById('username').value
    password = document.getElementById('password').value

    data = {
      username,
      password
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    fetch('/login', options).then(response => {
      const res = response.json()
      if (res.auth) {
        window.location = "/chat"
      }
      console.log(res);
    })
  }
}
