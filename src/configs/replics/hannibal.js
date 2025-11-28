import { phrase } from "@utils/helpers";
import { Style } from "./style";

export const Hannibal = {
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
};
