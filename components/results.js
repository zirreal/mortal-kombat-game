import createReloadButton from '/components/reload-btn.js';
import {createElement} from '../components/utils.js';
import {firstPlayer, secondPlayer} from '/components/game.js';
import generateLogs from '/components/logs.js';

const showResultTitle = (resultText) => {
    const $resultTitle = createElement('div', 'loseTitle');
    if(resultText) {
        $resultTitle.innerText = resultText + ' wins';
    } else {
        $resultTitle.innerText = 'draw';
    }
    

    return $resultTitle
};

const chooseWinner = (arena) => {
    const {name,hp} = firstPlayer;
    const {name: nameSecondPlayer, hp: hpSecondPlayer} = secondPlayer;

    if(hp === 0 || hpSecondPlayer === 0) {
        createReloadButton();
        document.querySelector('.fight-btn').disabled = true;
    }

    if (hp === 0 && hp < hpSecondPlayer) {
        arena.appendChild(showResultTitle(nameSecondPlayer));
        generateLogs('end', secondPlayer, firstPlayer);
    } else if (hpSecondPlayer === 0 && hpSecondPlayer < hp) {
        arena.appendChild(showResultTitle(name));
        generateLogs('end', firstPlayer, secondPlayer);
    } else if (hp === 0 && hpSecondPlayer === 0) {
        arena.appendChild(showResultTitle());
        generateLogs('draw', firstPlayer, secondPlayer);
    }
}

export default chooseWinner;
