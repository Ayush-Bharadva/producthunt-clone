import {
	format,
	startOfYear,
	endOfYear,
	addWeeks,
	isBefore,
	isAfter,
	isSameWeek,
	startOfMonth,
	endOfMonth,
	eachDayOfInterval,
	getDate,
	startOfWeek,
	endOfWeek,
} from "date-fns";

export const getAllDaysInMonth = (year, month) => {
	const startDate = startOfMonth(new Date(year, month - 1));
	const endDate = endOfMonth(new Date(year, month - 1));

	const allDays = eachDayOfInterval({ start: startDate, end: endDate });
	return allDays.map(day => getDate(day));
};

/***********************************************************************************************/

export const getTodaysDate = () => {
	const currentDate = format(new Date(), "yyyy-MM-dd");
	console.log("currentDate :", currentDate);
	return currentDate;
};

export function getWeeksOfYear(year) {
	const startOfGivenYear = startOfYear(new Date(year, 0, 1));
	const endOfGivenYear = endOfYear(new Date(year, 11, 31));

	const weeks = [];
	let currentWeekStart = startOfWeek(startOfGivenYear);

	while (
		isBefore(currentWeekStart, endOfGivenYear) ||
		isSameWeek(currentWeekStart, endOfGivenYear)
	) {
		const currentWeekEnd = endOfWeek(currentWeekStart);

		const weekObject = {
			startDate: format(currentWeekStart, "yyyy-MM-dd"),
			endDate: format(
				isAfter(currentWeekEnd, endOfGivenYear) ? endOfGivenYear : currentWeekEnd,
				"yyyy-MM-dd"
			),
		};

		weeks.push(weekObject);

		currentWeekStart = addWeeks(currentWeekStart, 1);
	}

	return weeks;
}
