import * as Factory from 'factory.ts'
import * as Faker from 'faker'
import * as core from 'club-hub-core'
import { Types } from 'mongoose'

import { NewLocationObj } from './submodels/location'

const testPostContent = `<p style=\"margin: 0;\"><img
src=\"https://clubhubs3.s3.us-west-2.amazonaws.com/club/5d04014425dbcb49607676a1/1fbc7bb0-94fe-4d7d-9d90-78bd962b53cb/lg.jpeg\"
style=\"max-width: 100%; height: auto;\"></p>\n<p style=\"margin: 0;\">&nbsp;</p>\n<p style=\"margin: 0;\">Dear
OTTO Members,</p>\n<p style=\"margin: 0;\">&nbsp;</p>\n<p style=\"margin: 0;\">As we bear through the heat in
Scottsdale, we trust that you all are making the most of the summer! For those of you who are out of town for the
summer, please reach out to a member of our team if you require any assistance in transporting, servicing or
preparing your vehicles in anticipation of your return to the valley.</p>\n<p style=\"margin: 0;\">&nbsp;</p>\n<p
style=\"margin: 0;\">It was a pleasure to host those of you who attended our July Breakfast Club and Happy Hour
events. If you haven&rsquo;t had a chance to come to either of these recurring events yet, we urge you to mark them
on your calendar so that you don&rsquo;t miss out on them in the coming months. The Breakfast Club (every second
Saturday) and Happy Hour (every third Thursday), will continue to serve as opportunities to further embed yourself
within the OTTO community, welcome our newest members and take a peek at the newest cars to arrive in the main
Collection Room.</p>\n<p style=\"margin: 0;\">&nbsp;</p>\n<p style=\"margin: 0;\"><a
href=\"https://clubhubs3.s3.us-west-2.amazonaws.com/club/5d04014425dbcb49607676a1/22e3dff6-d9a8-4669-976c-0e4b1c11b078/lg.jpeg\">
<img
src=\"https://clubhubs3.s3.us-west-2.amazonaws.com/club/5d04014425dbcb49607676a1/22e3dff6-d9a8-4669-976c-0e4b1c11b078/lg.jpeg\"
style=\"max-width: 100%; height: auto;\"></a></p>\n<p style=\"margin: 0;\">&nbsp;</p>\n<p style=\"margin: 0;\">
There are a few important dates for the month of August that we would like to make you aware of:</p>\n<p
style=\"margin: 0;\">&nbsp;</p>\n<p style=\"margin: 0;\"><strong>OTTO will be closed on Thursday, August
15th</strong> for a private event. We will be moving some vehicles in the warehouse for privacy and security. If
you have any questions or concerns about your vehicle being relocated within the warehouse, please contact a member
of the OTTO Staff. Please note &ndash; the cars will not leave the collection room at any time, they will simply be
reorganized for the event.</p>\n<p style=\"margin: 0;\">&nbsp;</p>\n<p style=\"margin: 0;\">For those Members with a
vehicle(s) in the Main Collection Room needing access to their vehicle on August 15th, we request that vehicle
pickup is made prior to close on Wednesday, August 14th. If this creates any conflict, please contact OTTO Staff for
special arrangements.</p>\n<p style=\"margin: 0;\">&nbsp;</p>\n<p style=\"margin: 0;\">Due to the closure on August
15th, our monthly <strong>Happy Hour event will be delayed one week and will take place on Thursday, August
22nd</strong>. Please continue to check the app for the latest event information.</p>\n<p style=\"margin: 0;\">
&nbsp;</p>\n<p style=\"margin: 0;\"><a
href=\"https://clubhubs3.s3.us-west-2.amazonaws.com/club/5d04014425dbcb49607676a1/3b1d899f-cfd5-4167-b382-992b89c38c56/lg.jpeg\">
<img
src=\"https://clubhubs3.s3.us-west-2.amazonaws.com/club/5d04014425dbcb49607676a1/3b1d899f-cfd5-4167-b382-992b89c38c56/lg.jpeg\"
style=\"max-width: 100%; height: auto;\"></a></p>\n<p style=\"margin: 0;\">&nbsp;</p>\n<p style=\"margin: 0;\">
As the weather cools down, the schedule at OTTO will heat up. We are in the process of scheduling multiple landmark
events in the fall such as the joint return of Discommon and Analog Shift, a Fireside Chat with the Jacksons,
Speaker event with Magnus Walker and more.</p>\n<p style=\"margin: 0;\">&nbsp;</p>\n<p style=\"margin: 0;\">Also,
we&rsquo;d like to remind you and your guests that neither OTTO employees nor any catering staff are allowed to
accept tips at any time. While we appreciate the gesture, OTTO membership is all-inclusive and any attempts to tip
will be respectfully declined.</p>\n<p style=\"margin: 0;\">&nbsp;</p>\n<p style=\"margin: 0;\">As always, please do
not hesitate to reach out if there is anything that we can do for you.</p>\n<p style=\"margin: 0;\">&nbsp;</p>\n<p
style=\"margin: 0;\">&nbsp;</p>\n<p style=\"margin: 0;\">Thank you,</p>\n<p style=\"margin: 0;\">&nbsp;</p>\n<p
style=\"margin: 0;\">The OTTO Team</p>`

const PostFactory = Factory.makeFactory<core.Post.Model>({
	clubID: "" as unknown as Types.ObjectId,
	title: Factory.each((i) => Faker.name.title()),
	author: "" as unknown as Types.ObjectId,
	image: {
		lg: Faker.internet.url(),
		md: Faker.internet.url(),
		sm: Faker.internet.url(),
		xs: Faker.internet.url(),
		micro: Faker.internet.url(),
	},
	attachments: Factory.each((i) => buildAttachments()),
	subtitle: Factory.each((i) => Faker.lorem.words(3)),
	publicationDate: new Date(),
	richContent: {
		text: Factory.each((i) => Faker.lorem.words(10)).toString(),
		html: testPostContent,
		status: core.IShared.PublicationStatus.Published,
	}
})

const buildAttachments = (): core.Post.Attachment[] => {
	return [
		{
			remoteUrl: Faker.internet.url(),
			attachmentType: core.Post.AttachmentType.PNG
		}
	]
}

const newPostObj = (): core.Post.Model => {
	return PostFactory.build({})
}


export { newPostObj as NewPostObj }
