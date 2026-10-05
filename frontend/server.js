const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const axios = require('axios')

const api_key = process.env.API_KEY || 'default_key'
const api_url = process.env.API_URL || 'backend:3050'

const options = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${api_key}`,
    'User-Agent': 'Frontend'
  }
}

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

app.post('/api', (req, res) => {
  const body = JSON.stringify(req.body)
  console.log('Received request body:', body)
  axios
    .post(`http://${api_url}/api/v1/backend`, body, options)
    .then(response => {
      console.log('Response from API:', response.data)
    })
    .catch(error => {
      console.error('Error communicating with API:', error)
    })
  res.status(200).json({ status: 'success' })
})

app.use('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(port, () => console.log(`App is listening on port ${port}!`))
