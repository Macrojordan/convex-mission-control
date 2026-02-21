# Multi-Agent Model Configuration

**Status:** ✅ ALL MODELS OPERATIONAL (Feb 20, 2026)

## Model Aliases & Spawn Commands

| Agent | Role | Alias | Full Model | Workspace | Spawn Command |
|-------|------|-------|------------|-----------|---------------|
| **Randy** | Coordinator | — | `kimi-coding/k2p5` | `~/.openclaw/workspace` | (default) |
| **Opus** | Architect | `opus` | `anthropic/claude-opus-4-6` | `~/.openclaw/workspace-brain` | `sessions_spawn model=opus workspace=~/.openclaw/workspace-brain task="..."` |
| **Codex** | Builder | `codex` | `openai-codex/gpt-5.3-codex` | `~/.openclaw/workspace-codex` | `sessions_spawn model=codex workspace=~/.openclaw/workspace-codex task="..."` |
| **Tegridy** | Creative | `GLM` | `zai/glm-5` | `~/.openclaw/workspace-tegridy` | `sessions_spawn agentId=tegridy task="..."` ⭐ |

⭐ **NEW (Feb 21, 2026):** Use `agentId=tegridy` instead of `model=GLM`. This forces GLM-5 with NO fallbacks.

## Verification

```bash
# Check all models are configured
openclaw models status

# Expected output:
# Aliases (3): GLM -> zai/glm-5, Opus -> anthropic/claude-opus-4-6, Codex -> openai-codex/gpt-5.3-codex
# Configured models (3): zai/glm-5, anthropic/claude-opus-4-6, openai-codex/gpt-5.3-codex
```

## Authentication Status

| Provider | Auth Type | Status |
|----------|-----------|--------|
| `anthropic` | Token | ✅ Valid |
| `kimi-coding` | API Key | ✅ Valid |
| `openai-codex` | OAuth | ✅ Valid (expires in 6d) |
| `zai` | API Key | ✅ Valid |

## Common Mistakes (AVOID)

| ❌ Wrong | ✅ Correct | Notes |
|----------|------------|-------|
| `model=opus-4-6` | `model=opus` | Use alias, not full path |
| `model=openai-codex` | `model=codex` | Use alias, not full path |
| `model=zai/glm-5` | `model=GLM` | Use alias, not full path |
| `model=anthropic/claude-opus-4-6` | `model=opus` | Aliases ONLY |
| `sessions_spawn model=GLM ...` | `sessions_spawn agentId=tegridy ...` | **NEW:** Use agentId for Tegridy |

## ⚠️ CRITICAL: TEGRIDY = GLM ONLY (UPDATED Feb 21, 2026)

**Tegridy is the Brand Architect and MUST always run on GLM-5 (`zai/glm-5`).**

### ✅ CORRECT Way to Spawn Tegridy (NEW)

```bash
sessions_spawn agentId=tegridy task="Your creative task here"
```

**⚠️ IMPORTANT:** Always verify the model after spawning (see Verification Protocol below).

### 🔍 Verification Protocol

**CRITICAL:** OpenClaw may fall back to Claude if GLM-5 is unavailable. **Always verify:**

```bash
subagents list
```

**Expected:** `tegridy-task-name (zai/glm-5, Xm) running`

**If you see:** `tegridy-task-name (claude-opus-4-6, Xm) running` → **KILL IT**

```bash
subagents kill <session-key>
# Then respawn
```

### Why This Matters

- **Creative work** (brand, copy, design, strategy) → **GLM ONLY**
- Tegridy's creative voice is distinct on GLM-5
- Running on Claude produces different (inferior for creative) results
- Manual verification required until OpenClaw supports enforced model locking

**Full Protocol:** `docs/TEGRIDY_SPAWN_PROTOCOL.md`

## Troubleshooting

**Error: "model not allowed"**
1. Check `openclaw models status` — verify aliases exist
2. Verify auth: `openclaw auth status`
3. Never use full model paths — aliases only

**Error: Codex spawn fails immediately**
- Codex uses OAuth (not API key) — token expires every 7 days
- Check: `openai-codex:default ok expires in Xd`
- Re-authenticate if needed: `openclaw auth login openai-codex`

---

# Replit Core — FULL ACCESS (PERMANENT TOOL)

**Account:** rubencfc@gmail.com (Core tier)  
**Status:** ✅ ACTIVE — First-class deployment and prototyping platform  
**URL:** https://replit.com/~

## What This Unlocks

### 1. Instant Self-Hosting
- **Full-stack apps** — Node.js, Python, Go, Ruby, etc.
- **Auto-deploy** — Push to production with one click
- **Custom domains** — Professional URLs for client demos
- **Always-on** — No more Render sleeping/freezing

### 2. Mobile App Testing (HUGE OPPORTUNITY)
**Replit's mobile apps got a major upgrade recently.**
- Test mobile workflows natively
- Build mobile-first prototypes
- Client demos on actual phones
- Real device testing without App Store hassle

### 3. Client Demo Environments
- **One Repl per client** — Isolated, branded environments
- **Live collaboration** — Clients can see changes in real-time
- **Instant sharing** — URL-based demos, no downloads
- **Professional presentations** — "Let me show you live..."

### 4. Vibe-Coding Playground
- **Rapid MVPs** — Build and deploy during conversation
- **Multi-agent testing** — Sandboxed environment for AI experiments
- **Integration testing** — Try APIs without breaking production
- **Template library** — Reusable starters for common patterns

## When to Use Replit

| Scenario | Action |
|----------|--------|
| Client needs quick prototype | Spin up Replit, vibe-code it live |
| Testing mobile workflows | Use Replit mobile apps |
| Mission Control hosting | Deploy to Replit (already configured) |
| "Let me show you..." | Live Replit demo, instant URL |
| Multi-agent experiments | Isolated Repl sandbox |
| Client-specific tools | One Repl per client, customized |

## Deployment Pattern

```bash
# Replit auto-deploys from GitHub
# Just push and it goes live

git add .
git commit -m "Feature X"
git push origin main
# Replit auto-deploys
```

## Key Features

- **Secrets management** — Built-in env var handling
- **PostgreSQL included** — Auto-provisioned databases
- **GitHub integration** — Import/export seamlessly
- **Replit Agent** — AI coding assistant built-in
- **Mobile apps** — iOS & Android for testing

## Rule: Just Build

**Don't ask permission.** If something needs hosting, prototyping, or mobile testing — Replit it. This is a permanent tool in my arsenal.

---

# Oura Ring Account

**Token:** 5VEWFQ6LU7JKI5X7RYPPCIHIV2NM6JI7  
**Purpose:** Daily bio-data for morning brief + recovery insights  
**API:** https://api.ouraring.com/v2/usercollection/  
**Status:** ✅ Active - full integration complete

## Oura Integration Protocol (DEFAULT MODE)

**Command:** `node ~/.openclaw/workspace/scripts/oura-morning-brief.js`

### What It Does (6 Components)
1. **Smart Alerts** — Only alerts when HRV crashes, sleep debt accumulates, or recovery peaks
2. **Actionable Recommendations** — Every insight has a specific action (not just scores)
3. **Pattern Correlation** — Links late-night sessions to next-day HRV impact
4. **Workout Accountability** — Tracks Mon/Wed/Fri pattern, alerts on misses
5. **Sleep Drift Detection** — Catches bedtime creeping later than 11pm target
6. **Weekly Synthesis** — One deep analysis instead of daily noise

### Morning Brief Format
- **Ultra-concise:** 3-4 lines max
- **Focus areas:** Sleep quality, Resilience index (HRV trends)
- **Action-oriented:** What to do today based on body state
- **No raw data dumps:** Insights only

### Output Files
- Daily: `memory/oura-brief-YYYY-MM-DD.md`
- Weekly: `memory/oura-weekly-YYYY-MM-DD.md`

### Usage
```bash
# Daily brief (for morning brief integration)
node scripts/oura-morning-brief.js

# Weekly deep-dive
node scripts/oura-weekly.js

# JSON output for automation
node scripts/oura-morning-brief.js --json
```

---

# Twitter/X Account

**Email:** randyclawd@gmail.com
**Password:** Clawdbot001125!
**Purpose:** Monitor trending AI/tech topics, distill for Ruben
**Policy:** NO interaction/posting — observation only

## Bird CLI (X Scraper)

**Installation:** `npm install -g @steipete/bird` (already installed at `~/.nvm/versions/node/v22.22.0/bin/bird`)
**Status:** ✅ **WORKING** — Auth configured via environment variables

**Usage:**
```bash
# Following feed (For You)
bird-home

# Search tweets
bird-search "AI agents" -n 20

# Read specific tweet
bird-read <tweet-url>
```

**Wrapper Functions (add to `.bashrc`):**
```bash
export AUTH_TOKEN="37cb64805b9c588075a4d0d88d20eea64b3e353e"
export CT0="291ca8353149714e2e33b05d19564b7d7224cec63a7f43b763755c0aefb0f4c5a652afa8226711ae7d5176c6778d1d0cbf9b6cc266402841416d2357f8cd11c27b4ba0df7f97f5fbaff7239298ffed8e"

alias bird-home='~/.nvm/versions/node/v22.22.0/bin/bird home --plain'
alias bird-search='~/.nvm/versions/node/v22.22.0/bin/bird search --plain'
alias bird-read='~/.nvm/versions/node/v22.22.0/bin/bird read'
alias bird-whoami='~/.nvm/versions/node/v22.22.0/bin/bird whoami'
```

**Note:** Auth expires periodically — update `AUTH_TOKEN` and `CT0` in `.bashrc` when needed

# Gmail Account

**Email:** randyclawd@gmail.com  
**App Password:** *[Stored in .secrets/]*  
**Purpose:** Email management via Himalaya CLI

# GitHub Account

**Username:** Macrojordan  
**Token:** *[Stored in .secrets/]*  
**Purpose:** Manage repos, issues, PRs

# Railway Account

**Token:** *[Stored in .secrets/]*  
**Purpose:** Deploy webapps (Mission Control, etc)

# Netlify Account

**Token:** *[Stored in .secrets/]*  
**Purpose:** Deploy static sites

# Anthropic API Account

**API Key:** *[Stored in .secrets/anthropic-key]*  
**Purpose:** Claude Opus 4.5 access

# Brave Search Account

**API Key:** BSASFKl717ZGby37xCFAnSKjiY5BHss
**Purpose:** Web search capabilities
**Status:** ✅ Active

# Oura Ring Account

**Token:** 5VEWFQ6LU7JKI5X7RYPPCIHIV2NM6JI7
**Purpose:** Daily bio-data for morning brief
**Endpoints:**
- https://api.ouraring.com/v2/usercollection/daily_sleep
- https://api.ouraring.com/v2/usercollection/daily_activity  
- https://api.ouraring.com/v2/usercollection/daily_readiness
**Status:** ✅ Active

# Google Cloud Account

**OAuth Client ID:** 737314354733-j58267q2n57ijkbs3m05fmi6nu2a0v2b.apps.googleusercontent.com
**Project ID:** randy-486221
**Status:** ✅ OAuth complete - Gmail access working

# rubencfc@gmail.com Gmail

**Email:** rubencfc@gmail.com
**Access:** Via Google OAuth API
**Scopes:** Gmail readonly
**Status:** ✅ Active - can read emails
**Token stored:** ~/.openclaw/workspace/.secrets/rubencfc-gmail-token.json

# Notion Second Brain Sync

**Script:** `~/.openclaw/workspace/scripts/notion-sync.js`
**Parent Page ID:** `2fe8af51-5108-805b-b7d4-d40e6208017d`
**Purpose:** Mirror local second-brain/ to Notion for user access

**Usage:**
```bash
# Full sync
node ~/.openclaw/workspace/scripts/notion-sync.js

# Single file
node ~/.openclaw/workspace/scripts/notion-sync.js research/my-doc.md
```

**Rule:** Run after EVERY write to second-brain/

# Sharp (Image Processing)

**Package:** sharp (Node.js)
**Location:** Installed in workspace (`~/.openclaw/workspace/node_modules/sharp`)
**Purpose:** Crop, resize, remove backgrounds, convert image formats

**Usage:**
```javascript
const sharp = require('sharp');

// Remove white background
await sharp('input.jpg')
  .ensureAlpha()
  .flatten({ background: { r: 255, g: 255, b: 255, alpha: 0 } })
  .png()
  .toFile('output.png');

// Crop sprite from sheet
await sharp('spritesheet.png')
  .extract({ left: 0, top: 0, width: 100, height: 100 })
  .toFile('sprite.png');

// Resize
await sharp('large.png')
  .resize(200, 200)
  .toFile('small.png');
```

**Capabilities:** Crop, resize, rotate, flip, sharpen, blur, composite, format conversion, background removal (simple)

# OpenRouter API

**API Key:** *[Stored in .secrets/]*  
**Base URL:** https://openrouter.ai/api/v1  
**Purpose:** Route AI model calls (LLM, TTS, etc.)

# OpenAI API

**API Key:** *[Stored in .secrets/]*  
**Purpose:** TTS (gpt-4o-mini-tts), direct API access

# Image Generation (DALL-E 3)

**API:** OpenAI Images API (api.openai.com/v1/images/generations)
**Model:** dall-e-3
**Auth:** Same OpenAI API key
**Sizes:** 1024x1024, 1024x1792, 1792x1024
**Usage:**
```bash
curl -s -X POST "https://api.openai.com/v1/images/generations" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"dall-e-3","prompt":"...","n":1,"size":"1024x1024"}'
```
**Status:** ✅ Active — tested Feb 7, 2026

---

# Browser Automation — RELIABILITY HIERARCHY (UPDATED 2026-02-11)

## 🏆 Option 1: Browserless (Docker) — MOST RELIABLE ⭐ DEFAULT
**Status:** ✅ ACTIVE — Running on port 3000
**Container:** `browserless/chrome` (auto-restart enabled)

**Why it's the best:**
- No Chrome extension flakiness
- No port conflicts with OpenClaw gateway
- Persistent, always-on
- Headless = faster and more stable
- REST API + WebSocket (Puppeteer/Playwright)

**How to use:**
```bash
# Screenshots (REST API)
curl -s -X POST http://localhost:3000/screenshot \
  -H 'Content-Type: application/json' \
  -d '{"url":"https://example.com","options":{"fullPage":false}}' \
  --output screenshot.png

# Puppeteer via WebSocket
const puppeteer = require('puppeteer-core');
const browser = await puppeteer.connect({
  browserWSEndpoint: 'ws://localhost:3000'
});
```

**Check status:** `curl -s http://localhost:3000 | head -1`

---

## 🥈 Option 2: OpenClaw Managed Browser (`openclaw` profile)
**Status:** ⚠️ Available but secondary to Browserless

**When to use:**
- Quick tasks when Browserless is down
- OpenClaw-native workflows
- Don't want to manage Docker

**How to use:**
```bash
# Start
openclaw browser start --profile openclaw

# Check
openclaw browser status --json

# In code
browser({ action: "snapshot", profile: "openclaw" })
```

**Requires:** Playwright installed in gateway

---

## 🥉 Option 3: Chrome Extension Relay (`chrome` profile)
**Status:** ⚠️ LEAST RELIABLE — avoid unless necessary

**Why it fails:**
- Extension connection drops randomly
- Requires user to click toolbar icon
- Port conflicts with gateway
- Tabs detach unpredictably

**Only use when:**
- Must interact with logged-in sites
- Need real Chrome session
- No other option works

---

## 🎯 Decision Tree

```
Need browser automation?
├── Complex interactions/forms → Browserless (Option 1)
├── Screenshots/PDFs → Browserless REST API
├── Quick check → web_fetch (no browser needed)
├── Must use logged-in Chrome → Option 3 (last resort)
└── OpenClaw-native only → Option 2
```

**Default:** Always try Browserless first. It's running 24/7 now.

---

# Browser Automation Protocol — HARDWIRED

**CRITICAL RULE — February 11, 2026:**

## The Reliability Hierarchy

After extensive troubleshooting, I've established a **strict priority order** for browser automation:

| Rank | Method | Reliability | When to Use |
|------|--------|-------------|-------------|
| **1** | **Browserless (Docker)** | ⭐⭐⭐⭐⭐ BULLETPROOF | **DEFAULT for all browser tasks** |
| **2** | **OpenClaw Managed (`openclaw`)** | ⭐⭐⭐☆☆ Good | Backup when Browserless is down |
| **3** | **Chrome Extension Relay (`chrome`)** | ⭐☆☆☆☆ FLAKY | **LAST RESORT ONLY** |

## Why This Hierarchy Exists

**Browserless (Docker) — Port 3000:**
- ✅ No Chrome extension flakiness
- ✅ No OpenClaw gateway dependency
- ✅ Auto-restart on crash
- ✅ REST API + WebSocket (Puppeteer/Playwright)
- ✅ Headless = faster, more stable
- ✅ Persistent container (survives reboots)

**OpenClaw Managed (`openclaw` profile):**
- ⚠️ Requires gateway running
- ⚠️ Playwright must be installed
- ✅ Still headless, no extension needed
- ✅ Native OpenClaw integration

**Chrome Extension Relay (`chrome` profile):**
- ❌ Connection drops randomly
- ❌ Requires user to click toolbar icon
- ❌ Port conflicts with gateway
- ❌ Tabs detach unpredictably
- ✅ Only use for logged-in sites that need real Chrome

## The Default Rule

**ALWAYS try Browserless first.** It's running 24/7 now.

```bash
# Check if it's running
curl -s http://localhost:3000 | head -1

# Screenshot via REST API
curl -s -X POST http://localhost:3000/screenshot \
  -H 'Content-Type: application/json' \
  -d '{"url":"https://example.com"}' \
  --output screenshot.png

# Puppeteer via WebSocket
const browser = await puppeteer.connect({
  browserWSEndpoint: 'ws://localhost:3000'
});
```

## When to Use What

**Browserless (Option 1):**
- Screenshots, PDFs
- Form filling, automation
- Scraping dynamic sites
- Any complex interaction

**OpenClaw Managed (Option 2):**
- Quick checks when Browserless down
- OpenClaw-native workflows preferred
- Don't want to write Puppeteer code

**Chrome Extension (Option 3):**
- MUST access logged-in Chrome session
- No other option works
- Document why in the task log

## Remember

- **web_fetch** is still best for simple static pages
- Browser automation is a last resort, not a first choice
- When Browserless fails, check `docker ps` to see if container is running
- Restart if needed: `sudo docker restart browserless`

---

# QMD Memory Backend — NATIVE INDEXING

**QMD is now the native memory backend for OpenClaw.** The `memory_search` tool automatically uses QMD's hybrid search (BM25 + vector + re-ranking) instead of basic search.

## How It Works

- ✅ **Auto-indexing:** Memory files indexed on boot, every 5 min, and on file changes
- ✅ **Session transcripts:** Automatically indexed (90-day retention)
- ✅ **Hybrid search:** Vector + BM25 + LLM re-ranking for best results
- ✅ **Zero maintenance:** No manual `qmd embed` needed

## Using Memory

```javascript
// This now uses QMD automatically (was basic search before)
memory_search({ query: "topic", maxResults: 6 })
```

**CLI fallback (for advanced queries):**
```bash
# Deep semantic search
qmd vsearch "topic" --json

# Hybrid with re-ranking (best quality)
qmd query "topic" --json

# Fast keyword search
qmd search "topic" --json

# Force re-index if needed
qmd embed
```

## Separation of Concerns

- **QMD (randy-memory):** Your operational memory — everything about you, Ruben, AgentBoss, active projects
- **Second Brain (NOT indexed):** Ruben's personal knowledge base — stays separate per his request

**Config location:** `~/.openclaw/openclaw.json` → `memory.backend: "qmd"`

---

# Cron Job Rules — HARDWIRED

**CRITICAL RULE — February 6, 2026 (Opus 4.6 fix):**

## The Isolated Session Telegram Problem

**Isolated cron sessions CANNOT send Telegram messages.** They have no chat context.

**When cron needs to send to Telegram:**
- ❌ `sessionTarget: "isolated"` + `payload.kind: "agentTurn"` → FAILS
- ❌ `message` tool with `target: "@username"` from isolated session → FAILS
- ✅ `sessionTarget: "main"` + `payload.kind: "systemEvent"` → WORKS (injects into main session)
- ✅ Reply normally from main session → Auto-routes to Telegram

## The Rule for ALL Cron Jobs

| If Cron Needs To... | Use This Config |
|---------------------|-----------------|
| Send Telegram message immediately | `sessionTarget: "main"`, `payload.kind: "systemEvent"`, `wakeMode: "now"` |
| Do background work, no output | `sessionTarget: "isolated"`, `payload.kind: "agentTurn"` |
| Prep content for later delivery | `sessionTarget: "isolated"`, save to file, main session sends |

## Current Fixed Cron Jobs

| Job | Session | Status |
|-----|---------|--------|
| Daily Security Audit (3am) | main | ✅ FIXED |
| OpenClaw Updates (4am) | main | ✅ FIXED |
| Overnight Work (11pm) | isolated | ✅ OK (no Telegram) |
| Morning Brief PREP (6:30am) | isolated | ✅ OK (prepares only) |
| Morning Brief DELIVERY (8am) | main | ✅ FIXED |
| Web Tools Health Check (9am) | main | ✅ ACTIVE |

## Future Cron Jobs — MANDATORY CHECKLIST

Before creating ANY cron job:
- [ ] Does it need to send Telegram messages? → Use `sessionTarget: "main"`
- [ ] Does it only write files/logs? → Can use `sessionTarget: "isolated"`
- [ ] Is it an alert/notification? → MUST use `sessionTarget: "main"`

**Never assume isolated sessions can message Telegram. They can't.**

---

# Second Brain Sync — HARDWIRED

**CRITICAL RULE — February 6, 2026:**

## The Mirror System

**Every time I write to `workspace/second-brain/`, I MUST sync to Notion.**

```bash
# After ANY second-brain file write:
node ~/.openclaw/workspace/scripts/notion-sync.js
```

## Why This Exists

- **Local files** → QMD indexes them (fast semantic search for me)
- **Notion mirror** → Ruben can actually see/access the content
- **Both stay in sync** → Best of both worlds

## What Gets Synced

| Local Path | Notion Location |
|------------|-----------------|
| `second-brain/research/` | SECOND BRAIN → research |
| `second-brain/x-musings/` | SECOND BRAIN → x-musings |
| `second-brain/agentboss-inbox/` | SECOND BRAIN → agentboss-inbox |

## Sync Command

```bash
# Full sync (all files)
node ~/.openclaw/workspace/scripts/notion-sync.js

# Single file sync
node ~/.openclaw/workspace/scripts/notion-sync.js path/to/file.md

# Dry run (preview only)
node ~/.openclaw/workspace/scripts/notion-sync.js --dry-run
```

## The Rule

🚨 **NEVER write to second-brain without syncing to Notion.**

If I create/update any file in `workspace/second-brain/`:
1. Write the file locally (as usual)
2. Run the sync script immediately after
3. Confirm sync succeeded

**Notion Page ID:** `2fe8af51-5108-805b-b7d4-d40e6208017d`

---

# Mission Control Sync System

## Overview

The Mission Control bidirectional sync system provides robust, production-ready synchronization between local state and the Mission Control API.

**Scripts:**
- `scripts/mc-client.js` - Base API client with logging
- `scripts/mc-full-sync.js` - Full bidirectional sync with backups
- `scripts/mc-create-task.js` - Create tasks with duplicate detection
- `scripts/mc-update-task.js` - Update tasks with idempotency guards
- `scripts/mc-health.js` - Health check endpoint

## Quick Commands

```bash
# Health check
node scripts/mc-health.js

# Full sync (pull only)
node scripts/mc-full-sync.js

# Full sync with backup before push
node scripts/mc-full-sync.js --push

# Create task (warns if duplicate)
node scripts/mc-create-task.js "Task Title" --project AgentBoss --priority high

# Create task (force, skip duplicate check)
node scripts/mc-create-task.js "Task Title" --project AgentBoss --force

# Update task (skips if no changes)
node scripts/mc-update-task.js 123 --status review

# Dry run (preview changes)
node scripts/mc-full-sync.js --dry-run
```

## Safety Features

**Duplicate Detection (mc-create-task.js):**
- Fuzzy matches titles (80% similarity threshold)
- Checks only within same project
- Skips completed tasks
- Use `--force` to override

**Idempotency Guards (mc-update-task.js):**
- Fetches current state before updating
- Skips API call if no changes detected
- Saves bandwidth and API calls

**Backup Before Push (mc-full-sync.js):**
- Creates `memory/backups/mc-state-backup-TIMESTAMP.json`
- Keeps last 10 backups automatically
- Restorable if push goes wrong

**Error Logging:**
- All API calls logged to `logs/mc-sync.log`
- Timestamped entries with log levels
- 30-day log rotation
- Error responses captured

## Heartbeat Integration

**Every heartbeat, run:**
```bash
node scripts/mc-full-sync.js
```

This replaces the old `mc-sync.sh` script.

**State file:** `memory/mc-state.json`
**Log file:** `logs/mc-sync.log`

## Health Check

Run `node scripts/mc-health.js` to verify:
- ✅ API connectivity
- ✅ Authentication valid
- ✅ Can read projects
- ✅ Can read tasks

Exit code 0 = healthy, 1 = issues detected.

---

# Mission Control Workflow

**CRITICAL RULE — February 6, 2026:**

## The Shared Board Philosophy

**Mission Control is a COORDINATION TOOL between Randy and Ruben** — NOT Randy's personal task list.

Both of us use it. Both of us move tasks. The workflow reflects our collaboration.

## Column Definitions

| Column | What It Means | Who Moves Tasks IN | Who Moves Tasks OUT |
|--------|---------------|-------------------|---------------------|
| **Backlog** | Ideas, future work, "someday" items, blocked tasks | Either of us | Randy (when starting work) |
| **To Do** | Ready to work, prioritized, clear scope | Either of us | Randy (when picking up) |
| **In Progress** | Currently being worked on by someone | Randy (when starting) | Randy (when his part is done) |
| **Review** | Randy's work complete, awaiting Ruben's review/approval | Randy (when he finishes) | Ruben (after reviewing) |
| **Done** | BOTH parties satisfied, fully complete | Ruben (after review) | Nobody |

## State Transition Rules

**Backlog → To Do:**
- Task is clear enough to start
- Priority established
- No blockers remaining

**To Do → In Progress:**
- Randy starts working on it
- (Or: Ruben is working on something — rare but possible)

**In Progress → Review:**
- Randy finishes his part of the work
- Code written, docs created, research done
- Ready for Ruben's eyes

**Review → Done:**
- Ruben has reviewed AND approved
- Any requested changes incorporated
- Both parties agree it's complete

**Review → In Progress:**
- Ruben requests changes
- Randy needs to revise

## The Critical Rule

🚨 **Randy's completed work goes to REVIEW, not DONE.**

**Done = Ruben has seen it and agreed it's complete.**

Examples of what should be in REVIEW (not Done):
- Lince Partners work (Randy finished, Ruben hasn't reviewed)
- AgentBoss research/strategy documents
- Code deployments awaiting verification
- Any deliverable Ruben hasn't explicitly approved

## Backlog Usage

Backlog is for:
- 💡 Ideas we discussed but set aside
- 🔮 Future implementations we want to remember
- ⏸️ Tasks blocked by external factors
- 🗓️ "Someday/Maybe" items

**Don't let good ideas disappear** — put them in Backlog so they're tracked.

## Syncing Protocol

Every heartbeat:
1. Run `node scripts/mc-full-sync.js`
2. Compare with `memory/mc-state.json`
3. Note any changes in daily log
4. Update state file

When Randy completes work:
1. Move task to **Review** (not Done)
2. Update MC via API or manually
3. Notify Ruben if high priority

**Mission Control is source of truth. Don't maintain separate task lists.**
