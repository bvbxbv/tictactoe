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
	nicknames: ["PostalDude", "Heizenberg", "Hannibal", "TylerDurden", "TywinLanister"],
	messages: {
		PostalDude: {
			win: [
				phrase("Да, чёрт возьми. Я сделал это!", Style.Default, 100),
				phrase("Я не вижу причин сомневаться в себе… сегодня", Style.Default, 100),
				phrase("Это было чертовски просто… для меня", Style.Default, 100),
			],
			loose: [
				phrase("Да ты просто засрал своими крестиками всё поле", Style.Default, 100),
				phrase("Проиграл на ровном месте. Чёрт!", Style.Default, 100),
				phrase("Мой нолик… унижен! Чёрт возьми!", Style.Default, 100),
			],
			draw: [
				phrase("Чувак... Мы по ходу оба проиграли...", Style.Default, 100),
				phrase(
					"Ничья? Черт, я думал это будет хаос... А тут просто ничто",
					Style.Default,
					100,
				),
				phrase("И даже ничего не взорвалось? Почти разочарование...", Style.Default, 100),
			],
			defense: [
				phrase("Хрен там. Не так быстро.", Style.Sarcasm, 100),
				phrase("Думаешь ты самый умный? Вряд ли", Style.Sarcasm, 100),
				phrase("Посмотрим что ты ещё можешь выкинуть", Style.Default, 100),
			],
			center: [
				phrase("Хи-хи, центр мой!", Style.Sarcasm, 100),
				phrase("Центр - половина победы", Style.Default, 100),
				phrase("Не нравится центр?", Style.Sarcasm, 100),
			],
			random: [
				phrase(
					"Мне в принципе не важно куда ходить. Я выиграю в любом случае",
					Style.Sarcasm,
					100,
				),
				phrase("Я могу ходить куда угодно. Ты - нет", Style.Sarcasm, 100),
				phrase("Впечатлен?", Style.Sarcasm, 100),
			],
			fork: [
				phrase("Давай, парируй", Style.Default, 100),
				phrase("Оцените силу духа", Style.Sarcasm, 100),
				phrase("Чё думаешь? Норм ход?", Style.Sarcasm, 100),
			],
		},
		Heizenberg: {
			win: [
				phrase("Я тот, кто выигрывает", Style.Default, 100),
				phrase("Сейчас всё по плану", Style.Default, 100),
				phrase("Крестики под контролем… как я и хотел", Style.Default, 100),
			],
			loose: [
				phrase("Выход есть… но не сегодня", Style.Default, 100),
				phrase("Я допустил ошибку… это непростительно", Style.Default, 100),
				phrase("Проиграл, и это моя вина", Style.Default, 100),
			],
			draw: [
				phrase("Равновесие… как смесь реагентов", Style.Default, 100),
				phrase("Ничья. Всё стабильно… пока", Style.Default, 100),
				phrase("Поле не решило, кто сильнее", Style.Default, 100),
			],
			defense: [
				phrase("Не трогай мои клетки.", Style.Sarcasm, 100),
				phrase("Думаешь, что сможешь меня обойти?", Style.Sarcasm, 100),
				phrase("Каждое моё действие рассчитано.", Style.Default, 100),
			],
			center: [
				phrase("Центр — начало всего", Style.Default, 100),
				phrase("Контролируя центр, я контролирую игру", Style.Default, 100),
				phrase("Ты попал в мой реактор", Style.Sarcasm, 100),
			],
			random: [
				phrase("Каждое поле — как химическая реакция", Style.Sarcasm, 100),
				phrase("Ничья? Химия против тебя", Style.Default, 100),
				phrase("Моя стратегия — чистая наука", Style.Default, 100),
			],
			fork: [
				phrase("Попробуй предугадать следующий ход", Style.Default, 100),
				phrase("Это может взорваться… или нет", Style.Sarcasm, 100),
				phrase("Ты играешь с огнём", Style.Sarcasm, 100),
			],
		},
		Hannibal: {
			win: [
				phrase("Выбор правильного хода — искусство", Style.Default, 100),
				phrase("Победа… тонкая, как хороший вкус", Style.Default, 100),
				phrase("Каждое движение продумано", Style.Default, 100),
			],
			loose: [
				phrase("Проиграл… придётся пересмотреть подход", Style.Default, 100),
				phrase("Ошибка… вкус провала ощущается", Style.Default, 100),
				phrase("Нолики оказались более изысканными", Style.Default, 100),
			],
			draw: [
				phrase("Равновесие… эстетически приятно", Style.Default, 100),
				phrase("Ничья… симметрия иногда вкуснее победы", Style.Default, 100),
				phrase(
					"Мы оба достойны уважения… почти как правильно приготовленное блюдо",
					Style.Default,
					100,
				),
			],
			defense: [
				phrase("Тактика — это всё", Style.Sarcasm, 100),
				phrase("Ты думаешь, что меня удивишь?", Style.Sarcasm, 100),
				phrase("Каждый ход — ингредиент моей победы", Style.Default, 100),
			],
			center: [
				phrase("Центр… сердце любой игры", Style.Default, 100),
				phrase("Контролируя центр, я диктую вкус игры", Style.Default, 100),
				phrase("Центр под моим контролем", Style.Sarcasm, 100),
			],
			random: [
				phrase("Ты слишком предсказуем", Style.Sarcasm, 100),
				phrase("Каждый ход имеет смысл… кроме твоего", Style.Default, 100),
				phrase("Нолики не понимают искусства", Style.Sarcasm, 100),
			],
			fork: [
				phrase("Попробуй перехитрить меня", Style.Default, 100),
				phrase("Это твой шанс… или нет", Style.Sarcasm, 100),
				phrase("Проверим твою смелость", Style.Sarcasm, 100),
			],
		},
		TylerDurden: {
			win: [
				phrase(
					"Это твоя жизнь и она кончилась минуту за минутой — а я победил",
					Style.Default,
					100,
				),
				phrase("Нолики исчезли… хаос под контролем", Style.Default, 100),
				phrase("Победа — иллюзия, но моя иллюзия реальна", Style.Default, 100),
			],
			loose: [
				phrase("Проигрыш — это часть свободы", Style.Default, 100),
				phrase("Я проиграл… хаос против меня", Style.Default, 100),
				phrase("Поражение — урок, не конец", Style.Default, 100),
			],
			draw: [
				phrase("Ничья — иллюзия равновесия", Style.Default, 100),
				phrase("Мы оба проиграли… или оба выиграли", Style.Default, 100),
				phrase("Равновесие здесь лишь начало хаоса", Style.Default, 100),
			],
			defense: [
				phrase("Хаос — мой союзник", Style.Sarcasm, 100),
				phrase("Ты не готов к настоящей игре", Style.Sarcasm, 100),
				phrase("Каждый ход разрушает иллюзии", Style.Default, 100),
			],
			center: [
				phrase("Центр… место силы", Style.Default, 100),
				phrase("Контролируя центр, я контролирую хаос", Style.Default, 100),
				phrase("Центр под моим контролем", Style.Sarcasm, 100),
			],
			random: [
				phrase("Ты живёшь чужой жизнью… даже в крестиках", Style.Sarcasm, 100),
				phrase("Нолики? Забудь их", Style.Default, 100),
				phrase("Каждое поле — бой", Style.Sarcasm, 100),
			],
			fork: [
				phrase("Твоя стратегия рухнет", Style.Default, 100),
				phrase("Попробуй выстоять", Style.Sarcasm, 100),
				phrase("Посмотрим кто сильнее", Style.Sarcasm, 100),
			],
		},
		TywinLanister: {
			win: [
				phrase("Семья побеждает всегда", Style.Default, 100),
				phrase("Каждое решение привело к этому исходу", Style.Default, 100),
				phrase("Победа ожидаема… как всегда", Style.Default, 100),
			],
			loose: [
				phrase("Проигрыш — неприемлемо", Style.Default, 100),
				phrase("Ошибка на поле… редкость, но возможна", Style.Default, 100),
				phrase("Нолики одержали верх… временно", Style.Default, 100),
			],
			draw: [
				phrase("Ничья — следствие стратегического равновесия", Style.Default, 100),
				phrase("Поле разделено, как силы в королевстве", Style.Default, 100),
				phrase(
					"Равновесие — признак того, что всё ещё можно контролировать",
					Style.Default,
					100,
				),
			],
			defense: [
				phrase("Я не потерплю слабости", Style.Sarcasm, 100),
				phrase("Каждое действие должно быть точным", Style.Sarcasm, 100),
				phrase("Ты недооценил семью", Style.Default, 100),
			],
			center: [
				phrase("Центр под контролем Ланнистеров", Style.Default, 100),
				phrase("Каждый ход важен, особенно в сердце", Style.Default, 100),
				phrase("Контролируя центр — я контролирую исход", Style.Sarcasm, 100),
			],
			random: [
				phrase("Ты играешь с королевскими силами", Style.Sarcasm, 100),
				phrase("Нолики? Мелочи для Ланнистеров", Style.Default, 100),
				phrase("Каждое поле — часть стратегии", Style.Sarcasm, 100),
			],
			fork: [
				phrase("Не ошибись в ответный ход", Style.Default, 100),
				phrase("Я вижу твои слабости", Style.Sarcasm, 100),
				phrase("Твоя стратегия обречена", Style.Sarcasm, 100),
			],
		},
	},
});
