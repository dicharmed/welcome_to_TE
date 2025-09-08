interface BallonI {
  id: number;
  isPublic: boolean;
}

/**
 * @description имитация fetch. возвращает количество шариков
 * @param {Number} id ID шарика по цвету
 * @returns {Number} количество шариков
 * @example const res = await fetchBallonAmount(202);
 */
async function fetchBallonAmount(id: BallonI["id"]): Promise<number> {
  const RANDOM_TIMEOUT: number = Math.ceil(Math.random() * 10000); // 1-9 секунд
  const RANDOM_AMOUNT: number = Math.ceil(Math.random() * id); // случайное число

  return new Promise((resolve) =>
    setTimeout(() => resolve(RANDOM_AMOUNT), RANDOM_TIMEOUT)
  );
}

// данные о шариках
const BALLONS: { [key: string]: BallonI } = {
  red: {
    id: 202,
    isPublic: true,
  },
  blue: {
    id: 356,
    isPublic: false,
  },
  yellow: {
    id: 451,
    isPublic: false,
  },
  black: {
    id: 35,
    isPublic: true,
  },
  green: {
    id: 191,
    isPublic: true,
  },
  white: {
    id: 911,
    isPublic: true,
  },
};

// Ваш код здесь
//нужна верхнеуровневая async-обёртка, чтобы использовать await.
(async () => {
  //беру только публичные шарики согласно условию.
  const publicBallons: BallonI[] = Object.values(BALLONS).filter(
    (ballon) => ballon.isPublic
  );

  //запускаю все запросы параллельно, чтобы было быстрее, чем по одному.
  const amounts: number[] = await Promise.all(
    publicBallons.map((ballon) => fetchBallonAmount(ballon.id))
  );

  //суммирую полученные количества в одно число.
  const totalAmount: number = amounts.reduce((sum, amount) => sum + amount, 0);

  //вывожу результат, чтобы проверить итог.
  console.log(totalAmount);
  return totalAmount;
})();
