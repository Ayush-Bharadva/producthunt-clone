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
} from "date-fns";
import toast from "react-hot-toast";

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

	const previousWeekStart = subDays(startOfWeekDate, 7);
	const previousWeekEnd = subDays(endOfWeekDate, 7);

	return [previousWeekStart, previousWeekEnd];
};

export const getPreviousMonthDates = inputDate => {
	const startOfMonthDate = startOfMonth(new Date(inputDate));
	const endOfMonthDate = endOfMonth(new Date(inputDate));

	const previousMonthStart = subMonths(startOfMonthDate, 1);
	const previousMonthEnd = subDays(endOfMonthDate, endOfMonthDate.getDate());

	return [previousMonthStart, previousMonthEnd];
};

export const getPreviousDate = inputDate => {
	const previousDate = subDays(new Date(inputDate), 1);
	console.log("previousDate", previousDate);
	return formatDate(previousDate);
};

export const getNextDate = inputDate => {
	const nextDate = addDays(new Date(inputDate), 1);
	console.log("nextDate", nextDate);
	return formatDate(nextDate);
};

export const getPreviousWeekNumber = inputDate => {
	const previousWeekNumber = getWeek(subDays(new Date(inputDate), 7));
	return previousWeekNumber;
};

export const getNextWeekNumber = inputDate => {
	const nextWeekNumber = getWeek(addDays(new Date(inputDate), 7));
	return nextWeekNumber;
};

console.log("prevDate :", getPreviousDate("2024-03-03"));
console.log("nextDate :", getNextDate("2024-03-03"));

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
		isValid: isBefore(date, pstCurrentDate),
	}));

	return dayObjects;
};

/*Date Helpers End*/

export const groupItemsByDate = items => {
	return items.reduce((acc, item) => {
		const date = item.createdAt.split("T")[0];
		acc[date] = acc[date] ?? [];
		acc[date].push(item);
		return acc;
	}, {});
};
