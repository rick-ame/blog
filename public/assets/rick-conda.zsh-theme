# See: https://github.com/ohmyzsh/ohmyzsh/wiki/Customization#overriding-and-adding-themes

get_python_version() {
  if command -v python &> /dev/null; then
    version=$(python -V 2>&1)
    echo -n "${version#Python }"
  fi
}
get_conda_prompt() {
  if [[ -n "$CONDA_DEFAULT_ENV" ]]; then
    echo -n "%F{yellow}🐍 $(get_python_version)%f"
    echo -n "\n🔬"
  else
    echo -n "✨"
  fi
}
PROMPT='$(get_conda_prompt) %b%F{green}%3~ $(hg_prompt_info)$(git_prompt_info)%B%(!.%F{red}.%F{yellow})»%f%b '

RPS1='%(?..%F{red}%? ↵%f)'

ZSH_THEME_GIT_PROMPT_PREFIX="%{$fg[yellow]%}‹"
ZSH_THEME_GIT_PROMPT_SUFFIX="› %{$reset_color%}"

ZSH_THEME_HG_PROMPT_PREFIX="%{$fg[magenta]%}hg:‹%{$fg[yellow]%}"
ZSH_THEME_HG_PROMPT_SUFFIX="%{$fg[magenta]%}› %{$reset_color%}"
ZSH_THEME_HG_PROMPT_DIRTY=" %{$fg[red]%}✗"
ZSH_THEME_HG_PROMPT_CLEAN=""

ZSH_THEME_TERM_TAB_TITLE_IDLE=""
ZSH_THEME_TERM_TITLE_IDLE=""
