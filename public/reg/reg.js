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

    fetch('/reg', options).then(response => {
      const json = response.json()
      console.log(json);
    })

    window.location = "/login"
  }
}
