# Prerequisites
0) ** If you have any backup use it ;) (check on pendrive)
1) `System preferences` => `Displays` => `Arrangement` => check `Mirror Displays`
2) Update your OS to newest version (tip: if automatic updater doesn't work, manually get update via app store -> e.g.search for `macos catalina`)
3) [Make sudo doesn't require password](https://phpraxis.wordpress.com/2016/09/27/enable-sudo-without-password-in-ubuntudebian/)

# Reconstruction work-env on macOS
3) Download and execute `reconstruction_script.sh`
    1) open some webbrowser and login to bitwarden (you will need authy)
    2) login to github (again need to use bitwarden site and authy app), download this repo (as zip)
    3) `chmod 755 reconstruction_script.sh`
    4) `./reconstruction_script.sh`
    5) while script is running: install [Numbers](https://apps.apple.com/pl/app/numbers/id409203825?mt=12), [Pages](https://apps.apple.com/us/app/pages/id409201541?mt=12) and [Docker](https://docs.docker.com/desktop/mac/install/). Also do software updates if avaible (`system preferences` => `software update`).
4) Take care of [ssh](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) (and its config file) -> `ssh/config`)
   1) follow ssh-key-generating instruction from github (link above)
   2) copy content of file `ssh/config` and paste it to file `vim ~/.ssh/config` (mere copy file can lead to problem with permissions and ownership - btw `chmod 755 config` also seems to work)
5) Import your settings to iterm2 -> `Bajek - iterm2 profile.json`
   1) run iterm, and go to `preferences` (shortcut: `cmd` + `,`) => `Profiles` => `Other actions` => `Import JSON profiles...`
   2) set `Bajek` profile as default (select `Bajek` => `Other actions` => `Set as default`)
   3) Unset confirmation on quit:  `preferences` (shortcut: `cmd` + `,`) => `General` => `Closing` => uncheck `Confirm closing multiple sessions` and `Confirm "Quit iTerm2"`
6) Take care of shell config => copy content of file `zshrc` and `starship.toml`
    1) `cp zshrc ~/.zshrc`
    3) `cp  starship.toml ~/.config/`

# Additional
7) Set up and turn on sync:
   1) authy (first you need to enable `multi-device` option, then remember to disable `multi-device` option)
   2) brave (copy sync code from bitwarden)
   3) MEGAsync => preferably:  `~/MEGA` (default) + make sure it autoruns at starup when start (`system preferences` => `users & groups` => `login items`)
   4) f.lux => `Time: 5:45`, `Daytime -> 3500K`, `Sunset -> 2700K`, `Bedtime -> 1200K` + make sure it autoruns at starup when start (`system preferences` => `users & groups` => `login items`)
8) Set `mail` accounts (`System preferences -> Internet Accounts`) - in case of any trouble remember to disable two factor authentication
9) `System preferences` --> rewiev and set
    1) `General` => Dark appearance, orange color, default web browser (brave)
    2) `Desktop & Screen Saver` => black color desktop, `Screen Saver` => `Start after` => `Never`
    3) `Dock & Menu Bar`
        * (main screen) adjust dock size as you want
        * (main screen) uncheck =>  `Double-click a window's title bar to`, `Animate opening applications`, `Show recent applications in Dock`
        * (main screen) check => `Automatically hide and show the Dock`, `Automatically hide and show the menu bar`
        * (game center - sidebar) hide all but `Battery` (+ `Show Percentage`)
    4) `Notifications` => turn off all notifications. PURGE THEM ALL!
    5) `Users Groups` => change user icon to owl + make sure `f.lux` and `MEGAsync` autorun at starup when start (`system preferences` => `users & groups` => `login items`)
    6) `Security & Privacy` => `General` => uncheck `Require password xyz after sleep or screen saver begins`, `Firewall` => turn on
    7) `Software Update` => check `Automatically keep my Mac up to date`, `Advanced` => check all
    8) `Keyboard` => `Keyboard` => `Modifier Keys ...` (button at right bottom corner) => caps lock to esc, `Shortcuts` => `Show Spotlight search` => `alt` + `space`
    9) `Mouse` => uncheck `Scroll dicrection: Natural`, adjust as you want rest
    10) `Battery` =>  `Battery` => `Turn display off after` => 15 min + check `Enable power nap while on battery power`, `Power Adapter` => `Turn display off after` => never + check `Prevent computer from sleeping automatically when the display is off` + uncheck `Enable power nap while plugged into a power adapter`
10) Remove all widgets (in menu bar click on date)
