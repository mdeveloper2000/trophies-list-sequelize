const notificationButton = document.querySelector(".delete")
const notification = document.querySelector(".notification")
notificationButton.addEventListener("click", (e) => {
    e.preventDefault()
    notification.classList.add("is-hidden")
})