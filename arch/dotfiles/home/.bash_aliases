function update () 
{ 
    echo "Update pacman mirror list"
    sudo reflector --country Poland --protocol https --sort rate --save /etc/pacman.d/mirrorlist
    cat /etc/pacman.d/mirrorlist
    echo "-----------------------"
    
    echo -e "\nUpdating packages"
    paru -Syyu;
    echo "-----------------------"

    echo -e "\nUninstalling unnecessary packages"
    if [[ $(paru -Qdtq) ]]; then
        paru -Rns $(paru -Qdtq)
    else
        echo -e "No unnecessary packages found"
    fi
    echo "-----------------------"

    echo -e "\n Remove pacman cache"
    paru -Sc --noconfirm; # Remove cached packages that are not currently installed
    paccache -r; # Remove all cached packages but the 3 most recent package versions
    echo "-----------------------"

    echo -e "\n Remove ~/.cache/*"
    rm -rf ~/.cache/*
    echo "-----------------------"

    echo -e "\n Remove unnecessary files"
    rm -rf ~/.psql_history ~/.bash_history ~/.python_history ~/.cache
    rm -rf ~/.cargo/registry 
    rm -rf ~/.local/share/recently-used.xbel
    rm -rf ~/.irb_history
    rm -rf ~/.rdbg_history
}

function rds () {
    if [[ $# != 1 ]]; then
    	echo "redshift: option requires an argument -- 'O'"
	return 1
    fi

    pkill redshift
    if [[ $? == 0 ]]; then
	sleep 5
    fi

    redshift -m randr:screen=all -P -O $1
}

#--------------------------
# bash
#--------------------------
alias sudo='sudo '

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
alias gc='git commit'
alias gd='git diff'
alias gs='git status'
alias gco='git checkout'
alias glg='git log --color --graph --pretty=format:'\''%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset'\'' --abbrev-commit'
alias gpp='git pull; git push'

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
