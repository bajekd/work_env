require 'nvim-autopairs'.setup({
  check_ts = true, -- Enable treesitter support (if you're using treesitter)
})

local npairs = require('nvim-autopairs')
local Rule = require('nvim-autopairs.rule')


-- Define custom rules for ERB tags for both HTML.erb and eruby filetypes
npairs.add_rules({
  Rule("<% ", " %>", { "html", "eruby" }),
  Rule("<%= ", " %>", { "html", "eruby" }),
  Rule("<%== ", " %>", { "html", "eruby" }),
})
