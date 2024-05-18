const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.getElementById('one')
const messageTwo = document.getElementById('two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    const weather = async (add) => {

        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''

        
        const response = await fetch(`http://localhost:3000/weather?address=${add}`)
        const data = await response.json()

        messageTwo.textContent = ''
        
            if(data.temp){
                messageOne.textContent = `Weather at ${data.address} `
                messageTwo.textContent = `It's ${data.temp} degrees celcius`
            }
            else{
                messageOne.textContent = 'Unable to find location. Try another search'
            }
    }

    weather(location)
})

