const button = document.querySelector("#search-button")
button.addEventListener("click", async () => {            
    const search = document.querySelector("#search-input").value
    let order = document.querySelector("#order-select").value
    if(order.trim() === "") {
        order = "gametitle"
    }
    if(search.trim() === "") {
        return
    }
    try {                
        const res = await fetch(`/search/${search}/${order}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
        const data = await res.json()
        const table = document.querySelector("table")
        const notification = document.querySelector(".notification")
        const message = document.querySelector(".message")
        if(data.games !== null) {
            notification.classList.add("is-hidden")
            table.innerHTML = "";
            let thead = table.insertRow()
            thead.classList.add("is-info")
            thead.insertCell().innerHTML = "<b><th>Title</th></b>"
            thead.insertCell().innerHTML = "<b><th>Year</th></b>"
            thead.insertCell().innerHTML = "<b><th>Multiplayer</th></b>"
            thead.insertCell().innerHTML = "<b><th>Platinum</th></b>"
            thead.insertCell().innerHTML = "<b><th>Actions</th></b>"
            data.games.forEach(game => {
                const row = table.insertRow()
                const cellTitle = row.insertCell()
                cellTitle.innerHTML = game.gametitle
                const cellYear = row.insertCell()
                cellYear.innerHTML = game.gameyear
                const cellMultiplayer = row.insertCell()
                cellMultiplayer.innerHTML = game.multiplayer
                const cellPlatinum = row.insertCell()
                cellPlatinum.innerHTML = game.platinum
                const cellActions = row.insertCell()
                const linkShow = document.createElement("a")
                linkShow.classList.add("button", "is-link")
                linkShow.href = `/game/show/${game.id}`
                const spanShow = document.createElement("span")
                spanShow.classList.add("icon", "is-small")
                const iconShow = document.createElement("i")
                iconShow.classList.add("fa-solid", "fa-rectangle-list")                
                const spanShowLabel = document.createElement("span")
                spanShowLabel.innerHTML = "Show"
                linkShow.appendChild(spanShow)
                linkShow.appendChild(spanShowLabel)
                spanShow.appendChild(iconShow)
                cellActions.appendChild(linkShow)
                const linkEdit = document.createElement("a")
                linkEdit.classList.add("button", "is-warning", "ml-1")
                linkEdit.href = `/game/${game.id}`
                const spanEdit = document.createElement("span")
                spanEdit.classList.add("icon", "is-small")
                const iconEdit = document.createElement("i")
                iconEdit.classList.add("fa-solid", "fa-pen-to-square")                
                const spanEditLabel = document.createElement("span")
                spanEditLabel.innerHTML = "Edit"
                linkEdit.appendChild(spanEdit)
                linkEdit.appendChild(spanEditLabel)
                spanEdit.appendChild(iconEdit)
                cellActions.appendChild(linkEdit)                
                const buttonDelete = document.createElement("button")
                buttonDelete.classList.add("button", "is-danger", "js-modal-trigger", "ml-1")
                buttonDelete.setAttribute("data-target", "modal-js-example")
                buttonDelete.addEventListener("click", () => {
                    const modal = document.querySelector("#modal-js-example")
                    setGameDeleteId(`${game.id}`)
                    modal.classList.add("is-active")                
                })
                const spanDelete = document.createElement("span")
                spanDelete.classList.add("icon", "is-small")
                const iconDelete = document.createElement("i")
                iconDelete.classList.add("fa-solid", "fa-trash")
                const spanDeleteLabel = document.createElement("span")
                spanDeleteLabel.innerHTML = "Delete"
                buttonDelete.appendChild(spanDelete)                
                buttonDelete.appendChild(spanDeleteLabel)
                spanDelete.appendChild(iconDelete)
                cellActions.appendChild(buttonDelete)
            })
        }
        else {
            notification.classList.remove('is-hidden')
            message.innerHTML = "The search didn't return any results. Try another search" 
        }
    }
    catch(error) {
        console.log(error)
    }
})