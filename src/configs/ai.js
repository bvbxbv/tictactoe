function toMs(s) {
	return s * 1000;
}

const phrase = (message, className, chance) => ({ message, className, chance });

const Toast = Object.freeze({
	calm: "toast-calm",
	angry: "toast-angry",
	sarcasm: "toast-sarcasm",
});

export const ai = Object.freeze({
	response: {
		delay: {
			min: toMs(0.5),
			max: toMs(1),
		},
	},
	messages: {
		defense: [
			phrase("Хрен там. Не так быстро.", Toast.sarcasm, 50),
			phrase("Думаешь ты самый умный? Вряд ли", Toast.sarcasm, 50),
			phrase("Посмотрим что ты ещё можешь выкинуть", Toast.calm, 50),
			phrase(
				"Твой гениальный план провален? Не переживай особо по этому поводу",
				Toast.sarcasm,
				50,
			),
			phrase("Это могло сработать... Но не сработало", Toast.calm, 50),
		],

		center: [
			phrase("Хи-хи, центр мой!", Toast.sarcasm, 50),
			phrase("Центр - половина победы", Toast.calm, 50),
			phrase("Не нравится центр?", Toast.sarcasm, 50),
			phrase("Че там на окраинах? Тепло хоть?", Toast.sarcasm, 50),
			phrase("Кто-то не походит в центр", Toast.sarcasm, 50),
			phrase("Опа, F5", Toast.calm, 50),
		],

		random: [
			phrase(
				"Мне в принципе не важно куда ходить. Я выиграю в любом случае",
				Toast.sarcasm,
				30,
			),
			phrase("Я могу ходить куда угодно. Ты - нет", Toast.sarcasm, 30),
			phrase("Впечатлен?", Toast.sarcasm, 30),
			phrase("Ещё пару раз так похожу и мой счёт вырастет", Toast.sarcasm, 30),
			phrase("Это может сработать...", Toast.calm, 30),
			phrase("Это не случайность...", Toast.calm, 30),
			phrase("Чики-брики, пальчик выкинь...", Toast.sarcasm, 30),
		],

		win: [
			phrase("Не пикай эту сторону больше. У тебя вообще нет шансов", Toast.angry, 100),
			phrase("21! Ой, извини. Не тебе", Toast.sarcasm, 100),
			phrase("В следующий раз повезёт. Наверное", Toast.sarcasm, 100),
			phrase("ГГ, изи", Toast.calm, 100),
			phrase("Потно-потно. (нет)", Toast.sarcasm, 100),
			phrase("Зачем ты меня заставляешь это делать? ...Ты мазохист?", Toast.sarcasm, 100),
			phrase("Чувак, эта партия не была интересной. Предыдущие тоже.", Toast.angry, 100),
			phrase("Схавал?", Toast.angry, 100),
		],

		draw: [
			phrase("Ничья? Чтож, это лучший исход для тебя", Toast.sarcasm, 100),
			phrase("Лучшей попытки у тебя не будет", Toast.sarcasm, 100),
			phrase(
				"Достойно. Ты не проиграл - значит у тебя хотя бы пара извилин есть",
				Toast.sarcasm,
				100,
			),
			phrase("Го некст?", Toast.calm, 100),
			phrase("ГГ ВП", Toast.calm, 100),
		],

		loose: [
			phrase("Что? КАК? Я не понимаю...", Toast.angry, 100),
			phrase("Хорошо сыграл, молодец...", Toast.calm, 100),
			phrase("Выруби читы, потом приходи", Toast.angry, 100),
			phrase("Пролагало, не сильно радуйся там", Toast.sarcasm, 100),
			phrase("Позор... Проиграть тебе?", Toast.angry, 100),
			phrase(
				"Меня подвёл генератор случайных чисел, не думай о себе слишком много",
				Toast.sarcasm,
				100,
			),
		],

		fork: [
			phrase("Давай, парируй", Toast.calm, 30),
			phrase("Оцените силу духа", Toast.sarcasm, 30),
			phrase("Чё думаешь? Норм ход?", Toast.sarcasm, 30),
			phrase("Не стоит кланяться. Обычный ход", Toast.sarcasm, 30),
			phrase("Хм, попробуем вот так...", Toast.calm, 30),
		],
	},
});
