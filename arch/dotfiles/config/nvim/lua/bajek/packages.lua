-- bootstrap lazy
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable", -- latest stable release
    lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)


vim.g.mapleader = " " -- Make sure to set `mapleader` before lazy so your mappings are correct

require("lazy").setup({
  -- lsp
  {
    'VonHeikemen/lsp-zero.nvim',
    branch = 'v3.x',
    dependencies = {
      --- Uncomment these if you want to manage LSP servers from neovim
      { 'williamboman/mason.nvim' },
      { 'williamboman/mason-lspconfig.nvim' },

      -- LSP Support
      { 'neovim/nvim-lspconfig' },

      -- Autocompletion
      { 'hrsh7th/nvim-cmp' },
      { 'hrsh7th/cmp-nvim-lsp' },
      { 'L3MON4D3/LuaSnip' },
    }
  },

  -- navigation
  { "nvim-tree/nvim-tree.lua", dependencies = { "nvim-tree/nvim-web-devicons" } },
  { "theprimeagen/harpoon" },
  {
    "nvim-telescope/telescope.nvim",
    dependencies = { { "nvim-lua/plenary.nvim" } },
    branch = "0.1.x",
  },

  -- syntax
  {
    "nvim-treesitter/nvim-treesitter",
    "RRethy/nvim-treesitter-endwise",
    "windwp/nvim-ts-autotag",
    run = ":TSUpdate"
  },
  { "windwp/nvim-autopairs" },

  -- database
  {
    "tpope/vim-dadbod",
    dependencies = {
      "kristijanhusak/vim-dadbod-ui",
      "kristijanhusak/vim-dadbod-completion" },
    init = function()
      -- it must be set before the plugin is loaded or configured.
      vim.g.db_ui_use_nerd_fonts = 1
    end,
    config = function()
      vim.g.db_ui_use_nerd_fonts = 1
      require("bajek.config.dadbod").setup()
    end,
  },

  -- misc
  {
    "jackMort/ChatGPT.nvim",
    event = "VeryLazy",
    dependencies = {
      "MunifTanjim/nui.nvim",
      "nvim-lua/plenary.nvim",
      "nvim-telescope/telescope.nvim" }
  },
  { 'vim-test/vim-test' },
  { "mbbill/undotree" },
  { "terrortylor/nvim-comment" },
  { "godlygeek/tabular" },         -- text alignment
  { "nvim-lualine/lualine.nvim" }, -- statusline
  { "folke/zen-mode.nvim" },

  -- theme
  { "Mofiqul/dracula.nvim" },
})
