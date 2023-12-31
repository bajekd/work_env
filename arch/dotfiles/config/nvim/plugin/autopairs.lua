require 'nvim-autopairs'.setup({
  check_ts = true, -- Enable treesitter support (if you're using treesitter)
})

local npairs = require('nvim-autopairs')
local Rule = require('nvim-autopairs.rule')


npairs.add_rules({
  Rule("<% ", " %>", { "html", "eruby", "yaml" }),
  Rule("<%= ", " %>", { "html", "eruby", "yaml" }),
  Rule("<%== ", " %>", { "html", "eruby", "yaml" }),
})
