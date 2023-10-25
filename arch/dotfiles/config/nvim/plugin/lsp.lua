-- `:help lsp-zero`
local lsp = require("lsp-zero").preset({})

require('mason').setup({})
require('mason-lspconfig').setup({
  ensure_installed = { 'emmet_language_server', 'lua_ls', 'solargraph', 'tsserver' },
  handlers = { lsp.default_setup, },
})

require('lspconfig').lua_ls.setup({
  settings = { Lua = { diagnostics = { globals = { 'vim' } } } },
})
-- require('lspconfig').solargraph.setup({
--   filetypes = { 'eruby', 'ruby' }
-- })
--
-- default handlers set as true
-- vim.diagnostic.config({
--   virtual_text = false,
--   signs = false,
--   underline = false,
-- }),

lsp.on_attach(function(client, bufnr)
  local opts = { buffer = bufnr, remap = false }
  local function allow_format(servers)
    return function(client) return vim.tbl_contains(servers, client.name) end
  end

  -- See `:help vim.lsp.*` for documentation on any of the below functions
  vim.keymap.set("n", "gd", vim.lsp.buf.definition, opts)
  vim.keymap.set("n", "gh", vim.lsp.buf.hover, opts)
  vim.keymap.set("n", "gH", vim.lsp.buf.signature_help, opts)
  vim.keymap.set("n", "gw", vim.lsp.buf.workspace_symbol, opts)
  vim.keymap.set("n", "gc", vim.lsp.buf.code_action, opts)
  vim.keymap.set("n", "gr", vim.lsp.buf.references, opts)
  vim.keymap.set("n", "gR", vim.lsp.buf.rename, opts)
  vim.keymap.set("n", "gD", vim.diagnostic.open_float, opts)
  vim.keymap.set("n", "[d", vim.diagnostic.goto_next, opts)
  vim.keymap.set("n", "]d", vim.diagnostic.goto_prev, opts)
  vim.keymap.set('n', '<leader>f', function()
    vim.lsp.buf.format({
      async = true,
      -- timeout_ms = 10000, -- no effect if async=true
      filter = allow_format({ 'emmet_language_server', 'lua_ls', 'solargraph', 'tsserver' }) -- don't know what to add? See 'ListFormatters' below
    })
  end, opts)
end)

-- custom defined function to list all formatters avaiable for current buffer
vim.api.nvim_create_user_command('ListFormatters', function()
  local clients = vim.lsp.get_active_clients({ bufnr = vim.api.nvim_get_current_buf() })

  local formatters = vim.tbl_filter(function(c)
    return c.supports_method('textDocument/formatting')
  end, clients)

  formatters = vim.tbl_map(function(c) return c.name end, formatters)

  if #formatters > 0 then
    print(vim.inspect(formatters))
  else
    print('No formatters active in current buffer')
  end
end, {})

-- custom defined function to format erb file with erb-format gem
vim.api.nvim_create_user_command('FormatErb', function()
  local path = vim.fn.expand('%:p')
  local cmd = 'erb-format ' .. path .. ' --write'
  vim.fn.system(cmd)

  local handle = io.popen(cmd .. ' 2>&1') -- Capture both standard output and error output
  local result = handle:read('*a')
  handle:close()

  if result and result ~= '' then
    -- Display the error output in Neovim
    vim.api.nvim_out_write(result)
  else
    -- No errors, reload the buffer to show unsaved changes
    vim.cmd('e!')
  end
end, {})

lsp.setup()

local cmp = require('cmp')
local cmp_select = { behavior = cmp.SelectBehavior.Select }

cmp.setup({
  window = {
    completion = cmp.config.window.bordered(),
    documentation = cmp.config.window.bordered(),
  },

  mapping = cmp.mapping.preset.insert({
    ['<C-y>'] = cmp.mapping.confirm({ select = true }),
    ['<C-n>'] = cmp.mapping.select_next_item(cmp_select),
    ['<C-p>'] = cmp.mapping.select_prev_item(cmp_select),
    ['<C-j>'] = cmp.mapping.scroll_docs(4),
    ['<C-k>'] = cmp.mapping.scroll_docs(-4),
  }),
})
