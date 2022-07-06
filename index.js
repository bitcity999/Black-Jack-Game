let cards =[]
let sum = 0
let hasBlackJack = false
let isAlive = false 
let message = ''
let player = {
    name: "Prakhar",
    chips:  200 
}
let messageEl = document.getElementById('message-el')
let cardsEl = document.getElementById('cards-el')
let sumEl = document.getElementById('sum-el')
let playerEl = document.getElementById("player-el")
let startGameButt = document.getElementById("start-game-butt")
let newCardButt = document.getElementById("new-card-butt")
let borrowBtn = document.getElementById("borrow-btn")
let holdBtn = document.getElementById("hold-btn")
let chipsFromLocStore = JSON.parse(localStorage.getItem("playerChips"))
player.chips = chipsFromLocStore

chipsSaver()
buttonChecker()

playerEl.textContent = player.name + " : $" + player.chips

function chipsManager() {
    if (isAlive === false) {
        player.chips = player.chips - 100
        chipsSaver()
    }
    else if (hasBlackJack === true) {
        player.chips = player.chips + 100
        chipsSaver()
    }
    buttonChecker()
}

function chipsSaver() {
    localStorage.setItem("playerChips", JSON.stringify(player.chips))
}

function getRandomCard() {
    let randomNumber = Math.floor((Math.random() * 13) + 1)
    if (randomNumber === 1) {
        return 11
    }
    else if (randomNumber > 10) {
        return 10
    }
    else {
        return randomNumber
    }
}

function startGame() {
    startGameButt.textContent = "NEW GAME"
    isAlive = true
    hasBlackJack = false
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards =[firstCard, secondCard]
    sum = firstCard + secondCard
    holdBtn.style.display = "initial"
    renderGame()
    chipsSaver()
    buttonChecker()
}

function renderGame() {
    
    if (sum <= 20) {
        message = 'Do you want to draw a new card ?'
    }
    else if (sum === 21) {
        message = "You've got Black Jack"
        hasBlackJack = true
        holdBtn.style.display = "none"
        chipsManager()
        playerEl.textContent = player.name + " : $" + player.chips
    }
    else {
        message = "You've lost of the game !"
        isAlive = false
        chipsManager()
        playerEl.textContent = player.name + " : $" + player.chips
    }

    cardsEl.textContent = 'Cards: '
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    sumEl.textContent = 'Sum: ' + sum

    messageEl.textContent = message
    console.log('Have BlackJack = ' + hasBlackJack) 
    console.log('Player Alive = ' + isAlive)
    chipsSaver()
}

function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let newCard = getRandomCard()
        cards.push(newCard)
        sum += newCard
        renderGame()
    }
    chipsSaver()
    buttonChecker()
}

borrowBtn.addEventListener("click", function () {
    startGameButt.style.display = "initial"
    newCardButt.style.display = "initial"
    player.chips = 500
    playerEl.textContent = player.name + " : $" + player.chips
    chipsSaver()
    chipsManager()
})

holdBtn.addEventListener("click", function () {
    if (isAlive === true && hasBlackJack === false) {
        let newCard = getRandomCard()
        cards.push(newCard)
        sum += newCard
    }
    holdGame()
})

function holdGame() {
    if (sum <= 20) {
        message = "Better luck next time !"
    } if (sum > 20 ) {
        message = "✨ Well played 👏"
    } else {
        message = "You could have got a BlackJack 🤨"
    }
    messageEl.textContent = message

    cardsEl.textContent = 'Cards: '
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    sumEl.textContent = 'Sum: ' + sum
}

function buttonChecker() {
    if (player.chips <= 0) {
        startGameButt.style.display = "none"
        newCardButt.style.display = "none"
        holdBtn.style.display = "none"
        borrowBtn.style.display = "initial"
    }
    else if (hasBlackJack === true) {
        holdBtn.style.display = "none"
        newCardButt.style.display = "none"
    }
    else {
        startGameButt.style.display = "initial"
        newCardButt.style.display = "initial"
        holdBtn.style.display = "initial"
        borrowBtn.style.display = "none"
    }
}
