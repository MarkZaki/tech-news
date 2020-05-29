import React from "react";
import { render, cleanup, waitForElement } from "@testing-library/react";
import { StoriesContainer } from "../containers/stories.container";
import { storyIds, singleStory } from "../fixtures";
import { getStory, getStoryIds } from "../services/news.service";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { STORY_INCREMENT } from "../constants";

beforeEach(cleanup);

jest.mock("../hooks/useInfiniteScroll.js");

jest.mock("../services/news.service", () => ({
	getStory: jest.fn(),
	getStoryIds: jest.fn()
}));

test("renders the story container with a story", async () => {
	useInfiniteScroll.mockImplementation(() => ({
		count: STORY_INCREMENT
	}));
	getStory.mockImplementation(() => Promise.resolve(singleStory));
	getStoryIds.mockImplementation(() => Promise.resolve(storyIds));

	const { getByText, queryByTestId } = render(<StoriesContainer />);
	await waitForElement(() => [
		expect(getByText("New Tech News!")).toBeTruthy(),
		expect(getByText("Create Nice Apps!")).toBeTruthy(),
		expect(queryByTestId("story-by").textContent).toEqual("By: Mark Zaky")
	]);
});
