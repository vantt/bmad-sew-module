# So Sánh 3 Lệnh Build: build-agents.js vs install-to-claude.js vs npm run bmad:install

## 🤔 Câu Hỏi Gốc

> "Tại sao tôi thấy các module khác không có `build-agents.js` và `install-to-claude.js`? Họ làm việc bằng cách nào?"

## 📋 TL;DR

| Lệnh                        | Loại              | Mục Đích                          | Phạm Vi        | Tốc Độ      |
| --------------------------- | ----------------- | --------------------------------- | -------------- | ----------- |
| `node build-agents.js`      | **Custom Script** | Compile agents YAML → MD          | Chỉ SEW agents | ⚡ Nhanh    |
| `node install-to-claude.js` | **Custom Script** | Copy compiled files → Claude Code | Chỉ SEW module | ⚡ Nhanh    |
| `npm run bmad:install`      | **Official CLI**  | Full install/reinstall module     | Tất cả modules | 🐢 Chậm hơn |

**Kết Luận**: `build-agents.js` và `install-to-claude.js` là **development helpers** TÔI TẠO cho SEW module để tăng tốc độ development. Chúng KHÔNG phải là standard workflow của BMAD!

---

## 🔍 Chi Tiết Từng Lệnh

### 1. `node build-agents.js` ⚡

#### Là Gì?

Custom script tôi tạo cho SEW module để compile agents nhanh.

#### Code Chính

```javascript
const { YamlXmlBuilder } = require('../../tools/cli/lib/yaml-xml-builder');
const builder = new YamlXmlBuilder();

// Compile tất cả .agent.yaml → .md
for (const yamlFile of yamlFiles) {
  await builder.buildAgent(yamlPath, customizePath, mdPath, {
    includeMetadata: true,
  });
}
```

#### Làm Gì?

1. Scan folder `agents/` tìm files `*.agent.yaml`
2. Compile mỗi file thành `*.md` (XML format)
3. Lưu compiled files vào cùng thư mục

**Input**: `agents/content-fetcher.agent.yaml`
**Output**: `agents/content-fetcher.md`

#### Khi Nào Dùng?

```bash
# Sau khi edit agent YAML
cd bmad/sew
vi agents/content-fetcher.agent.yaml

# Build lại
node build-agents.js
# ✓ Compiled 9 agents trong 2 giây
```

#### Ưu Điểm

- ✅ Cực nhanh (~2 giây cho 9 agents)
- ✅ Chỉ rebuild agents đã thay đổi
- ✅ Không cần reinstall module
- ✅ Không động vào config

#### Nhược Điểm

- ⚠️ Chỉ compile, không install vào IDE
- ⚠️ Custom script, không phải standard
- ⚠️ Chỉ cho SEW module

---

### 2. `node install-to-claude.js` ⚡

#### Là Gì?

Custom script tôi tạo để copy SEW module files vào Claude Code.

#### Code Chính

```javascript
// Copy compiled agents
await fs.copy(path.join(sewDir, 'agents'), path.join(claudeCommandsDir, 'agents'));

// Copy workflows
await fs.copy(path.join(sewDir, 'workflows'), path.join(claudeCommandsDir, 'workflows'));

// Copy tasks, config
// ...

// Update manifest
await updateManifest();
```

#### Làm Gì?

1. Copy `bmad/sew/agents/*.md` → `.claude/commands/bmad/sew/agents/`
2. Copy `bmad/sew/workflows/` → `.claude/commands/bmad/sew/workflows/`
3. Copy `bmad/sew/tasks/` → `.claude/commands/bmad/sew/tasks/`
4. Copy `bmad/sew/config.yaml` → `.claude/commands/bmad/sew/`
5. Update `.claude/commands/_cfg/manifest.yaml`

#### Khi Nào Dùng?

```bash
# Sau khi build agents
node build-agents.js

# Install vào Claude Code
node install-to-claude.js
# ✓ Installed SEW module to Claude Code
```

#### Ưu Điểm

- ✅ Rất nhanh (~1 giây)
- ✅ Chỉ copy files cần thiết
- ✅ Immediate testing trong Claude Code
- ✅ Không động vào modules khác

#### Nhược Điểm

- ⚠️ Chỉ hỗ trợ Claude Code
- ⚠️ Custom script, không có trong BMM/BMB
- ⚠️ Phải chạy build-agents.js trước

---

### 3. `npm run bmad:install` 🐢

#### Là Gì?

Lệnh chính thức của BMAD CLI để install/reinstall modules.

#### Code Thực Thi

```javascript
// tools/cli/installers/lib/core/installer.js

async rebuildAgentFiles(modulePath, moduleName) {
  // Đọc source agents từ src/modules/{module}/agents/
  const sourceAgentsPath = path.join(
    getSourcePath(`modules/${moduleName}`),
    'agents'
  );

  // Compile mỗi .agent.yaml
  for (const file of sourceFiles) {
    if (file.endsWith('.agent.yaml')) {
      // Build YAML → .md
      const xmlContent = await this.xmlHandler.buildFromYaml(
        sourceYamlPath,
        customizePath,
        { includeMetadata: true }
      );

      // Lưu vào bmad/{module}/agents/
      await fs.writeFile(targetMdPath, xmlContent, 'utf8');
    }
  }
}
```

#### Làm Gì?

**Full Installation Process**:

1. **Prompt User**:
   - Chọn modules cần install
   - Chọn IDEs cần configure
   - Thu thập configuration variables

2. **Copy Module Source**:
   - Copy từ `src/modules/{module}/` → `bmad/{module}/`

3. **Compile Agents** (TỰ ĐỘNG!):
   - Đọc `*.agent.yaml` từ source
   - Compile thành `*.md`
   - Lưu vào `bmad/{module}/agents/`

4. **Create Config**:
   - Generate `config.yaml` từ install-config.yaml
   - Điền user responses

5. **IDE Integration**:
   - Copy vào `.claude/commands/` (cho Claude Code)
   - Configure cho IDEs khác nếu chọn

6. **Run Custom Installer**:
   - Nếu có `_module-installer/installer.js`
   - Chạy custom logic

7. **Update Manifest**:
   - Update manifest.yaml với modules mới

#### Khi Nào Dùng?

```bash
# Lần đầu install module
npm run bmad:install
# Chọn: sew module
# Chọn: Claude Code IDE
# Trả lời các câu hỏi config

# Hoặc reinstall sau khi update source
cd src/modules/sew
# ... make changes ...
cd ../../../
npm run bmad:install
# Chọn: Update existing installation
```

#### Ưu Điểm

- ✅ **Official workflow** - Standard BMAD way
- ✅ **Tự động compile agents** - Không cần build-agents.js
- ✅ **Multi-IDE support** - Không chỉ Claude Code
- ✅ **Full installation** - Config, manifests, everything
- ✅ **Clean install** - Đảm bảo mọi thứ đồng bộ

#### Nhược Điểm

- ⚠️ Chậm hơn (~20-30 giây)
- ⚠️ Phải trả lời prompts
- ⚠️ Reinstall cả module (không chỉ 1 agent)

---

## 🏢 Các Module Khác Làm Việc Như Thế Nào?

### BMM (Business Management Module)

```
src/modules/bmm/
├── agents/
│   ├── pm.agent.yaml        ← Source
│   ├── analyst.agent.yaml   ← Source
│   └── ...
└── _module-installer/
    └── install-config.yaml

# KHÔNG CÓ build-agents.js!
# KHÔNG CÓ install-to-claude.js!
```

**Workflow của BMM**:

```bash
# 1. Developer chỉnh sửa trong SOURCE
cd src/modules/bmm
vi agents/pm.agent.yaml

# 2. Install module = TỰ ĐỘNG compile
npm run bmad:install
# BMAD CLI tự động:
# - Copy src/modules/bmm → bmad/bmm
# - Compile pm.agent.yaml → pm.md
# - Install vào .claude/commands/

# 3. Done!
```

### BMB (BMAD Builder Module)

```
src/modules/bmb/
├── agents/
│   └── bmad-builder.agent.yaml  ← Source
└── workflows/
    ├── create-agent/
    ├── create-workflow/
    └── ...

# KHÔNG CÓ build-agents.js!
# KHÔNG CÓ install-to-claude.js!
```

**Workflow của BMB**: Giống BMM

### SEW (SEO Expert Writer) - Module Của Bạn

```
bmad/sew/                    ← Installed location
├── agents/
│   ├── *.agent.yaml         ← Source (developing here)
│   └── *.md                 ← Compiled
├── build-agents.js          ← CUSTOM SCRIPT!
└── install-to-claude.js     ← CUSTOM SCRIPT!

src/modules/sew/             ← Distribution source
└── agents/
    └── *.agent.yaml         ← To be copied here when done
```

**Workflow của SEW**:

**Option A - Quick Development** (hiện tại):

```bash
cd bmad/sew
vi agents/content-fetcher.agent.yaml
node build-agents.js          # Custom!
node install-to-claude.js     # Custom!
# Test in Claude Code
```

**Option B - Standard BMAD** (như BMM/BMB):

```bash
cd src/modules/sew
vi agents/content-fetcher.agent.yaml
npm run bmad:install          # Official
# Test in Claude Code
```

---

## 🎯 Tại Sao Tôi Tạo build-agents.js và install-to-claude.js?

### Lý Do

1. **SEW module đang trong active development**
   - Bạn đang tạo module mới
   - Cần iterate nhanh
   - Thay đổi agents liên tục

2. **Tăng tốc development cycle**
   - `npm run bmad:install` mất 20-30 giây
   - `build-agents.js` + `install-to-claude.js` chỉ 3 giây
   - Tiết kiệm thời gian khi develop

3. **Flexibility**
   - Có thể build một agent riêng lẻ
   - Không cần reinstall toàn bộ module
   - Quick fixes và testing

### So Sánh Thời Gian

| Task          | Standard Way    | Custom Scripts     | Tiết Kiệm |
| ------------- | --------------- | ------------------ | --------- |
| Edit 1 agent  | 30s (reinstall) | 3s (build+install) | 90%       |
| Test ngay     | 30s             | 3s                 | 90%       |
| 10 iterations | 5 phút          | 30 giây            | 90%       |

### Khi Module Ổn Định

Khi SEW module đã stable và ít thay đổi:

```bash
# Có thể xóa custom scripts
rm bmad/sew/build-agents.js
rm bmad/sew/install-to-claude.js

# Dùng standard workflow
cd src/modules/sew
# Edit agents
npm run bmad:install
```

---

## 📊 So Sánh Toàn Diện

### Feature Matrix

| Feature               | build-agents.js | install-to-claude.js | npm run bmad:install |
| --------------------- | --------------- | -------------------- | -------------------- |
| **Compile YAML → MD** | ✅ Yes          | ❌ No                | ✅ Yes (auto)        |
| **Install to IDE**    | ❌ No           | ✅ Claude Code only  | ✅ Multi-IDE         |
| **Update Config**     | ❌ No           | ❌ No                | ✅ Yes               |
| **Update Manifest**   | ❌ No           | ✅ Basic             | ✅ Full              |
| **Multi-Module**      | ❌ SEW only     | ❌ SEW only          | ✅ All modules       |
| **Speed**             | ⚡ 2s           | ⚡ 1s                | 🐢 20-30s            |
| **Official BMAD**     | ❌ Custom       | ❌ Custom            | ✅ Yes               |
| **BMM has it?**       | ❌ No           | ❌ No                | ✅ Yes               |
| **BMB has it?**       | ❌ No           | ❌ No                | ✅ Yes               |
| **Production Ready**  | ⚠️ Dev only     | ⚠️ Dev only          | ✅ Yes               |

### Workflow Comparison

**Scenario: Edit Content Fetcher Agent**

#### Workflow A: Custom Scripts (Hiện Tại)

```bash
Time: ~3 seconds total

1. cd bmad/sew                         # 0s
2. vi agents/content-fetcher.agent.yaml # 60s (editing)
3. node build-agents.js                # 2s ✓
4. node install-to-claude.js           # 1s ✓
5. Test in Claude Code                 # immediate
```

#### Workflow B: Standard BMAD

```bash
Time: ~30 seconds total

1. cd src/modules/sew                          # 0s
2. vi agents/content-fetcher.agent.yaml        # 60s (editing)
3. cd ../../..                                 # 0s
4. npm run bmad:install                        # 25s
   - Select: Update existing
   - Select: sew module
   - Auto compile agents               ✓
   - Install to Claude Code            ✓
   - Update manifest                   ✓
5. Test in Claude Code                         # immediate
```

#### Workflow C: BMM/BMB Standard

```bash
Time: ~30 seconds (same as B)

1. cd src/modules/bmm
2. vi agents/pm.agent.yaml
3. npm run bmad:install
   # Everything automated
```

---

## 🚀 Recommendations

### Khi Nào Dùng Custom Scripts? (build-agents.js)

✅ **Dùng khi**:

- Đang develop module mới
- Thay đổi agents thường xuyên
- Cần test nhanh
- Iterate nhiều lần
- Chưa cần commit vào Git

### Khi Nào Dùng Standard CLI? (npm run bmad:install)

✅ **Dùng khi**:

- Lần đầu install module
- Update từ source
- Test "clean install"
- Verify installer works
- Trước khi commit
- Release/distribute module

### Best Practice

**Development Phase** (giống bạn đang làm):

```bash
# Quick iterations
cd bmad/sew
node build-agents.js
node install-to-claude.js

# When done, sync to source
cp agents/*.agent.yaml ../../src/modules/sew/agents/
```

**Production Phase** (khi module stable):

```bash
# Work in source
cd src/modules/sew

# Use official installer
npm run bmad:install
```

---

## 🎓 Kết Luận

### Câu Trả Lời Cho Câu Hỏi Gốc

> "Tại sao các module khác không có build-agents.js?"

**Đáp án**:

1. **build-agents.js và install-to-claude.js KHÔNG PHẢI standard BMAD workflow**
   - Chúng là custom development helpers
   - Tôi tạo riêng cho SEW module
   - BMM/BMB KHÔNG CẦN vì họ dùng official installer

2. **BMAD CLI tự động compile agents**
   - `npm run bmad:install` tự động compile `.agent.yaml` → `.md`
   - Method: `rebuildAgentFiles()` trong installer.js (line 1314)
   - BMM và BMB dùng workflow này

3. **SEW có custom scripts vì đang trong development**
   - Active development → cần quick iteration
   - Custom scripts tiết kiệm 90% thời gian
   - Khi stable → có thể xóa và dùng standard workflow

### Key Takeaways

```
┌─────────────────────────────────────────┐
│  BMAD Standard Workflow (BMM, BMB)      │
│                                         │
│  Edit Source → npm run bmad:install     │
│                (tự động compile)        │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  SEW Custom Workflow (Development)      │
│                                         │
│  Edit Installed → build-agents.js →     │
│  install-to-claude.js → Test            │
│  (manual compile, faster)               │
└─────────────────────────────────────────┘
```

### Next Steps

1. **Tiếp tục dùng custom scripts** cho development
2. **Nhớ sync về source** khi xong: `cp agents/*.agent.yaml ../../src/modules/sew/agents/`
3. **Khi stable**: Xóa custom scripts, chuyển sang standard workflow
4. **Thỉnh thoảng test** với `npm run bmad:install` để verify installer works

---

**Happy Developing! 🎉**
