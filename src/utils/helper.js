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

const formatToPST = date => {
	const pstDate = date.toLocaleString("en-US", {
		timeZone: "America/Los_Angeles",
	});
	return format(new Date(pstDate), "yyyy-MM-dd");
};

const currentDate = new Date();
const pstDate = formatToPST(currentDate);
console.log("current date in PST : ", pstDate);

// const formatToPST2 = date => {
// 	const date = new Date(Date.UTC(d));
// };

export const getTodaysDate = () => {
	let today = new Date();
	// convert date to ISO string
	let todaysDate = today.toISOString().split("T")[0];
	return todaysDate;
};

export const getYesterdaysDate = () => {
	const myDate = new Date();
	myDate.setDate(myDate.getDate() - 1);
	return myDate.toISOString().split("T")[0];
};

export const getPreviousDate = inputDate => {
	const date = new Date(inputDate);
	date.setDate(date.getDate() - 1);
	return format(date, "yyyy-MM-dd");
};

export const getWeekNumberFromDate = date => {
	let givenDate = new Date(date);
	let startOfYear = new Date(givenDate.getFullYear(), 0, 0);
	let diff = givenDate - startOfYear;
	let oneWeek = 1000 * 60 * 60 * 24 * 7;
	let weekNumber = Math.floor(diff / oneWeek);
	return weekNumber;
};

export const splitDate = date => {
	const [year, month, day] = date.split("-");
	return [year, month, day];
};

export const getAllDaysInMonth = (year, month) => {
	const startDate = startOfMonth(new Date(year, month - 1));
	const endDate = endOfMonth(new Date(year, month - 1));

	const allDays = eachDayOfInterval({ start: startDate, end: endDate });
	return allDays.map(day => getDate(day));
};

export const getDaysOfMonth = dateString => {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = date.getMonth();

	// Get the number of days in the month
	const daysInMonth = new Date(year, month + 1, 0).getDate();

	// Generate an array containing all the days of the month
	const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);
	return daysArray;
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

export const getWeeksSinceYear = year => {
	const weeks = [];
	const currentDate = new Date();

	// Create a date object for January 1st of the given year
	const startDate = new Date(year, 0, 1);

	// Get the first day of the week (0: Sunday, 1: Monday, ..., 6: Saturday)
	const startDayOfWeek = startDate.getDay();

	// Adjust startDate to the beginning of the week
	startDate.setDate(startDate.getDate() - startDayOfWeek);

	// Loop through each week until the current week
	while (startDate <= currentDate) {
		weeks.push({
			start: format(new Date(startDate), "yyyy-mm-dd"), // Start of the week
			end: format(new Date(startDate.setDate(startDate.getDate() + 6)), "yyyy-mm-dd"), // End of the week
		});

		// Move to the next week
		startDate.setDate(startDate.getDate() + 1);
	}

	return weeks;
};

export const getUserAccessToken = async code => {
	const response = await fetch(`https://api.producthunt.com/v2/oauth/token`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			client_id: "39zsVF6R_8mbajaavFpoNkEHlqNTfw6IFgM5d2OpvhU",
			client_secret: "v0XAT9pnOb0MIxj1s2d79J85kY3SF2ae4ZPUcJ_3o5c",
			redirect_uri: "https://producthunt-clone-5173.netlify.app:3000",
			code: code,
			grant_type: "authorization_code",
		}),
	});
	return response.json();
};

// Example usage:
// const currentYear = new Date().getFullYear();
// const weeksSinceCurrentYear = getWeeksSinceYear(currentYear);
// console.log(weeksSinceCurrentYear);
