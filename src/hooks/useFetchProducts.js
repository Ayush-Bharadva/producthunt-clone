import { useQuery } from "@apollo/client";
import { useCallback, useState } from "react";
import { GET_POSTS } from "../graphql/queries";

export const useFetchProducts = ({
	order,
	postedAfter,
	postedBefore,
	featured,
	username,
}) => {
	const [productsInfo, setProductsInfo] = useState({
		productsList: [],
		endCursor: null,
		hasMore: true,
	});

	const { productsList, endCursor, hasMore } = productsInfo;

	const { error, loading, fetchMore } = useQuery(GET_POSTS, {
		variables: {
			first: 10,
			featured: featured ?? false,
			order: order ?? "RANKING",
			postedAfter: postedAfter ?? null,
			postedBefore: postedBefore ?? null,
			after: null,
			username: username ?? null,
		},
		onCompleted: data => {
			const { posts } = data ?? {};
			setProductsInfo({
				productsList: posts.nodes ?? [],
				hasMore: posts.pageInfo.hasNextPage ?? false,
				endCursor: posts.pageInfo.endCursor ?? null,
			});
		},
	});

	const handleLoadMore = useCallback(() => {
		if (!loading && hasMore) {
			fetchMore({
				variables: {
					after: endCursor,
				},
				updateQuery: (prev, { fetchMoreResult }) => {
					if (!fetchMoreResult) {
						return prev;
					}
					const { posts } = fetchMoreResult;
					setProductsInfo(prevInfo => ({
						...prevInfo,
						productsList: [...prevInfo.productsList, ...posts.nodes],
						hasMore: posts.pageInfo.hasNextPage,
						endCursor: posts.pageInfo.endCursor,
					}));
				},
			});
		}
	}, [endCursor, fetchMore, hasMore, loading]);

	return { productsList, endCursor, hasMore, loading, error, handleLoadMore };
};
