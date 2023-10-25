local builtin = require('telescope.builtin')
local telescope = require('telescope')


telescope.setup {
  file_ignore_patterns = {
    "node_modules/",
    "%.git/",
    "target/",
    "build/",
  },
  pickers = {
    find_files = { hidden = true },
    git_files = { hidden = true },
    grep_string = {
      additional_args = function(opts)
        return {"--hidden"}
      end
    },
    live_grep = {
      additional_args = function(opts)
        return {"--hidden"}
      end
    },
  },
}
vim.keymap.set('n', '<leader><space>', builtin.buffers, {})
vim.keymap.set('n', '<leader>ff', builtin.find_files, {})
vim.keymap.set('n', '<leader>fg', builtin.git_files, {})
vim.keymap.set('n', '<leader>fs', function()
  builtin.grep_string({ search = vim.fn.input("Grep > ") })
end)
vim.keymap.set('n', '<leader>fS', builtin.live_grep, {})
vim.keymap.set('n', '<leader>fh', builtin.help_tags, {})
