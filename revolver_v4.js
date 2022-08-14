// auto-target player's own token for data and pull variables from it
let $token = game.user.character.getActiveTokens(true)[0];
let $attack_mod = token.actor.data.data.attributes.attack_ranged.value;

// derive DAMAGE modifier
let $damage_roll = token.actor.data.data.attributes.damage_ranged.value;
$damage_roll = $damage_roll.split("+")[1];

let $possibleSounds = [
	"custom-sounds/revolver-short.wav",
];
let $soundFile = $possibleSounds[Math.floor(Math.random() * $possibleSounds.length)];

// defaults in case token is missing that variable
if (!$attack_mod) {$attack_mod = 0;}
if (!$damage_roll) {$damage_roll = 0;}

// slightly prettier conditionals to handle a negative attack modifier
if ($attack_mod > -1) {$attack_mod = "+" + $attack_mod}

// chat message
let $messageTable = "<b><h2>Revolver</h2></b>" + "<p><b>attack 1d20" + $attack_mod + ": </b>[[1d20 +" + $attack_mod + "]]</p>" + "<p><b>damage 1d6+" + $damage_roll + ": </b>[[1d6+" + $damage_roll + "]]</p>" + "<p>Inflict 1 unbonused damage on a miss.</p>";
let chatData = {
	user: game.user._id,
	speaker: ChatMessage.getSpeaker(),
	content: $messageTable,
};
ChatMessage.create(chatData, {});

// animation effect
const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

async function Cast($token) {
	AudioHelper.play
	AudioHelper.play({src: $soundFile, volume: 0.8, autoplay: true, loop: false}, true);

	// sound effect - with .5 delay to sync with animation
	setTimeout(function() {
		let $spellAnim = 
						{
						 file: "animated-effect-tokens/spell-effects_scifi_shotgun_blast_01.webm",
						  position: $token.center,
						  anchor: {
						   x: 0.1,
						   y: 0.5
						  },
						  angle: Math.floor(Math.random() * 120),
						  scale: {
						   x: .5,
						   y: .5
						  }
						}; 
		canvas.specials.playVideo($spellAnim);
		game.socket.emit('module.fxmaster', $spellAnim);
	}, 850);
}
Cast ($token)