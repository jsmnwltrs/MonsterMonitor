--DROP DATABASE [ IF EXISTS ] { database_name | database_snapshot_name } [ ,...n ] [;]
IF EXISTS (
    SELECT [name]
        FROM sys.databases
        WHERE [name] = N'MonsterMonitor'
)
    BEGIN
        -- Delete Database Backup and Restore History from MSDB System Database
        EXEC msdb.dbo.sp_delete_database_backuphistory @database_name = N'MonsterMonitor'
        -- GO

        -- Close Connections
        USE [master]
        -- GO
        ALTER DATABASE [MonsterMonitor] SET SINGLE_USER WITH ROLLBACK IMMEDIATE
        -- GO

        -- Drop Database in SQL Server 
        DROP DATABASE [MonsterMonitor]
        -- GO
    END

-- Create a new database called 'MonsterMonitor'
-- Connect to the 'master' database to run this snippet
USE master
GO
-- Create the new database if it does not exist already
IF NOT EXISTS (
    SELECT [name]
        FROM sys.databases
        WHERE [name] = N'MonsterMonitor'
)

CREATE DATABASE MonsterMonitor
GO

USE [MonsterMonitor]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- Create all the tables --
CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Username] [varchar](50) NOT NULL,
	[Email] [varchar](100) NOT NULL,
	[ImageUrl] [varchar](1000) NOT NULL,
	[Location] [varchar](1000) NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Sightings](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[Title] [varchar](50) NOT NULL,
	[Location] [varchar](50) NOT NULL,
	[Description] [varchar](8000) NOT NULL,
	[ImageUrl] [varchar](2000) NULL,
	[VideoUrl] [varchar](1000) NULL,
	[DateCreated] [datetime] NOT NULL,
	[ThreatLevel] [varchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsAnon] [bit] NOT NULL,
	[Latitude] [float] NULL,
	[Longitude] [float] NULL,
 CONSTRAINT [PK_Sightings] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[UserLikes](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[SightingId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
	[IsLiked] [bit] NOT NULL,
 CONSTRAINT [PK_UserLikes] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Comments](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[SightingId] [int] NOT NULL,
	[DateCreated] [datetime] NOT NULL,
	[Message] [varchar](1000) NOT NULL,
	[IsAnon] [bit] NOT NULL,
 CONSTRAINT [PK_Comments] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

-- Establish Relationships --
ALTER TABLE [dbo].[Sightings]  WITH CHECK ADD  CONSTRAINT [FK_Sightings_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO

ALTER TABLE [dbo].[Sightings] CHECK CONSTRAINT [FK_Sightings_Users]
GO

ALTER TABLE [dbo].[UserLikes]  WITH CHECK ADD  CONSTRAINT [FK_UserLikes_Sightings] FOREIGN KEY([SightingId])
REFERENCES [dbo].[Sightings] ([Id])
GO

ALTER TABLE [dbo].[UserLikes] CHECK CONSTRAINT [FK_UserLikes_Sightings]
GO

ALTER TABLE [dbo].[UserLikes]  WITH CHECK ADD  CONSTRAINT [FK_UserLikes_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO

ALTER TABLE [dbo].[UserLikes] CHECK CONSTRAINT [FK_UserLikes_Users]
GO

ALTER TABLE [dbo].[Comments]  WITH CHECK ADD  CONSTRAINT [FK_Comments_Sightings] FOREIGN KEY([SightingId])
REFERENCES [dbo].[Sightings] ([Id])
GO

ALTER TABLE [dbo].[Comments] CHECK CONSTRAINT [FK_Comments_Sightings]
GO

ALTER TABLE [dbo].[Comments]  WITH CHECK ADD  CONSTRAINT [FK_Comments_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO

ALTER TABLE [dbo].[Comments] CHECK CONSTRAINT [FK_Comments_Users]
GO


-- User Seed Data --
INSERT INTO [dbo].[Users]([Username],[Email],[ImageUrl],[Location])
VALUES ('jsmnwltrs','jsmnwltrs@gmail.com','https://i.pinimg.com/originals/3e/99/7e/3e997ec50fd65428379a0a9c870c8a09.jpg','Nashville, TN')

INSERT INTO [dbo].[Users]([Username],[Email],[ImageUrl],[Location])
VALUES ('swamp_dweller23','dummyUser','https://i.ytimg.com/vi/psVJMjLkO-I/hqdefault.jpg','USA')

INSERT INTO [dbo].[Users]([Username],[Email],[ImageUrl],[Location])
VALUES ('$cheshire$','dummyUser','https://www.avatarys.com/downloadfullsize/send/2313','USA')

INSERT INTO [dbo].[Users]([Username],[Email],[ImageUrl],[Location])
VALUES ('dungeon_lord','dummyUser','https://ksr-ugc.imgix.net/assets/001/661/950/c4021cb9e72fde90ab78e8e0a5096377_original.jpg?ixlib=rb-2.1.0&w=700&fit=max&v=1393007725&auto=format&gif-q=50&q=92&s=a973e74b58b78eda19c694b8c556dfb2','USA')

INSERT INTO [dbo].[Users]([Username],[Email],[ImageUrl],[Location])
VALUES ('dummyUser','dummyUser','myImage','USA')

INSERT INTO [dbo].[Users]([Username],[Email],[ImageUrl],[Location])
VALUES ('dummyUser','dummyUser','myImage','USA')

INSERT INTO [dbo].[Users]([Username],[Email],[ImageUrl],[Location])
VALUES ('dummyUser','dummyUser','myImage','USA')

INSERT INTO [dbo].[Users]([Username],[Email],[ImageUrl],[Location])
VALUES ('dummyUser','dummyUser','myImage','USA')

INSERT INTO [dbo].[Users]([Username],[Email],[ImageUrl],[Location])
VALUES ('dummyUser','dummyUser','myImage','USA')

INSERT INTO [dbo].[Users]([Username],[Email],[ImageUrl],[Location])
VALUES ('dummyUser','dummyUser','myImage','USA')

INSERT INTO [dbo].[Users]([Username],[Email],[ImageUrl],[Location])
VALUES ('dummyUser','dummyUser','myImage','USA')

INSERT INTO [dbo].[Users]([Username],[Email],[ImageUrl],[Location])
VALUES ('dummyUser','dummyUser','myImage','USA')

INSERT INTO [dbo].[Users]([Username],[Email],[ImageUrl],[Location])
VALUES ('dummyUser','dummyUser','myImage','USA')

INSERT INTO [dbo].[Users]([Username],[Email],[ImageUrl],[Location])
VALUES ('dummyUser','dummyUser','myImage','USA')

INSERT INTO [dbo].[Users]([Username],[Email],[ImageUrl],[Location])
VALUES ('dummyUser','dummyUser','myImage','USA')

INSERT INTO [dbo].[Users]([Username],[Email],[ImageUrl],[Location])
VALUES ('dummyUser','dummyUser','myImage','USA')

INSERT INTO [dbo].[Users]([Username],[Email],[ImageUrl],[Location])
VALUES ('dummyUser','dummyUser','myImage','USA')

INSERT INTO [dbo].[Users]([Username],[Email],[ImageUrl],[Location])
VALUES ('dummyUser','dummyUser','myImage','USA')

INSERT INTO [dbo].[Users]([Username],[Email],[ImageUrl],[Location])
VALUES ('dummyUser','dummyUser','myImage','USA')

INSERT INTO [dbo].[Users]([Username],[Email],[ImageUrl],[Location])
VALUES ('dummyUser','dummyUser','myImage','USA')

INSERT INTO [dbo].[Users]([Username],[Email],[ImageUrl],[Location])
VALUES ('dummyUser','dummyUser','myImage','USA')

INSERT INTO [dbo].[Users]([Username],[Email],[ImageUrl],[Location])
VALUES ('dummyUser','dummyUser','myImage','USA')

INSERT INTO [dbo].[Users]([Username],[Email],[ImageUrl],[Location])
VALUES ('dummyUser','dummyUser','myImage','USA')

INSERT INTO [dbo].[Users]([Username],[Email],[ImageUrl],[Location])
VALUES ('dummyUser','dummyUser','myImage','USA')

INSERT INTO [dbo].[Users]([Username],[Email],[ImageUrl],[Location])
VALUES ('dummyUser','dummyUser','myImage','USA')

INSERT INTO [dbo].[Users]([Username],[Email],[ImageUrl],[Location])
VALUES ('dummyUser','dummyUser','myImage','USA')

INSERT INTO [dbo].[Users]([Username],[Email],[ImageUrl],[Location])
VALUES ('dummyUser','dummyUser','myImage','USA')

INSERT INTO [dbo].[Users]([Username],[Email],[ImageUrl],[Location])
VALUES ('dummyUser','dummyUser','myImage','USA')

INSERT INTO [dbo].[Users]([Username],[Email],[ImageUrl],[Location])
VALUES ('dummyUser','dummyUser','myImage','USA')



-- Sighting Seed Data --

INSERT INTO [dbo].[Sightings] ([UserId],[Title],[Location],[Description],[ImageUrl],[VideoUrl],[DateCreated],[ThreatLevel],[IsActive],[IsAnon],[Latitude],[Longitude]) VALUES
(1,'Altamaha-ha','Uvalda, GA, United States','I SAW IT! My wife and I were on our way back from getting groceries and THERE IT WAS! I see driftwood everyday and this was MUCH different. Its head just popped out and looked STRAIGHT AT US before going back down. We barely made it out ALIVE!','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn605ohWlukqvayugpQmgl5EwLF4dilqLDrmRW421ywhmQ7trB',null,'2016-06-12','Risky','true','true',31.98094,-82.54595)

INSERT INTO [dbo].[Sightings] ([UserId],[Title],[Location],[Description],[ImageUrl],[VideoUrl],[DateCreated],[ThreatLevel],[IsActive],[IsAnon],[Latitude],[Longitude]) VALUES
(1,'Bear Lake Monster','Fish Haven, ID, United States','Just Fishing with my buddies when it reared its ugly head. Thought I''d take picture before we high tailed it out of there.','https://bearlakerendezvous.files.wordpress.com/2015/05/muskrat-monster.jpg?w=300&h=186',null,'2014-09-15','Risky','true','false',42.00823,-111.34917)

INSERT INTO [dbo].[Sightings] ([UserId],[Title],[Location],[Description],[ImageUrl],[VideoUrl],[DateCreated],[ThreatLevel],[IsActive],[IsAnon],[Latitude],[Longitude]) VALUES
(1,'Bessie','OH, United States','Found it while on the lake. Spooky.','https://66.media.tumblr.com/55bc277d6e26245f4c40daf2f993b473/tumblr_owoxqalmrb1wayylpo1_1280.jpg',null,'2010-03-23','Risky','true','false',41.52814, -82.43760)

INSERT INTO [dbo].[Sightings] ([UserId],[Title],[Location],[Description],[ImageUrl],[VideoUrl],[DateCreated],[ThreatLevel],[IsActive],[IsAnon],[Latitude],[Longitude]) VALUES
(1,'Bunyip','Bulloo Downs, Australia','Chased down while testing the waters for contaminants. DO NOT RUN! They chase after movement. Just stay still until it leaves.','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc-n-Pyv_WKLtLHIb3SPgPzqGLJFIs-1nwlqAAUcxrH0edMbAk',null,'2015-09-13','Unknown','true','false',-28.88904,142.35944)

INSERT INTO [dbo].[Sightings] ([UserId],[Title],[Location],[Description],[ImageUrl],[VideoUrl],[DateCreated],[ThreatLevel],[IsActive],[IsAnon],[Latitude],[Longitude]) VALUES
(1,'Buru','Arunachal Pradesh, India','This was huge. Couldn''t take a good picture so I had to make a drawing.','https://vignette.wikia.nocookie.net/new-cryptozoology/images/7/71/Buru_2.jpg/revision/latest?cb=20140131012029',null,'2008-01-22','Unknown','true','false',28.11838,95.54919)

INSERT INTO [dbo].[Sightings] ([UserId],[Title],[Location],[Description],[ImageUrl],[VideoUrl],[DateCreated],[ThreatLevel],[IsActive],[IsAnon],[Latitude],[Longitude]) VALUES
(2,'Canvey Island Monster',' Canvey Island, England','Found this on the beach. It looks to big and strange to be an angler. Looking for more information.','https://cdn.newsapi.com.au/image/v1/554aa7ac94bd8d66bd4560f632049e57',null,'2016-04-05','Safe','true','true',51.51880,0.63281)

INSERT INTO [dbo].[Sightings] ([UserId],[Title],[Location],[Description],[ImageUrl],[VideoUrl],[DateCreated],[ThreatLevel],[IsActive],[IsAnon],[Latitude],[Longitude]) VALUES
(2,'Dobhar-chú','Irish Sea','Very dangerous creature. Just look at those teeth!','https://static.independent.co.uk/s3fs-public/thumbnails/image/2014/03/12/15/otterattack.jpg?w968h681',null,'2001-01-20','Dangerous','true','false',53.73597,-6.19542)

INSERT INTO [dbo].[Sightings] ([UserId],[Title],[Location],[Description],[ImageUrl],[VideoUrl],[DateCreated],[ThreatLevel],[IsActive],[IsAnon],[Latitude],[Longitude]) VALUES
(2,'Isshii','Coast of Nikaho, Japan','Found this one swimming just a few meters away from our boat. Had to move a bit farther out to get a good picture.','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGM1mFdRzTtcjFl579WS0Jh-S00FPKxGKhAf7zsFCdRaoBwnzg',null,'2007-03-31','Dangerous','true','false',39.31970,139.90061)

INSERT INTO [dbo].[Sightings] ([UserId],[Title],[Location],[Description],[ImageUrl],[VideoUrl],[DateCreated],[ThreatLevel],[IsActive],[IsAnon],[Latitude],[Longitude]) VALUES
(2,'Kraken','North Pacific Ocean','It ate the barge! It ate the whole damn barge!','https://media.lasvegasweekly.com/img/photos/2010/09/08/scaled.beast_legends_01_t653.jpg?214bc4f9d9bd7c08c7d0f6599bb3328710e01e7b',null,'2012-11-01','Fatal','true','false',35.17301,145.37413)

INSERT INTO [dbo].[Sightings] ([UserId],[Title],[Location],[Description],[ImageUrl],[VideoUrl],[DateCreated],[ThreatLevel],[IsActive],[IsAnon],[Latitude],[Longitude]) VALUES
(2,'Bigfoot','Sverdlovsk Oblast, Russia','Went Ice Skating with Bigfoot! Super cool dude! You just gotta give him a chance.','https://images2.minutemediacdn.com/image/upload/c_crop,h_2177,w_3872,x_0,y_415/f_auto,q_auto,w_1100/v1556721457/shape/mentalfloss/86902-istock-92030829.jpg',null,'2019-04-20','Safe','true','false',61.77332,59.65827)

INSERT INTO [dbo].[Sightings] ([UserId],[Title],[Location],[Description],[ImageUrl],[VideoUrl],[DateCreated],[ThreatLevel],[IsActive],[IsAnon],[Latitude],[Longitude]) VALUES
(3,'Chupacabra','Cuencamé, Mexico','Caught this one on camera on my property. Had to set up cameras and wait for weeks before it happened.','https://cf-images.us-east-1.prod.boltdns.net/v1/static/5615998031001/2bc8ce97-f8cb-4dff-9561-2d397403b85c/acb86bd2-b682-4386-b7f9-a319ab755e0f/1280x720/match/image.jpg',null,'2017-12-21','Risky','true','true',25.06034,-103.72206)

INSERT INTO [dbo].[Sightings] ([UserId],[Title],[Location],[Description],[ImageUrl],[VideoUrl],[DateCreated],[ThreatLevel],[IsActive],[IsAnon],[Latitude],[Longitude]) VALUES
(3,'Maricoxi','Beni, Bolivia','Thought it was just an ape at first, but apes don''t move like that. Not to mention it was at least 10 feet tall.','http://theunexplainedmysteries.com/wp-content/uploads/2017/11/iStock-157641091.jpg',null,'1998-09-03','Dangerous','true','false',-13.58138,-63.90158)

INSERT INTO [dbo].[Sightings] ([UserId],[Title],[Location],[Description],[ImageUrl],[VideoUrl],[DateCreated],[ThreatLevel],[IsActive],[IsAnon],[Latitude],[Longitude]) VALUES
(3,'Mermaid','Buenos Aires, Argentina','Found them while swimming by the shore. Much creepier than I thought.','https://images.boredomfiles.com/wp-content/uploads/2018/08/mermaid2.jpg',null,'2017-12-21','Safe','true','false',-38.12574,-57.59688)

INSERT INTO [dbo].[Sightings] ([UserId],[Title],[Location],[Description],[ImageUrl],[VideoUrl],[DateCreated],[ThreatLevel],[IsActive],[IsAnon],[Latitude],[Longitude]) VALUES
(3,'Mongolian Death Worm','Gobi Desert, Mongolia','Much small than I thought it would be. Those teeth still look pretty shrap though.','http://www.chriswalascreatures.com/wp-content/uploads/2016/12/worm05.jpg',null,'2002-02-22','Risky','true','false',43.08186,103.73286)

INSERT INTO [dbo].[Sightings] ([UserId],[Title],[Location],[Description],[ImageUrl],[VideoUrl],[DateCreated],[ThreatLevel],[IsActive],[IsAnon],[Latitude],[Longitude]) VALUES
(3,'Skin-Walker',' Dumah Al Jandal, Saudi Arabia','Nope nope nope nope nope nope nope HELL no!','https://thoughtcatalog.files.wordpress.com/2016/10/m8mnsaunp3wtiueryaav.jpg?resize=660,371&quality=95&strip=all&crop=1',null,'2008-10-28','Fatal','true','false',29.83262,39.85976)

INSERT INTO [dbo].[Sightings] ([UserId],[Title],[Location],[Description],[ImageUrl],[VideoUrl],[DateCreated],[ThreatLevel],[IsActive],[IsAnon],[Latitude],[Longitude]) VALUES
(4,'Yeren','Hubei, China','Large Ape-Man found walking around in the woods. Maybe just some guy. Still investigating.','https://thenypost.files.wordpress.com/2013/10/bigfoot-spotted-in-pennsylvfeature.jpg?quality=90&strip=all',null,'2003-04-12','Dangerous','true','true',31.425079,110.518078)

INSERT INTO [dbo].[Sightings] ([UserId],[Title],[Location],[Description],[ImageUrl],[VideoUrl],[DateCreated],[ThreatLevel],[IsActive],[IsAnon],[Latitude],[Longitude]) VALUES
(4,'Yeti','Kautokeino, Finland','Found while skiing. He started chasing us after a while. Very dangerous. Make sure to keep your distance.','https://www.telegraph.co.uk/content/dam/Travel/leadAssets/35/70/Yeti_in_Pyrenees_3570968a.jpg?imwidth=450',null,'2003-02-22','Dangerous','true','false',69.05667,23.99369)

INSERT INTO [dbo].[Sightings] ([UserId],[Title],[Location],[Description],[ImageUrl],[VideoUrl],[DateCreated],[ThreatLevel],[IsActive],[IsAnon],[Latitude],[Longitude]) VALUES
(4,'Jersey Devil','New Jersey, United States','Caught it justa as it took off. Crazy how fast this thing is.','https://s.abcnews.com/images/GMA/151013_dvo_jersey_devil_16x9_992.jpg',null,'2004-08-22','Risky','true','false',40.08203,-74.36781)

INSERT INTO [dbo].[Sightings] ([UserId],[Title],[Location],[Description],[ImageUrl],[VideoUrl],[DateCreated],[ThreatLevel],[IsActive],[IsAnon],[Latitude],[Longitude]) VALUES
(4,'Mothman','Kyzylorda, Kazakhstan','Chased this one away as fast as I could. So annoying. Just wouldn''t leave me alone.','https://thoughtcatalog.files.wordpress.com/2018/08/mothman.jpg?w=1920&h=1280&crop=1&resize=1920,1280&quality=95&strip=all',null,'2018-07-29','Unknown','true','false',44.85330,65.47790)

INSERT INTO [dbo].[Sightings] ([UserId],[Title],[Location],[Description],[ImageUrl],[VideoUrl],[DateCreated],[ThreatLevel],[IsActive],[IsAnon],[Latitude],[Longitude]) VALUES
(4,'SCP-173','Antarctica','Creepy lil peanut boi. Just leave him alone.','http://scp-wiki.wdfiles.com/local--files/scp-173/SCP-173.jpg',null,'2002-02-22','Fatal','true','false',-79.45904,57.63645)


-- Comment Seed Data --

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(1,1,'2016-06-15 13:42:00.000','The picture is so blurry!! I can''t see the monster','false')

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(2,1,'2016-06-17 9:20:00.000','That''s a whale!! So obvious','true')

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(2,1,'2016-06-19 2:32:00.000','Not the best picture, but at least you didn''t get eaten','false')


INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(2,2,'2014-10-08 1:12:00.000','kinda creepy I guess.','true')

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(3,2,'2014-11-12 13:42:00.000','This is fake.','false')

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(2,3,'2010-04-17 14:55:00.000','that''s a cute monster! lol','true')

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(2,3,'2010-04-08 20:20:00.000','ummm that''s a cow','true')

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(4,3,'2010-04-02 3:34:00.000','Please take this site more seriously and deactivate this...','false')

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(2,5,'2008-08-12 5:22:00.000','your drawing skills need work','false')


INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(1,6,'2016-05-08 13:42:00.000','would have been really cool if you caught it when it was still alive','false')

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(1,7,'2001-08-08 13:42:00.000','how can a monster be so cute?','true')

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(3,7,'2001-08-08 2:23:00.000','terrifying','false')

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(4,7,'2001-08-10 7:43:00.000','they are much bigger than they look','false')

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(2,8,'2007-07-07 20:12:00.000','sorry, it''s still not a good picture','true')

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(1,10,'2019-08-08 13:42:00.000','that''s pretty cool','false')

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(1,11,'2018-01-22 1:40:00.000','I''m sleeping with my nightlight on tonight','false')

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(3,11,'2018-01-20 3:03:00.000','Wow that''s a great picture!','false')

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(4,11,'2018-02-10 7:27:00.000','you''re lucky to be alive','true')

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(1,12,'1998-10-10 05:02:00.000','so scary!! :(','true')

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(2,12,'1998-10-18 21:22:00.000','are you sure that''s not a guy in a suit?','false')

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(2,12,'1998-10-16 09:12:00.000','NOoooNONONONOnnoononono!!!','true')

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(4,14,'2002-05-20 13:42:00.000','looks like raw meat and chocolate...','false')

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(1,14,'2002-04-01 16:04:00.000','doesn''t matter how small they are just don''t get bit! I lost a leg that way','true')

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(2,14,'2002-12-03 01:22:00.000','ewww gross!','false')

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(2,15,'2008-11-13 13:42:00.000','AHHHHHHH!!!!','true')

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(2,15,'2008-11-02 13:42:00.000','Is it true that these creatures are evil witches?','false')

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(3,15,'2008-11-02 14:02:00.000','Yes it was horrifying','false')

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(3,16,'2003-07-12 14:02:00.000','let us know how the investigation goes','false')

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(1,18,'2004-08-25 13:42:00.000','Holy Moly! Is that a flying goat?!!!','false')

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(3,18,'2004-08-23 05:32:00.000','Nice!!!!','false')

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(2,18,'2004-09-12 12:06:00.000','Those things are viscious!','true')

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(2,18,'2004-09-16 22:00:00.000','Did you duct tape wings on your poor goat and throw him in the air?','false')

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(3,19,'2018-08-01 13:42:00.000','you chased it away? I''m surprised you didn''t get killed','false')

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(3,20,'2002-03-30 22:02:00.000','how did you escape?!!','false')

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(2,20,'2019-04-20 14:12:00.000','don''t ever take your eyes off him!! He will snap your neck! X_X','false')

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(2,20,'2019-03-02 19:05:00.000','looks like a bag a cement','true')

INSERT INTO [dbo].[Comments]([UserId],[SightingId],[DateCreated],[Message],[IsAnon])
VALUES(1,20,'2019-03-12 01:00:00.000','don''t blink...it will be the last thing you do','true')

-- UserLike Seed Data --

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(15,29,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(15,28,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(15,27,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(15,26,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(15,25,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(15,24,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(15,23,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(15,22,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(15,21,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(15,20,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(15,19,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(15,18,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(15,17,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(15,16,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(15,15,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(15,14,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(15,13,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(15,12,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(15,11,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(15,10,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(15,9,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(15,8,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(15,7,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(15,6,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(15,5,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(15,4,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(15,1,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(15,3,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(15,2,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,29,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,28,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,27,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,26,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,25,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,24,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,23,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,22,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,21,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,20,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,19,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,18,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,17,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,16,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,15,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,14,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,13,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,12,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,11,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,10,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,9,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,8,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,7,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,6,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,5,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,4,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,3,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,2,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(7,28,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(7,27,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(7,26,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(7,25,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(7,24,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(7,23,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(7,22,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(7,21,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(7,20,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(7,19,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(7,18,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(7,17,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(7,15,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(7,15,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(7,14,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(7,13,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(7,12,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(7,11,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(7,10,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(7,9,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(7,8,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(7,7,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(7,6,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(7,1,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(7,5,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(7,4,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(7,3,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(7,2,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(14,26,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(14,25,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(14,24,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(14,23,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(14,22,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(14,21,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(14,20,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(14,19,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(14,18,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(14,17,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(14,16,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(14,15,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(14,14,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(14,13,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(14,12,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(14,11,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(14,10,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(14,9,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(14,8,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(14,7,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(14,6,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(14,5,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(14,4,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(14,3,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(14,2,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(14,1,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(20,29,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(20,28,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(20,27,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(20,26,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(20,25,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(20,24,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(20,23,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(20,22,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(20,21,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(20,20,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(20,19,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(20,18,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(20,17,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(20,16,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(20,15,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(20,14,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(20,13,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(20,12,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(20,11,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(20,10,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(20,9,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(20,1,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(20,8,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(20,7,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(20,6,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(20,5,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(20,4,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(20,3,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(20,2,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,29,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,28,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,27,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,26,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,25,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,24,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,23,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,22,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,21,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,20,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,19,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,18,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,17,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,16,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,15,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,14,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,13,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,12,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,11,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,10,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,9,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,8,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,7,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,6,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,5,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,4,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,3,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,2,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,1,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(4,3,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(4,1,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(4,2,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(9,10,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(9,9,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(9,8,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(9,7,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(9,6,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(9,5,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(9,4,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(9,3,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(9,2,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(13,3,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(13,2,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(17,5,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,11,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,10,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,9,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,8,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,7,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,6,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,5,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,4,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,2,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,3,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,1,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,5,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,4,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,3,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(18,2,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(16,13,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(16,12,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(16,11,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(16,10,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(16,9,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(16,8,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(16,7,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(16,6,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(16,5,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(16,4,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(16,3,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(16,2,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,15,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,14,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,13,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,12,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,11,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,10,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,9,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,8,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,7,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,6,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,5,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,4,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,3,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,2,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(12,1,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(1,13,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(1,12,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(1,11,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(1,10,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(1,9,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(1,8,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(1,7,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(1,6,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(1,5,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(1,4,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(1,3,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(1,1,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(1,2,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(3,13,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(3,12,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(3,11,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(3,10,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(3,9,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(3,8,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(3,7,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(3,6,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(3,5,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(3,4,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(3,3,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(3,29,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(3,28,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(3,27,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(3,26,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(3,2,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(5,13,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(5,12,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(5,11,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(5,10,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(5,9,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(5,8,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(5,7,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(5,6,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(5,5,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(5,4,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(5,3,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(5,29,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(8,1,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(8,2,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(8,3,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(8,4,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(8,5,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(8,6,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(8,7,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(10,2,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(10,3,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(10,4,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(10,5,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(10,1,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(19,10,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(19,9,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(19,8,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(19,7,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(19,6,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(19,5,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(19,4,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(19,3,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(19,2,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(19,1,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(11,19,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(11,18,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(11,17,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(11,16,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(11,15,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(11,14,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(11,13,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(11,12,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(11,11,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(11,10,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(11,9,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(11,8,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(11,7,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(11,6,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(11,5,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(11,4,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(11,3,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(11,1,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(11,2,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(2,1,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(2,2,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(2,3,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(2,4,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(2,5,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(2,6,'false')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(2,7,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(6,2,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(6,3,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(6,4,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(6,5,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(6,6,'true')

INSERT INTO [dbo].[UserLikes] ([SightingId],[UserId],[IsLiked])
VALUES(6,7,'true')



