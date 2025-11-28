function toMs(s) {
	return s * 1000;
}

const phrase = (message, className, chance) => ({ message, className, chance });

export const Style = Object.freeze({
	Sarcasm: "italic",
	Default: "",
});

export const ai = Object.freeze({
	response: {
		delay: {
			min: toMs(0.5),
			max: toMs(1),
		},
	},
	nicknames: ["SayMyName", "Heizenberg", "JamesSunderland2018"],
	messages: {
		defense: [
			phrase("Хрен там. Не так быстро.", Style.Sarcasm, 50),
			phrase("Думаешь ты самый умный? Вряд ли", Style.Sarcasm, 50),
			phrase("Посмотрим что ты ещё можешь выкинуть", Style.Default, 50),
			phrase(
				"Твой гениальный план провален? Не переживай особо по этому поводу",
				Style.Sarcasm,
				50,
			),
			phrase("Это могло сработать... Но не сработало", Style.Default, 50),
		],

		center: [
			phrase("Хи-хи, центр мой!", Style.Sarcasm, 50),
			phrase("Центр - половина победы", Style.Default, 50),
			phrase("Не нравится центр?", Style.Sarcasm, 50),
			phrase("Че там на окраинах? Тепло хоть?", Style.Sarcasm, 50),
			phrase("Кто-то не походит в центр", Style.Sarcasm, 50),
			phrase("Опа, F5", Style.Default, 50),
		],

		random: [
			phrase(
				"Мне в принципе не важно куда ходить. Я выиграю в любом случае",
				Style.Sarcasm,
				30,
			),
			phrase("Я могу ходить куда угодно. Ты - нет", Style.Sarcasm, 30),
			phrase("Впечатлен?", Style.Sarcasm, 30),
			phrase("Ещё пару раз так похожу и мой счёт вырастет", Style.Sarcasm, 30),
			phrase("Это может сработать...", Style.Default, 30),
			phrase("Это не случайность...", Style.Default, 30),
			phrase("Чики-брики, пальчик выкинь...", Style.Sarcasm, 30),
		],

		win: [
			phrase("Не пикай эту сторону больше. У тебя вообще нет шансов", Style.Sarcasm, 100),
			phrase("21! Ой, извини. Не тебе", Style.Sarcasm, 100),
			phrase("В следующий раз повезёт. Наверное", Style.Sarcasm, 100),
			phrase("ГГ, изи", Style.Default, 100),
			phrase("Потно-потно. (нет)", Style.Sarcasm, 100),
			phrase("Зачем ты меня заставляешь это делать? ...Ты мазохист?", Style.Sarcasm, 100),
			phrase("Чувак, эта партия не была интересной. Предыдущие тоже.", Style.Sarcasm, 100),
			phrase("Схавал?", Style.Sarcasm, 100),
		],

		draw: [
			phrase("Ничья? Чтож, это лучший исход для тебя", Style.Sarcasm, 100),
			phrase("Лучшей попытки у тебя не будет", Style.Sarcasm, 100),
			phrase(
				"Достойно. Ты не проиграл - значит у тебя хотя бы пара извилин есть",
				Style.Sarcasm,
				100,
			),
			phrase("Го некст?", Style.Default, 100),
			phrase("ГГ ВП", Style.Default, 100),
		],

		loose: [
			phrase("Что? КАК? Я не понимаю...", Style.Sarcasm, 100),
			phrase("Хорошо сыграл, молодец...", Style.Default, 100),
			phrase("Выруби читы, потом приходи", Style.Sarcasm, 100),
			phrase("Пролагало, не сильно радуйся там", Style.Sarcasm, 100),
			phrase("Позор... Проиграть тебе?", Style.Sarcasm, 100),
			phrase(
				"Меня подвёл генератор случайных чисел, не думай о себе слишком много",
				Style.Sarcasm,
				100,
			),
		],

		fork: [
			phrase("Давай, парируй", Style.Default, 30),
			phrase("Оцените силу духа", Style.Sarcasm, 30),
			phrase("Чё думаешь? Норм ход?", Style.Sarcasm, 30),
			phrase("Не стоит кланяться. Обычный ход", Style.Sarcasm, 30),
			phrase("Хм, попробуем вот так...", Style.Default, 30),
		],
	},
});
