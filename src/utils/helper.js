import {
	format,
	startOfYear,
	endOfYear,
	addWeeks,
	isBefore,
	isAfter,
	isSameWeek,
	startOfWeek,
	endOfWeek,
	subDays,
	startOfMonth,
	subMonths,
	endOfMonth,
	getWeek,
} from "date-fns";
import toast from "react-hot-toast";

export const showToast = (type = "success", message) => {
	toast[type](message);
};

export const groupItemsByDate = items => {
	return items.reduce((acc, item) => {
		const date = item.createdAt.split("T")[0];
		acc[date] = acc[date] ?? [];
		acc[date].push(item);
		return acc;
	}, {});
};

export const formatDate = date => {
	return format(date, "yyyy-MM-dd");
};

export const getPreviousDate = inputDate => {
	const previousDate = subDays(new Date(inputDate), 1);
	return formatDate(previousDate);
};

export const getTodaysDate = () => {
	let today = new Date();
	// convert date to ISO string
	let todaysDate = today.toISOString().split("T")[0];
	return todaysDate;
};

// export const getYesterdaysDate = () => {
// 	const myDate = new Date();
// 	myDate.setDate(myDate.getDate() - 1);
// 	return myDate.toISOString().split("T")[0];
// };

/***********************************************************************************************/

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
	console.log("weeks :", weeks);
	return weeks;
}

function yesterdayDate() {
	const yesterday = subDays(new Date(), 1);
	return yesterday.toISOString().slice(0, 10);
}

function getPreviousWeekDates() {
	const startOfWeekDate = startOfWeek(subDays(new Date(), 7));
	const endOfWeekDate = endOfWeek(subDays(new Date(), 7));
	return [
		startOfWeekDate.toISOString().slice(0, 10),
		endOfWeekDate.toISOString().slice(0, 10),
	];
}

function getPreviousMonthDates() {
	const startOfMonthDate = startOfMonth(subMonths(new Date(), 1));
	const endOfMonthDate = endOfMonth(subMonths(new Date(), 1));

	return [
		startOfMonthDate.toISOString().slice(0, 10),
		endOfMonthDate.toISOString().slice(0, 10),
	];
}

export const getWeekNumberByDate = date => {
	const weekNumber = getWeek(new Date(date));
	console.log("Week number:", weekNumber);
	return weekNumber;
};
getWeekNumberByDate("2024-03-29");

// Example usage:

console.log("----helper----");
console.log("Yesterday's date:", yesterdayDate());
const [startWeek, endWeek] = getPreviousWeekDates();
console.log("Previous week's start date:", startWeek);
console.log("Previous week's end date:", endWeek);
const [startMonth, endMonth] = getPreviousMonthDates();
console.log("Previous month's start date:", startMonth);
console.log("Previous month's end date:", endMonth);
console.log("----helper----");
