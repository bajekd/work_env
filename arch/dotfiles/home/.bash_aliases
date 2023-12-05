#--------------------------
# bash
#--------------------------
alias sudo='sudo '

alias update='bajek_update.sh'
alias rds='bajek_rds.sh'

alias grep='grep --color=auto'
alias ls='ls -alh --color=auto'
alias mkdir='mkdir -pv'
alias tree='tree -a -C' # print hidden files too with colorization on
alias vim='nvim'

alias eip='curl ipinfo.io/ip'
alias iip='nmcli | grep inet | head -n 2'
alias ports='lsof -P -n -i'
alias reload='source ~/.bash_profile'

#--------------------------
# tmux
#--------------------------
alias tls='tmux ls'
alias t='tmux'
alias ta='tmux attach'

#--------------------------
# make
#--------------------------
alias mb='make build'
alias mr='make run'

#--------------------------
# git
#--------------------------
alias ga='git add'
alias gb='git branch'
alias gbi='git biscet'
alias gc='bajek_git_clean.sh'
alias gci='git clean -i'
alias gcb='git clone --bare'
alias gcl='git clone'
alias gcm='git commit -m'
alias gco='git checkout'
alias gcp='git cherry-pick'

alias gd='git diff'
alias gds='git diff --staged'
alias gf='git fetch'
alias gm='git merge'
alias gl="git log --format=format:'Commit %C(blue)%H%C(reset) %C(bold blue)%d%C(reset) %nAuthor: %C(green)%an%C(reset) %C(dim green)(%ae)%C(reset)%nDate:   %C(yellow)%cr%C(reset) %C(dim yellow)(%cd)%C(reset)%n%n    %s%n'"
alias glo="git log --format=format:'%C(blue)%h%C(reset) %C(bold blue)%d%C(reset) %s%n'"
alias glg='glo --graph'
alias gpl='git pull'
alias gpp='git pull; git push'
alias gpu='git push'

alias gre='git revert'
alias grs='git reset --soft'
alias gr='git reset'
alias grb='git rebase'
alias gri='git rebase --interactive'
alias grh='git reset --hard'
alias grm='git rm --cached'
alias grl='git reflog'

alias gs='git status'
alias gsw='git switch'
alias gsc='git switch -c'
alias gsl='git stash list'
alias gss='git stash save'
alias gsa='git stash apply'
alias gsd='git stash drop'

#--------------------------
# ruby
#--------------------------
alias rs='rails s'
alias rc='rails c'

alias ba='bundle add'
alias be='bundle exec '
alias bi='bundle install'
alias bl='bundle list'
alias bu='bundle update'
