import React, { useState, useEffect, Fragment, Suspense } from "react";
import { getStoryIds } from "../services/news.service";
import { StoryComponent } from "../components/story.component";
import { GlobalStyle, StoriesContainerWrapper } from "../styles/stories.styles";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

export const StoriesContainer = () => {
	const { count } = useInfiniteScroll();
	const [storyIds, setStoryIds] = useState([]);

	useEffect(() => {
		getStoryIds().then(data => setStoryIds(data));
	}, [count]);

	return (
		<Fragment>
			<Suspense fallback={<h3>Loading...</h3>}>
				<GlobalStyle />
				<StoriesContainerWrapper data-test-id="stories-container">
					<h1>New Tech News!</h1>
					{storyIds.slice(0, count).map(storyId => (
						<StoryComponent key={storyId} storyId={storyId} />
					))}
				</StoriesContainerWrapper>
			</Suspense>
		</Fragment>
	);
};
