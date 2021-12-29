import {createElement} from '../components/utils.js';


export class Player {
    constructor(props) {

        this.player = props.player;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.selector = `player${this.player}`;
        this.rootSelector = props.rootSelector;
    }

    elHP = () => {
        let $playerHP = document.querySelector(`.${this.selector} .life`);
        return $playerHP;
    };

    changeHP = (numberHP) => {
        this.hp -= numberHP;
       
       if (this.hp <= 0) {
           this.hp = 0;
       }
   };
   
   
    renderHP = () => {
       this.elHP().style.width = this.hp + '%';
   };

    attack = () => {
    console.log(this.name + ' - Fight...')
    };


    createPlayer = () => {
        const $player = createElement('div', this.selector);
        const $progressBar = createElement('div','progressbar');
        const $character = createElement('div','character');
        const $characterLife = createElement('div','life');
        const $characterName = createElement('div','name');
        const $characterImg = createElement('img');
    
        $characterLife.style.width =  this.hp + `%`;
        $characterName.innerText = this.name;
        $characterImg.src = this.img;
    
        $player.appendChild($progressBar);
        $player.appendChild($character);
    
        $progressBar.appendChild($characterLife);
        $progressBar.appendChild($characterName);
    
        $character.appendChild($characterImg);
    

        const $root = document.querySelector(`.${this.rootSelector}`);
        $root.appendChild($player);
        return $player
    
    }
}





