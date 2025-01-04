let canvas;
let ctx;   


let world = new World();

function init(){
    canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d');  

    
    console.log('My Character is', world.character);   // Ausgabe:  Character {x: 100, y: 400, img: img}
    // wenn man in der console world eingibt dann wird folgendes ausgegeben:  World {character: Character, enemies: Array(3)}
    // In JavaScript kannst du auf die Werte bzw. Schlüssel eines Objekts sowohl mit der Punktnotation als auch mit der eckigen Klammernotation zugreifen. 
    // Beide Methoden sind gängig, aber es gibt kleine Unterschiede, wann du welche verwenden solltest.
}