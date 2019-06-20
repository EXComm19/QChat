window.onload = function() {
  document.getElementById('submit').onclick = function() {
    var message = document.getElementById('message').value
    document.getElementById('message-record').textContent = ""
    data = {
      message
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    fetch('/api', options).then(response => {
      const json = response.json()
      console.log(json);
    })
    getData()
    async function getData() {
      const response = await fetch("/api")
      const data = await response.json()
      for (item of data) {
        const line = document.createElement('div')
        line.textContent = item.username + ": " + item.message
        document.getElementById('message-record').append(line)
      }
    }
  }
}
