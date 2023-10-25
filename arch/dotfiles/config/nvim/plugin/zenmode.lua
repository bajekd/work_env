require("zen-mode").setup {
  window = {
    width = 300,
    options = {
      number = true,
      relativenumber = true,
    }
  },
  on_open = function(win)
    vim.wo.wrap = true
    vim.wo.linebreak = true
  end,
  on_close = function()
    vim.wo.wrap = false
  end,
}

vim.keymap.set("n", "<leader>z", function()
  require("zen-mode").toggle()
end)
