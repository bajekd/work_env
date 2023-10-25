require('lualine').setup({
	theme = "dracula-nvim",
	sections = {
		lualine_a = { "mode" },
		lualine_b = { "branch" },
    -- path options: 0=just filename, 1=relative path, 2=absolute path
		lualine_c = { { "filename", path = 1, symbols = { modified = "  ", readonly = "", unnamed = "" } } },
		lualine_y = { "" },
		lualine_x = { "" },
		lualine_z = { "" },
	},
	component_separators = "|",
	section_separators = "|"
})
