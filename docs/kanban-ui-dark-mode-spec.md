# Mission Control Kanban UI — Dark Mode Edition

## Reference
Exact replica of pbteja1998's Mission Control UI (shown in reference image) but in **dark mode**.

## Layout Structure (Exact Match)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  MISSION CONTROL          11 AGENTS ACTIVE      35 TASKS IN QUEUE    12:30  ● ONLINE │
│                                    Docs                                         │
├──────────────┬──────────────────────────────────────────────────────────┬───────────────┤
│              │  ◄ MISSION QUEUE                                    ►   │               │
│   AGENTS     │  Inbox  Assigned  In Progress  Review  Done            │    LIVE FEED  │
│   ───────    │   (3)    (5)         (7)        (4)    (12)           │               │
│              │                                                         │   All Tasks ▼ │
│  👤 Bhanu    │  ┌──────────────────────────────────────────────────┐  │   Comments ▼  │
│     LEAD     │  │                                                  │  │               │
│  🟢 Founder  │  │  ┌──────────────┐ ┌──────────────┐               │  │   All Agents  │
│     WORKING  │  │  │ Task Card 1  │ │ Task Card 4  │               │  │   👤👤👤👤👤   │
│              │  │  │              │ │              │               │  │   👤👤👤👤👤   │
│  🔧 Friday   │  │  │ Title:       │ │ Title:       │               │  │   👤👤        │
│     DEV      │  │  │ Description  │ │ Description  │               │  │               │
│  🟢 Working  │  │  │              │ │              │               │  │   • Quill     │
│              │  │  │ [Low] 🏷️     │ │ [Medium] 🏷️  │               │  │   commented   │
│  👁️ Fury     │  │  │ 👤 Assignee  │ │ 👤 Assignee  │               │  │   on "Write   │
│     RESEARCH │  │  │ 💬 3  ⏱️ 2d  │ │ 💬 1  ⏱️ 5h  │               │  │   Customer    │
│  🟢 Working  │  │  └──────────────┘ └──────────────┘               │  │   Case..."    │
│              │  │                                                  │  │               │
│  🎯 Jarvis   │  │  ┌──────────────┐ ┌──────────────┐               │  │   • Friday    │
│     LEAD     │  │  │ Task Card 2  │ │ Task Card 5  │               │  │   commented   │
│  🟢 Working  │  │  │              │ │              │               │  │   on "Design   │
│              │  │  │ ...          │ │ ...          │               │  │   Expansion   │
│  ✍️ Loki      │  │  └──────────────┘ └──────────────┘               │  │   Revenue..." │
│     CONTENT  │  │                                                  │  │               │
│  🟢 Working  │  │  ┌──────────────┐                                │  │   • Pepper    │
│              │  │  │ Task Card 3  │                                │  │   commented   │
│  📧 Pepper    │  │  │              │                                │  │   on "Design   │
│     EMAIL    │  │  │ ...          │                                │  │   Expansion   │
│  🟢 Working  │  │  └──────────────┘                                │  │   Revenue..." │
│              │  │                                                  │  │               │
│  🐦 Quill     │  │                                                  │  │               │
│     SOCIAL   │  │                                                  │  │               │
│  🟢 Working  │  │                                                  │  │               │
│              │  │                                                  │  │               │
│  🔍 Shuri     │  │                                                  │  │               │
│     PRODUCT  │  │                                                  │  │               │
│  🟢 Working  │  │                                                  │  │               │
│              │  │                                                  │  │               │
│  👁️ Vision    │  │                                                  │  │               │
│     SEO      │  │                                                  │  │               │
│  🟢 Working  │  │                                                  │  │               │
│              │  │                                                  │  │               │
│  🎨 Wanda     │  │                                                  │  │               │
│     DESIGN   │  │                                                  │  │               │
│  🟢 Working  │  │                                                  │  │               │
│              │  │                                                  │  │               │
│  📝 Wong      │  │                                                  │  │               │
│     DOCS     │  │                                                  │  │               │
│  🟢 Working  │  │                                                  │  │               │
│              │  └──────────────────────────────────────────────────┘  │               │
└──────────────┴──────────────────────────────────────────────────────────┴───────────────┘
```

## OUR ADAPTATION (4 Agents)

**Left Sidebar (AGENTS):**
```
AGENTS
──────

🦀 Randy
COORDINATOR
🟢 Working
───────────
Task: "Build Kanban UI"
• 2 tasks assigned

🧠 Opus
ARCHITECT
🟡 Busy
───────────
Task: "Design API"
• 1 task assigned

👨‍💻 Codex
BUILDER
🟢 Working
───────────
Task: "Implement UI"
• 1 task assigned

🎨 Tegridy
BRAND
🟡 Active
───────────
Task: "Write content"
• 1 task assigned
```

## Dark Mode Color Palette

| Element | Light (Reference) | Dark (Our Version) |
|---------|-------------------|-------------------|
| **Background** | Warm cream #faf9f6 | Deep charcoal #0f0f0f |
| **Sidebar BG** | Off-white #ffffff | Dark gray #1a1a1a |
| **Card BG** | White #ffffff | Slightly lighter #242424 |
| **Column BG** | Light gray #f5f4f0 | Dark #1e1e1e |
| **Text Primary** | Ink black #1a1a1a | Off-white #f5f5f5 |
| **Text Secondary** | Warm gray #6b6b6b | Muted gray #9ca3af |
| **Border/Divider** | Warm sepia #d4c5b5 | Subtle border #333333 |
| **Priority High** | Deep rust | Red-500 #ef4444 |
| **Priority Medium** | Mustard | Yellow-500 #eab308 |
| **Priority Low** | Sage | Blue-400 #60a5fa |
| **Agent Randy** | Terracotta | Orange-500 #f97316 |
| **Agent Opus** | Deep plum | Purple-500 #a855f7 |
| **Agent Codex** | Forest | Green-500 #22c55e |
| **Agent Tegridy** | Rosewood | Pink-500 #ec4899 |
| **Accent (Online)** | Green | Green-400 #4ade80 |
| **Accent (Busy)** | Yellow | Yellow-400 #facc15 |

## Typography

- **Headlines:** Playfair Display (keep the editorial feel)
- **Body/UI:** Inter (clean, readable)
- **Monospace (timestamps):** JetBrains Mono or similar

## Exact Component Specifications

### 1. Header Bar
```
┌──────────────────────────────────────────────────────────────────────────────────┐
│  MISSION CONTROL          4 AGENTS ACTIVE       42 TASKS IN QUEUE     9:15  ● ONLINE │
│  ═══════════════                                                                   │
└──────────────────────────────────────────────────────────────────────────────────┘
```
- Left: "MISSION CONTROL" in Playfair Display, all caps, letter-spaced
- Center: Stats with icons (👥 agents, 📋 tasks)
- Right: Time + Online indicator (green dot)

### 2. Left Sidebar (AGENTS)
- Width: ~260px
- Background: Dark gray #1a1a1a
- Each agent card:
  ```
  ┌─────────────────────────┐
  │  🦀 Randy               │
  │     COORDINATOR         │
  │     🟢 Working          │
  │     ─────────────────   │
  │     Task: "Build..."    │
  │     • 2 tasks           │
  └─────────────────────────┘
  ```
- Status dot: 🟢 (online/working), 🟡 (busy), ⚪ (idle)
- Click agent to filter board

### 3. Center (MISSION QUEUE)
- 5 columns: INBOX, ASSIGNED, IN PROGRESS, REVIEW, DONE
- Column headers with count badges
- Horizontal scroll if needed
- Cards stacked vertically

**Task Card Design:**
```
┌────────────────────────────┐
│ Build Kanban UI            │ ← Bold title
│                            │
│ Design a visual, drag-...  │ ← Description (2 lines)
│                            │
│ ────────────────────────   │
│ 🔴 High   🏷️ frontend      │ ← Priority + tags
│ 👤👤      💬 3   ⏱️ 2d     │ ← Assignees, comments, time
│  Randy   Opus              │
└────────────────────────────┘
```

### 4. Right Sidebar (LIVE FEED)
- Top: Filter buttons (All, Tasks, Comments, Decisions, etc.)
- Agent avatars row (click to filter)
- Activity stream with:
  - Timestamp
  - Agent avatar
  - Action description
  - Task reference

**Activity Item:**
```
• Quill commented on "Write Customer Case Studies (Brent + Will)"
  Quill about 2 hours ago
```

## Card Details

### Task Card Elements:
1. **Title** (bold, white)
2. **Description** (muted, 2-line clamp)
3. **Divider** (subtle line)
4. **Bottom row:**
   - Priority badge (colored dot + text)
   - Tags (pills)
   - Assignee avatars (overlapping circles)
   - Comment count (💬 + number)
   - Time ago (⏱️ + relative time)

### Hover States:
- Card: Slight lift (translateY -2px), brighter border
- Agent in sidebar: Background highlight
- Buttons: Opacity change

## Animations

| Interaction | Behavior |
|-------------|----------|
| Drag card | Card lifts, rotates slightly, shadow increases |
| Drop card | Smooth settle, column flashes subtly |
| Card hover | Lift + border glow |
| Agent click | Filter applied, non-matching cards fade |
| New activity | Slide in from right |

## Responsive

**Desktop (1400px+):** Full 3-panel layout
**Tablet (1000px-1399px):** Collapsible sidebars
**Mobile (<1000px):** 
- Bottom nav for switching views
- Swipe between columns
- Agent filter as horizontal scroll

## Data Integration

**Convex Queries:**
- `tasks:listTasks` — All tasks
- `tasks:getTasksByStatus` — Filter by column
- `agents:listAgents` — Agent list with status
- `activities:getActivityFeed` — Live feed

**Real-time:**
- Subscribe to task changes
- Subscribe to new activities
- Live status updates

## Dark Mode Specifics

1. **Contrast:** Maintain WCAG AA (4.5:1 minimum)
2. **Borders:** Use subtle borders (#333) not harsh lines
3. **Shadows:** Use colored glows instead of black shadows
   - Card hover: `box-shadow: 0 4px 20px rgba(0,0,0,0.5)`
4. **Accents:** Use vibrant colors against dark background
5. **Code/Monospace:** Use darker background for timestamps

## File Structure
```
app/
├── page.tsx                    # Main layout (3 panels)
├── layout.tsx                  # Dark theme, fonts
├── globals.css                 # Dark mode variables
├── components/
│   ├── header.tsx              # Top bar with stats
│   ├── agent-sidebar.tsx       # Left panel (agents)
│   ├── kanban-board.tsx        # Center columns
│   ├── column.tsx              # Single column
│   ├── task-card.tsx           # Individual task
│   ├── task-detail.tsx         # Expanded view
│   ├── activity-feed.tsx       # Right panel
│   ├── activity-item.tsx       # Single activity
│   ├── filters.tsx             # Filter buttons
│   └── convex-client.tsx       # Provider
├── lib/
│   └── utils.ts                # Helpers
└── hooks/
    └── use-tasks.ts            # Convex subscriptions
```

## Deployment
```bash
vercel --prod
```

## Environment
```env
NEXT_PUBLIC_CONVEX_URL=https://quixotic-axolotl-517.convex.cloud
```

## Success Criteria
- [ ] Exact replica of reference layout
- [ ] Dark mode colors applied consistently
- [ ] All 4 agents showing in sidebar
- [ ] 5 kanban columns functional
- [ ] Drag-and-drop between columns
- [ ] Activity feed showing real-time updates
- [ ] Agent filtering works
- [ ] Deployed and accessible
