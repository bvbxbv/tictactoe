import { phrase } from "@utils/helpers";
import { Style } from "./style";

export const TylerDurden = {
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
};
