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
	getWeek,
	add,
	subMonths,
	startOfMonth,
	endOfMonth,
} from "date-fns";
import toast from "react-hot-toast";

export const showToast = (type = "success", message) => {
	toast[type](message);
};

export const formatDate = date => {
	return format(date, "yyyy-MM-dd");
};

export const convertToPST = date => {
	return formatDate(
		new Date(date).toLocaleString("en-US", { timeZone: "America/Los_Angeles" }),
		"yyyy-mm-dd"
	);
};

export const pstCurrentDate = new Date().toLocaleString("en-US", {
	timeZone: "America/Los_Angeles",
});

export const getPreviousWeekDates = currentDate => {
	const startOfWeekDate = add(startOfWeek(new Date(currentDate)), { days: 1 });
	const endOfWeekDate = add(endOfWeek(new Date(currentDate)), { days: 1 });

	const previousWeekStart = subDays(startOfWeekDate, 7);
	const previousWeekEnd = subDays(endOfWeekDate, 7);
	// console.log(
	// 	"previousWeekStart :",
	// 	convertToPST(previousWeekStart),
	// 	"previousWeekEnd :",
	// 	convertToPST(previousWeekEnd)
	// );
	return [previousWeekStart, previousWeekEnd];
};

export const getPreviousMonthDates = currentDate => {
	const temp = subMonths(new Date(currentDate), 1);
	const previousMonthStartDate = add(startOfMonth(temp), { days: 1 });
	const previousMonthEndDate = endOfMonth(temp);

	console.log(
		"previousMonthStartDate :",
		convertToPST(previousMonthStartDate),
		"previousMonthEndDate :",
		convertToPST(previousMonthEndDate)
	);
	return [previousMonthStartDate, previousMonthEndDate];
};

getPreviousMonthDates(pstCurrentDate);

// getPreviousWeekDates(pstCurrentDate);

export const getPreviousDate = inputDate => {
	const previousDate = subDays(new Date(inputDate), 1);
	return formatDate(previousDate);
};

export const getTodaysDate = () => {
	let today = new Date();
	let todaysDate = today.toISOString().split("T")[0];
	return todaysDate;
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
	console.log("weeks :", weeks);
	return weeks;
}

export const getYesterdayDate = () => {
	const yesterday = subDays(new Date(), 1);
	return convertToPST(yesterday);
};

export const getWeekDatesFromNumber = (year, weekNumber) => {
	const date = new Date(year, 0, 1 + (weekNumber - 1) * 7);
	const startDate = add(startOfWeek(date), { days: 1 });
	const endDate = add(endOfWeek(date), { days: 1 });
	// console.log("startDate :", startDate, "endDate :", endDate);
	return [formatDate(startDate), formatDate(endDate)];
};

// getWeekDatesFromNumber(2024, 11);

/***********************************************************************************************/

// function getPreviousWeekDates() {
// 	const startOfWeekDate = startOfWeek(subDays(new Date(), 7));
// 	const endOfWeekDate = endOfWeek(subDays(new Date(), 7));
// 	return [
// 		startOfWeekDate.toISOString().slice(0, 10),
// 		endOfWeekDate.toISOString().slice(0, 10),
// 	];
// }

// function getPreviousMonthDates() {
// 	const startOfMonthDate = startOfMonth(subMonths(new Date(), 1));
// 	const endOfMonthDate = endOfMonth(subMonths(new Date(), 1));

// 	return [
// 		startOfMonthDate.toISOString().slice(0, 10),
// 		endOfMonthDate.toISOString().slice(0, 10),
// 	];
// }

export const getWeekNumberByDate = date => {
	const weekNumber = getWeek(new Date(date));
	console.log("Week number:", weekNumber);
	return weekNumber;
};
// getWeekNumberByDate("2024-03-29");
export const groupItemsByDate = items => {
	return items.reduce((acc, item) => {
		const date = item.createdAt.split("T")[0];
		acc[date] = acc[date] ?? [];
		acc[date].push(item);
		return acc;
	}, {});
};
