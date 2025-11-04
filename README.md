---
last-redoc-date: 2025-11-04
---

# SEW Module - SEO Expert Writer

**Hệ thống AI chuyên nghiệp để viết lại và tối ưu nội dung SEO**

**Version:** 2.0.0 (State Management Complete)
**Status:** ✅ Production Ready
**Last Updated:** 2025-11-04

## 📑 Mục Lục

- [Tổng Quan](#-tổng-quan)
- [Changelog](#-changelog)
- [Agents](#-agents)
- [Quick Start](#-quick-start)
- [Project State Management](#-project-state-management)
- [Hiểu về BMAD Method](#-hiểu-về-bmad-method)
- [Kiến Trúc Agents](#-kiến-trúc-agents)
- [Cách Build Agents](#-cách-build-agents)
- [Cách Tạo Workflows](#-cách-tạo-workflows)
- [Cách Tạo Modules](#-cách-tạo-modules)
- [BMAD CLI Commands](#-bmad-cli-commands)
- [Configuration](#-configuration)
- [Development](#-development)
  - [Development Workflow: bmad/ vs src/modules/](#development-workflow-bmad-vs-srcmodules)
  - [Creating New Agent](#creating-new-agent-for-sew)
  - [Creating New Workflow](#creating-new-workflow-for-sew)
- [Best Practices](#-best-practices)
- [Troubleshooting](#-troubleshooting)

---

## 📦 Tổng Quan

SEW (SEO Expert Writer) là module BMAD chuyên biệt cho việc viết lại và tối ưu nội dung SEO, sử dụng hệ thống multi-agent AI để tạo ra nội dung chất lượng cao với ngôn ngữ tiếng Việt.

### Đặc Điểm Nổi Bật

- ✅ **9 Agents chuyên môn** - Mỗi agent đảm nhận một vai trò cụ thể
- ✅ **Multi-agent orchestration** - Các agents phối hợp với nhau
- ✅ **Vietnamese-first** - Tối ưu cho tiếng Việt
- ✅ **SEO-focused** - Chuyên biệt cho tối ưu hóa SEO
- ✅ **Human-in-the-loop** - Approval gates tại các bước quan trọng
- ✅ **Cultural Resonance** (Local idioms, examples, narrative flow)  
- ✅ **Engagement Potential** (Trend alignment, scroll-depth optimization)  
- ✅ **Strategic Alignment** (Core message preservation via debate protocols)  
- ✅ **Modular & Extensible** - Dễ dàng mở rộng và tùy chỉnh
  
### Activity/workflow Diagram

```mermaid
%%{init: {'theme': 'neutral', 'themeVariables': { 'primaryColor': '#f0f0f0', 'edgeLabelBackground':'#fff'}}}%%
flowchart TD
    start((Start))
	start --- n1
	n1["Human Input: Url+ Requirments"] --- A
    A[Fetch Content from Source]
    A --> B1[Analyze Content]    
    B1 --> B2[Analyze Market Insight]    
    B1 --> D[[AI Debate Phase]]    
    B2 --> D[[AI Debate Phase]]    
    D --> E[Curated Ideas]
    E --> F{Human Reviewer}
    F -->|Approved| G[[Outline Debate Phase]]
    F -->|Rejected| D
    G --> H[Curated Outline]
    H --> I{Human Reviewer}
    I -->|Approved| J[Final Outline]
    I -->|Rejected| G
    J --> K[Adaptive Writer: Rewrite in Language B]
    K --> K2{Human Reviewer}
    K2 -->|Rejected| K
    K2 --> |Approved| L[SEO Specialist: SEO Optimization]
    L --> M2{Human Reviewer}
    M2 -->|Rejected| L
    M2 --> |Approved| M[QA Checks]    
    M --> N[Format for Publishing]
    N --> finish((Finish))

    subgraph D[Ideas Debate Phase]
        direction TB
        D1[Market Insight Agent: Argue Trends] --> D2[[Ideas Debate Moderator]]
        D3[Content Analyzer: Argue Core Ideas] --> D2
        D4[SEO Specialist: Argue Keywords] --> D2
        D5[Adaptive Writer: Argue Culture] --> D2
        D2 --> D6[Score & Prioritize Ideas]
    end

    subgraph G[Outline Debate Phase]
        direction TB
        G1[Market Insight Agent: Structure Trends] --> G2[[Outline Debate Moderator]]
        G3[Content Analyzer: Content Flow] --> G2
        G4[SEO Specialist: Keyword Distribution] --> G2
        G5[Adaptive Writer: Cultural Flow] --> G2
        G2 --> G6[Score & Prioritize Outline]
    end

    style D fill:#fff5e6,stroke:#ffaa33
    style G fill:#fff5e6,stroke:#33aa33
    style F fill:#d4ffd4,stroke:#009900,stroke-width:2px
    style I fill:#d4ffd4,stroke:#009900,stroke-width:2px
    style K2 fill:#d4ffd4,stroke:#009900,stroke-width:2px
    style M2 fill:#d4ffd4,stroke:#009900,stroke-width:2px
    style D2 fill:#fff5e6,stroke:#ff3355
    style G2 fill:#fff5e6,stroke:#ff3355
    style start fill:#ffffff,stroke:#666
    style finish fill:#ffffff,stroke:#666
	style n1 fill:#d4ffd4,stroke:#009900,stroke-width:2px
```

---

## 📝 Changelog

### Version 2.0.0 - State Management Complete (2025-11-04)

**Major Features:**
- ✅ **Full State Management System** - Never lose work, resume anytime
- ✅ **Project ID System** - Auto-generated unique IDs with Vietnamese slug support
- ✅ **Content Fetcher v2.0** - Auto-save fetched content to markdown files
- ✅ **9-Step Workflow** - Complete SEO article rewriting process
- ✅ **Human-in-the-Loop** - Approval gates at critical steps

**Implementation:**
- 2 core tasks: state-manager, generate-project-id
- 10 tasks updated with output_file parameter
- Workflow steps 0-9 with state persistence
- Master orchestrator with project commands
- 100% complete with full documentation

**Files & Outputs:**
- State files: `sessions/{project-id}/state.yaml`
- Step outputs: `01-raw-content.md` through `09-final-publishable.yaml`
- Metadata tracking, backup system, error recovery

**Content Fetcher v2.0:**
- **fetch-and-save** - Auto-save to markdown (recommended)
- **fetch-only** - View then optionally save
- **batch-fetch** - Process multiple URLs
- Metadata headers with source URL, date, tool info

See [Project State Management](#-project-state-management) for details.

---

## Cài đặt nhanh cho người dùng cuối

1. **Chuẩn bị BMAD Method**  
   ```
   git clone --branch v6-alpha https://github.com/bmad-code-org/BMAD-METHOD.git bmadv6
   cd bmadv6

   ```

2. **Nhận gói SEW**  
   - **Link Git repo chính thức của module SEW:**  
     ```
     git clone  https://github.com/vantt/bmad-sew-module.git src/modules/sew
     ```       

3. **Chạy installer BMAD**  
   - Từ gốc repo:  
     ```
     npm run bmad:install
     ```

4. **Chọn Re-settings** 
   - Chọn module `sew` khi installer hỏi. Công cụ sẽ đọc từ `src/modules/sew/`, copy sang `bmad/sew/`, tạo `config.yaml`, thiết lập output/sessions folder.


5. **Hoàn tất & tuỳ chọn**  
   - Sau khi installer chạy xong, toàn bộ runtime nằm ở `bmad/sew/`. Không cần giữ junction hay submodule.     
   - Khi có bản update: thay snapshot trong `src/modules/sew/` rồi chạy lại installer (hoặc script sync nếu được cung cấp).

---