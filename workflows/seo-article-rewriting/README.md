---
last-redoc-date: 2025-11-04
---

# Workflow: SEO Article Rewriting

## Tổng quan

Workflow này phối hợp Master Orchestrator cùng sáu agent chuyên trách để tái tạo bài viết đa ngôn ngữ. Chuỗi tác vụ đi qua phân tích nội dung, nghiên cứu thị trường, tranh luận ý tưởng, phê duyệt thủ công và viết lại thích ứng nhằm bảo toàn giọng điệu thương hiệu. Điểm khác biệt là cơ chế quản lý trạng thái đa phiên (`state-manager.task.xml`) cho phép tạm dừng, tiếp tục hoặc nhảy bước mà vẫn giữ nguyên toàn bộ đầu ra trung gian.

Bộ context giàu dữ liệu (brand, persona, văn hóa, blacklist SEO) kết hợp với hai cổng phê duyệt con người (`human-outline-approval-gate`, `human-approval-gate`) đảm bảo bản viết cuối cùng đáp ứng chiến lược. Toàn bộ sản phẩm trung gian được lưu vào thư mục phiên để phục vụ hậu kiểm và tái sử dụng.

## Cách kích hoạt

```bash
workflow bmad/sew/workflows/seo-article-rewriting/workflow.yaml
```

Hoặc thông qua agent `master-orchestrator` với menu `*rewrite-seo-article`.

## Đầu vào chính

- URL bài viết gốc cùng các yêu cầu tái bút được thu thập ở bước khởi tạo.
- Bộ dữ liệu ngữ cảnh trong `context_files/`: `customer_persona.md`, `brand_guideline.md`, `mission.md`, `culture.md`, `business_vision.md`, `competitor_analysis.csv`, `cultural_lexicon.csv`, `seo_blacklist.txt`.
- Cấu hình trong `bmad/sew/config.yaml` quyết định thư mục đầu ra, thư mục sessions và tham số hiển thị.

## Đầu ra

- Tệp tổng hợp `seo-article-<date>.md` tại `{output_folder}` chứa đầy đủ biến đã điền.
- Bộ tài liệu trung gian trong `{sessions_folder}/{project_id}/`:
  - `01-raw-content.md` → `09-final-publishable.yaml` cùng `state.yaml`.
  - Các báo cáo phân tích, danh sách ý tưởng, dàn ý, bản nháp, bản tối ưu SEO và kết quả QA.

## Điểm nổi bật

- Quản lý tiến trình có thể resume và nhảy bước mà không mất dữ liệu.
- Hai vòng phê duyệt người dùng bảo đảm bám sát chiến lược thương hiệu.
- Chuỗi tác vụ tự động `adaptive-writing`, `seo-optimization`, `quality-assurance-and-formatting` khóa chặt chất lượng xuất bản.
