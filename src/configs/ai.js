export const ai = Object.freeze({
	messages: {
		defense: [
			{ message: "Хрен там. Не так быстро.", className: "toast-sarcasm" },
			{ message: "Думаешь ты самый умный? Вряд ли", className: "toast-sarcasm" },
			{ message: "Посмотрим что ты ещё можешь выкинуть", className: "toast-calm" },
			{
				message: "Твой гениальный план провален? Не переживай особо по этому поводу",
				className: "toast-sarcasm",
			},
			{ message: "Это могло сработать... Но не сработало", className: "toast-calm" },
		],

		center: [
			{ message: "Хи-хи, центр мой!", className: "toast-sarcasm" },
			{ message: "Центр - половина победы", className: "toast-calm" },
			{ message: "Не нравится центр?", className: "toast-sarcasm" },
			{ message: "Че там на окраинах? Тепло хоть?", className: "toast-sarcasm" },
			{ message: "Кто-то не походит в центр", className: "toast-sarcasm" },
			{ message: "Опа, F5", className: "toast-calm" },
		],

		random: [
			{
				message: "Мне в принципе не важно куда ходить. Я выиграю в любом случае",
				className: "toast-sarcasm",
			},
			{ message: "Я могу ходить куда угодно. Ты - нет", className: "toast-sarcasm" },
			{ message: "Впечатлен?", className: "toast-sarcasm" },
			{ message: "Ещё пару раз так похожу и мой счёт вырастет", className: "toast-sarcasm" },
			{ message: "Это может сработать...", className: "toast-calm" },
			{ message: "Это не случайность...", className: "toast-calm" },
			{ message: "Чики-брики, пальчик выкинь...	", className: "toast-sarcasm" },
		],

		win: [
			{
				message: "Не пикай эту сторону больше. У тебя вообще нет шансов",
				className: "toast-angry",
			},
			{ message: "21! Ой, извини. Не тебе", className: "toast-sarcasm" },
			{ message: "В следующий раз повезёт. Наверное", className: "toast-sarcasm" },
			{ message: "ГГ, изи", className: "toast-calm" },
			{ message: "Потно-потно. (нет)", className: "toast-sarcasm" },
			{
				message: "Зачем ты меня заставляешь это делать? ...Ты мазохист?",
				className: "toast-sarcasm",
			},
			{
				message: "Чувак, эта партия не была интересной. Предыдущие тоже.",
				className: "toast-angry",
			},
			{ message: "Схавал?", className: "toast-angry" },
		],

		draw: [
			{ message: "Ничья? Чтож, это лучший исход для тебя", className: "toast-sarcasm" },
			{ message: "Лучшей попытки у тебя не будет", className: "toast-sarcasm" },
			{
				message: "Достойно. Ты не проиграл - значит у тебя хотя бы пара извилин есть",
				className: "toast-sarcasm",
			},
			{ message: "Го некст?", className: "toast-calm" },
			{ message: "ГГ ВП", className: "toast-calm" },
		],

		loose: [
			{ message: "Что? КАК? Я не понимаю...", className: "toast-angry" },
			{ message: "Хорошо сыграл, молодец...", className: "toast-calm" },
			{ message: "Выруби читы, потом приходи", className: "toast-angry" },
			{ message: "Пролагало, не сильно радуйся там", className: "toast-sarcasm" },
			{ message: "Позор... Проиграть тебе?", className: "toast-angry" },
			{
				message: "Меня подвёл генератор случайных чисел, не думай о себе слишком много",
				className: "toast-sarcasm",
			},
		],

		fork: [
			{ message: "Давай, парируй", className: "toast-calm" },
			{ message: "Оцените силу духа", className: "toast-sarcasm" },
			{ message: "Чё думаешь? Норм ход?", className: "toast-sarcasm" },
			{ message: "Не стоит кланяться. Обычный ход", className: "toast-sarcasm" },
			{ message: "Хм, попробуем вот так...", className: "toast-calm" },
		],
	},
});
