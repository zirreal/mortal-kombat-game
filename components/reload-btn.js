import {Game} from '/components/game.js';

const createReloadButton = () => {
    const $reloadWrapper = document.createElement('div');
    const $reloadButton = document.createElement('button');

    $reloadWrapper.classList.add('reloadWrap');
    $reloadButton.classList.add('button');

    $reloadButton.innerText = 'Restart';

    $reloadButton.addEventListener('click', () => {
        setTimeout(() => {
            window.location.pathname = 'index.html';
        }, 500);

    })

    new Game().$arena.appendChild($reloadWrapper);
    $reloadWrapper.appendChild($reloadButton);

}

export default createReloadButton;