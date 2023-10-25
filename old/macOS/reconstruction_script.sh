#!/bin/bash

#--------------------------------
# Install homebrew
#--------------------------------

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh) < /dev/null"

#--------------------------------
# Install programs
#-------------------------------

# Terminal stuff
brew install tldr
brew install tree
brew install htop
brew install --cask iterm2
brew install starship
brew install postgresql
brew install --cask visual-studio-code
brew install --cask authy
brew install brave-browser
brew install --cask flux
brew install --cask notion
brew install --cask megasync
brew install --cask xmind-zen
brew install --cask android-file-transfer
brew install --cask slack
brew install --cask discord

brew install nvm                                     # https://tecadmin.net/install-nvm-macos-with-homebrew/
brew install git

# Short git config, to test type: git config --list
git config --global user.name "Blaise Dobek"
git config --global user.email "6976291+blazejdobek@users.noreply.github.com" 
git config --global core.editor "code --wait"

# Python stuff
brew install python
brew install pyenv
brew install pipenv

# Install rbenv
brew install rbenv ruby-build
git clone https://github.com/aripollak/rbenv-bundler-ruby-version.git "$(rbenv root)"/plugins/rbenv-bundler-ruby-version # https://github.com/aripollak/rbenv-bundler-ruby-version

# Install Source Code Pro Font
brew tap homebrew/cask-fonts
brew install --cask font-source-code-pro
