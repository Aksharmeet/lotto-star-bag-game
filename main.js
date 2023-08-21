const bagContainers = document.querySelectorAll('.bag-container_inner-container')
const userSelected = document.getElementById('user-selected')
const randomlySelected = document.getElementById('randomly-selected')
const selectedBag = document.querySelector('.selected-bag')

let randomSelectTimer
let tempSelectTimer
let tempSelectTimer2

const user = localStorage.getItem('userName')
const amountWon = localStorage.getItem('totalAmountWon')

if (user) {
	const userName = document.querySelector('#user-name')
	userName.innerHTML = user

	const modal = document.querySelector('#get-user-data')
	modal.classList.add('hidden')
}

if (amountWon) {
	const totalAmountWonElement = document.querySelector('#total-amount-won')
	totalAmountWonElement.innerHTML = `Amount Won R: ${localStorage.getItem('totalAmountWon')}`
}

document.addEventListener('DOMContentLoaded', function () {
	bagContainers.forEach((bag) => {
		let randomValue
		do {
			randomValue = Math.floor(Math.random() * 250001) + 500
		} while (randomValue > 250000)
		bag.setAttribute('data-value', randomValue)
	})

	let selectedBagId = null
	let loading = false
	let bagSelected = false

	if (!loading) {
		bagContainers.forEach(function (bagContainer) {
			bagContainer.addEventListener('click', function () {
				if (bagSelected) return

				clearTimeout(randomSelectTimer)
				clearTimeout(tempSelectTimer)
				clearTimeout(tempSelectTimer2)

				bagSelected = true
				loading = true

				bagContainers.forEach(function (bag) {
					bag.classList.remove('active')
				})

				bagContainer.classList.add('active')
				selectedBagId = bagContainer.getAttribute('id')

				userSelected.querySelector('.selected-container_inner-container_number').innerHTML = `#${convertStringsToNum(selectedBagId)}`

				userSelected.setAttribute('data-value', bagContainer.getAttribute('data-value'))
				userSelected.style.display = 'block'

				let randomBagId

				do {
					randomBagId = Math.floor(Math.random() * 16) + 1
				} while (convertNumToStrings(randomBagId) === selectedBagId)

				const randomBag = document.getElementById(convertNumToStrings(randomBagId))

				for (let j = 0; j < 2; j++) {
					for (let i = 1; i <= 16; i++) {
						if (!randomBag.classList[1]) {
							const tempActiveBag = document.getElementById(convertNumToStrings(i))

							tempSelectTimer = setTimeout(() => {
								tempActiveBag.classList.add('tempActive')
								tempSelectTimer2 = setTimeout(() => {
									tempActiveBag.classList.remove('tempActive')
								}, 200)
							}, 200 * (i + 16 * j))
						}
					}
				}

				randomSelectTimer = setTimeout(function () {
					if (randomBag) {
						randomBag.classList.add('active')
						randomlySelected.querySelector('.selected-container_inner-container_number').innerHTML = `#${randomBagId}`
						randomlySelected.setAttribute('data-value', randomBag.getAttribute('data-value'))
						randomlySelected.style.display = 'block'

						loading = false
					}
					bagSelected = false
				}, 6500)
			})
		})
	}
})

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

	const buttonAudio = document.getElementById('button-audio')
	buttonAudio.play()

	const transitionAudio = document.getElementById('transition-audio')
	transitionAudio.play()

	const totalAmountWon = localStorage.getItem('totalAmountWon')
	if (totalAmountWon) {
		localStorage.setItem('totalAmountWon', parseInt(totalAmountWon) + parseInt(selectedBagValue))
	} else {
		localStorage.setItem('totalAmountWon', selectedBagValue)
	}
	const totalAmountWonElement = document.querySelector('#total-amount-won')
	totalAmountWonElement.innerHTML = `Amount Won R: ${localStorage.getItem('totalAmountWon')}`

	const selectedBagTextElement = document.querySelector('.modal_selected-bag-wrapper_selected-bag-text')
	selectedBagTextElement.innerHTML = selectedBag.querySelector('.selected-container_inner-container_number').innerHTML

	const selectedBagValueElement = document.querySelector('.modal_selected-bag-value')
	selectedBagValueElement.innerHTML = selectedBagValue

	const selectedModal = document.querySelector('#show-wins')
	selectedModal.classList.add('animate-slide-left-end')
}

const selectBag = (event) => {
	if (userSelected.getAttribute('data-value') !== null && randomlySelected.getAttribute('data-value') !== null) {
		if (event.target.getAttribute('data-value')) {
			const selectedBag = document.querySelector('.selected-bag')

			const player = document.getElementById('select-audio')
			if (player.currentTime > 2) {
				player.pause()
			}
			player.play()

			const revealButton = document.querySelector('#reveal-button')

			revealButton.classList.add('reveal-button-animate')
			revealButton.removeAttribute('disabled')

			if (selectedBag) {
				selectedBag.classList.remove('selected-bag')
			}

			event.target.classList.add('selected-bag')
		}
	}
}

const resetGame = () => {
	const selectedBag = document.querySelector('.selected-bag')
	selectedBag.classList.remove('selected-bag')

	bagContainers.forEach((bag) => {
		bag.classList.remove('active')
	})

	userSelected.querySelector('.selected-container_inner-container_number').innerHTML = `#`
	userSelected.removeAttribute('data-value')

	randomlySelected.querySelector('.selected-container_inner-container_number').innerHTML = `#`
	randomlySelected.removeAttribute('data-value')

	const player = document.getElementById('show-wins-bg-video')
	player.classList.add('opacity-hidden')

	clearTimeout(randomSelectTimer)
	clearTimeout(tempSelectTimer)
	clearTimeout(tempSelectTimer2)

	setTimeout(() => {
		player.classList.add('hidden')
	}, 1000)

	const buttonAudio = document.getElementById('button-audio')
	buttonAudio.play()

	const transitionAudio = document.getElementById('transition-audio')
	transitionAudio.play()

	const revealButton = document.querySelector('#reveal-button')
	revealButton.setAttribute('disabled', true)
	revealButton.classList.remove('reveal-button-animate')

	const modal = document.querySelector('#show-wins')
	modal.classList.remove('animate-slide-left-end')
}

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
			return ''
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
			return ''
	}
}

const removeLoadingSection = () => {
	const loadingSection = document.querySelector('.loading_section')
	loadingSection.classList.add('hidden')
}

setTimeout(removeLoadingSection, 5000)

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

const logoutUser = () => {
	localStorage.removeItem('userName')
	localStorage.removeItem('totalAmountWon')
	const modal = document.querySelector('#get-user-data')
	modal.classList.remove('hidden')
}

const playDefaultMusic = () => {
	const soundButtonImage = document.getElementById('sound-image')
	const player = document.getElementById('default')
	player.volume = 0.05

	const playMusic = () => {
		player.play()
		soundButtonImage.src = 'assets/svg/sound-max.svg'
	}

	const pauseMusic = () => {
		player.pause()
		soundButtonImage.src = 'assets/svg/sound-mute.svg'
	}

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
