import { phrase } from "@utils/helpers";
import { Style } from "./style";

export const PostalDude = {
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
		phrase("Ничья? Черт, я думал это будет хаос... А тут просто ничто", Style.Default, 100),
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
		phrase("Мне в принципе не важно куда ходить. Я выиграю в любом случае", Style.Sarcasm, 100),
		phrase("Я могу ходить куда угодно. Ты - нет", Style.Sarcasm, 100),
		phrase("Впечатлен?", Style.Sarcasm, 100),
	],
	fork: [
		phrase("Давай, парируй", Style.Default, 100),
		phrase("Оцените силу духа", Style.Sarcasm, 100),
		phrase("Чё думаешь? Норм ход?", Style.Sarcasm, 100),
	],
};
