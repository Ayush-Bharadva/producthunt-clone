import {
	format,
	startOfWeek,
	endOfWeek,
	subDays,
	getWeek,
	add,
	subMonths,
	startOfMonth,
	endOfMonth,
	eachDayOfInterval,
	isBefore,
	addDays,
	isEqual,
} from "date-fns";
import toast from "react-hot-toast";
import { Months } from "./constants";

export const showToast = (type = "success", message) => {
	toast[type](message);
};

export const formatDate = date => {
	return format(new Date(date), "yyyy-M-d");
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

export const getPreviousWeekDates = inputDate => {
	const startOfWeekDate = add(startOfWeek(new Date(inputDate)), { days: 1 });
	const endOfWeekDate = add(endOfWeek(new Date(inputDate)), { days: 1 });

	const previousWeekStart = formatDate(subDays(startOfWeekDate, 7));
	const previousWeekEnd = formatDate(subDays(endOfWeekDate, 7));

	return [previousWeekStart, previousWeekEnd];
};

export const getPreviousMonthDates = inputDate => {
	const startOfMonthDate = startOfMonth(new Date(inputDate));
	const endOfMonthDate = endOfMonth(new Date(inputDate));

	const previousMonthStart = formatDate(subMonths(startOfMonthDate, 1));
	const previousMonthEnd = formatDate(subDays(endOfMonthDate, endOfMonthDate.getDate()));

	return [previousMonthStart, previousMonthEnd];
};

export const getWeekDatesFromNumber = (year, weekNumber) => {
	const date = new Date(year, 0, 1 + (weekNumber - 1) * 7);
	const startDate = add(startOfWeek(date), { days: 1 });
	const endDate = add(endOfWeek(date), { days: 1 });

	return [formatDate(startDate), formatDate(endDate)];
};

export const getWeekNumberByDate = date => {
	const weekNumber = getWeek(new Date(date));
	return weekNumber;
};

export const extractDateInfo = inputDate => {
	const date = new Date(inputDate);
	const previousDate = formatDate(subDays(date, 1));
	const [previousWeekStartDate, previousWeekEndDate] = getPreviousWeekDates(date);
	const [previousMonthStartDate, previousMonthEndDate] = getPreviousMonthDates(date);
	const weekNumber = getWeek(date);

	return {
		previousDate,
		previousWeekStartDate,
		previousWeekEndDate,
		previousMonthStartDate,
		previousMonthEndDate,
		weekNumber,
	};
};

export const getWeekGroupsFromDate = inputDate => {
	const date = new Date(inputDate);
	const weekNumber = getWeek(date);

	const weekGroups = [];
	for (let i = 1; i <= weekNumber; i++) {
		const [startDate, endDate] = getWeekDatesFromNumber(date.getFullYear(), i);

		weekGroups.push({
			startDate: format(startDate, "MMM-d"),
			endDate: format(endDate, "MMM-d"),
		});
	}
	return weekGroups;
};

export const extractDaysInfo = (year, month) => {
	const totalDays = new Date(year, month, 0).getDate();

	const allDaysOfMonth = eachDayOfInterval({
		start: new Date(year, month - 1, 1),
		end: new Date(year, month - 1, totalDays),
	});

	const dayObjects = allDaysOfMonth.map(date => ({
		label: date.getDate(),
		isValid: isBefore(date, pstCurrentDate) || isEqual(date, pstCurrentDate),
	}));

	return dayObjects;
};

export const getPreviousDateInfo = inputDate => {
	const previousDate = formatDate(subDays(new Date(inputDate), 1));
	const previousWeekNumber = getWeekNumberByDate(previousDate);
	console.log("previousDate", previousDate);
	console.log("getWeekNumberByDate", previousWeekNumber);
	return { previousDate, previousWeekNumber };
};

export const getNextDateInfo = inputDate => {
	const nextDate = formatDate(addDays(new Date(inputDate), 1));
	const nextWeekNumber = getWeekNumberByDate(nextDate);
	console.log("nextDate", nextDate);
	console.log("getWeekNumberByDate", nextWeekNumber);
	return { nextDate, nextWeekNumber };
};

export const getPreviousDate = inputDate => {
	return formatDate(subDays(new Date(inputDate), 1));
};

export const getNextDate = inputDate => {
	return formatDate(addDays(new Date(inputDate), 1));
};

export const checkIsDateValid = inputDate => {
	const date = new Date(inputDate);
	return isBefore(date, pstCurrentDate);
};

/*****Date Helpers End*****/

export const groupItemsByDate = items => {
	return items.reduce((acc, item) => {
		const date = item.createdAt.split("T")[0];
		acc[date] = acc[date] ?? [];
		acc[date].push(item);
		return acc;
	}, {});
};

export const getPostedDates = ({ year, month, week, day }) => {
	let startDate, endDate;

	if (!month && !week && !day) {
		startDate = `${year}-1-1`;
		endDate = `${year}-12-31`;
	} else if (month && !week && !day) {
		startDate = `${year}-${month}-1`;
		endDate = `${year}-${month}-31`;
	} else if (week && !month && !day) {
		const [start, end] = getWeekDatesFromNumber(year, week);
		startDate = start;
		endDate = end;
	} else if (day) {
		startDate = `${year}-${month}-${day}`;
		endDate = getNextDate(`${year}-${month}-${day}`);
	}

	return { startDate, endDate };
};

export const getLink = ({ type, year, month, day, weekNumber }) => {
	let active, featured, all;

	switch (type) {
		case "daily":
			active = `/leaderboard/daily/${year}/${month}/${day}`;
			break;
		case "weekly":
			active = `/leaderboard/weekly/${year}/${weekNumber}`;
			break;
		case "monthly":
			active = `/leaderboard/monthly/${year}/${month}`;
			break;
		case "yearly":
			active = `/leaderboard/yearly/${year}`;
			break;
		default:
			break;
	}

	featured = `${active}/featured`;
	all = `${active}/all`;

	return { active, featured, all };
};

export const getHeading = ({ type, year, month, day, weekNumber }) => {
	switch (type) {
		case "daily":
			return `${day}-${month}-${year}`;
		case "weekly":
			return `week ${weekNumber}-${year}`;
		case "monthly":
			return `Best of ${Months[month - 1]} ${year}`;
		case "yearly":
			return `Best of ${year}`;
		default:
			break;
	}
};
