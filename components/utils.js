export const createRandomNumber = (n) => Math.ceil(Math.random() * n);

export const randomNumber = (min, max) => min + Math.floor(Math.random() * ((max - 1)-min));

export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);

    if(className) {
        $tag.classList.add(className);
    }

    return $tag;
};

export const chooseArena = (arena) => {
    const arenas = ['arena1', 'arena2', 'arena3', 'arena4', 'arena5'];
    const index = Math.floor(Math.random() * 5)
    arena.classList.add(arenas[index])
}