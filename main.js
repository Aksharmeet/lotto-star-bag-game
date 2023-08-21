const bagContainers = document.querySelectorAll('.bag-container_inner-container')
const userSelected = document.getElementById('user-selected')
const randomlySelected = document.getElementById('randomly-selected')
const selectedBag = document.querySelector('.selected-bag')

// * ----------------------------------->> check if user name is present in local storage
const user = localStorage.getItem('userName')
const amountWon = localStorage.getItem('totalAmountWon')

// ----------------------------------->> if user name is present in local storage then show the user name in the header
if (user) {
	const userName = document.querySelector('#user-name')
	userName.innerHTML = user

	const modal = document.querySelector('#get-user-data')
	modal.classList.add('hidden')
}
// ----------------------------------->> if amount won is present in local storage then show the amount won in the header
if (amountWon) {
	const totalAmountWonElement = document.querySelector('#total-amount-won')
	totalAmountWonElement.innerHTML = `Amount Won R: ${localStorage.getItem('totalAmountWon')}`
}

document.addEventListener('DOMContentLoaded', function () {
	bagContainers.forEach((bag) => {
		const randomValue = Math.floor(Math.random() * 250000) + 500
		bag.setAttribute('data-value', randomValue)
	})

	let selectedBagId = null
	let timer
	let loading = false
	let bagSelected = false // Flag to prevent further selections

	// Add this condition to prevent execution when elements are still loading
	if (!loading) {
		bagContainers.forEach(function (bagContainer) {
			bagContainer.addEventListener('click', function () {
				if (bagSelected) return // If bag is already selected, do nothing
				clearTimeout(timer) // Clear the previous timer (if any)
				bagSelected = true // Set the flag to true
				loading = true
				// Remove .active class from all bags
				bagContainers.forEach(function (bag) {
					bag.classList.remove('active')
				})

				// Add .active class to the clicked bag
				bagContainer.classList.add('active')
				selectedBagId = bagContainer.getAttribute('id')

				// add text inside already existing p tag inside userSelected div
				userSelected.querySelector('.selected-container_inner-container_number').innerHTML = `#${convertStringsToNum(selectedBagId)}`

				// add data-value attribute to userSelected div
				userSelected.setAttribute('data-value', bagContainer.getAttribute('data-value'))
				userSelected.style.display = 'block'

				// Add .active class to a different random bag
				let randomBagId

				do {
					randomBagId = Math.floor(Math.random() * 16) + 1
				} while (convertNumToStrings(randomBagId) === selectedBagId)

				const randomBag = document.getElementById(convertNumToStrings(randomBagId))

				for (let j = 0; j < 2; j++) {
					for (let i = 1; i <= 16; i++) {
						if (!randomBag.classList[1]) {
							const tempActiveBag = document.getElementById(convertNumToStrings(i))

							setTimeout(() => {
								tempActiveBag.classList.add('tempActive')
								setTimeout(() => {
									tempActiveBag.classList.remove('tempActive')
								}, 200)
							}, 200 * (i + 16 * j)) // Adjust the delay for the second run
						}
					}
				}

				// Start the timer for 10 seconds
				timer = setTimeout(function () {
					if (randomBag) {
						randomBag.classList.add('active')
						randomlySelected.querySelector('.selected-container_inner-container_number').innerHTML = `#${randomBagId}`
						randomlySelected.setAttribute('data-value', randomBag.getAttribute('data-value'))
						randomlySelected.style.display = 'block'

						const revealButton = document.querySelector('#reveal-button')
						revealButton.removeAttribute('disabled')

						// ----------------------------->> reveal button effects
						revealButton.classList.add('reveal-button-animate')

						loading = false
					}
					bagSelected = false // Reset the flag after selection is completed
				}, 6500)
			})
		})
	}
})

// set a random value from 500 to 250000 for each bag on dom load and save them for later use

const revealSelectedBagValue = () => {
	const selectedBag = document.querySelector('.selected-bag')
	const selectedBagValue = selectedBag.getAttribute('data-value')
	if (selectedBagValue === null) {
		alert('Please select a bag first')
		return
	}
	const player = document.getElementById('show-wins-bg-video')
	player.play()
	player.classList.remove('hidden')
	player.classList.remove('opacity-hidden')

	const audio = document.getElementById('reveal-audio')
	audio.play()

	// add the value of the selected bag in the  total amount won in local storage
	const totalAmountWon = localStorage.getItem('totalAmountWon')
	if (totalAmountWon) {
		localStorage.setItem('totalAmountWon', parseInt(totalAmountWon) + parseInt(selectedBagValue))
	} else {
		localStorage.setItem('totalAmountWon', selectedBagValue)
	}
	const totalAmountWonElement = document.querySelector('#total-amount-won')
	totalAmountWonElement.innerHTML = `Amount Won R: ${localStorage.getItem('totalAmountWon')}`

	// get the number of the selected bag
	const selectedBagTextElement = document.querySelector('.modal_selected-bag-wrapper_selected-bag-text')
	selectedBagTextElement.innerHTML = selectedBag.querySelector('.selected-container_inner-container_number').innerHTML

	// set the value of the selected bag in the modal
	const selectedBagValueElement = document.querySelector('.modal_selected-bag-value')
	selectedBagValueElement.innerHTML = selectedBagValue

	const selectedModal = document.querySelector('#show-wins')
	selectedModal.classList.add('animate-slide-left-end')
}

// * ----------------------------------->> select bag
const selectBag = (event) => {
	const selectedBag = document.querySelector('.selected-bag')
	// play audio
	const player = document.getElementById('select-audio')
	// if player is already playing stop it and play again
	if (player.currentTime > 2) {
		player.pause()
	}
	player.play()

	// remove selected-bag class from all element
	if (selectedBag) {
		selectedBag.classList.remove('selected-bag')
	}
	// add selected-bag class to the clicked element
	event.target.classList.add('selected-bag')
}

// * ----------------------------------->>  reset game
const resetGame = () => {
	// ----------------------------->> currently selected bag
	const selectedBag = document.querySelector('.selected-bag')
	selectedBag.classList.remove('selected-bag')

	bagContainers.forEach((bag) => {
		bag.classList.remove('active')
	})
	const player = document.getElementById('show-wins-bg-video')
	player.classList.add('opacity-hidden')
	setTimeout(() => {
		player.classList.add('hidden')
	}, 1000)

	// ----------------------------->> reveal button
	const revealButton = document.querySelector('#reveal-button')
	revealButton.setAttribute('disabled', true)
	revealButton.classList.remove('reveal-button-animate')

	// ----------------------------->> modal
	const modal = document.querySelector('#show-wins')
	modal.classList.remove('animate-slide-left-end')
}

// * ----------------------------------->>  convert numbers to strings
const convertNumToStrings = (num) => {
	switch (num) {
		case 1:
			return 'one'
		case 2:
			return 'two'
		case 3:
			return 'three'
		case 4:
			return 'four'
		case 5:
			return 'five'
		case 6:
			return 'six'
		case 7:
			return 'seven'
		case 8:
			return 'eight'
		case 9:
			return 'nine'
		case 10:
			return 'ten'
		case 11:
			return 'eleven'
		case 12:
			return 'twelve'
		case 13:
			return 'thirteen'
		case 14:
			return 'fourteen'
		case 15:
			return 'fifteen'
		case 16:
			return 'sixteen'

		default:
			''
	}
}

const convertStringsToNum = (num) => {
	switch (num) {
		case 'one':
			return 1
		case 'two':
			return 2
		case 'three':
			return 3
		case 'four':
			return 4
		case 'five':
			return 5
		case 'six':
			return 6
		case 'seven':
			return 7
		case 'eight':
			return 8
		case 'nine':
			return 9
		case 'ten':
			return 10
		case 'eleven':
			return 11
		case 'twelve':
			return 12
		case 'thirteen':
			return 13
		case 'fourteen':
			return 14
		case 'fifteen':
			return 15
		case 'sixteen':
			return 16
		default:
			''
	}
}

// * ----------------------------------->> Loading Screen Animation
const removeLoadingSection = () => {
	const loadingSection = document.querySelector('.loading_section')
	loadingSection.classList.add('hidden')
}

setTimeout(removeLoadingSection, 5000)

// * ----------------------------------->>  submit name
const submitNameHandler = (e) => {
	e.preventDefault()
	const name = document.querySelector('#user-name-input').value
	if (name === '') {
		alert('Please enter your name')
		return
	}
	const userName = document.querySelector('#user-name')
	userName.innerHTML = name
	localStorage.setItem('userName', name)
	const modal = document.querySelector('#get-user-data')
	modal.classList.add('hidden')
}

const playDefaultMusic = () => {
	const soundButtonImage = document.getElementById('sound-image')

	const player = document.getElementById('default')
	player.volume = 0.05

	// * ----------------------------------->>  play music
	const playMusic = () => {
		player.play()
		soundButtonImage.src = '/public/assets/svg/sound-max.svg'
	}

	// * ----------------------------------->>  pause music
	const pauseMusic = () => {
		player.pause()
		soundButtonImage.src = '/public/assets/svg/sound-mute.svg'
	}

	// * ----------------------------------->>  toggle music
	if (player.paused) {
		playMusic()
	} else {
		pauseMusic()
	}
}

const playDramaticMusic = () => {
	const player = document.getElementById('dramatic')
	player.volume = 0.5
	player.play()
}
