import {Player} from '/components/player.js';
import generateLogs from '/components/logs.js';
import {enemyAttack} from '/components/players-attack-and-defence.js';
import chooseWinner from '/components/results.js';
import { chooseArena } from './utils.js';



export let firstPlayer;
export let secondPlayer;

export class Game {
    $arena = document.querySelector('.arenas');
    $formFight = document.querySelector('.control');

    getMyPlayer = async () => {
        const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());
        return body;
    }

    getRandomPlayer = async () => {
        const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());
        return body
    }    

    start = async () => {
        const getMyPlayer = await this.getMyPlayer();
        const enemyPlayer = await this.getRandomPlayer();

        if (localStorage.getItem('firstPlayer')) {
            let p = JSON.parse(localStorage.getItem('firstPlayer'));
            let p1;
            if(p.id < 11) {
                p1 = getMyPlayer[p.id - 1];
            } else {
                p1 = getMyPlayer[p.id - 2];
            }
            const p2 = enemyPlayer;
            firstPlayer = new Player({
                ...p1,
                player: 1,
                rootSelector: 'arenas',
            });
            secondPlayer = new Player({
                ...p2,
                player: 2,
                rootSelector: 'arenas',
            });
        }
        firstPlayer.createPlayer();
        secondPlayer.createPlayer();
        generateLogs('start', firstPlayer, secondPlayer);
        chooseArena(this.$arena)
        
        this.$formFight.addEventListener('submit', async (e) => {
            e.preventDefault(); 
            const {hit: hitEnemy, defence: defenceEnemy, value: valueEnemy} = enemyAttack();
            
            const playerAttacks = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
                        method: "POST",
                        body: JSON.stringify({
                            hit: hitEnemy,
                            defence: defenceEnemy,
                        }),
                    });
        
            const attack = await playerAttacks.json();

            if (attack.player1.defence !== attack.player2.hit) {
                firstPlayer.changeHP(attack.player2.value);
                firstPlayer.renderHP();
                generateLogs('hit', secondPlayer, firstPlayer, attack.player2.value);
            } else {
                generateLogs('defence', secondPlayer, firstPlayer);
            }

            if (attack.player2.defence !== attack.player1.hi) {
                secondPlayer.changeHP(attack.player1.value);
                secondPlayer.renderHP();
                generateLogs('hit', firstPlayer, secondPlayer, attack.player1.value);
            } else {
                generateLogs('defence', firstPlayer, secondPlayer);
            }
            chooseWinner(this.$arena);
        })
    }
}