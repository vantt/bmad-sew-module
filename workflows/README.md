
---
last-redoc-date: 2025-11-04
---

# Workflows Overview

Hiện module SEW sở hữu 01 workflow sản xuất: `seo-article-rewriting/`. Đây là chuỗi đa bước tự động hóa tái bút bài viết SEO với quản lý trạng thái phiên, các cổng phê duyệt con người và bộ agent chuyên biệt.

| Workflow | Mô tả | Đầu ra chính |
|----------|-------|--------------|
| `seo-article-rewriting` | Điều phối lấy dữ liệu, phân tích thị trường, tranh luận ý tưởng, viết lại thích ứng và QA xuất bản. | `seo-article-<date>.md` + gói YAML trong thư mục session |

Mỗi thư mục workflow chứa `workflow.yaml`, `instructions.md`, `template.md`, `checklist.md`, `README.md`. Khi phát triển workflow mới hãy bám chuẩn này để ReDoc nhận diện đúng và sinh tài liệu tự động.
