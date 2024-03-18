export const getTodayISODate = () => {
	const today = new Date();
	return today.toISOString().split("T")[0];
};

export const getTodaysDate = () => {
	const today = new Date();
	return today.toDateString().split(" ").slice(1, 3).join(" ");
};
