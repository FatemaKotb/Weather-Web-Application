//console.log('Client side JavaScript file is loaded!')

const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const message = document.querySelector('#message-1')

weatherForm.addEventListener('submit', (e) => {
    /*To prevent the page from refreshing automatically*/
    e.preventDefault()

    const location = searchInput.value

    message.textContent = 'Loading...'

    fetch(`/weather?search=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message.textContent = data.error
            } else {
                message.textContent = data.forecast
            }
        })
    })
})