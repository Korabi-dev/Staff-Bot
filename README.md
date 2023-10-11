# THIS BOT WAS MADE BY korabi.dev (638476135457357849) on discord, anyone else claiming they're my alt trying to sell it is scamming you
## Staff Bot
Hey there! This project is dedicated to help with managing staff members on your servers, it also has some basic moderation commands.

_if you want more projects like this [Visit my Github page](https://github.com/Korabi-dev/)_

## Deployment
Okay, you may be asking, how do I start the bot?

Here's the steps.
* [Download Visual Studio Code](https://code.visualstudio.com/download)
* Download the code from github.   
* Open the code folder with [Visual Studio Code](https://code.visualstudio.com/download)
* Go to File => Autosave, and check it to enabled.
* Go to the [Discord Developer Application Page.](https://discord.com/developers/applications)
* Click "New Application", like the below example.
<img src="https://i.imgur.com/yrXmCxN.png" alt="Tutorial">

* Give your bot/application a name and then click "Create", like the below example.
<img src="https://i.imgur.com/EJrpX6s.png" alt="Tutorial1">

* After you have been redirected to your application press the "bot" tab, like the below example.
<img src="https://i.imgur.com/KmQXvcX.png" alt="Tutorial2">

* Click "Add Bot", like the below example.
<img src="https://i.imgur.com/SVC3jv7.png" alt="Tutorial3">

* Click "Yes, Do it!", like the below example.
<img src="https://i.imgur.com/RKJOLoT.png" alt="Tutorial4">

* Click "Copy", like the below example.
<img src="https://i.imgur.com/tG6jt3f.png" alt="Tutorial5">

_Keep this in a notepad as we will need it later._
*Please make sure you do not leak this token, doing so will give someone access to your bot*

* [Get a mongodb cluster](https://www.youtube.com/watch?v=94g7fITrhrM) (Get the link part of this video and save it for later, it will be referred to as "MONGO_DB_SERVER", ty recon for the great vid <3)
* [Download NODE.JS](https://nodejs.org/en/download/)
* Make a file called ".env" in the folder that the files you downloaded is.
* Open the file with [Visual Studio Code](https://code.visualstudio.com/download)
* In the ".env" file, put the information as needed.

```env
token=YOUR_BOT_TOKEN
mongoose=MONGO_DB_SERVER
prefix=YOUR_PREFIX
staffrole=THE_STAFF_ROLE_ID
checkin=CHECKIN_CHANNEL_ID
logs=LOGS_CHANNEL_ID
main=YOUR_SERVER_ID
```

* Open a command prompt window then run the following code on it.

```sh
cd YOUR_BOT_FOLDER_PATH && node .
```
 
 **If all goes well your bot should be up and running, Congratulations!**

 _If anything goes wrong just friend me on discord or make an issue, ill gladly help!_
