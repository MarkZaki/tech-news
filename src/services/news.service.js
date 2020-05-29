import axios from "axios";
import { selectFields } from "../selectors/fields.selector";

export const baseURL = "https://hacker-news.firebaseio.com/v0/";

export const getStory = async storyId => {
	const data = await axios
		.get(`${baseURL}item/${storyId}.json`)
		.then(res => res.data && selectFields(res.data));
	return data;
};

export const getStoryIds = async () => {
	const data = await axios
		.get(`${baseURL}newstories.json`)
		.then(res => res.data);
	return data;
};
