import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import clientPromise from 'lib/mongodb';

let users: { userid: string; url: string }[] = [];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const client = await clientPromise;
	const collection = client.db('rng').collection('images');

	const config = new Configuration({
		apiKey: process.env.AI_API_KEY,
	});

	const openai = new OpenAIApi(config);

	const body = JSON.parse(req.body);
	let input = body.input;

	const result = await openai.createImage({
		prompt: input,
		n: 1,
		size: '512x512',
	});

	const url = result.data.data[0].url;

	if (typeof url == 'string') {
		let newArt = await collection.insertOne({
			artUrl: url,
			createdAt: Date.now(),
		});
		res.status(200).json({ artId: newArt.insertedId });
	} else {
		res.status(503);
	}
}
