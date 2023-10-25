# https://wiki.archlinux.org/title/SSH_keys#ssh-agent (4.1)
if ! pgrep -u "$USER" ssh-agent >/dev/null; then
  ssh-agent -t 24h >"$XDG_RUNTIME_DIR/ssh-agent.env"
fi
if [[ ! -f "$SSH_AUTH_SOCK" ]]; then
  source "$XDG_RUNTIME_DIR/ssh-agent.env" >/dev/null
fi

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

#------------------------------------
# Git autocompletion -> https://gist.github.com/lrobeson/7455010
#------------------------------------

if [ -f ~/.git-completion.bash ]; then
  source ~/.git-completion.bash
  __git_complete gco _git_checkout
fi

#------------------------------------
# Alias definitions
#------------------------------------
if [ -f ~/.bash_aliases ]; then
  . ~/.bash_aliases
fi

#------------------------------------
# ENVs
#------------------------------------
export EDITOR="nvim --wait"

#------------------------------------
# PATH
#------------------------------------
export PATH=$PATH:~/.local/bin

eval "$(starship init bash)"

. "$HOME/.asdf/asdf.sh"
. "$HOME/.asdf/completions/asdf.bash"
