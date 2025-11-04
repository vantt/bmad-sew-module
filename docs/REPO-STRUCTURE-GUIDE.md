
---
last-redoc-date: 2025-11-04
---

# Hướng dẫn tổ chức repo riêng cho module SEW

## 1. Mục tiêu

- Tách module `sew` khỏi BMAD core để có vòng đời release độc lập.
- Vẫn phát triển được bằng BMB agents trong workspace hợp nhất (`bmadv6`).
- Triển khai / cài đặt cùng BMAD bằng cách đồng bộ về `src/modules/sew` khi đóng gói.
- Chủ động quản lý **repo riêng của SEW**; repo BMAD core chỉ đóng vai trò workspace chạy, không có quyền push.

## 2. Cấu trúc Git khuyến nghị

### 2.1. Repo gốc (monorepo hoặc workspace chung)

```
bmadv6_workspace/              # Repo chính (BMAD core + module đang dev)
├─ bmad/                       # Cài đặt BMAD tại workspace
│  ├─ sew/                     # Module SEW bản DEV (nguồn chính dùng BMB)
│  └─ ...                      # Các module khác
└─ src/modules/sew/            # Module SEW bản INSTALL (đồng bộ từ repo riêng)
```

### 2.2. Repo riêng cho SEW

```
sew-module/                    # Repo độc lập
├─ agents/
├─ workflows/
├─ tasks/
├─ docs/
├─ _module-installer/
├─ config.yaml
├─ package.json? (nếu cần scripts)
└─ README.md
```

> Gợi ý: đặt remote `origin` của repo riêng tại `git@github.com:<org>/sew-module.git`. Trong workspace chính, add repo riêng dưới dạng submodule hoặc subtree tùy chiến lược.

## 3. Luồng phát triển

1. **Clone song song:**
   - Repo chính `bmadv6` (read-only đối với nhóm SEW, chỉ dùng để chạy BMAD/BMB).
   - Repo `sew-module` (cùng cấp hoặc bên trong `bmadv6/bmad/` tùy nhu cầu) – đây là repo duy nhất bạn được phép push.

2. **Liên kết thư mục phát triển:**
   - Dùng **symlink** hoặc **git submodule** để gắn `sew-module` vào `bmadv6/bmad/sew`.
   - Ví dụ (PowerShell):
     ```powershell
     New-Item -ItemType Junction -Path bmadv6\bmad\sew -Target ..\..\sew-module
     ```
   - Khi đó BMB agents đang chạy trong `bmadv6` vẫn thao tác trực tiếp trên repo riêng.

3. **Phát triển bằng BMB:**
   - Các file được tạo/sửa tại `bmadv6/bmad/sew/...` thực chất nằm trong repo `sew-module`.
   - Commit, push thay đổi tại repo `sew-module`.

4. **Đồng bộ bản cài đặt:**
   - Viết script `sync-to-src.ps1` trong repo chính:
     ```powershell
     $source = \"bmad/sew/\"
     $dest   = \"src/modules/sew/\"
     robocopy $source $dest /E /MIR /XD sessions docs\drafts
     ```
   - Script này copy sạch module sang thư mục `src/modules/sew` để đóng gói cùng BMAD Method.
   - Bỏ qua các thư mục runtime (`sessions/`, `docs/drafts`,...).

5. **Kiểm thử và build:**
   - Chạy scripts của BMAD Method (build agents, validate workflows) trong repo chính.
   - Sau khi pass, commit/push:
     - Repo `sew-module` giữ toàn bộ mã nguồn module (được phép push).
     - Repo `bmadv6` chỉ chứa snapshot cài đặt trong `src/modules/sew` (không push nếu không thuộc quyền quản trị).

## 4. Chiến lược Git chi tiết

### 4.1. Sử dụng Git Submodule

- Trong repo chính:
  ```bash
  git submodule add git@github.com:<org>/sew-module.git bmad/sew
  ```
- Ưu điểm: tách lịch sử rõ, kiểm soát version bằng commit hash submodule.
- Nhược điểm: cần `git submodule update --init --recursive` khi clone.

### 4.2. Sử dụng Git Subtree

- Khi dùng `git subtree`, bạn giữ một bản copy trong repo chính nhưng quản lý bằng pull/push subtree.
- Ví dụ:
  ```bash
  git subtree add --prefix=bmad/sew git@github.com:<org>/sew-module.git main --squash
  ```
- Ưu điểm: không cần lệnh riêng khi clone.
- Nhược điểm: lịch sử hòa trộn, thao tác push/pull phức tạp hơn.

### 4.3. Junction/Symlink + Repo riêng độc lập (không submodule)

- Giữ repo `sew-module` bên ngoài, tạo junction vào `bmadv6/bmad/sew`.
- Repo chính xem đó như thư mục bình thường (khuyến cáo thêm vào `.gitignore`).
- Đồng bộ sang `src/modules/sew` bằng script.
- Ưu điểm: nhẹ nhàng, linh hoạt.
- Nhược điểm: cần quản lý sync thủ công, repo chính không thấy code SEW.

## 5. Công cụ hỗ trợ sync

- **Script PowerShell/Node** cho `sync-to-src`.
- **Git hooks**:
  - `post-commit` (repo sew-module) chạy script copy sang workspace.
  - `pre-push` (repo chính) nhắc kiểm tra đã sync chưa.
- **CI pipeline**:
  - Job build module: checkout cả hai repo, chạy sync, kiểm thử, đóng gói.

## 6. Quy trình đóng gói / install

1. Từ repo `sew-module`, release tag (ví dụ `v2.0.0`).
2. Trong repo chính:
   - Checkout tag tương ứng (nếu dùng submodule/subtree).
   - Chạy script `sync-to-src`.
   - Chạy build BMAD Method → tạo bản cài đặt module trong `src/modules/sew`.
3. Khi người dùng cài đặt BMAD Method:
   - Module sẽ xuất hiện ở `bmad/sew` (installed).
   - Nếu cần source đầy đủ, cung cấp hướng dẫn clone `sew-module`.

## 9. Quy trình cài đặt cho người dùng cuối

**Trường hợp installer chỉ triển khai (không phát triển):**

1. **Chuẩn bị BMAD Method**  
   ```
   git clone https://github.com/bmad-code-org/BMAD-METHOD.git bmadv6
   cd bmadv6
   ```

2. **Nhận gói SEW**  
   - **Link Git repo chính thức của module SEW:**  
     ```
     git clone https://github.com/<org>/sew-module.git external/sew-module
     ```  
     Sau đó chạy script sync do developer cung cấp (ví dụ `robocopy`) để sao chép sang `src/modules/sew/`.
   - Nếu được cấp thêm **release snapshot** (đóng gói sẵn): có thể giải nén trực tiếp vào `src/modules/sew/`. Snapshot này thường là bản build tương ứng với tag của repo ở trên.

3. **Kiểm tra cấu trúc snapshot**  
   - Đảm bảo `src/modules/sew/` chứa đầy đủ `agents/`, `workflows/`, `tasks/`, `_module-installer/`, `config.yaml`, README...  
   - Không cần chạy `node build-agents.js` trừ khi muốn tái biên dịch từ YAML (developer đã chuẩn bị sẵn bản `.md`).

4. **Chạy installer BMAD**  
   - Từ gốc repo:  
     ```
     npm run bmad:install
     ```
     hoặc  
     ```
     npx bmad-method install
     ```
   - Chọn module `sew` khi installer hỏi. Công cụ sẽ đọc từ `src/modules/sew/`, copy sang `bmad/sew/`, tạo `config.yaml`, thiết lập output/sessions folder.

5. **Hoàn tất & tuỳ chọn**  
   - Sau khi installer chạy xong, toàn bộ runtime nằm ở `bmad/sew/`. Không cần giữ junction hay submodule.  
   - Nếu muốn tích hợp Claude Code, có thể chạy `node bmad/sew/install-to-claude.js`.  
   - Khi có bản update: thay snapshot trong `src/modules/sew/` rồi chạy lại installer (hoặc script sync nếu được cung cấp).

## 10. Vai trò thư mục theo đối tượng

| Đối tượng                     | Bắt buộc                                                  | Tuỳ chọn                                                                 | Ghi chú                                                                                                                                                                                                                                                                                                                           |
| ----------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Nhà phát triển SEW**        | `bmad/sew/` (mounted từ repo riêng)                       | `external/sew-module/` (repo nguồn), `src/modules/sew/` (snapshot build) | - Phát triển bằng BMB trong `bmad/sew/`.<br>- Repo SEW độc lập (submodule/junction tại `bmad/sew/`).<br>- `src/modules/sew/` chỉ cần khi kiểm tra snapshot trước khi bàn giao.                                                                                                                                                    |
| **Người cài đặt (installer)** | `src/modules/sew/` (điểm rơi bắt buộc cho installer BMAD) | `external/sew-module/`, `bmad/sew/`                                      | - Nếu nhận source repo ⇒ clone vào `external/sew-module/`, mount vào `bmad/sew/`, chạy build rồi **sync sang `src/modules/sew/`** trước khi gọi installer BMAD (installer đọc dữ liệu tại đây).<br>- Nếu nhận snapshot sẵn ⇒ đặt trực tiếp vào `src/modules/sew/`, sau đó copy sang `bmad/sew/` để chạy thử và tinh chỉnh config. |
| **Người dùng cuối**           | `bmad/sew/` (bản cài đặt đã hoàn chỉnh)                   | —                                                                        | - Sau khi installer triển khai, toàn bộ module hoạt động trong `bmad/sew/`.<br>- Người dùng cuối không cần quan tâm repo hay source, chỉ vận hành workflows/agents.                                                                                                                                                               |
| **BMAD core** (nếu có)        | `src/modules/sew/` (để đóng gói vào BMAD Method)          | `bmad/sew/` (bản chạy thử), `external/sew-module/` (tham khảo source)    | - Khung tham chiếu nếu đội BMAD tổng hợp module vào bộ cài chính thức.                                                                                                                                                                                                                                                            |

**Tóm tắt:**
- Nhà phát triển SEW nên coi `external/sew-module/` là repo nguồn, `bmad/sew/` là workspace chạy thử, `src/modules/sew/` là bản đóng gói.
- Người cài đặt phải đảm bảo `src/modules/sew/` chứa snapshot hoàn chỉnh trước khi chạy script install của BMAD; `bmad/sew/` chỉ phục vụ chạy thử/training sau khi đã đồng bộ.
- Người dùng cuối tối thiểu chỉ cần `bmad/sew/` (được cung cấp dưới dạng gói phát hành). Họ không cần `external/` hay `src/modules/`.

## 7. Best Practices

- Duy trì `docs/CHANGELOG.md` trong repo riêng.
- Sử dụng `docs/` để lưu hướng dẫn kiến trúc, luồng sync (như file này).
- Bỏ thư mục runtime (`sessions/`, `tmp/`) khỏi repo bằng `.gitignore`.
- Gắn version trong `config.yaml` và cập nhật khi release.
- Khi cập nhật workflow/agent, luôn chạy BMB `*redoc` để đồng bộ tài liệu.

## 8. Checklist nhanh

- [ ] Repo `sew-module` tách biệt, có remote riêng.
- [ ] Junction/Submodule/Subtree kết nối vào `bmadv6/bmad/sew`.
- [ ] Script `sync-to-src` copy sang `src/modules/sew`.
- [ ] Docs và README cập nhật mô tả quy trình.
- [ ] Release tag + build kiểm thử trước khi phân phối.
