import {
	format,
	subDays,
	differenceInCalendarWeeks,
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
	// Optimise function
	const startDate = startOfMonth(new Date(year, month - 1));
	const endDate = endOfMonth(new Date(year, month - 1));

	const allDays = eachDayOfInterval({ start: startDate, end: endDate });
	return allDays.map(day => getDate(day));
};

// const allDates = getAllDaysInMonth(2022, 6);
// console.log("allDates :", allDates);

/***********************************************************************************************/

// const startDate = new Date("2024-01-01");
// const endDate = new Date("2024-03-20");

// const weeks = [];

// for (let date = startDate; date <= endDate; date = startOfWeek(addDays(date, 7))) {
// 	weeks.push({
// 		start: format(date, "yyyy-MM-dd"),
// 		end: format(endOfWeek(date), "yyyy-MM-dd"),
// 	});
// }

// // Example usage:
// const year = 2024;
// const month = 3; // March
// const daysInMonth = getAllDaysInMonth(year, month);

// console.log("daysInMonth :", daysInMonth);

// console.log("ALL-WEEKS :", weeks);

export const getTodaysDate = () => {
	const today = new Date();
	const fullDate = today.toISOString().split("T")[0];
	const [year, month, day] = fullDate.split("-");
	return [fullDate, year, month, day];
};

const todaysDate = new Date().toISOString().split("T")[0];
// console.log("todaysDate :", todaysDate);

export const formatDate = date => {
	return format(new Date(date), "yyyy-MM-dd");
};

export const getPreviousDate = () => {
	const today = new Date();
	const yesterday = subDays(today, 1);
	const formattedDate = formatDate(yesterday);
	return formattedDate;
};

export const countTotalWeeksFromYear = (year = 2024) => {
	const today = new Date();
	const startOfYear = new Date(year, 0, 1);
	const weeks = differenceInCalendarWeeks(today, startOfYear);
	console.log("completed-weeks :", weeks);
	// return weeks;
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
