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

export const getTodaysPSTDate = () => {
	const myDate = new Date();
	const pstDate = myDate.toLocaleString("en-US", {
		timeZone: "America/Los_Angeles",
	});
	console.log("todays date in PST : ", format(new Date(pstDate), "yyyy-MM-dd"));

	const todaysDate = format(new Date(pstDate), "yyyy-MM-dd");
	const [year, month, day] = todaysDate.split("-");
	return [todaysDate, year, month, day];
};

export const getYesterdaysPSTDate = () => {
	const myDate = new Date();
	myDate.setDate(myDate.getDate() - 1);
	const pstDate = myDate.toLocaleString("en-US", {
		timeZone: "America/Los_Angeles",
	});
	console.log("yesterdays date in PST : ", format(new Date(pstDate), "yyyy-MM-dd"));

	const yesterdaysDate = format(new Date(pstDate), "yyyy-MM-dd");
	const [year, month, day] = yesterdaysDate.split("-");
	return [yesterdaysDate, year, month, day];
};

/***********************************************************************************************/

// export const getTodaysDate = () => {
// 	const currentDate = format(new Date(), "yyyy-MM-dd");
// 	const [year, month, day] = currentDate.split("-");
// 	console.log("currentDate :", currentDate);

// 	return [currentDate, year, month, day];
// };

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

export const getActiveLinkClassName = (isActive, base, active) =>
	isActive ? `${base} ${active}` : `${base}`;
