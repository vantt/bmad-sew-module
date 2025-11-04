# SEW Module - Development Workflow Guide

## 🤔 Câu Hỏi Quan Trọng: Làm Việc Ở Đâu?

> **TL;DR**:
>
> - **Development/Source**: `src/modules/sew/`
> - **Installation Target**: `bmad/sew/`
> - **IDE Runtime**: `.claude/commands/bmad/sew/`

---

## 📁 Hiểu Cấu Trúc Thư Mục

### Cấu Trúc Project BMAD

```
bmadv6/                              # Project root
│
├── src/                             # 🔵 SOURCE CODE (cho distribution)
│   ├── core/                        # BMAD Core source
│   └── modules/                     # Modules source
│       ├── bmm/                     # BMM source
│       ├── bmb/                     # BMB source
│       ├── cis/                     # CIS source
│       └── sew/                     # 🎯 SEW SOURCE (DEVELOP HERE!)
│           ├── agents/              # Agent YAML sources
│           ├── workflows/           # Workflow sources
│           ├── tasks/               # Task sources
│           ├── _module-installer/   # Installer config
│           └── config.yaml          # Template config
│
├── bmad/                            # 🟢 INSTALLED MODULES (target)
│   ├── core/                        # Core installed
│   ├── bmb/                         # BMB installed
│   ├── bmd/                         # BMD installed
│   └── sew/                         # 🎯 SEW INSTALLED (runtime copy)
│       ├── agents/                  # Compiled agents
│       ├── workflows/               # Workflows
│       ├── tasks/                   # Tasks
│       └── config.yaml              # Runtime config (generated)
│
└── .claude/                         # 🟣 IDE INTEGRATION (Claude Code)
    └── commands/
        └── bmad/
            └── sew/                 # SEW for Claude Code
                ├── agents/          # .md files
                ├── workflows/
                └── tasks/
```

---

## 🔄 Quy Trình Hoạt Động

### 1. Source vs Installed vs IDE

```
┌─────────────────────┐
│  src/modules/sew/   │  🔵 SOURCE
│  (Development)      │  - Nơi bạn DEVELOP
│                     │  - Version control (Git)
│                     │  - Edit agents, workflows, tasks
└──────────┬──────────┘
           │
           │ npm run bmad:install
           │ (Installer copies)
           ▼
┌─────────────────────┐
│  bmad/sew/          │  🟢 INSTALLED
│  (Runtime)          │  - Target installation
│                     │  - Runtime configs
│                     │  - Compiled agents
└──────────┬──────────┘
           │
           │ Installer also creates
           │
           ▼
┌─────────────────────┐
│  .claude/           │  🟣 IDE ARTIFACTS
│  commands/bmad/sew/ │  - For Claude Code
│  (IDE Integration)  │  - Agent .md files
│                     │  - Workflows, tasks
└─────────────────────┘
```

### 2. Installation Flow

```
Developer edits:
src/modules/sew/agents/my-agent.agent.yaml
           ↓
Run: npm run bmad:install
           ↓
Installer reads: src/modules/sew/
           ↓
Copies to: bmad/sew/
           ↓
Compiles: .agent.yaml → .md
           ↓
Copies to: .claude/commands/bmad/sew/
           ↓
Claude Code can now use the agent
```

---

## ⚠️ Vấn Đề Hiện Tại

### Tình Huống của Bạn

Bạn đã:

1. ✅ Work trực tiếp trong `bmad/sew/` (installed location)
2. ✅ Create agents bằng create-agent workflow → lưu vào `bmad/sew/`
3. ✅ Copy manual sang `src/modules/sew/`
4. ❓ Bây giờ có 2 versions khác nhau

**Vấn đề**:

- `bmad/sew/` có latest changes (Content Fetcher v2.0)
- `src/modules/sew/` có old version
- Khi run installer lại, sẽ overwrite `bmad/sew/` với old version từ `src/modules/sew/`

---

## ✅ Giải Pháp: Sync Workflow

### Option 1: Manual Sync (Hiện Tại - Khuyến Nghị)

**Workflow bạn đã làm** (và đúng rồi!):

```bash
# 1. Develop trong bmad/sew/ (vì đã có sẵn)
cd bmad/sew
vi agents/content-fetcher.agent.yaml
vi tasks/fetch-and-save-content.task.xml

# 2. Build và test local
node build-agents.js
node install-to-claude.js
# Test agent in Claude Code

# 3. Khi hoàn thiện, sync về source
cp -r bmad/sew/* src/modules/sew/
# Hoặc sync từng file quan trọng:
cp bmad/sew/agents/*.agent.yaml src/modules/sew/agents/
cp bmad/sew/tasks/*.task.xml src/modules/sew/tasks/
cp bmad/sew/workflows/ src/modules/sew/workflows/ -r

# 4. Commit vào Git (source)
git add src/modules/sew/
git commit -m "feat: Add Content Fetcher v2.0"
```

**Ưu điểm**:

- ✅ Quick iteration
- ✅ Test ngay lập tức
- ✅ Không cần reinstall liên tục

**Nhược điểm**:

- ⚠️ Phải nhớ sync về source
- ⚠️ Có thể quên sync một số files

### Option 2: Develop in Source (Lý Tưởng cho Future)

**Workflow chuẩn** (nên dùng cho development tiếp theo):

```bash
# 1. Develop trực tiếp trong source
cd src/modules/sew
vi agents/new-agent.agent.yaml

# 2. Test bằng cách reinstall module
cd ../../../  # back to project root
npm run bmad:install
# Select: Update existing installation
# Select: sew module

# 3. Agents được copy và compile tự động
# bmad/sew/ và .claude/commands/ được update

# 4. Test in Claude Code

# 5. Commit (đã ở source rồi)
git add src/modules/sew/
git commit -m "feat: Add new agent"
```

**Ưu điểm**:

- ✅ Không cần manual sync
- ✅ Luôn work với source
- ✅ Git tracking tốt hơn

**Nhược điểm**:

- ⚠️ Phải reinstall mỗi lần test (chậm hơn)
- ⚠️ Không có build-agents.js nhanh

---

## 🎯 Workflow Đề Xuất: Hybrid Approach

### Cách Tốt Nhất (Kết Hợp 2 Options)

**1. Quick Development Cycle** (giống bạn đang làm):

```bash
# Work in bmad/sew/ for quick iterations
cd bmad/sew

# Edit → Build → Install → Test (fast loop)
vi agents/content-fetcher.agent.yaml
node build-agents.js
node install-to-claude.js
# Test in Claude

# Repeat until satisfied
```

**2. Sync to Source When Done**:

```bash
# Khi đã hoàn thiện feature, sync về source
rsync -av --exclude='*.md' --exclude='build-agents.js' --exclude='install-to-claude.js' \
  bmad/sew/ src/modules/sew/

# Hoặc selective copy
cp bmad/sew/agents/*.agent.yaml src/modules/sew/agents/
cp bmad/sew/tasks/*.task.xml src/modules/sew/tasks/
```

**3. Verify Sync**:

```bash
# So sánh 2 folders
diff -r bmad/sew/agents/ src/modules/sew/agents/ --exclude='*.md'
# Không có output = identical

# Hoặc dùng tool
# vimdiff bmad/sew/agents/content-fetcher.agent.yaml \
#         src/modules/sew/agents/content-fetcher.agent.yaml
```

**4. Commit Source**:

```bash
git add src/modules/sew/
git commit -m "feat(sew): Content Fetcher v2.0 với auto-save"
```

---

## 🛠️ Script Tự Động Sync

### Tạo Helper Script

Tôi sẽ tạo script để sync tự động:

**File: `bmad/sew/sync-to-source.sh`**

```bash
#!/bin/bash

# Sync SEW module from installed location to source
# Usage: ./sync-to-source.sh

SOURCE_DIR="../../src/modules/sew"
INSTALLED_DIR="."

echo "🔄 Syncing SEW Module: bmad/sew → src/modules/sew"

# Sync agents (YAML only, exclude compiled .md)
echo "📦 Syncing agents..."
rsync -av --exclude='*.md' agents/*.agent.yaml $SOURCE_DIR/agents/

# Sync tasks
echo "📦 Syncing tasks..."
rsync -av tasks/*.task.xml $SOURCE_DIR/tasks/

# Sync workflows
echo "📦 Syncing workflows..."
rsync -av --exclude='node_modules' workflows/ $SOURCE_DIR/workflows/

# Sync config (template only, not runtime)
if [ -f "config.yaml.template" ]; then
  echo "📦 Syncing config template..."
  cp config.yaml.template $SOURCE_DIR/config.yaml
fi

# Sync installer
echo "📦 Syncing installer..."
rsync -av _module-installer/ $SOURCE_DIR/_module-installer/

# Sync documentation
echo "📦 Syncing docs..."
cp README.md $SOURCE_DIR/ 2>/dev/null || true
cp CHANGELOG*.md $SOURCE_DIR/ 2>/dev/null || true
cp -r docs/ $SOURCE_DIR/ 2>/dev/null || true

echo "✅ Sync complete!"
echo ""
echo "📊 Verify with:"
echo "   diff -r bmad/sew/agents/ src/modules/sew/agents/ --exclude='*.md'"
echo ""
echo "💾 Commit changes:"
echo "   git add src/modules/sew/"
echo "   git commit -m 'sync: Update SEW module'"
```

---

## 📋 Checklist: Khi Nào Cần Sync?

### ✅ Sync to Source Khi:

- [ ] Hoàn thành một feature mới
- [ ] Fix bug quan trọng
- [ ] Thay đổi agents, workflows, tasks
- [ ] Update documentation
- [ ] Sẵn sàng commit vào Git
- [ ] Trước khi release/share module

### ⚠️ Không Cần Sync Khi:

- [ ] Đang experiment/test
- [ ] Chỉ thay đổi config.yaml runtime
- [ ] Debugging
- [ ] Quick iterations

---

## 🎓 Best Practices

### 1. Version Control

```bash
# Chỉ commit source
git add src/modules/sew/

# KHÔNG commit installed
# (bmad/ nên ở .gitignore)
echo "bmad/" >> .gitignore
echo ".claude/" >> .gitignore
```

### 2. Documentation

```bash
# Luôn update docs khi thay đổi
cd src/modules/sew
vi README.md
vi CHANGELOG.md
```

### 3. Testing

```bash
# Test workflow hoàn chỉnh thỉnh thoảng
cd ../../../
npm run bmad:install  # Reinstall từ source
# Verify everything works
```

---

## 🔍 Kiểm Tra Sync Status

### Script Check Sync

```bash
#!/bin/bash
# check-sync-status.sh

echo "🔍 Checking sync status..."

# Compare agents
echo "Agents:"
diff -qr bmad/sew/agents/ src/modules/sew/agents/ --exclude='*.md' | \
  grep -v "Only in bmad/sew/agents: .*.md"

# Compare tasks
echo "Tasks:"
diff -qr bmad/sew/tasks/ src/modules/sew/tasks/

# Compare workflows
echo "Workflows:"
diff -qr bmad/sew/workflows/ src/modules/sew/workflows/

echo "✅ Check complete"
```

---

## 📚 Summary

### Quy Trình Của Bạn (Hiện Tại) - ĐÚNG RỒI! ✅

```
1. Develop in bmad/sew/          ← Quick iteration
2. Build: node build-agents.js   ← Test locally
3. Install: install-to-claude.js ← Use in Claude
4. Test & iterate                ← Fast loop
5. When done: cp → src/modules/  ← Sync to source
6. Git commit src/modules/       ← Version control
```

### Quy Trình Lý Tưởng (Future) - Khi Module Ổn Định

```
1. Develop in src/modules/sew/   ← Source first
2. npm run bmad:install          ← Install to test
3. Test in Claude                ← Verify
4. Git commit src/modules/       ← Already in source
```

---

## 🎯 Action Items Cho Bạn

### Ngay Bây Giờ

```bash
# 1. Sync latest changes về source
cd bmad/sew
cp agents/*.agent.yaml ../../src/modules/sew/agents/
cp tasks/*.task.xml ../../src/modules/sew/tasks/
cp -r workflows/* ../../src/modules/sew/workflows/
cp README.md ../../src/modules/sew/
cp CHANGELOG-CONTENT-FETCHER.md ../../src/modules/sew/
cp CONTENT-FETCHER-UPGRADE-SUMMARY.md ../../src/modules/sew/
cp -r docs/ ../../src/modules/sew/

# 2. Verify
diff -r agents/ ../../src/modules/sew/agents/ --exclude='*.md'

# 3. Commit
git add ../../src/modules/sew/
git commit -m "feat(sew): Content Fetcher v2.0 with auto-save to file"
```

### Trong Tương Lai

- ✅ Continue working in `bmad/sew/` for quick dev
- ✅ Use `sync-to-source.sh` script khi done
- ✅ Luôn commit `src/modules/sew/` vào Git
- ✅ Thỉnh thoảng reinstall từ source để verify

---

## ❓ FAQ

**Q: Tại sao có 2 nơi?**
A: `src/modules/` là source để distribute, `bmad/` là nơi installed để run.

**Q: Tôi nên edit ở đâu?**
A: Edit ở `bmad/sew/` (nhanh), nhớ sync về `src/modules/sew/` khi xong.

**Q: Git commit cái nào?**
A: Chỉ commit `src/modules/sew/`, thêm `bmad/` vào `.gitignore`.

**Q: Khi nào cần reinstall?**
A: Khi muốn test "clean install" hoặc verify installer works.

**Q: Build scripts ở đâu?**
A: Scripts helper (`build-agents.js`, `install-to-claude.js`) để ở `bmad/sew/`, không commit vào source.

---

---

## 🎓 Lessons Learned from Implementation

### State Management Implementation (Nov 2025)

**What Went Well:**

1. ✅ **Design First** - Clear design document made implementation straightforward
2. ✅ **Modular Tasks** - state-manager and generate-project-id worked independently
3. ✅ **Incremental Testing** - Testing each component before integration saved time
4. ✅ **Documentation** - Comprehensive docs helped track progress and decisions

**Issues Encountered:**

**Issue #1: State File Format Mismatch**

- **Problem**: Test data created as `sessions/{id}.json` instead of `sessions/{id}/state.yaml`
- **Root Cause**: Manual test files created before tasks were implemented
- **Fix**: Cleanup script + proper folder structure
- **Lesson**: **Always use tasks/tools, never create test data manually**

**Issue #2: Project ID Missing Slug**

- **Problem**: Test project had `seo-project-001` instead of `seo-YYYYMMDD-HHmmss-slug`
- **Root Cause**: Test project created manually, not via generate-project-id task
- **Fix**: Rename script + slug generation verification
- **Lesson**: **Test tasks immediately after creation, verify format before committing**

**Issue #3: Workflow File Too Large**

- **Problem**: instructions.md grew to 650+ lines during implementation
- **Challenge**: Multiple attempts to update via scripts due to whitespace sensitivity
- **Solution**: Direct Edit tool with careful whitespace preservation
- **Lesson**: **For large structured files, use precise Edit operations**

### Best Practices Discovered

**1. Validation Early and Often**

- Create validation scripts (like `check-project-id-format.sh`)
- Run validation before committing changes
- Add regex pattern checks for format compliance

**2. Backup Before Big Changes**

- Create `.backup` files before bulk edits
- Use Git branches for experimental changes
- Keep working copies (`file.working`) during iteration

**3. Test Data Strategy**

- Use actual workflow to create test data
- Document test cases with real examples
- Clean up test data regularly

**4. Vietnamese Character Handling**

- Test slug generation with Vietnamese titles
- Verify accent removal mapping (á→a, ệ→e, ữ→u, etc.)
- Check truncation doesn't break at middle of word

**5. State Management**

- Update state after EVERY step completion
- Include timestamp with every state change
- Record human decisions in dedicated array
- Use deep merge for state updates to avoid data loss

**6. Error Recovery**

- Implement backup system (state.yaml.backup)
- Graceful degradation when files missing
- Clear error messages with recovery suggestions
- Allow resume from last good state

### Development Time Metrics

**State Management System (v2.0)**

- Design Phase: ~2 hours
- Implementation Phase 1 (Core): ~3 hours
- Bug Fixes: ~2 hours
- Implementation Phase 2 (Workflow): ~1 hour
- Documentation: ~2-3 hours
- **Total**: ~10-12 hours

**Key Insight**: Good design saved 50%+ implementation time by reducing confusion and rework.

### Testing Checklist for New Features

Before considering a feature "complete":

- [ ] Code implements design specification
- [ ] Unit tests pass (individual tasks/agents)
- [ ] Integration test passes (full workflow)
- [ ] Edge cases handled (errors, missing data, etc.)
- [ ] Vietnamese content tested
- [ ] State persistence verified
- [ ] Resume capability tested
- [ ] Documentation updated
- [ ] Examples provided
- [ ] Cleanup scripts created (if needed)

### Code Quality Standards

**File Naming**:

- Tasks: `{action}-{noun}.task.xml` (e.g., `generate-project-id.task.xml`)
- Agents: `{role}.agent.yaml` (e.g., `content-fetcher.agent.yaml`)
- Workflows: `{purpose}/workflow.yaml` (e.g., `seo-article-rewriting/workflow.yaml`)

**State File Standards**:

- Always YAML format (never JSON)
- Location: `sessions/{project-id}/state.yaml`
- Backup: `sessions/{project-id}/state.yaml.backup`
- Deep merge on updates (preserve existing fields)

**Output File Naming**:

- Format: `{step-number}-{descriptive-name}.{ext}`
- Examples: `01-raw-content.md`, `02-analysis-report.yaml`
- Always use 2-digit step numbers (01, 02, ..., 09)

---

## 📖 Related Docs

- `README.md` - Main documentation with quick start
- `prd-seo-rewriting-project.md` - Design and architecture
- `BUILD-COMMANDS-EXPLAINED.md` - Build system details

---

**Kết Luận**: Workflow bạn đang làm là ĐÚNG và hiệu quả! Chỉ cần nhớ sync về source khi xong feature. 🎉
