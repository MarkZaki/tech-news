import axios from "axios";
import { selectFields } from "../selectors/fields.selector";

export const HttpRequest = axios.create({
	baseURL: "https://hacker-news.firebaseio.com/v0/"
});

export const getStory = async storyId => {
	const data = await HttpRequest.get(`/item/${storyId}.json`).then(
		res => res.data && selectFields(res.data)
	);
	return data;
};

export const getStoryIds = async () => {
	const data = await HttpRequest.get("/newstories.json").then(res => res.data);
	return data;
};
