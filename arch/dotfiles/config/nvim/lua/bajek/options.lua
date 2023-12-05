vim.opt.termguicolors = true
-- vim.opt.clipboard = 'unnamedplus'  -- copy/paste to system clipboard

-- vim.opt.autochdir = true           -- set the working directory automatically to the parent folder of the buffer file
vim.opt.number = true
vim.opt.relativenumber = true
vim.opt.scrolloff = 10    -- keep X lines above and below cursor when scrolling
-- vim.opt.colorcolumn = '120'
-- vim.opt.wrap = false   -- display long lines as just one line

vim.opt.hlsearch = true
vim.opt.incsearch = true
vim.opt.ignorecase = true

vim.opt.softtabstop = 2    -- number of spaces that a <Tab> counts for while performing editing operations
vim.opt.tabstop = 2        -- size (in spaces) of tab
vim.opt.shiftwidth = 2     -- number of spaces to use for each step of (auto)indent
vim.opt.expandtab = true   -- convert tabs to spaces
vim.opt.smartindent = true -- make indenting smart again
vim.opt.autoindent = true  -- copy indentation from previous line, and apply to next one

vim.opt.swapfile = false
vim.opt.backup = false
vim.opt.undodir = os.getenv("HOME") .. "/.vim/undodir"
vim.opt.undofile = true
