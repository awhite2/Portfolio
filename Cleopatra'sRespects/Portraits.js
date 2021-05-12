/*handles the portraits

path: file path
posx: x position of the heart
posy: y position of the heart
landscape: boolean, is the portrait landscape orientation
*/
class Portrait {
	constructor(path, posx, posy, landscape) {
		this.image = loadImage("assets/"+path);
		//artist name
		this.name = path.replaceAll("_", " ").slice(0, path.length - 4).toUpperCase();
		this.scale = 1;
		//positon of heart
		this.heart = createVector(posx, posy);
		this.landscape = landscape;
		//set as (0,0) until setOrigin is called.
		this.origin = createVector(0, 0);
		//right bottom corner
		this.rightCorner = createVector(0, 0);
	}

	//sets the origin point for position depending on a right bottom corner position of a bounding box
	//if the image is too big for the bounding box, the image is scaled
	setOrigin(x, y) {
		let h = this.image.height;
		let w = this.image.width;
		//scaling
		if (h > y) {
			this.scale = (h - (h - y)) / h;
			this.image.resize(0, h * this.scale);
			this.heart.x *= this.scale;
			this.heart.y *= this.scale;

		}
		//align image in center of bounding box horizontally, along the bottom vertically
		this.origin.x = x / 2 - this.image.width / 2;
		this.origin.y = y - this.image.height;

		this.rightCorner = createVector(this.origin.x + this.image.width, this.origin.y + this.image.height);
	}

	
	//returns 5 random colors from image
	colorScheme() {
		let colors = [];
		let c = [0, 0, 0, 0];

		for (let i = 0; i < 5; i++) {
			let l = 0;
			
			//get random non-transparent pixel color 
			while (c[3] != 255) {
				let rx = random(0, this.image.width);
				let ry = random(0, this.image.height);

				c = this.image.get(rx, ry);

				//handling to avoid long loops

				if (l > 1000) {
					print("Error: Too Many Attempts. Try Again. Please Reload.");
					print(l);
					break;
				}
				l++;
			}
			l = 0;
			colors.push(c);
			c = color(255, 255, 255, 0);
		}
		return colors;
	}
}