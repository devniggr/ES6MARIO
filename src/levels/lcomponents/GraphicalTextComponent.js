
import CanvasComponent from '../../canvasComponent'
import {randomizeNumber} from '../../misc'

export default class GraphicalTextComponent {
	
	constructor(text, posx = 0, posy = 0, size = 2) {

		const [componentIdentifier, internalComponentPrefix] = [`gtc${randomizeNumber()}`, 'gtci']
		const components = {}
		const [DURATION, DY] = [800, 50]

		const sprites = {

			'0': [3, 460, 10 - 3, 7, (10 - 3) * size, 7 * size],
			'1': [12, 460, 18 - 12, 7, (18 - 12) * size, 7 * size],
			'2': [19, 460, 26 - 19, 7, (26 - 19) * size, 7 * size],
			'3': [27, 460, 34 - 27, 7, (34 - 27) * size, 7 * size],
			'4': [35, 460, 42 - 35, 7, (42 - 35) * size, 7 * size],
			'5': [43, 460, 50 - 43, 7, (50 - 43) * size, 7 * size],
			'6': [51, 460, 58 - 51, 7, (58 - 51) * size, 7 * size],
			'7': [59, 460, 66 - 59, 7, (66 - 59) * size, 7 * size],
			'8': [67, 460, 74 - 67, 7, (74 - 67) * size, 7 * size],
			'9': [75, 460, 82 - 75, 7, (82 - 75) * size, 7 * size],
			'A': [83, 460, 90 - 83, 7, (90 - 83) * size, 7 * size],
			'B': [91, 460, 98 - 91, 7, (98 - 91) * size, 7 * size],
			'C': [99, 460, 106 - 99, 7, (106 - 99) * size, 7 * size],
			'D': [107, 460, 114 - 107, 7, (114 - 107) * size, 7 * size],
			'E': [115, 460, 122 - 115, 7, (122 - 115) * size, 7 * size],
			'F': [123, 460, 130 - 123, 7, (130 - 123) * size, 7 * size],
			
			'G': [3, 468, 10 - 3, 7, (10 - 3) * size, 7 * size],
			'H': [11, 468, 18 - 11, 7, (18 - 11) * size, 7 * size],
			'I': [20, 468, 26 - 20, 7, (26 - 20) * size, 7 * size],
			'J': [27, 468, 34 - 27, 7, (34 - 27) * size, 7 * size],
			'K': [35, 468, 42 - 35, 7, (42 - 35) * size, 7 * size],
			'L': [44, 468, 50 - 44, 7, (50 - 44) * size, 7 * size],
			'M': [51, 468, 58 - 51, 7, (58 - 51) * size, 7 * size],
			'N': [59, 468, 66 - 59, 7, (66 - 59) * size, 7 * size],
			'O': [67, 468, 74 - 67, 7, (74 - 67) * size, 7 * size],
			'P': [75, 468, 82 - 75, 7, (82 - 75) * size, 7 * size],
			'Q': [83, 468, 90 - 83, 7, (90 - 83) * size, 7 * size],
			'R': [91, 468, 98 - 91, 7, (98 - 91) * size, 7 * size],
			'S': [99, 468, 106 - 99, 7, (106 - 99) * size, 7 * size],
			'T': [108, 468, 114 - 108, 7, (114 - 108) * size, 7 * size],
			'U': [115, 468, 122 - 115, 7, (122 - 115) * size, 7 * size],
			'V': [123, 468, 130 - 123, 7, (130 - 123) * size, 7 * size],
			
			'W': [3, 476, 10 - 3, 7, (10 - 3) * size, 7 * size],
			'X': [11, 476, 18 - 11, 7, (18 - 11) * size, 7 * size],
			'Y': [20, 476, 26 - 20, 7, (26 - 20) * size, 7 * size],
			'Z': [27, 476, 34 - 27, 7, (34 - 27) * size, 7 * size]
		}

		for (let i = 0, iposx = posx; i < text.length; i++) {
			const componentIdentifier = `${internalComponentPrefix}${ randomizeNumber() }`
			const char = text.charAt(i).toUpperCase()
			const [SX, SY, SW, SH, W, H] = sprites[char]
			const instance = new CanvasComponent(W, H, CanvasComponent.SPRITES.GF, iposx, posy, 'sprite', SX, SY, SW, SH)
			instance.collidable = false
			instance.unmovable = true
			components[componentIdentifier] = instance
			iposx = iposx + W
		}

		this._components = components

		this.componentIdentifier = componentIdentifier
		this.text = text
		this.posx = posx
		this.posy = posy
		this.size = size

		this.animationParameters = {DURATION, DY}
	}

	animate(time, scene) {

		if (!this.animationInitialized) {
			this.initposy = this.posy
			this.inittime = time
			this.animationInitialized = true
		}
		const {keys, entries} = Object
		
		let [ANIMATIONCOMPLETED, durationIndex] = [false, (time - this.inittime) / this.animationParameters.DURATION]
		if (durationIndex >= 1) ANIMATIONCOMPLETED = durationIndex = 1

		entries(this._components).forEach(entry => entry[1].posy = this.initposy - this.animationParameters.DY * durationIndex)
		
		if (ANIMATIONCOMPLETED) {
			keys(this._components).forEach(componentIdentifier => scene.unbindComponent(componentIdentifier))
			scene.unbindComponent(this.componentIdentifier)
			return true
		}
	}

}