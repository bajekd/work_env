-- Modes
--   normal_mode = "n",
--   insert_mode = "i",
--   visual_mode = "v",
--   visual_block_mode = "x",
--   term_mode = "t",
--   command_mode = "c",

-- navigation
vim.keymap.set("n", "<C-d>", "<C-d>zz")
vim.keymap.set("n", "<C-u>", "<C-u>zz")
vim.keymap.set("n", "n", "nzzz")
vim.keymap.set("n", "N", "Nzzz")

vim.keymap.set("n", "<leader>J", "mzJ`z")
vim.keymap.set("v", "J", ":m '>+1<CR>gv=gv")
vim.keymap.set("v", "K", ":m '<-2<CR>gv=gv")
vim.keymap.set("v", "H", "dhP`[v`]")
vim.keymap.set("v", "L", "dp`[v`]")

-- splits 
vim.keymap.set("n", "<leader>v", ":vsplit<cr>")
vim.keymap.set("n", "<leader>x", ":split<cr>")

-- cycle through buffers
vim.keymap.set("n", "K", ":bn<cr>")
vim.keymap.set("n", "J", ":bp<cr>")

-- set window movement 
vim.keymap.set('n', '<leader>h', '<C-w>h')
vim.keymap.set('n', '<leader>j', '<C-w>j')
vim.keymap.set('n', '<leader>k', '<C-w>k') vim.keymap.set('n', '<leader>-l', '<C-w>l')
vim.keymap.set('n', '<leader>l', '<C-w>l')

-- resize by arrows in normal mode
vim.keymap.set("n", "<left>", ":vertical resize -5<cr>")
vim.keymap.set("n", "<right>", ":vertical resize +5<cr>")
vim.keymap.set("n", "<up>", ":horizontal resize +5<cr>")
vim.keymap.set("n", "<down>", ":horizontal resize -5<cr>")

-- close
vim.keymap.set("n", "<leader>q", ":q<cr>")

-- yanking and pasting
vim.keymap.set("x", "<leader>p", [["_dP]]) -- copy, highlight and still paste
vim.keymap.set({"n", "v"}, "<leader>y", [["+y]]) -- copy to system clipbord

-- quit hlsearch
vim.keymap.set("n", "qq", ":noh<cr>")

-- substitute text under cursor
vim.keymap.set("n", "<leader>s", [[:%s/\<<C-r><C-w>\>/<C-r><C-w>/gI<Left><Left><Left>]])

-- reload
vim.keymap.set("n", "<leader>r", ":so<cr>")
