const form = document.querySelector('form')
form.addEventListener('submit', async (e) => {
    e.preventDefault()            
    const gametitle = form.gametitle.value.toUpperCase().trim()
    const gameyear = form.gameyear.value.trim()
    const multiplayer = form.multiplayer.value.trim()
    const platinum = form.platinum.value.trim()
    const details = form.details.value.trim()
    const notification = document.querySelector(".notification")
    const message = document.querySelector(".message")
    if(gametitle === "") {            
        notification.classList.remove('is-hidden')
        message.innerHTML = "Game title is a required field"
        return
    }
    if(gameyear === "") {            
        notification.classList.remove('is-hidden')
        message.innerHTML = "Game year is a required field"
        return
    }
    if(parseInt(gameyear) < 2013) {
        notification.classList.remove('is-hidden')
        message.innerHTML = "Year of release cannot be prior to 2013"
        return
    }
    try {            
        const res = await fetch('/store', {
            method: 'POST',
            body: JSON.stringify({ gametitle, gameyear, multiplayer, platinum, details }),
            headers: { 'Content-Type': 'application/json' }
        })
        const data = await res.json()            
        if(data.errors === 0) {                                    
            location.assign("/")
        }
        else {
            notification.classList.remove('is-hidden')
            message.innerHTML = "Error trying to save game"            
        }
    } 
    catch(error) {
        console.log(error)
    }
})