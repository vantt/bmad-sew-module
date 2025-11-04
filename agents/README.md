
---
last-redoc-date: 2025-11-04
---

# Agents Overview

Các agent của module SEW chia thành ba tuyến:

1. **Điều phối:** `master-orchestrator.md` kết nối người dùng, workflow, state manager và các gate phê duyệt.
2. **Phân tích & chuẩn bị:** `content-fetcher.md`, `content-analyzer.md`, `market-insight-agent.md`, `debate-moderator.md`, `qa-editor.md` phối hợp để biến bài gốc thành bộ insight chiến lược và outline đã duyệt.
3. **Sản xuất & hoàn thiện:** `adaptive-writer.md`, `seo-specialist.md`, `publishing-formatter.md` đảm nhiệm viết lại, tối ưu SEO và đóng gói xuất bản.

Danh sách chi tiết nằm trong `AGENTS-CATALOG.md`. Mỗi agent được xây dựng theo chuẩn module agent của BMAD, menu kích hoạt workflow/tasks tương ứng, và đều nạp cấu hình từ `bmad/sew/config.yaml` để giữ đồng bộ output folder, ngôn ngữ và session.
