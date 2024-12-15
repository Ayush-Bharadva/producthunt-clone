import { useQuery } from "@apollo/client";
import { useCallback, useState } from "react";
import { GET_POSTS } from "../graphql/queries";
import { showToast } from "../utils/helper";

const defaultOrder = "RANKING";

export const useFetchProducts = ({
	order = defaultOrder,
	postedAfter,
	postedBefore,
	featured,
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
		},
		onCompleted: data => {
			const { posts } = data ?? {};
			setProductsInfo({
				productsList: posts.nodes ?? [],
				hasMore: posts.pageInfo.hasNextPage ?? false,
				endCursor: posts.pageInfo.endCursor ?? null,
			});
		},
		onError: error => {
			showToast("error", error.message);
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
				onError: error => {
					showToast("error", error.message);
				},
			});
		}
	}, [endCursor, fetchMore, hasMore, loading]);

	return { productsList, endCursor, hasMore, loading, error, handleLoadMore };
};
