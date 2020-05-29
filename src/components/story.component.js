/*eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, memo } from "react";
import { getStory } from "../services/news.service";
import {
	StoryWrapper,
	StoryTitle,
	StoryMeta,
	StoryMetaElement
} from "../styles/story.styles";
import { mapTime } from "../mappers/time.mapper";

export const StoryComponent = memo(function Story({ storyId }) {
	const [story, setStory] = useState({});

	useEffect(() => {
		getStory(storyId).then(data => data && data.url && setStory(data));
	}, []);

	return story && story.url ? (
		<StoryWrapper data-testid="story">
			<StoryTitle>
				<a href={story.url}>{story.title}</a>
			</StoryTitle>
			<StoryMeta>
				<span className="story__by" data-testid="story-by">
					<StoryMetaElement color="#000000">By:</StoryMetaElement> {story.by}
				</span>
				<span className="story__time" data-testid="story_time">
					<StoryMetaElement color="#000000">Posted:</StoryMetaElement>{" "}
					{story.time && mapTime(story.time)} ago
				</span>
			</StoryMeta>
		</StoryWrapper>
	) : null;
});
