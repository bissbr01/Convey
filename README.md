# Convey
Discover compelling human interest stories to enhance your speaking or writing.

See it live at: https://illustration-finder-hony.vercel.app/

## The Problem
If you've ever sought to publically communicate an idea, whether spoken or written, you've likely wrestled with the challenge of finding powerful stories to help you communicate your message.  Some of the most effective stories for communication are human interest stories. They sharpen and clarify your argument while at the same time engaging your audience and drawing in their attention.

As a communicator, I've scoured the internet for compelling human interest stories and have found that this research process takes way more time than it should.  Sites like [People]([url](https://people.com/human-interest/)) and [Humans of New York]([url](https://www.humansofnewyork.com/)) have some great stories, but they are difficult to discover since neither site has any search functionality so you are reduced to manually scrolling and hoping the title connects with the principle you want to illustrate.  We can do better!

Convey seeks to solve this problem.  Using Python scraping and natural language processing tools, Convey has indexed and categorized the +7,000 human interest stories from [Humans of New York]([url](https://www.humansofnewyork.com/)).  With Convey, you enter a keyword you want to illustrate and it provides relevant stories ranked by % match.  [Give it a try!]([url](https://illustration-finder-hony.vercel.app/))

## Architecture
Convey is a Next.js responsive web application with the frontend and backend api hosted together on [Vercel]([url](https://vercel.com/)).  The backend api uses the AWS DyanmoDB SDK to query a single DynamoDB table with an inverted index allowing millisecond queries by keyword or illustration. 

![image](https://user-images.githubusercontent.com/13155120/210637141-021f7c3b-89fc-49d7-8cbb-d47ce817c6b1.png)


