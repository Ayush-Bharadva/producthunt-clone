import {
	// startOfYear,
	// endOfYear,
	// addWeeks,
	// isBefore,
	// isAfter,
	// isSameWeek,
	format,
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
	const newDate = format(new Date(date), "yyyy-MM-dd");
	const [year, month, day] = newDate.split("-");
	return `${+year}-${+month}-${+day}`;
};

export const pstCurrentDate = formatDate(
	new Date().toLocaleString(
		"en-US",
		{
			timeZone: "America/Los_Angeles",
			dateStyle: "short",
		},
		"yyyy-MM-dd",
	),
);
// console.log("HELPER :", pstCurrentDate);

export const currentDate = formatDate(new Date());
// console.log("currentDate :", currentDate);

export const getPreviousWeekDates = currentDate => {
	const startOfWeekDate = add(startOfWeek(new Date(currentDate)), { days: 1 });
	const endOfWeekDate = add(endOfWeek(new Date(currentDate)), { days: 1 });

	const previousWeekStart = subDays(startOfWeekDate, 7);
	const previousWeekEnd = subDays(endOfWeekDate, 7);
	return [previousWeekStart, previousWeekEnd];
};

export const getPreviousMonthDates = currentDate => {
	const startOfMonthDate = startOfMonth(new Date(currentDate));
	const endOfMonthDate = endOfMonth(new Date(currentDate));

	const previousMonthStart = subMonths(startOfMonthDate, 1);
	const previousMonthEnd = subDays(endOfMonthDate, endOfMonthDate.getDate());

	return [previousMonthStart, previousMonthEnd];
};

export const extractDateInfo = inputDate => {
	const date = new Date(inputDate);
	const previousDate = formatDate(subDays(date, 1));
	const [previousWeekStartDate, previousWeekEndDate] = getPreviousWeekDates(date);
	const [previousMonthStartDate, previousMonthEndDate] = getPreviousMonthDates(date);
	const weekNumber = getWeek(date);

	// console.log("previousDate :", previousDate);
	// console.log("weekStarting :", weekStarting, "weekEnding :", weekEnding);
	// console.log("monthStarting :", monthStarting, "monthEnding :", monthEnding);
	// console.log("weekNumber :", weekNumber);
	return {
		previousDate,
		previousWeekStartDate,
		previousWeekEndDate,
		previousMonthStartDate,
		previousMonthEndDate,
		weekNumber,
	};
};

extractDateInfo("2024-04-02");

export function getNavLink(placeholder) {
	const { weekNumber } = extractDateInfo(formatDate(currentDate));

	const [year, month, day] = formatDate(currentDate).split("-");

	if (placeholder === "daily") {
		return `/leaderboard/daily/${year}/${month}/${day}`;
	} else if (placeholder === "weekly") {
		return `/leaderboard/weekly/${year}/${weekNumber}`;
	} else if (placeholder === "monthly") {
		return `/leaderboard/monthly/${year}/${month}`;
	}
}

// export const getPreviousDate = inputDate => {
// 	const previousDate = subDays(new Date(inputDate), 1);
// 	return formatDate(previousDate);
// };

// export const getTodaysDate = () => {
// 	let today = new Date();
// 	let todaysDate = today.toISOString().split("T")[0];
// 	return todaysDate;
// };

// export function getWeeksOfYear(year) {
// 	const startOfGivenYear = startOfYear(new Date(year, 0, 1));
// 	const endOfGivenYear = endOfYear(new Date(year, 11, 31));

// 	const weeks = [];
// 	let currentWeekStart = startOfWeek(startOfGivenYear);

// 	while (
// 		isBefore(currentWeekStart, endOfGivenYear) ||
// 		isSameWeek(currentWeekStart, endOfGivenYear)
// 	) {
// 		const currentWeekEnd = endOfWeek(currentWeekStart);

// 		const weekObject = {
// 			startDate: format(currentWeekStart, "yyyy-MM-dd"),
// 			endDate: format(
// 				isAfter(currentWeekEnd, endOfGivenYear) ? endOfGivenYear : currentWeekEnd,
// 				"yyyy-MM-dd",
// 			),
// 		};

// 		weeks.push(weekObject);

// 		currentWeekStart = addWeeks(currentWeekStart, 1);
// 	}
// 	console.log("weeks :", weeks);
// 	return weeks;
// }

export const getWeekDatesFromNumber = (year, weekNumber) => {
	const date = new Date(year, 0, 1 + (weekNumber - 1) * 7);
	const startDate = add(startOfWeek(date), { days: 1 });
	const endDate = add(endOfWeek(date), { days: 1 });
	// console.log("startDate :", startDate, "endDate :", endDate);
	return [formatDate(startDate), formatDate(endDate)];
};

// getWeekDatesFromNumber(2024, 11);

/***********************************************************************************************/

export const getWeekNumberByDate = date => {
	const weekNumber = getWeek(new Date(date));
	// console.log("Week number:", weekNumber);
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
