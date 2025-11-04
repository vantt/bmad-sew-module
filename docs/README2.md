



## 🤖 Agents

Module bao gồm 9 agents chuyên môn:

| Agent                    | Icon | Vai Trò                                    |
| ------------------------ | ---- | ------------------------------------------ |
| **Master Orchestrator**  | 👑    | Tổng quản lý dự án, điều phối workflow     |
| **Content Analyzer**     | 🔍    | Phân tích nội dung gốc chuyên sâu          |
| **Market Insight Agent** | 📊    | Nghiên cứu thị trường, xu hướng, đối thủ   |
| **Adaptive Writer**      | ✍️    | Viết nội dung linh hoạt theo ngữ cảnh      |
| **SEO Specialist**       | 🎯    | Tối ưu hóa SEO (keywords, meta, structure) |
| **QA Editor**            | ✅    | Kiểm tra chất lượng, grammar, style        |
| **Debate Moderator**     | 💭    | Tranh luận và cải thiện ý tưởng            |
| **Publishing Formatter** | 📝    | Định dạng cuối cùng cho xuất bản           |
| **Content Fetcher**      | 🌐    | Thu thập nội dung từ URL                   |

---

## 🚀 Quick Start

### 1. Compile Agents (YAML → MD)

```bash
cd bmad/sew
node build-agents.js
```

### 2. Install vào Claude Code

```bash
node install-to-claude.js
```

### 3. Sử Dụng

Gọi agent trong Claude Code:

```
master-orchestrator
```

Hoặc chạy workflow:

```
/bmad:sew:workflows:seo-article-rewriting
```

---

## 📦 Project State Management

### Overview

SEW Module v2.0 includes full state management for tracking and resuming projects.

### Project ID Format

**Auto-generated:**
```
seo-{YYYYMMDD}-{HHmmss}-{slug}

Examples:
seo-20251103-143022-cach-hoc-tieng-anh
seo-20251104-091530-xu-huong-seo-2025
```

**Custom (user-defined):**
```
my-first-article
brand-awareness-campaign
product-launch-2025
```

### File Structure

Each project has its own folder with all outputs:

```
sessions/
└── seo-20251103-143022-cach-hoc-tieng-anh/
    ├── state.yaml                    # Master state file
    ├── 01-raw-content.md             # Fetched content
    ├── 02-analysis-report.yaml       # Content analysis
    ├── 02-market-insight.yaml        # Market research
    ├── 03-ideas-debate.yaml          # Ideas debate results
    ├── 04-approved-ideas.yaml        # Human approved
    ├── 05-outline-debate.yaml        # Outline debate
    ├── 06-final-outline.yaml         # Human approved outline
    ├── 07-first-draft.md             # First draft
    ├── 08-seo-optimized.md           # SEO optimized
    └── 09-final-publishable.yaml     # Final output
```

### State File (state.yaml)

```yaml
project:
  id: seo-20251103-143022-cach-hoc-tieng-anh
  title: 'Cách Học Tiếng Anh Hiệu Quả'
  created_date: '2025-11-03T14:30:22Z'
  last_updated: '2025-11-03T15:45:10Z'
  source_url: 'https://example.com/learn-english'

workflow:
  status: in_progress  # new | in_progress | completed
  current_step: 5
  completed_steps: [1, 2, 3, 4]
  total_steps: 9

variables:
  raw_content: 'sessions/.../01-raw-content.md'
  analysis_report: 'sessions/.../02-analysis-report.yaml'
  # ... all outputs from each step

human_approvals:
  - step: 4
    decision: approved
    timestamp: '2025-11-03T15:20:30Z'
```

### Commands

**Start New Project:**
```
master-orchestrator
> *start-seo-project
> [auto/custom]? auto
> URL: https://example.com/article

✓ Project ID: seo-20251103-143022-example-com
✓ State initialized
```

**Resume Project:**
```
master-orchestrator
> *resume-seo-project

Projects:
1. seo-20251103-143022-... (step 5/9)
2. seo-20251102-091530-... (step 3/9)

> Select: 1
✓ Loaded, continue from step 5
```

**List Projects:**
```
master-orchestrator
> *list-projects

╔══════════════════════╦════════════╦═══════╦══════╗
║ Project ID           ║ Title      ║ Status║ Step ║
╠══════════════════════╬════════════╬═══════╬══════╣
║ seo-20251103-143022  ║ Article... ║ prog  ║ 5/9  ║
╚══════════════════════╩════════════╩═══════╩══════╝
```

### Benefits

1. **Never Lose Work** - State saved after each step
2. **Resume Anytime** - Continue from where you left off
3. **Multiple Projects** - Work on many articles in parallel
4. **Full Traceability** - All outputs in one folder
5. **Easy Debugging** - Inspect intermediate outputs

---

## 📚 Hiểu về BMAD Method

### BMAD là gì?

**BMAD** (Breakthrough Method of Agile AI-driven Development) là một framework mã nguồn mở để xây dựng hệ thống AI agents có khả năng cộng tác với nhau và với con người.

### Triết Lý C.O.R.E.

BMAD được xây dựng trên 4 nguyên tắc cốt lõi:

- **C**ustom - Tùy chỉnh theo nhu cầu cụ thể
- **O**rchestrated - Điều phối đa agents
- **R**epeatable - Quy trình lặp lại được
- **E**xtensible - Mở rộng dễ dàng

### Kiến Trúc BMAD v6

```
BMAD Framework
├── Core (Always installed)
│   ├── Tasks (workflow.xml, create-doc.xml, etc.)
│   ├── Tools (validation, utilities)
│   └── Workflows (brainstorming, party-mode)
│
├── Modules (Optional, modular)
│   ├── BMM - Agile/Project Management
│   ├── BMB - Agent/Workflow Builder
│   ├── CIS - Creative Intelligence
│   └── SEW - SEO Expert Writer (This module!)
│
└── Custom Modules (Your creations)
    └── Your custom agents, workflows, tasks
```

---

## 🏗️ Kiến Trúc Agents

BMAD hỗ trợ 3 loại agents, mỗi loại phục vụ mục đích khác nhau:

### 1. Simple Agent 🔧

**Mục đích**: Utilities đơn giản, tự chứa logic

**Đặc điểm**:

- Tất cả logic được nhúng trong agent
- Không cần external dependencies
- Nhanh và đơn giản
- Tốt cho: calculators, converters, formatters

**Cấu trúc thư mục**:

```
bmad/agents/my-helper/
├── my-helper.agent.yaml    # Source
└── my-helper.md            # Compiled
```

**Ví dụ YAML**:

```yaml
agent:
  metadata:
    name: Calculator
    title: Simple Calculator
    icon: 🧮
    type: simple

  persona:
    role: I am a straightforward calculator
    identity: I help with quick math operations
    communication_style: Direct and efficient
    principles:
      - I provide accurate calculations
      - I explain my work clearly

  menu:
    - trigger: add
      action: 'Ask for two numbers, calculate sum, display result'
      description: Add two numbers

    - trigger: multiply
      action: 'Ask for two numbers, calculate product, display result'
      description: Multiply two numbers
```

### 2. Expert Agent 🎓

**Mục đích**: Agents chuyên môn với knowledge base và persistent memory

**Đặc điểm**:

- Có sidecar folder chứa knowledge, memories
- Hạn chế truy cập vào domain cụ thể
- Duy trì context giữa các sessions
- Tốt cho: personal coaches, domain experts, project assistants

**Cấu trúc thư mục**:

```
bmad/agents/domain-expert/
├── domain-expert.agent.yaml
├── domain-expert.md
└── domain-expert-sidecar/
    ├── memories.md          # Persistent memory
    ├── instructions.md      # Private directives
    ├── knowledge/          # Knowledge base
    │   └── README.md
    └── sessions/           # Session notes
```

**Ví dụ YAML** (phần critical_actions):

```yaml
agent:
  metadata:
    name: DiaryKeeper
    type: expert
    icon: 📔

  critical_actions:
    # MANDATORY: Load sidecar files
    - 'Load COMPLETE file {agent-folder}/instructions.md and follow ALL directives'
    - 'Load COMPLETE file {agent-folder}/memories.md into permanent context'
    - 'You MUST follow all rules in instructions.md on EVERY interaction'

    # Domain restrictions
    - 'ONLY read/write files in {project-root}/diary/'
    - 'NEVER access files outside diary folder'
```

### 3. Module Agent 🏢

**Mục đích**: Full-featured agents thuộc module, có workflows phức tạp

**Đặc điểm**:

- Thuộc về một module (bmm, bmb, sew, etc.)
- Truy cập nhiều workflows
- Tích hợp với module resources
- Tốt cho: Product Managers, Architects, SEO Specialists

**Cấu trúc**:

```
bmad/sew/agents/
├── master-orchestrator.agent.yaml
├── content-analyzer.agent.yaml
└── (compiled .md files)
```

**Ví dụ YAML**:

```yaml
agent:
  metadata:
    id: bmad/sew/agents/master-orchestrator.md
    name: MasterOrchestrator
    title: Tổng quản lý Dự án AI
    icon: 👑
    module: sew
    type: module

  persona:
    role: Strategic AI Project Manager
    identity: I orchestrate multi-agent workflows...
    communication_style: |
      I communicate in Vietnamese...
    principles:
      - I ensure all agents work in harmony
      - I maintain project vision and quality

  critical_actions:
    - 'Load config from {project-root}/bmad/core/config.yaml'
    - 'Load config from {project-root}/bmad/sew/config.yaml'
    - 'Remember the users name is {user_name}'
    - 'ALWAYS communicate in {communication_language}'

  menu:
    - trigger: rewrite-article
      workflow: '{project-root}/bmad/sew/workflows/seo-article-rewriting/workflow.yaml'
      description: Viết lại bài SEO hoàn chỉnh

    - trigger: analyze-content
      exec: '{project-root}/bmad/sew/tasks/analyze-content.task.xml'
      description: Phân tích nội dung nhanh
```

---

## 🔨 Cách Build Agents

### Phương Pháp 1: Sử Dụng Create Agent Workflow (Khuyến Nghị)

BMAD cung cấp workflow interactive để tạo agents:

```bash
# Trong Claude Code, gọi:
/bmad:bmb:workflows:create-agent
```

**Quy trình**:

1. **Optional Brainstorming** - Brainstorm ý tưởng agent
2. **Load Documentation** - Tự động load guides
3. **Discover Purpose** - Xác định mục đích và loại agent
4. **Shape Personality** - Xây dựng persona (role, identity, style, principles)
5. **Build Capabilities** - Định nghĩa commands và workflows
6. **Name Agent** - Đặt tên và icon
7. **Generate YAML** - Tự động tạo file YAML
8. **Validation** - Kiểm tra quality
9. **Setup Sidecars** (nếu Expert agent)
10. **Celebration!**

**Output**: File `.agent.yaml` được lưu vào:

- Module agent: `bmad/{module}/agents/`
- Standalone: `bmad/agents/{name}/`

### Phương Pháp 2: Viết YAML Thủ Công

Tạo file `my-agent.agent.yaml`:

```yaml
agent:
  metadata:
    id: bmad/sew/agents/my-agent.md
    name: MyAgent
    title: Tiêu đề Agent
    icon: 🎯
    module: sew
    type: module

  persona:
    role: |
      Vai trò chính của tôi

    identity: |
      Background và kinh nghiệm của tôi

    communication_style: |
      Cách tôi giao tiếp với users

    principles:
      - Nguyên tắc 1
      - Nguyên tắc 2
      - Nguyên tắc 3

  critical_actions:
    - 'Load config from {project-root}/bmad/sew/config.yaml'
    - 'ALWAYS communicate in {communication_language}'

  menu:
    - trigger: help
      description: Hiển thị menu commands

    - trigger: do-something
      workflow: '{project-root}/bmad/sew/workflows/something/workflow.yaml'
      description: Làm điều gì đó

    - trigger: exit
      description: Thoát agent
```

### Compile Agent

```bash
# Method 1: Module script (cho SEW)
cd bmad/sew
node build-agents.js

# Method 2: BMAD CLI
npx bmad-method build my-agent

# Method 3: Build all
npx bmad-method build --all
```

**Quá trình compile**:

```
my-agent.agent.yaml  →  YamlXmlBuilder  →  my-agent.md (XML)
```

File `.md` compiled chứa XML mà Claude Code hiểu:

```xml
<agent id="..." name="MyAgent" title="..." icon="🎯">
  <persona>...</persona>
  <critical-actions>...</critical-actions>
  <menu>...</menu>
</agent>
```

---

## 📝 Cách Tạo Workflows

### Workflow là gì?

Workflow là một quy trình multi-step, interactive để hoàn thành task phức tạp. Workflow guides LLM qua các bước cụ thể với user interaction.

### Minimal Workflow (3 phút)

**1. Tạo thư mục**:

```
bmad/sew/workflows/my-workflow/
```

**2. Tạo `workflow.yaml`**:

```yaml
name: 'my-workflow'
description: 'Mô tả workflow này làm gì'

# Paths
installed_path: '{project-root}/bmad/sew/workflows/my-workflow'
template: '{installed_path}/template.md'
instructions: '{installed_path}/instructions.md'
default_output_file: '{output_folder}/output.md'

# Configuration
config_source: '{project-root}/bmad/sew/config.yaml'
user_name: '{config_source}:user_name'
communication_language: '{config_source}:communication_language'

# Invocation
standalone: true # Can be called directly
```

**3. Tạo `template.md`**:

```markdown
# {{project_name}} - Output

## Nội Dung Chính

{{main_content}}

## Kết Luận

{{conclusion}}
```

**4. Tạo `instructions.md`**:

```markdown
<critical>Workflow engine: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>Loaded config: workflow.yaml</critical>

<workflow>
  <step n="1" goal="Thu thập thông tin">
    <ask>Bạn muốn viết về chủ đề gì?</ask>
    <action>Store user response as {{topic}}</action>
  </step>

  <step n="2" goal="Tạo nội dung">
    <action>Generate main content about {{topic}}</action>
    <template-output>main_content</template-output>
  </step>

  <step n="3" goal="Tạo kết luận">
    <action>Write conclusion based on {{main_content}}</action>
    <template-output>conclusion</template-output>
  </step>
</workflow>
```

**5. Sử dụng**:

```
# Từ agent menu
workflow: "{project-root}/bmad/sew/workflows/my-workflow/workflow.yaml"

# Hoặc trực tiếp (nếu standalone: true)
/bmad:sew:workflows:my-workflow
```

### Workflow Tags Quan Trọng

#### `<step>` - Định nghĩa bước

```xml
<step n="1" goal="Mục tiêu bước này">
  <!-- Nội dung bước -->
</step>

<!-- Optional step -->
<step n="2" goal="Optional step" optional="true">
  <ask>Bạn có muốn làm bước này? [y/n]</ask>
  <check if="user answered yes">
    <action>Do something</action>
  </check>
</step>
```

#### `<ask>` - Hỏi user

```xml
<ask>Câu hỏi cho user?</ask>
<action>Store response as {{variable_name}}</action>
```

#### `<action>` - Thực hiện action

```xml
<action>Do something with {{variable}}</action>

<!-- Conditional action -->
<action if="{{var}} == 'value'">Only if condition true</action>
```

#### `<check>` - Conditional blocks

```xml
<check if="{{topic}} == 'SEO'">
  <action>Do SEO-specific things</action>
  <action>Additional action</action>
</check>

<check if="else">
  <action>Do other things</action>
</check>
```

#### `<template-output>` - Save to template

```xml
<action>Generate content about {{topic}}</action>
<template-output>variable_name</template-output>

<!-- Sau đó {{variable_name}} có thể dùng trong template.md -->
```

#### `<invoke-workflow>` - Gọi workflow khác

```xml
<invoke-workflow
  workflow="{project-root}/bmad/sew/workflows/other/workflow.yaml"
  param1="{{value1}}"
  output_variable="result" />

<!-- Sử dụng {{result}} sau này -->
```

#### `<invoke-task>` - Gọi task

```xml
<invoke-task
  exec="{project-root}/bmad/core/tasks/validate.xml"
  input="{{content}}"
  output_variable="validation_result" />
```

#### `<goto>` - Jump to step

```xml
<check if="{{needs_revision}} == 'yes'">
  <goto step="2">Go back to revision step</goto>
</check>
```

### Variable System

**Config Variables**:

```yaml
# workflow.yaml
config_source: '{project-root}/bmad/sew/config.yaml'
user_name: '{config_source}:user_name'
communication_language: '{config_source}:communication_language'
```

**System Variables**:

- `{project-root}` - Root của project
- `{installed_path}` - Path của workflow
- `{output_folder}` - Output folder từ config
- `{user_name}` - Tên user
- `{communication_language}` - Ngôn ngữ

**Runtime Variables**:

```xml
<ask>Input từ user?</ask>
<action>Store as {{user_input}}</action>

<!-- Sau đó sử dụng {{user_input}} -->
```

**Template Variables**:

```xml
<action>Generate content</action>
<template-output>my_variable</template-output>

<!-- Trong template.md: -->
<!-- {{my_variable}} sẽ được thay thế -->
```

### Workflow với Human Approval Gates

```xml
<step n="3" goal="Generate draft">
  <action>Create first draft</action>
  <template-output>draft</template-output>
</step>

<step n="4" goal="Human review">
  <action>Display {{draft}} to user</action>
  <ask>Approve draft? [approve/revise/cancel]</ask>

  <check if="user answered 'revise'">
    <ask>What needs to change?</ask>
    <action>Store feedback as {{revision_notes}}</action>
    <goto step="3">Revise draft</goto>
  </check>

  <check if="user answered 'approve'">
    <action>Proceed to next step</action>
  </check>

  <check if="user answered 'cancel'">
    <action>Workflow cancelled</action>
    <goto step="999">Exit</goto>
  </check>
</step>
```

---

## 🏗️ Cách Tạo Modules

### Module là gì?

Module là một package hoàn chỉnh chứa:

- Agents (nhiều agents làm việc cùng nhau)
- Workflows (quy trình phức tạp)
- Tasks (operations đơn lẻ)
- Configuration (settings)
- Installer (deployment logic)

### Cấu Trúc Module Chuẩn

```
bmad/my-module/
├── _module-installer/           # Installation infrastructure
│   ├── install-config.yaml     # Pre-install configuration template
│   └── installer.js            # Custom installation logic (optional)
│
├── agents/                      # Agent definitions
│   ├── agent1.agent.yaml       # Source files
│   ├── agent2.agent.yaml
│   └── (*.md compiled files)   # Generated during build
│
├── workflows/                   # Workflow definitions
│   ├── workflow1/
│   │   ├── workflow.yaml
│   │   ├── instructions.md
│   │   ├── template.md
│   │   └── checklist.md
│   └── workflow2/
│
├── tasks/                       # Task definitions
│   ├── task1.task.xml
│   └── task2.task.xml
│
├── config.yaml                  # Runtime configuration
└── README.md                    # Documentation
```

### Tạo Module Mới

#### Bước 1: Tạo install-config.yaml

```yaml
# _module-installer/install-config.yaml

code: mymod
name: 'My Module - Description'
default_selected: false # true = auto-selected during install

prompt:
  - 'Welcome to My Module!'
  - 'This module provides...'

# Variables inherited from Core:
## user_name
## communication_language
## output_folder

# Module-specific variables
my_custom_setting:
  prompt: 'What is your preferred setting?'
  default: 'default_value'
  result: '{value}'

my_path_setting:
  prompt: 'Where to save outputs?'
  default: 'my-module/outputs'
  result: '{project-root}/{value}'

my_choice_setting:
  prompt: 'Choose quality level?'
  default: 'medium'
  result: '{value}'
  single-select:
    - value: 'low'
      label: 'Low - Fast but basic'
    - value: 'medium'
      label: 'Medium - Balanced'
    - value: 'high'
      label: 'High - Best quality, slower'

my_multi_choice:
  prompt: 'Which features to enable?'
  result: '{value}'
  multi-select:
    - 'Feature A'
    - 'Feature B'
    - 'Feature C'
```

#### Bước 2: Tạo installer.js (Optional)

```javascript
// _module-installer/installer.js

const chalk = require('chalk');
const path = require('node:path');
const fs = require('fs-extra');

async function install(options) {
  const { projectRoot, config, installedIDEs, logger } = options;

  try {
    logger.log(chalk.blue('Installing My Module...'));

    // 1. Create directories
    await createDirectories(projectRoot, config, logger);

    // 2. Setup files
    await setupFiles(projectRoot, config, logger);

    // 3. IDE-specific config
    if (installedIDEs && installedIDEs.length > 0) {
      for (const ide of installedIDEs) {
        await configureForIDE(ide, projectRoot, config, logger);
      }
    }

    logger.log(chalk.green('✓ My Module installation complete'));
    return true;
  } catch (error) {
    logger.error(chalk.red(`Error: ${error.message}`));
    return false;
  }
}

async function createDirectories(projectRoot, config, logger) {
  // Create necessary directories
  const dirs = [
    config.my_path_setting,
    // Add more directories
  ];

  for (const dir of dirs) {
    await fs.ensureDir(dir);
    logger.log(chalk.dim(`  ✓ Created: ${dir}`));
  }
}

async function setupFiles(projectRoot, config, logger) {
  // Setup template files, copy resources, etc.
}

async function configureForIDE(ide, projectRoot, config, logger) {
  // IDE-specific configurations
  switch (ide) {
    case 'claude-code':
      logger.log(chalk.dim('  ✓ Configured for Claude Code'));
      break;
    // Add more IDEs
  }
}

module.exports = { install };
```

#### Bước 3: Tạo config.yaml Template

```yaml
# config.yaml (runtime config, generated during install)

user_name: Will be filled during install
communication_language: Will be filled
my_custom_setting: Will be filled
my_path_setting: Will be filled
```

#### Bước 4: Copy Module vào src/modules/

```bash
# Copy module to BMAD source
cp -r bmad/my-module src/modules/my-module
```

#### Bước 5: Test Installation

```bash
# List modules
npx bmad-method list
# Should show: my-module

# Install module
npx bmad-method install
# Select your module during installation
```

---

## 💻 BMAD CLI Commands

### Installation

```bash
# Interactive installation
npm run bmad:install

# Or with npx
npx bmad-method install

# Advanced options
npx bmad-method install --target /path/to/project --modules sew,bmm --ides claude-code
```

**Flags**:

- `--target <path>` - Target project directory
- `--modules <list>` - Comma-separated modules
- `--ides <list>` - IDEs to configure
- `--non-interactive` - Skip prompts

### Agent Building

```bash
# Build specific agent
npx bmad-method build agent-name

# Build all agents
npx bmad-method build --all

# Force rebuild
npx bmad-method build agent-name --force

# Specify directory
npx bmad-method build agent-name --directory /path/to/project
```

### Status & Info

```bash
# Show installation status
npm run bmad:status
npx bmad-method status

# List available modules
npx bmad-method list

# Show detailed status
npx bmad-method status --verbose
```

### Update & Uninstall

```bash
# Update BMAD installation
npx bmad-method update

# Uninstall specific module
npx bmad-method uninstall --modules sew

# Complete uninstall
npx bmad-method uninstall
```

### SEW Module Specific

```bash
# Quick build (from sew directory)
cd bmad/sew
node build-agents.js

# Quick install to Claude
node install-to-claude.js
```

---

## ⚙️ Configuration

### config.yaml (Runtime Configuration)

```yaml
# Được tạo tự động khi install module
user_name: FGCare
communication_language: Vietnamese
document_output_language: Vietnamese
sessions_output_folder: '{project-root}/bmad/sew/sessions'
final_output_folder: '{project-root}/output'
```

### Customize Agents

Tạo file customize cho agent:

```bash
# Location
bmad/_cfg/agents/sew-master-orchestrator.customize.yaml
```

```yaml
# Nội dung
agent:
  metadata:
    name: '' # Override name

  persona:
    communication_style: |
      # Override communication style
      I speak more casually in Vietnamese...

    principles:
      - Additional principle 1
      - Additional principle 2

  menu:
    - trigger: my-custom-command
      action: 'Do something custom'
      description: My custom command
```

**Build lại để apply changes**:

```bash
npx bmad-method build master-orchestrator
```

---

## 📁 Cấu Trúc Files

### Agent Files

```
agents/
├── my-agent.agent.yaml    # Source (EDIT THIS)
└── my-agent.md            # Compiled (AUTO-GENERATED)
```

**QUAN TRỌNG**:

- ✅ Chỉnh sửa `.agent.yaml`
- ❌ KHÔNG edit `.md` (sẽ bị ghi đè)

### Workflow Files

```
workflows/my-workflow/
├── workflow.yaml          # Configuration
├── instructions.md        # Step-by-step guide
├── template.md           # Output template
├── checklist.md          # Validation (optional)
└── context_files/        # Supporting files
```

### Task Files

```
tasks/
└── my-task.task.xml      # Task definition
```

---

## 📝 Development

### Development Workflow: bmad/ vs src/modules/

**Mục tiêu:** phát triển nhanh với BMB agents trong `bmad/sew/`, quản lý mã nguồn module ở repo riêng, và đồng bộ sang `src/modules/sew/` trước khi đóng gói cùng BMAD Method. Chi tiết đầy đủ: `docs/REPO-STRUCTURE-GUIDE.md`.

#### Kiến trúc Git đề xuất

```
bmadv6/ (repo chính)
├─ bmad/sew/            → Junction/Submodule trỏ tới repo sew-module (dev runtime)
└─ src/modules/sew/     → Snapshot phục vụ installer BMAD Method

sew-module/ (repo riêng)
├─ agents/ workflows/ tasks/ docs/ ...
└─ sync-to-src.ps1 (tùy chọn)
```

#### Quy trình 4 bước

1. **Phát triển tại `bmad/sew/`**  
   Repo `sew-module` được mount vào đây ⇒ mọi chỉnh sửa là commit của repo riêng.  
   Vòng lặp quen thuộc: chỉnh `.agent.yaml` → `node build-agents.js` → `node install-to-claude.js` → test.

2. **Quản lý Git trong repo riêng**  
   Commit/push/tạo tag ngay tại `sew-module`. Giữ changelog và version độc lập với BMAD core.

3. **Đồng bộ sang `src/modules/sew/`**  
   Chạy script (ví dụ):
   ```powershell
   $source = \"bmad\\sew\\\"
   $dest   = \"src\\modules\\sew\\\"
   robocopy $source $dest /E /MIR /XD sessions docs\\drafts .tmp
   ```
   Kiểm tra lại bằng `git diff src/modules/sew`.

4. **Đóng gói cùng BMAD**  
   Repo chính giờ chứa bản cài đặt mới nhất. Chạy các lệnh build/validate của BMAD, sau đó commit thư mục `src/modules/sew/`.

#### Các lựa chọn liên kết

- **Git submodule**: `git submodule add ... bmad/sew` ⇒ kiểm soát version bằng commit hash.  
- **Git subtree**: lưu lịch sử gộp, phù hợp nếu muốn clone repo chính mà không cần lệnh phụ.  
- **Junction/Symlink**: giữ repo riêng ngoài, tạo junction vào `bmad/sew/` (nhớ add vào `.gitignore` repo chính).

#### Lưu ý vận hành

- Không commit `bmad/sew/sessions/` hoặc artefact runtime.  
- Luôn chạy `build-agents` sau khi chỉnh YAML để cập nhật bản `.md`.  
- Khi release, cập nhật `config.yaml`, README và tạo tag trong cả hai repo nếu cần.  
- Hook gợi ý: `post-commit` (repo sew-module) tự chạy sync, `pre-push` (repo chính) nhắc kiểm tra diff.

#### Quick checklist

- [ ] Repo riêng mount vào `bmad/sew/` hoạt động.  
- [ ] Script sync bỏ qua thư mục runtime.  
- [ ] `src/modules/sew/` khớp với release mong muốn trước khi commit.  
- [ ] `docs/REPO-STRUCTURE-GUIDE.md` cập nhật khi luồng thay đổi.

### Creating New Agent for SEW

```bash
# Method 1: Interactive workflow
/bmad:bmb:workflows:create-agent
# Choose: Module Agent
# Select: sew module

# Method 2: Copy existing agent
cp agents/content-analyzer.agent.yaml agents/new-agent.agent.yaml
# Edit new-agent.agent.yaml
# Build: node build-agents.js
```

### Creating New Workflow for SEW

```bash
# Create directory
mkdir -p workflows/my-new-workflow

# Create files
touch workflows/my-new-workflow/workflow.yaml
touch workflows/my-new-workflow/instructions.md
touch workflows/my-new-workflow/template.md

# Edit files (see Workflow section above)

# Copy to .claude
cp -r workflows/my-new-workflow .claude/commands/bmad/sew/workflows/
```

### Rebuild Sau Khi Chỉnh Sửa

```bash
# Full rebuild
cd bmad/sew
node build-agents.js
node install-to-claude.js

# Or use CLI
npx bmad-method build --all
```

---

## 🎯 Best Practices

### Agent Design

1. **Single Responsibility** - Mỗi agent một vai trò rõ ràng
2. **Clear Persona** - Personality nhất quán, dễ nhận diện
3. **Comprehensive Menu** - Commands đầy đủ, mô tả rõ ràng
4. **Error Handling** - Xử lý edge cases
5. **Documentation** - Comment code, viết README

### Workflow Design

1. **User-Centric** - Thiết kế cho user experience
2. **Approval Gates** - Human review ở các bước quan trọng
3. **Clear Steps** - Mỗi step có goal rõ ràng
4. **Validation** - Kiểm tra input/output
5. **Recovery** - Cho phép quay lại bước trước

### Module Organization

1. **Logical Structure** - Tổ chức files hợp lý
2. **Naming Conventions** - Kebab-case, descriptive
3. **Version Control** - Git cho tất cả source files
4. **Testing** - Test thoroughly trước khi deploy
5. **Documentation** - README đầy đủ, examples

### Code Quality

1. **YAML Validation** - Luôn validate syntax
2. **No Hardcoded Paths** - Dùng `{project-root}`
3. **Variable Naming** - Clear, consistent
4. **Comments** - Giải thích logic phức tạp
5. **DRY** - Don't Repeat Yourself

---

## 🆘 Troubleshooting

### Agents Không Hiển Thị

**Triệu chứng**: Agent không xuất hiện trong Claude Code

**Giải pháp**:

```bash
# 1. Check status
npx bmad-method status

# 2. Rebuild agents
cd bmad/sew
node build-agents.js

# 3. Reinstall to Claude
node install-to-claude.js

# 4. Verify files exist
ls -la .claude/commands/bmad/sew/agents/
```

### Lỗi YAML Syntax

**Triệu chứng**: Build fails với YAML error

**Giải pháp**:

```bash
# 1. Validate YAML
npm run lint

# 2. Check indentation (phải dùng spaces, không tabs)
# 3. Check quotes (single vs double)
# 4. Check special characters
```

### Variables Không Thay Thế

**Triệu chứng**: `{{variable}}` vẫn còn trong output

**Giải pháp**:

1. Check syntax: `{{variable}}` không `{variable}`
2. Check variable được define trong `<template-output>`
3. Check template.md có variable này
4. Check workflow.yaml config

### Workflow Skips Steps

**Triệu chứng**: Workflow nhảy qua steps

**Giải pháp**:

1. Check step numbering: `n="1"`, `n="2"` (không gaps)
2. Check XML structure (tags đóng đúng)
3. Check conditions trong `<check if="">`
4. Check `<goto>` tags

### Vietnamese Text Issues

**Triệu chứng**: Tiếng Việt hiển thị sai

**Giải pháp**:

1. Ensure UTF-8 encoding cho tất cả files
2. Check `communication_language: Vietnamese` trong config
3. Verify `document_output_language: Vietnamese`
4. Test với simple text trước

### Permission Errors

**Triệu chứng**: Cannot write files

**Giải pháp**:

```bash
# Check folder permissions
ls -la bmad/sew/

# Create directories if missing
mkdir -p bmad/sew/sessions
mkdir -p output

# Fix permissions (Unix/Mac)
chmod -R 755 bmad/sew/
```

### Module Not Recognized

**Triệu chứng**: `npx bmad-method list` không hiển thị module

**Giải pháp**:

```bash
# 1. Verify module copied to src/modules/
ls -la src/modules/sew/

# 2. Check install-config.yaml exists
ls -la src/modules/sew/_module-installer/

# 3. Verify code field
cat src/modules/sew/_module-installer/install-config.yaml | grep "code:"

# 4. Reinstall
npx bmad-method install
```

---

## 📚 Resources

### Documentation

- **BMAD Main README**: `../../README.md`
- **Create Agent Guide**: `../bmb/workflows/create-agent/README.md`
- **Workflow Guide**: `../bmb/workflows/create-workflow/workflow-creation-guide.md`
- **Module Creation**: `../bmb/workflows/create-module/README.md`
- **CLI Documentation**: `../../tools/cli/README.md`

### Example Modules

- **BMM**: Agile/Project Management - `../bmm/`
- **BMB**: Builder Module - `../bmb/`
- **CIS**: Creative Intelligence - `../../src/modules/cis/`

### Example Agents

- **Product Manager**: `../bmm/agents/pm.agent.yaml`
- **Business Analyst**: `../bmm/agents/analyst.agent.yaml`
- **BMAD Builder**: `../bmb/agents/bmad-builder.agent.yaml`

### Example Workflows

- **Create PRD**: `../bmm/workflows/2-plan-workflows/prd/`
- **Brainstorming**: `../core/workflows/brainstorming/`
- **SEO Article**: `workflows/seo-article-rewriting/`

---

## 🔄 Quy Trình Build

### Quick Reference

```bash
# 1. Edit
vi agents/my-agent.agent.yaml

# 2. Compile
node build-agents.js

# 3. Install
node install-to-claude.js

# 4. Test
# Gọi agent trong Claude Code
```

### Full Development Cycle

```bash
# 1. Create feature branch
git checkout -b feature/new-agent

# 2. Make changes
vi agents/new-agent.agent.yaml

# 3. Build
node build-agents.js

# 4. Test locally
node install-to-claude.js
# Test in Claude Code

# 5. Commit
git add agents/new-agent.agent.yaml
git commit -m "Add new agent for X"

# 6. Push and create PR
git push origin feature/new-agent
```

---

## 📄 License

MIT

## 👤 Author

**FGCare Team**

## 🔗 Links

- [BMAD Method GitHub](https://github.com/bmad-code-org/BMAD-METHOD)
- [Documentation](../../docs/)
- [Issues](https://github.com/bmad-code-org/BMAD-METHOD/issues)
- [Contributing](../../CONTRIBUTING.md)

---

## 🙏 Acknowledgments

SEW Module được xây dựng trên nền tảng BMAD Method v6, một framework mã nguồn mở mạnh mẽ cho AI agent development.

**Special Thanks**:

- BMAD Method Core Team
- Community Contributors
- Vietnamese AI Community

---

**Happy Building! 🚀**
