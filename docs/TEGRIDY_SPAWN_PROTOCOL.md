# 🎨 TEGRIDY SPAWN PROTOCOL — GLM-5 ONLY

**CRITICAL RULE:** Tegridy is the Brand Architect. He ONLY runs on GLM-5. Never substitute.

---

## The Problem We Fixed

**Symptom:** Tegridy spawns were falling back to `claude-opus-4-6` instead of using `zai/glm-5`.

**Root Cause:** The fallback chain in `openclaw.json` was:
```
primary: kimi-coding/k2p5 → fallback: anthropic/claude-opus-4-6
```

When spawning with `model=GLM`, if there was ANY issue with GLM-5 availability, OpenClaw fell back to Claude.

**Solution:** Added Tegridy-specific agent entry in `openclaw.json` with:
- Empty fallbacks array (`[]`)
- Required provider: `zai`
- Explicit denyFallback: `true`

---

## ✅ CORRECT Way to Spawn Tegridy

### Method 1: Using Agent ID (RECOMMENDED)
```bash
sessions_spawn \
  agentId=tegridy \
  task="Your creative task here"
```

This uses the `agents.entries.tegridy` config which:
- Forces `zai/glm-5`
- Has NO fallbacks
- Uses `workspace-tegridy`

### Method 2: Using Model Alias (Backup)
```bash
sessions_spawn \
  agentId=main \
  model=GLM \
  workspace=~/.openclaw/workspace-tegridy \
  task="Your creative task here"
```

**⚠️ WARNING:** This method can still fall back if GLM-5 is unavailable. **Always verify with `subagents list` after spawning.**

---

## 🔍 Verification Protocol

**AFTER every Tegridy spawn, run:**

```bash
subagents list
```

**Expected output:**
```
tegridy-brand-work (glm-5, 2m) running
```

**If you see:**
```
tegridy-brand-work (claude-opus-4-6, 2m) running
```

**KILL IT IMMEDIATELY:**
```bash
subagents kill <session-key>
```

Then respawn using Method 1 (agentId=tegridy).

---

## 🛠️ Configuration Details

**File:** `~/.openclaw/openclaw.json`

**Tegridy Entry:**
```json
"agents": {
  "entries": {
    "tegridy": {
      "name": "Tegridy",
      "description": "Brand Architect - Creative work ONLY on GLM-5",
      "model": {
        "primary": "zai/glm-5",
        "fallbacks": []
      },
      "models": {
        "zai/glm-5": {
          "alias": "GLM"
        }
      },
      "workspace": "/home/randy_clawdbot/.openclaw/workspace-tegridy",
      "spawn": {
        "denyFallback": true,
        "requiredProvider": "zai"
      }
    }
  }
}
```

---

## 🚨 Emergency Procedures

### If Tegridy Spawns on Wrong Model

1. **Check immediately:**
   ```bash
   subagents list
   ```

2. **If wrong model (claude-opus-4-6):**
   ```bash
   subagents kill <session-key>
   ```

3. **Respawn using agentId=tegridy:**
   ```bash
   sessions_spawn agentId=tegridy task="..."
   ```

4. **Verify again:**
   ```bash
   subagents list
   ```

### If GLM-5 is Unavailable

**DO NOT spawn Tegridy on another model.**

**Options:**
1. Wait for GLM-5 to come back online
2. Do the creative work yourself (Randy)
3. Defer the task

**Never** let Tegridy run on Opus, Codex, or Kimi. His creative voice is distinct.

---

## 📋 Quick Reference Card

| Task Type | Spawn Command | Model |
|-----------|---------------|-------|
| **Creative/Brand** | `sessions_spawn agentId=tegridy task="..."` | GLM-5 ONLY |
| Architecture | `sessions_spawn agentId=main model=opus task="..."` | Opus |
| Coding | `sessions_spawn agentId=main model=codex task="..."` | Codex |
| Coordination | (default) | Kimi |

---

## ✅ Pre-Flight Checklist for Randy

Before spawning Tegridy:
- [ ] Task is creative/brand work (not architecture or coding)
- [ ] Using `agentId=tegridy` (not `agentId=main model=GLM`)
- [ ] Ready to verify with `subagents list`
- [ ] Know how to kill if wrong model

---

## History

- **2026-02-21:** Fixed Tegridy fallback issue by adding dedicated agent entry with empty fallbacks array
- **Previous:** Tegridy incorrectly spawned on claude-opus-4-6 twice before fix

---

*This protocol is MANDATORY. Tegridy's creative voice is brand-critical.*
