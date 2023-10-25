local function my_on_attach(bufnr)
  local api = require "nvim-tree.api"

  local function opts(desc)
    return { desc = "nvim-tree: " .. desc, buffer = bufnr, noremap = true, silent = true, nowait = true }
  end

  -- default mappings
  -- api.config.mappings.default_on_attach(bufnr)

  -- custom mappings
  vim.keymap.set("n", "<C-e>", function() vim.cmd(":NvimTreeToggle") end )
  vim.keymap.set("n", "<CR>", api.node.open.edit, opts('Open'))
  vim.keymap.set("n", "o", api.node.open.edit, opts('Open'))
  vim.keymap.set("n", "e", api.node.open.preview, opts('Preview'))
  vim.keymap.set("n", "gh", api.node.show_info_popup, opts('Info'))

  vim.keymap.set("n", "J", api.node.navigate.sibling.next, opts('Next Sibling'))
  vim.keymap.set("n", "K", api.node.navigate.sibling.prev, opts('Previous Sibling'))
  vim.keymap.set("n", "0", api.node.navigate.sibling.first, opts('First Sibling'))
  vim.keymap.set("n", "$", api.node.navigate.sibling.last, opts('Last Sibling'))
  vim.keymap.set("n", "P", api.node.navigate.parent, opts('Patent Dir'))
  vim.keymap.set("n", "-", api.tree.change_root_to_parent, opts('Up'))
  vim.keymap.set("n", "=", api.tree.change_root_to_node, opts('Down'))
  vim.keymap.set("n", "<BS>", api.node.navigate.parent_close, opts('Close Dir'))
  vim.keymap.set("n", "E", api.tree.expand_all, opts('Expand All'))
  vim.keymap.set("n", "C", api.tree.collapse_all, opts('Collapse All'))

  vim.keymap.set("n", "r", api.fs.rename_sub, opts('Rename'))
  vim.keymap.set("n", "R", api.fs.rename, opts('Full Rename'))
  vim.keymap.set("n", "a", api.fs.create, opts('Create'))
  vim.keymap.set("n", "dd", api.fs.remove, opts('Delete'))
  vim.keymap.set("n", "yy", api.fs.copy.node, opts('Copy'))
  vim.keymap.set("n", "x", api.fs.cut, opts('Cut'))
  vim.keymap.set("n", "p", api.fs.paste, opts('Paste'))

  vim.keymap.set("n", "y", api.fs.copy.filename, opts('Copy Name'))
  vim.keymap.set("n", "Y", api.fs.copy.relative_path, opts('Copy Relative Path'))
  vim.keymap.set("n", "gy", api.fs.copy.absolute_path, opts('Copy Absolute Path'))
  vim.keymap.set("n", "gy", api.fs.copy.absolute_path, opts('Copy Absolute Path'))

  vim.keymap.set("n", "f", api.live_filter.start, opts('Filter'))
  vim.keymap.set("n", "F", api.live_filter.clear, opts('Clear Filter'))
  vim.keymap.set("n", "za", api.tree.toggle_hidden_filter, opts('Toogle Hidden Files'))
  vim.keymap.set("n", "zg", api.tree.toggle_gitignore_filter, opts('Toogle Git Ignore Files'))

  vim.keymap.set("n", "q", api.tree.close, opts('Close'))
  vim.keymap.set("n", "<leader>R", api.tree.reload, opts('Refresh'))
  vim.keymap.set('n', '?', api.tree.toggle_help, opts('Help'))
end

require("nvim-tree").setup({
  on_attach = my_on_attach,
  sort_by = "case_sensitive",
  disable_netrw = false,
  view = {
    adaptive_size = true,
    centralize_selection = false,
    width = 20,
    side = "left",
  },
  git = {
    enable = false,
  },
  renderer = {
    group_empty = true,
  },
  filters = {
    dotfiles = false,
  },
  actions = {
    open_file = {
      quit_on_open = true,
    },
  },
})

