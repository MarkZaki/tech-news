import React from "react";
import { act } from "react-dom/test-utils";
import { App } from "../App";
import { render, cleanup, waitForElement } from "@testing-library/react";
import { emptySingleStory, singleStory, storyIds } from "../fixtures";
import { getStory, getStoryIds } from "../services/news.service";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { STORY_INCREMENT } from "../constants";

beforeEach(cleanup);

jest.mock("../hooks/useInfiniteScroll");

jest.mock("../services/news.service", () => {
	return {
		getStory: jest.fn(),
		getStoryIds: jest.fn()
	};
});

test("renders the application", async () => {
	useInfiniteScroll.mockImplementation(() => ({
		count: STORY_INCREMENT
	}));
	getStory.mockImplementation(() => Promise.resolve(singleStory));
	getStoryIds.mockImplementation(() => Promise.resolve(storyIds));

	await act(async () => {
		const { getByText, queryByTestId } = render(<App />);
		await waitForElement(() => [
			expect(getByText("New Tech News!")).toBeTruthy(),
			expect(getByText("Create Nice Apps!")).toBeTruthy(),
			expect(queryByTestId("story-by").textContent).toEqual("By: Mark Zaky")
		]);
	});
});
