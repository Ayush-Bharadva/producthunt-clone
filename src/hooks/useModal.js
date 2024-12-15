import { useCallback, useState } from "react";

export const useModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleModal = useCallback(() => {
		setIsModalOpen(!isModalOpen);
	}, [isModalOpen]);

	return { isModalOpen, toggleModal };
};
