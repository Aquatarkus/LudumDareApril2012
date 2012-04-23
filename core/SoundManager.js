var Turtles = Turtles || {};

Turtles.SoundManager = function() {
	this.isMuted = false;
	this.wilhelmScream = document.getElementById("wilhelmScream");
	this.wilhelmScream.volume = 0.1;
	
	this.meteorMusic = document.getElementById("meteorDropMusic");
	this.meteorMusic.volume = 0.3;
	this.meteorMusic.loop = true;
	
	this.chillMusic = document.getElementById("music3");
	this.chillMusic.volume = 0.3;
	this.chillMusic.loop = true;
};

Turtles.SoundManager.prototype = {
	constructor : Turtles.SoundManager,
	playDeath : function(){
		if (this.isMuted === false){
			this.wilhelmScream.play();	
		}
	},
	playMeteorMusic : function() {
		if (this.isMuted === false){
			this.meteorMusic.play();
		}
	},
	playChillMusic : function() {
		if (this.isMuted === false) {
			this.chillMusic.play();
		}
	}
};