var Turtles = Turtles || {};

Turtles.SoundManager = function() {
	this.isMuted = false;
	this.screams = Array();
	this.buildingSounds = Array();
	this.explosionSounds = Array();
	
	//init screams
	var i = 1;
	var numScreams = 31;
	for (; i < numScreams; i++){
		this.screams.push(document.getElementById("scream" + i));
		this.screams[i - 1].volume = 0.05; //screams so fuckin loud
	}
	
	//init building sounds
	i = 1;
	var numBuildingSounds = 3;
	for (; i < numBuildingSounds; i++){
		this.buildingSounds.push(document.getElementById("building" + i));
		this.buildingSounds[i - 1].volume = 0.2;
	}
	
	//init explosions; fuck yeah
	i = 1;
	var numExplosions = 5;
	for (; i < numExplosions; i++){
		this.explosionSounds.push(document.getElementById("explosion" + i));
		this.explosionSounds[i - 1].volume = .3;
	}
	
	//init meteor sound
	this.meteorSound = document.getElementById("meteor");
	
	//Music
	this.meteorMusic = document.getElementById("meteorDropMusic");
	this.meteorMusic.volume = 0.3;
	this.meteorMusic.loop = true;
	
	this.chillMusic = document.getElementById("music3");
	this.chillMusic.volume = 0.3;
	this.chillMusic.loop = true;
};

Turtles.SoundManager.prototype = {
	constructor : Turtles.SoundManager,
	playSoundFromArray : function(sounds){
		if (this.isMuted === false){
			soundNumber = Math.floor(Math.random() * sounds.length);
			this.playSound(sounds[soundNumber]);	
		}
	},
	playSound : function(sound) {
		if (this.isMuted === false){
				if (sound.ended === false){
					sound.currentTime = 0;
				}
				sound.play();
		}
	},
	playDeathSound : function(){
		this.playSoundFromArray(this.screams);
	},
	playBuildingSound : function(){
		this.playSoundFromArray(this.buildingSounds);
	},
	playExplosionSound : function(){
		this.playSoundFromArray(this.explosionSounds);
	},
	playMeteorSound : function() {
		this.playSound(this.meteorSound);
	},
	playMeteorMusic : function() {
		if (this.isMuted === false){
			this.chillMusic.pause();
			this.meteorMusic.play();
		}
	},
	playChillMusic : function() {
		if (this.isMuted === false) {
			this.meteorMusic.pause();
			this.chillMusic.play();
		}
	}
};