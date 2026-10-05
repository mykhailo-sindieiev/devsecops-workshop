document
  .getElementById('apiForm')
  .addEventListener('submit', async function (event) {
    event.preventDefault()

    const resultDiv = document.getElementById('result')
    resultDiv.textContent = 'Sending request...'
    resultDiv.className = ''

    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData.entries())

    const apiEndpoint = 'http://localhost:3000/api'

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (response.status === 200) {
        resultDiv.textContent = 'Success! Request submitted successfully'
        resultDiv.className = `success`
        resultDiv.style.display = 'block'
        console.log('Response Data:', response.data)
        console.log('Response Headers:', response.status)
      } else if (response.status === 500) {
        resultDiv.textContent =
          'Error: The server encountered an internal error'
        resultDiv.className = 'error'
        resultDiv.style.display = 'block'
        console.error('Server Error:', response.status)
      } else {
        resultDiv.textContent = `Warning: Unexpected status code ${response.status}.`
        resultDiv.className = 'error'
        resultDiv.style.display = 'block'
        console.warn('Unexpected Status:', response.status)
      }
    } catch (error) {
      resultDiv.textContent =
        'Network Error: Could not reach the server. Is the backend running?'
      resultDiv.className = 'error'
      resultDiv.style.display = 'block'
      console.error('Fetch Error:', error)
    }
  })
