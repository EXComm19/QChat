getData()

async function getData() {
  const response = await fetch("/api")
  const data = await response.json()

  for (item of data) {
    const root = document.createElement('div')
    const geo = document.createElement('div')
    const name = document.createElement('div')

    geo.textContent = `Location: ${item.lati} ${item.long}`
    name.textContent = item.username

    root.append(geo, name)
    document.body.append(root)
  }
  console.log(data)
}
