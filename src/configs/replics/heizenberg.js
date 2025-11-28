import { phrase } from "@utils/helpers";
import { Style } from "./style";

export const Heizenberg = {
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
};
