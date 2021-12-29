import { createRandomNumber } from "/components/utils.js";
const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};


const ATTACK = ["head", "body", "foot"];

export const enemyAttack = () => {
  const hit = ATTACK[createRandomNumber(3) - 1];
  const defence = ATTACK[createRandomNumber(3) - 1];

  return {
    value: createRandomNumber(HIT[hit]),
    hit,
    defence,
  };
};

