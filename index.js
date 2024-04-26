const letterContainer = document.getElementById('letter-container')
const optionsContainer = document.getElementById('options-container')
const userInputSection = document.getElementById('user-input-section')
const newGameContainer = document.getElementById('new-game-container')
const newGameButton = document.getElementById('new-game-button')
const resultText = document.getElementById('result-text')

let options = {
	fruits: [
		'Apple',
		'Blueberry',
		'Mandarin',
		'Pineapple',
		'Pomegranate',
		'Watermelon',
	],
	animals: ['Hamster', 'Horse', 'Squirrel', 'Panther', 'Rabbit', 'Zebra'],
	colors: ['Orange', 'Emerald', 'Purple', 'Terracotta', 'Maroon'],
	countries: ['India', 'Hungary', 'Italy', 'Switzerland', 'France', 'Ukraine'],
}

let winCount = 0
let count = 0
let chosenWord = ''

 const displayOptions = () => {
	optionsContainer.innerHTML += `<h3>Please Select A Theme</h3>`
	let buttonCon = document.createElement('div')

	for (let value in options) {
		buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`
	}

	optionsContainer.appendChild(buttonCon)

	document.querySelectorAll('.options').forEach(button => {
		button.addEventListener('click', function () {
			document.querySelector('.modal-options').style.display = 'none'
			document.querySelector('.theme').innerText = this.innerText
			document.querySelector('.header').classList.remove('none')
			document.querySelector('.game-container').classList.remove('none')
		})
	})
}

const blocker = () => {
	let optionsButtons = document.querySelectorAll('.options')
	let letterButtons = document.querySelectorAll('.letters')

	optionsButtons.forEach(button => {
		button.disabled = true
	})

	letterButtons.forEach(button => {
		button.disabled = true
	})

	newGameContainer.classList.remove('hide')
}

const generateWord = optionValue => {
	let optionsButtons = document.querySelectorAll('.options')

	optionsButtons.forEach(button => {
		if (button.innerText.toLowerCase() === optionValue) {
			button.classList.add('active')
		}
		button.disabled = true
	})

	document.querySelector('.theme').innerText = optionValue

	letterContainer.classList.remove('hide')
	userInputSection.innerText = ''

	let optionArray = options[optionValue]
	chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)]
	chosenWord = chosenWord.toUpperCase()

	let displayItem = chosenWord.replace(
		/./g,
		'<span class="letters-not-chosen dashes">_</span>'
	)

	userInputSection.innerHTML = displayItem
}

const initializer = () => {
	winCount = 0
	count = 0

	userInputSection.innerHTML = ''
	optionsContainer.innerHTML = ''
	letterContainer.classList.add('hide')
	newGameContainer.classList.add('hide')
	document.querySelector('.modal-game').classList.add('hide')
	letterContainer.innerHTML = ''

	for (let i = 65; i < 91; i++) {
		let button = document.createElement('button')
		button.classList.add('letters')
		button.innerText = String.fromCharCode(i)
		button.addEventListener('click', () => {
			let charArray = chosenWord.split('')
			let dashes = document.getElementsByClassName('dashes')
			let letters = document.querySelectorAll('.letters')
			button.classList.add('chosen-letter')

			if (charArray.includes(button.innerText)) {
				charArray.forEach((char, index) => {
					if (char === button.innerText) {
						dashes[index].innerText = char
						winCount += 1
						dashes[index].classList.remove('letters-not-chosen')
						if (winCount == charArray.length) {
							document.querySelector('.header').classList.add('none')
							document.querySelector('.game-container').classList.add('none')
							resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`
							document.querySelector('.modal-game').classList.remove('none')
							blocker()
						}
					}
				})
			} else {
				count += 1
				document.querySelector('.count-span').innerHTML = 9 - count
				if (count == 9) {
					document.querySelector('.header').classList.add('none')
					document.querySelector('.game-container').classList.add('none')
					resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`
					document.querySelector('.modal-game').classList.remove('none')
					blocker()
				}
			}
			button.disabled = true
		})
		letterContainer.append(button)
	}

	displayOptions()
}


const startNewGame = () => {
	console.log('lose')
	location.reload() 

	initializer()
}



//newGameButton.addEventListener('click', initializer)
window.onload = initializer

