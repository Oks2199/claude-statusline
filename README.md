# Claude Statusline

Custom statusline for [Claude Code](https://code.claude.com/) CLI with context brick visualization. **Windows compatible** (also works on macOS/Linux).

Originally inspired by [contextbricks](https://www.npmjs.com/package/contextbricks) by Jeremy Dawes, rewritten in pure Node.js for Windows compatibility.

## Screenshot

```
[Opus] my-project:main *↑2 | +156/-23
[a1b2c3d] Add authentication system
[■■■■■■■■□□□□□□□□□□□□□□□□□□□□□□] 25% | 150k free | 0h12m | $0.50
```

## Features

- **Line 1**: Model | Repo:Branch | Git status (dirty/ahead/behind) | Lines changed
- **Line 2**: Last commit hash + message
- **Line 3**: Context bricks (30 blocks) | Usage % | Free tokens | Duration | Cost

## Requirements

- Node.js >= 14
- Git (optional, for git info)

## Install

```bash
# Clone
git clone https://github.com/Oks2199/claude-statusline.git

# Run installer (copies script + updates settings.json)
cd claude-statusline
node install.js
```

Or manually:

1. Copy `statusline.js` to `~/.claude/statusline.js`
2. Add to `~/.claude/settings.json`:

```json
{
  "statusLine": {
    "type": "command",
    "command": "node C:/Users/YOUR_USER/.claude/statusline.js",
    "padding": 0
  }
}
```

3. Restart Claude Code

## How it works

Claude Code pipes JSON session data to the script via stdin. The script parses it and outputs formatted text with ANSI colors to stdout. No external dependencies required (no `jq`, no `bash`).

### Data displayed

| Data | Source |
|------|--------|
| Model name | `model.display_name` |
| Git repo/branch | `git` commands via `execSync` |
| Git status | `git status --porcelain`, ahead/behind tracking |
| Lines changed | `cost.total_lines_added/removed` |
| Context usage | `context_window.used_percentage` (or calculated from `current_usage`) |
| Free tokens | Calculated from `remaining_percentage` |
| Duration | `cost.total_duration_ms` |
| Cost | `cost.total_cost_usd` |

## Windows notes

- Uses `fs.readFileSync(0)` for synchronous stdin reading (avoids pipe/stream issues on Windows)
- Uses `fs.writeFileSync(1)` for stdout output
- Git stderr is suppressed with `stdio: ['pipe', 'pipe', 'pipe']`
- Paths use forward slashes in settings.json for compatibility

## License

MIT
