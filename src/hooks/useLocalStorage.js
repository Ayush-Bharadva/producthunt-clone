import { useEffect, useState } from "react";

export const useLocalStorage = (key, initialValue) => {
	const [localValue, setLocalValue] = useState(() => {
		const storedValue = localStorage.getItem(key);
		return storedValue ? JSON.parse(storedValue) : initialValue;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(localValue));
	}, [localValue, key]);

	return [localValue, setLocalValue];
};
