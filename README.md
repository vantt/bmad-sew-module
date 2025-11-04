---
last-redoc-date: 2025-11-04
---

# SEW Module - SEO Expert Writer

**Hệ thống AI chuyên nghiệp để viết lại và tối ưu nội dung SEO**

**Phiên bản:** 2.0.0 (Đã hoàn thiện quản lý trạng thái)  
**Trạng thái:** ✅ Production Ready  
**Cập nhật lần cuối:** 2025-11-04

## Mục Lục

- [Tổng Quan](#overview)
  - [Điểm Nổi Bật](#highlights)
  - [Sơ Đồ Quy Trình](#workflow-diagram)
- [Nhật Ký Phiên Bản](#changelog)
- [Cài Đặt Nhanh Cho Người Dùng Cuối](#quick-install)
- Tài Liệu Chi Tiết
  - [Module Overview](docs/overview/module-overview.md)
  - [Operator Quick Start](docs/operators/quick-start.md)
  - [Workflow Lifecycle](docs/operators/workflow-lifecycle.md)
  - [State Management](docs/operators/state-management.md)
  - [Human Approval Playbook](docs/operators/human-approval.md)
  - [Command Reference](docs/operators/command-reference.md)
  - [Agents Catalog](agents/AGENTS-CATALOG.md)
  - [Tasks Snapshot](tasks/README.md)
  - [Developer Workflow Guide](docs/developers/development-workflow.md)
  - [Build Pipeline Reference](docs/developers/build-pipeline.md)
  - [Repository Structure Strategy](docs/developers/repo-structure.md)
  - [Workflow Design Guidelines](docs/developers/workflow-design.md)
  - [Product Requirements](docs/strategy/prd-seo-rewriting-project.md)
  - [Documentation Index](docs/index.md)

---

<a id="overview"></a>
## Tổng Quan

SEW (SEO Expert Writer) là module BMAD chuyên sâu cho việc viết lại và tối ưu nội dung SEO, sử dụng hệ thống multi-agent để tạo ra bài viết chất lượng cao bằng tiếng Việt.

<a id="highlights"></a>
### Điểm Nổi Bật

- ✅ **9 agent chuyên trách** – mỗi agent đảm nhiệm một vai trò rõ ràng trong chuỗi giá trị nội dung.
- ✅ **Multi-agent orchestration** – điều phối đồng bộ giữa nghiên cứu, sáng tạo, viết, tối ưu và QA.
- ✅ **Vietnamese-first** – tập trung cho tiếng Việt, bảo toàn sắc thái văn hoá và giọng điệu bản địa.
- ✅ **SEO-focused** – tối ưu hoá keyword, meta, cấu trúc và liên kết.
- ✅ **Human-in-the-loop** – hai vòng phê duyệt bắt buộc đảm bảo định hướng chiến lược.
- ✅ **Quản lý trạng thái** – có thể dừng, tiếp tục hoặc nhảy bước mà không mất dữ liệu.
- ✅ **Mở rộng linh hoạt** – dễ dàng tuỳ chỉnh agent, workflow, task và tài liệu.

<a id="workflow-diagram"></a>
### Sơ Đồ Quy Trình

```mermaid
%%{init: {'theme': 'neutral', 'themeVariables': { 'primaryColor': '#f0f0f0', 'edgeLabelBackground':'#fff'}}}%%
flowchart TD
    start((Start))
    start --- n1
    n1["Human Input: Url + Requirements"] --- A
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
    K2 -->|Approved| L[SEO Specialist: SEO Optimization]
    L --> M2{Human Reviewer}
    M2 -->|Rejected| L
    M2 -->|Approved| M[QA Checks]
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

<a id="quick-install"></a>
## Cài Đặt Nhanh Cho Người Dùng Cuối

1. **Chuẩn bị BMAD Method**
   ```bash
   git clone --branch v6-alpha https://github.com/bmad-code-org/BMAD-METHOD.git bmadv6
   cd bmadv6
   npm install
   ```

2. **Nhận module SEW**
   ```bash
   git clone https://github.com/vantt/bmad-sew-module.git src/modules/sew
   ```

3. **Chạy installer của BMAD**
   ```bash
   npm run bmad:install
   ```

4. **Cấu hình**
   - Chọn module `sew` khi installer yêu cầu.
   - Installer sẽ sao chép từ `src/modules/sew/` sang `bmad/sew/` và tạo `config.yaml`.
   - Xác nhận `output_folder`, `sessions_folder` và các thông số ngôn ngữ.

5. **Hoàn tất & tuỳ chỉnh**
   - Sau khi cài đặt, toàn bộ runtime nằm tại `bmad/sew/`.
   - Khi cập nhật module, sync lại `src/modules/sew/` rồi chạy lại installer hoặc script đồng bộ.

---

<a id="changelog"></a>
## Change Log

### Phiên bản 2.0.0 – Hoàn thiện quản lý trạng thái (2025-11-04)

**Tính năng nổi bật:**
- ✅ Quản lý trạng thái đầy đủ – resume bất kỳ lúc nào.
- ✅ Hệ thống Project ID – tạo slug tiếng Việt, tránh trùng lặp.
- ✅ Content Fetcher 2.0 – lưu snapshot Markdown có metadata.
- ✅ Workflow 9 bước – bao quát toàn bộ quy trình viết lại.
- ✅ Human-in-the-loop – phê duyệt con người ở bước ý tưởng và dàn ý.

**Thành phần:**
- Task lõi: `state-manager`, `generate-project-id`.
- 10 task cập nhật tham số `output_file`.
- Workflow 0-9 lưu trạng thái chi tiết.
- Master orchestrator bổ sung các lệnh quản lý project.
- Tài liệu hoàn thiện, bám sát ReDoc.

**Đầu ra chuẩn:**
- Thư mục `sessions/{project-id}/state.yaml` + backup.
- Chuỗi file `01-raw-content.md` … `09-final-publishable.yaml`.
- Metadata theo dõi tiến độ, lịch sử phê duyệt, khôi phục lỗi.

Xem thêm tại [Quản lý trạng thái](docs/operators/state-management.md) và tài liệu chi tiết trong `docs/operators/state-management.md`.

---