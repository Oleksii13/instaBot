const puppeteer = require('puppeteer');

const BASE_URL = 'https://www.instagram.com/';

const TAG_URL = (tag) => `https://www.instagram.com/explore/tags/${tag}/`;

const PEOPLE_URL = 'https://www.instagram.com/explore/people/suggested/';

const UNFOLLOW_PEOPLE = 'https://www.instagram.com/ivan.molotov.13/';

const instagram = {
	browser: null,
	page: null,

	initialize: async (req, res) => {
		instagram.browser = await puppeteer.launch({
			headless: false,
			args: ['--no-sandbox', '--disable-setuid-sandbox'],
		});
		instagram.page = await instagram.browser.newPage();
		const some = await instagram.page.goto(BASE_URL);

		// console.log(some._status);
		return some._status



	},

	login: async (req, res) => {


		await instagram.page.goto(BASE_URL, { waitUntil: 'networkidle2' });

		let loginButton = await instagram.page.$x('//a[contains(text(), "Log in")]');


		await loginButton[0].click();

		// await instagram.page.waitForNavigation({ waitUntil: 'networkidle2' });

		await instagram.page.waitFor(1000);

		await instagram.page.type('input[name = "username"]', req.body.username, { delay: 50 });
		await instagram.page.type('input[name = "password"]', req.body.password, { delay: 50 });

		await instagram.page.waitFor(1000);


		loginButton = await instagram.page.$x('//button//div[contains(text(), "Log in")]');
		await loginButton[0].click();

		await instagram.page.waitFor(2000);

		loginButton = await instagram.page.$x('//div//div//button[contains(text(), "Not Now")]');
		let dbModel = await loginButton[0].click()
		res.json(dbModel)
		await instagram.page.waitFor(1000);


		// loginButton = await instagram.page.$x('//button//div[contains(text(), "New Posts")]');
		// await loginButton[0].click();


	},

	likeTagsProcesses: async (tag, quant) => {
		;
		tag = tag.replace(/\s/g, '');
		// for (let tag of tags) {
		await instagram.page.goto(TAG_URL(tag), { waitUntil: 'networkidle2' });
		await instagram.page.waitFor(1000);

		let posts = await instagram.page.$$('article > div:nth-child(3) img[decoding="auto"]');


		for (let i = 0; i < quant; i++) {

			let post = posts[i];

			await post.click();

			await instagram.page.waitFor('span[id="react-root"][aria-hidden="true"]')
			await instagram.page.waitFor(1000);

			let isLikable = await instagram.page.$('span[aria-label="Like"]');

			if (isLikable) {

				await instagram.page.click('span[aria-label="Like"]')
			}

			await instagram.page.waitFor(3000);

			let closeModelButton = await instagram.page.$x('//button[contains (text(), "Close")]')
			await closeModelButton[0].click();

			await instagram.page.waitFor(1000);
		}

		await instagram.page.waitFor(1000);


		// }

	},

	followPeople: async (quant) => {

		await instagram.page.goto(PEOPLE_URL, { waitUntil: 'networkidle2' });
		await instagram.page.waitFor(1000);

		let people = await instagram.page.$x('//button[contains (text(), "Follow")]');

		// chaneg the amount of people

		for (let i = 0; i < quant; i++) {
			await people[i].click();
			await instagram.page.waitFor(5000);
		}



	},

	unfollowPeople: async (quant) => {

		await instagram.page.goto(UNFOLLOW_PEOPLE, { waitUntil: 'networkidle2' });
		await instagram.page.waitFor(1000);

		let following = await instagram.page.$('ul:nth-child(2) > li:nth-child(3) > a');

		await following.click();
		await instagram.page.waitFor(1000);

		let unfollow = await instagram.page.$x('//button[contains (text(), "Following")]');

		// chaneg the amount of people

		for (let i = 0; i < quant; i++) {
			await unfollow[i].click();
			await instagram.page.waitFor(5000);
			let unfollowLast = await instagram.page.$x('//button[contains (text(), "Unfollow")]');
			await unfollowLast[0].click();
		}


	}



}

module.exports = instagram;