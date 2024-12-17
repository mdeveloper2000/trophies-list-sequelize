document.addEventListener('DOMContentLoaded', () => {
    function openModal($el) {
        $el.classList.add('is-active');
    }
  
    function closeModal($el) {
        $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }
  
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);  
        $trigger.addEventListener('click', () => {
            openModal($target);
        });
    });
  
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');
        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });
  
    document.addEventListener('keydown', (event) => {
        if(event.key === "Escape") {
            closeAllModals();
        }
    });
});

const setGameDeleteId = (id) => {
    document.querySelector("#id_delete_game").value = id
}

const deleteButton = document.querySelector("#delete-button")
deleteButton.addEventListener("click", async () => {
    const game_id = document.querySelector("#id_delete_game").value
    const res = await fetch(`/destroy`, {
        method: 'DELETE',
        body: JSON.stringify({ id: game_id }),
        headers: { 'Content-Type': 'application/json' }
    })
    const data = await res.json()
    if(data.errors === 0) {
        location.assign('/')
    }
    else {
        const notification = document.querySelector('.notification')
        const message = document.querySelector(".message")
        notification.classList.remove('is-hidden')
        message.innerHTML = "Error trying to delete the game"
    }
})