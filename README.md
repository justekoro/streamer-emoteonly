# Emote only bot
![TypeScript](https://img.shields.io/badge/Made%20with-Typescript-blue)
![Twitch](https://img.shields.io/badge/Using-TMI-blueviolet)
![License](https://img.shields.io/badge/License-MIT-green)
![GitHub](https://img.shields.io/github/last-commit/justekoro/streamer-emoteonly)

---

## What is this?
__[Trolls are everywhere.](https://twitter.com/TaMereLaMouette/status/1573246097761472512)__ They can try to get your channel banned at any moment. **To counter this, we can enable emote mode when the stream is offline.**

This bot will automatically enable emote mode when the stream turns offline, and disable it when the stream turns back online.

## Installation

### Requirements
- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)
- [Twitch account](https://www.twitch.tv/)
- [Twitch app](https://dev.twitch.tv/console/apps)

### Setup

1. Clone the repository, using either git or the download button (or clicking [this link](https://github.com/justekoro/streamer-emoteonly/archive/refs/heads/master.zip))
2. If you downloaded the zip, extract it, then open a terminal in the folder. If you cloned the repository, open a terminal in the folder.
3. Use `npm install` to install the dependencies.
4. Rename `example.env` to `.env` and fill in the values.
5. Use `npm start` to start the bot.

## Configuration

### Create a Twitch app

1. Go to [the Twitch Developer Portal](https://dev.twitch.tv/console/apps) and click on `Register Your Application`.
2. Fill in the name, put `http://localhost:3030` in the OAuth Redirect URL, and click on `Register` (for the category, you can put `Chat Bot`).
3. Congrats, you created your app!

### Fill in the values

1. Open the `.env` file, with your favorite text editor.
2. Fill the values required. While most of it can be found in your [app settings](https://dev.twitch.tv/console/apps), the `OAUTH_TOKEN` value can be found [here](https://twitchapps.com/tmi/).
3. Save the file, and start the bot.

### Prepare for the run

Once you launched the bot, you will have to open a new tab in your browser: [http://localhost:3030/login](http://localhost:3030/login). This will allow you to connect your Twitch account to the bot, to get credentials to check if your stream is online.

### Change the messages

It is possible to change the messages sent by the bot in src/messages.ts. You can change the messages sent when the stream goes online, and when the stream goes offline.

## License

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.

## Bug report, feature request, or contribution

If you want to report a bug, request a feature, or contribute to the project, you can do so [here](https://github.com/justekoro/streamer-emoteonly/issues/new/).

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Credits

<div align="center">
<p>Made by <a href="https://twitter.com/justekoro">justekoro</a></p>
  <a href="https://twitter.com/justekoro">
    <img src="https://img.shields.io/twitter/follow/justekoro?style=social" alt="Twitter">
  </a>
<br/>
    <a href="https://github.com/justekoro">
    <img src="https://img.shields.io/github/followers/justekoro?style=social" alt="GitHub">
    </a>
<br/>
<a href="https://www.twitch.tv/justekoro">
    <img src="https://img.shields.io/twitch/status/justekoro?style=social" alt="Twitch">
  </a>
<br/>
<a href="https://instagram.com/justekoro">
    <img src="https://img.shields.io/badge/Instagram-justekoro-blue?style=flat&logo=instagram" alt="Instagram">
  </a>
<br/>
<a href="https://buymeacoffee.com/justekoro">
    <img src="https://img.shields.io/badge/Buy%20me%20a%20coffee-justekoro-blue?style=flat&logo=buy-me-a-coffee" alt="Buy me a coffee">
  </a>
</div>
