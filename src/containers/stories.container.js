import React, { useState, useEffect, Fragment } from "react";
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
			<GlobalStyle />
			<StoriesContainerWrapper data-test-id="stories-container">
				<h1>New Tech News!</h1>
				{storyIds.slice(0, count).map(storyId => (
					<StoryComponent key={storyId} storyId={storyId} />
				))}
			</StoriesContainerWrapper>
		</Fragment>
	);
};
