import { phrase } from "@utils/helpers";
import { Style } from "./style";

export const TywinLanister = {
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
		phrase("Равновесие — признак того, что всё ещё можно контролировать", Style.Default, 100),
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
};
