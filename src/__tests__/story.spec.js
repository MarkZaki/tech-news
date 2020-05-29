import React from "react";
import { render, cleanup, waitForElement } from "@testing-library/react";
import { StoryComponent } from "../components/story.component";
import { singleStory } from "../fixtures";
import { getStory } from "../services/news.service";

beforeEach(() => {
	cleanup();
	jest.resetAllMocks();
});

jest.mock("../services/news.service", () => ({
	getStory: jest.fn()
}));

test("renders the story component", async () => {
	getStory.mockImplementation(() => Promise.resolve(singleStory));

	const { getByText, getByTestId } = render(<StoryComponent storyId="1" />);
	await waitForElement(() => [
		expect(getByTestId("story")).toBeTruthy(),
		expect(getByText("Create Nice Apps!")).toBeTruthy(),
		expect(getByTestId("story-by").textContent).toEqual("By: Mark Zaky")
	]);
});
