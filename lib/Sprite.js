//Constructor
var Sprite = function(name, painter, behaviors){
	if(name !== undefined)
		this.name = name;
	if(painter !== undefined)
		this.painter = painter;
	this.lifeValue = 6;
	this.top = 0;
	this.letft = 0;
	this.width = 10;
	this.height = 10;
	this.velocityX = 0;
	this.velocityY = 0;
	this.gravity = .1;
	this.visible = true;
	this.animating = false;
	this.behaviors = behaviors || [];
	this.die = false;
	this.protect = -1;
	this.angle = 0;
	this.spritesheet = new Image();
	this.onattack = false;
	this.skillTime = [];
	return this;
};
//Prototype
Sprite.prototype = {
	paint: function(context){
		if(this.painter !== undefined && this.visible){
			this.painter.paint(this, context);
		}	
	},
	update: function(context, time){
		for(var i = 0;i < this.behaviors.length; ++i){
			this.behaviors[i].execute(this, context, time);
		}
	}
};

var ImagePainter = function(imageUrl){
	this.image = new Image();
	this.image.src = imageUrl;
};

ImagePainter.prototype = {
	paint: function(sprite, context){
		if(this.image.complete){
			context.drawImage(this.image, sprite.left, sprite.top, sprite.width, sprite.height);
		}
	}
};

var SpriteSheetPainter = function(cells){
	this.cells = cells || [];
	this.cellIndex = 0;
};

SpriteSheetPainter.prototype = {
	advance: function(num){
		if(this.cellIndex == this.cells.length-1 && num == 1){
			this.cellIndex = 0;
		}else if(this.cellIndex != this.cells.length-1){
			this.cellIndex++;
		}else if(this.cellIndex == this.cells.length-1 && num == 0){
			this.cellIndex = this.cells.length-1;
		}
	},
	
	paint: function(sprite, context){
		var cell = this.cells[this.cellIndex];
		context.save();
		context.rotate(sprite.angle);
		context.drawImage(sprite.spritesheet, cell.left, cell.top, cell.width, cell.height, sprite.left, sprite.top, cell.width, cell.height);
		context.restore();
	}
}; 
