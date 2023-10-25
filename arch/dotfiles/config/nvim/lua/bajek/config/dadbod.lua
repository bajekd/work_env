local M = {}

local function db_completion()
  require("cmp").setup.buffer { sources = { { name = "vim-dadbod-completion" } } }
end

function M.setup()
  vim.g.db_ui_save_location = vim.fn.stdpath "config" .. require("plenary.path").path.sep .. "db_ui"

  vim.api.nvim_create_autocmd("FileType", {
    pattern = {
      "sql",
    },
    command = [[setlocal omnifunc=vim_dadbod_completion#omni]],
  })

  vim.api.nvim_create_autocmd("FileType", {
    pattern = {
      "sql",
      "mysql",
      "plsql",
    },
    callback = function()
      vim.schedule(db_completion)
    end,
  })
end

-- custom mappings
vim.keymap.set("n", "<leader>db", ":DBUIToggle<CR>")
vim.cmd[[ autocmd FileType dbui nmap <buffer> 0 <Plug>(DBUI_GotoFirstSibling) ]]
vim.cmd[[ autocmd FileType dbui nmap <buffer> $ <Plug>(DBUI_GotoLastSibling) ]]

return M

