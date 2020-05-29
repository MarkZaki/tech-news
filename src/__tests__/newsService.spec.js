import axios from "axios";
import {
	baseURL,
	HttpRequest,
	getStory,
	getStoryIds
} from "../services/news.service";
import { emptySingleStory, singleStory, storyIds } from "../fixtures";

jest.mock("axios");

describe("Hackernews Api", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	describe("getStory functionality", () => {
		it("requests and gets a story from a hackernews Api", async () => {
			axios.get.mockImplementation(() =>
				Promise.resolve({ data: singleStory })
			);

			const entity = await getStory(1);
			expect(axios.get).toHaveBeenCalledTimes(1);
			expect(axios.get).toHaveBeenCalledWith(`${baseURL}item/1.json`);
			expect(entity).toEqual(singleStory);
		});

		it("doesn't retrive story from the api but handles gracefully", async () => {
			axios.get.mockImplementation(() =>
				Promise.resolve({ data: emptySingleStory })
			);

			const entity = await getStory(1);
			expect(axios.get).toHaveBeenCalledTimes(1);
			expect(axios.get).toHaveBeenCalledWith(`${baseURL}item/1.json`);
			expect(entity).toEqual(emptySingleStory);
		});
	});
	describe("getStroyIds", () => {
		it("requests and gets stories ids from hackernews Api", async () => {
			axios.get.mockImplementation(() => Promise.resolve({ data: storyIds }));

			const entity = await getStoryIds(1);
			expect(axios.get).toHaveBeenCalledTimes(1);
			expect(axios.get).toHaveBeenCalledWith(`${baseURL}newstories.json`);
			expect(entity).toEqual(storyIds);
		});
	});
});
