import { useQuery } from "@apollo/client";
import { useRef, useState } from "react";
import { GET_POSTS } from "../graphql/queries";

export const usePosts = (featured, first, order, after) => {
	const [postsList, setPostsList] = useState([]);
	const cursorRef = useRef(null);

	const { data, error, loading, fetchMore } = useQuery(GET_POSTS, {
		variables: {
			first,
			featured,
			order,
			after,
		},
		keepPreviousData: true,
	});
};
