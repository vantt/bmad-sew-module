# SEO Article Rewriting Workflow Instructions (v2.0 - With State Management)

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/sew/workflows/seo-article-rewriting/workflow.yaml</critical>
<critical>Communicate in {communication_language} throughout the workflow process</critical>
<critical>This workflow now orchestrates formalized agents and tasks with project state management.</critical>

<workflow>

<step n="0" goal="Khởi tạo hoặc Resume Project">
  <ask>Chào {user_name}! Bạn muốn bắt đầu dự án mới hay tiếp tục dự án cũ?
  [1] Bắt đầu dự án mới (new)
  [2] Tiếp tục dự án cũ (resume)</ask>

  <!-- Branch 1: Resume existing project -->
  <check if="user answered '2' OR user answered 'resume'">
    <action>Hiển thị: "Đang tải danh sách dự án..."</action>

    <invoke-task
        exec="{project-root}/bmad/sew/tasks/state-manager.task.xml"
        action="list"
        sessions_folder="{sessions_folder}"
        output_variable="projects_list"
    />

    <action>
      Hiển thị bảng projects:
      ╔══════════════════════╦════════════════╦═══════╦══════╦═══════════╗
      ║ # ║ Project ID       ║ Title          ║ Status║ Step ║ Updated   ║
      ╠═══╬══════════════════╬════════════════╬═══════╬══════╬═══════════╣

      For each project in {{projects_list.projects}}:
        Show: index, id (truncated), title (truncated), status, progress (X/Y), last_updated_relative
    </action>

    <ask>Chọn số thứ tự dự án muốn tiếp tục (hoặc 'cancel' để hủy):</ask>

    <check if="user answered 'cancel'">
      <action>Workflow cancelled by user</action>
      <goto step="999">Exit workflow</goto>
    </check>

    <action>
      Get selected project from list based on index
      Set {{project_id}} = selected_project.id
    </action>

    <invoke-task
        exec="{project-root}/bmad/sew/tasks/state-manager.task.xml"
        action="load"
        project_id="{{project_id}}"
        sessions_folder="{sessions_folder}"
        output_variable="loaded_state"
    />

    <action>
      Load all variables from {{loaded_state.state.variables}}:
      - {{raw_content}}
      - {{analysis_report}}
      - {{market_insight_report}}
      - {{curated_ideas}}
      - {{approved_ideas}}
      - {{curated_outline}}
      - {{final_outline}}
      - {{first_draft}}
      - {{seo_optimized_draft}}
      - {{final_publishable_content}}
    </action>

    <action>
      Set {{current_step}} = {{loaded_state.state.workflow.current_step}}
      Set {{project_folder}} = "{sessions_folder}/{{project_id}}"
      Set {{state_file}} = "{{project_folder}}/state.yaml"
    </action>

    <action>
      Hiển thị trạng thái:
      ✓ Loaded: {{loaded_state.state.project.title}}
      ✓ Progress: {{loaded_state.state.workflow.current_step}}/{{loaded_state.state.workflow.total_steps}} steps
      ✓ Status: {{loaded_state.state.workflow.status}}

      Completed steps: {{loaded_state.state.workflow.completed_steps}}

      Next step: {{current_step}} - (step name)
    </action>

    <ask>Bạn muốn:
    [1] Tiếp tục từ step {{current_step}}
    [2] Nhảy đến step khác
    [3] Xem chi tiết outputs</ask>

    <check if="user answered '2'">
      <ask>Nhập số step muốn nhảy đến (1-9):</ask>
      <action>Set {{current_step}} = {{user_response}}</action>
    </check>

    <check if="user answered '3'">
      <action>Hiển thị tất cả output files trong {{project_folder}}/</action>
      <ask>Nhấn Enter để tiếp tục...</ask>
    </check>

    <action>
      Hiển thị: "Đang resume từ step {{current_step}}..."
    </action>

    <goto step="{{current_step}}">Jump to resume step</goto>
  </check>

  <!-- Branch 2: New project -->
  <check if="user answered '1' OR user answered 'new'">
    <ask>Bạn muốn:
    [1] Tự động tạo Project ID (auto)
    [2] Đặt tên Project ID riêng (custom)</ask>

    <!-- Sub-branch: Custom ID -->
    <check if="user answered '2' OR user answered 'custom'">
      <ask>Nhập Project ID (chỉ dùng chữ thường, số, và dấu gạch ngang):
      Ví dụ: my-first-article, brand-campaign-2025</ask>

      <action>Set {{custom_id_input}} = {{user_response}}</action>

      <invoke-task
          exec="{project-root}/bmad/sew/tasks/generate-project-id.task.xml"
          custom_id="{{custom_id_input}}"
          sessions_folder="{sessions_folder}"
          output_variable="id_result"
      />

      <check if="{{id_result.success}} == false">
        <action>Hiển thị lỗi: {{id_result.error}}</action>
        <ask>Thử lại với ID khác? [y/n]</ask>
        <check if="user answered 'y'">
          <goto step="0">Restart project init</goto>
        </check>
        <action>Workflow cancelled</action>
        <goto step="999">Exit</goto>
      </check>

      <action>Set {{project_id}} = {{id_result.project_id}}</action>
    </check>

    <!-- Sub-branch: Auto ID (will be generated after URL input) -->
    <check if="user answered '1' OR user answered 'auto'">
      <action>Set {{use_auto_id}} = true</action>
      <action>Hiển thị: "Project ID sẽ được tạo tự động từ URL..."</action>
    </check>

    <!-- Get source URL -->
    <ask>Vui lòng cung cấp URL của bài viết gốc bạn muốn viết lại:</ask>
    <action>Set {{source_url}} = {{user_response}}</action>

    <!-- Generate auto ID if needed -->
    <check if="{{use_auto_id}} == true">
      <invoke-task
          exec="{project-root}/bmad/sew/tasks/generate-project-id.task.xml"
          source_url="{{source_url}}"
          sessions_folder="{sessions_folder}"
          output_variable="id_result"
      />

      <action>Set {{project_id}} = {{id_result.project_id}}</action>
    </check>

    <!-- Initialize project state -->
    <action>
      Set {{project_folder}} = "{sessions_folder}/{{project_id}}"
      Set {{state_file}} = "{{project_folder}}/state.yaml"
    </action>

    <action>
      Prepare initialization data:
      {{init_data}} = {
        project: {
          id: {{project_id}},
          title: "Untitled - will be updated after analysis",
          source_url: {{source_url}},
          created_date: {{timestamp_now}},
          last_updated: {{timestamp_now}},
          author: {user_name}
        },
        workflow: {
          name: "seo-article-rewriting",
          status: "new",
          current_step: 0,
          completed_steps: [],
          total_steps: 9
        },
        variables: {},
        human_approvals: [],
        config: {
          communication_language: {communication_language},
          document_output_language: {document_output_language},
          user_name: {user_name},
          sessions_folder: {sessions_folder}
        }
      }
    </action>

    <invoke-task
        exec="{project-root}/bmad/sew/tasks/state-manager.task.xml"
        action="init"
        project_id="{{project_id}}"
        sessions_folder="{sessions_folder}"
        data="{{init_data}}"
        output_variable="init_result"
    />

    <check if="{{init_result.success}} == false">
      <action>Hiển thị lỗi: {{init_result.error}}</action>
      <action>Workflow failed to initialize</action>
      <goto step="999">Exit</goto>
    </check>

    <action>
      Hiển thị thành công:
      ✓ Project ID: {{project_id}}
      ✓ Folder: {{project_folder}}/
      ✓ State file: {{state_file}}
      ✓ Source URL: {{source_url}}

      Bắt đầu workflow...
    </action>

    <action>Set {{current_step}} = 1</action>
  </check>
</step>

<step n="1" goal="Lấy Nội dung từ URL">
  <action>Hiển thị: "Đang fetch nội dung từ: {{source_url}}"</action>

  <invoke-task
      exec="{project-root}/bmad/sew/tasks/fetch-and-save-content.task.xml"
      url="{{source_url}}"
      output_file="{{project_folder}}/01-raw-content.md"
      sessions_output_folder="{{project_folder}}"
      output_variable="fetch_result"
  />

  <check if="{{fetch_result.success}} == false">
    <action>Hiển thị lỗi: {{fetch_result.message}}</action>
    <action>Workflow failed at step 1</action>
    <goto step="999">Exit</goto>
  </check>

  <action>Set {{raw_content}} = {{fetch_result.content}}</action>
  <action>Set {{raw_content_file}} = {{fetch_result.output_path}}</action>

  <action>
    Hiển thị thành công:
    ✓ Content fetched successfully
    ✓ Saved to: {{raw_content_file}}
    ✓ Content length: {{length of raw_content}} characters
  </action>

  <!-- Update state -->
  <action>
    Prepare state update:
    {{state_update}} = {
      workflow: {
        status: "in_progress",
        current_step: 1,
        completed_steps: [1]
      },
      variables: {
        raw_content: "{{raw_content_file}}"
      }
    }
  </action>

  <invoke-task
      exec="{project-root}/bmad/sew/tasks/state-manager.task.xml"
      action="update"
      project_id="{{project_id}}"
      sessions_folder="{sessions_folder}"
      data="{{state_update}}"
      output_variable="state_update_result"
  />

  <template-output>raw_content</template-output>
</step>

<step n="2" goal="Phân tích Nội dung & Nghiên cứu Thị trường">
  <action>Load context files for analysis</action>
  <action>Read {installed_path}/context_files/ethical_guidelines.md → {{ethical_guidelines}}</action>
  <action>Read {installed_path}/context_files/cultural_context.md → {{cultural_context}}</action>
  <action>Read {installed_path}/context_files/cultural_lexicon.csv → {{cultural_lexicon}}</action>
  <action>Read {installed_path}/context_files/brand_guideline.md → {{brand_guideline}}</action>

  <invoke-task
      exec="{project-root}/bmad/sew/tasks/analyze-content.task.xml"
      raw_content="{{raw_content}}"
      ethical_guidelines="{{ethical_guidelines}}"
      cultural_context="{{cultural_context}}"
      cultural_lexicon="{{cultural_lexicon}}"
      brand_guideline="{{brand_guideline}}"
      output_file="{{project_folder}}/02-analysis-report.yaml"
      output_variable="analysis_report"
  />
  <invoke-task
      exec="{project-root}/bmad/sew/tasks/preliminary-market-research.task.xml"
      topic="{{analysis_report.summary.vietnamese_summary}}"
      output_file="{{project_folder}}/02-market-insight.yaml"
      output_variable="market_insight_report"
  />

  <!-- Update state -->
  <action>
    Prepare state update:
    {{state_update}} = {
      workflow: {
        current_step: 2,
        completed_steps: [1, 2]
      },
      variables: {
        analysis_report: "{{project_folder}}/02-analysis-report.yaml",
        market_insight_report: "{{project_folder}}/02-market-insight.yaml"
      }
    }
  </action>

  <invoke-task
      exec="{project-root}/bmad/sew/tasks/state-manager.task.xml"
      action="update"
      project_id="{{project_id}}"
      sessions_folder="{sessions_folder}"
      data="{{state_update}}"
  />

  <template-output>content_analysis_report</template-output>
  <template-output>market_insight_report</template-output>
</step>

<step n="3" goal="Tranh luận & Chọn lọc Ý tưởng">
  <invoke-task
      exec="{project-root}/bmad/sew/tasks/ideas-debate.task.xml"
      topic="Các ý tưởng chính cho bài viết mới"
      content_analysis_report="{{analysis_report}}"
      market_insight_report="{{market_insight_report}}"
      seo_preliminary_analysis="{{analysis_report}}"
      cultural_context="{{cultural_context}}"
      output_file="{{project_folder}}/03-ideas-debate.yaml"
      output_variable="debate_results"
  />

  <!-- Update state -->
  <action>
    Prepare state update:
    {{state_update}} = {
      workflow: {
        current_step: 3,
        completed_steps: [1, 2, 3]
      },
      variables: {
        curated_ideas: "{{project_folder}}/03-ideas-debate.yaml"
      }
    }
  </action>

  <invoke-task
      exec="{project-root}/bmad/sew/tasks/state-manager.task.xml"
      action="update"
      project_id="{{project_id}}"
      sessions_folder="{sessions_folder}"
      data="{{state_update}}"
  />

  <template-output>curated_ideas</template-output>
</step>

<step n="4" goal="Con người Đánh giá Ý tưởng">
  <invoke-task
      exec="{project-root}/bmad/sew/tasks/human-approval-gate.task.xml"
      curated_ideas="{{curated_ideas}}"
      output_file="{{project_folder}}/04-approved-ideas.yaml"
      output_variable="approval_decision"
  />

  <check if="{{approval_decision.decision}} == 'rejected'">
    <action>Ghi nhận phản hồi của người dùng: {{approval_decision.feedback}}</action>

    <!-- Record rejection in state -->
    <action>
      {{human_approval_record}} = {
        step: 4,
        decision: "rejected",
        feedback: "{{approval_decision.feedback}}",
        timestamp: "{{current_timestamp}}"
      }
    </action>

    <invoke-task
        exec="{project-root}/bmad/sew/tasks/state-manager.task.xml"
        action="update"
        project_id="{{project_id}}"
        sessions_folder="{sessions_folder}"
        data="{
          human_approvals: [{{human_approval_record}}]
        }"
    />

    <goto step="3"/>
  </check>

  <!-- Record approval in state -->
  <action>
    Prepare state update:
    {{state_update}} = {
      workflow: {
        current_step: 4,
        completed_steps: [1, 2, 3, 4]
      },
      variables: {
        approved_ideas: "{{project_folder}}/04-approved-ideas.yaml"
      },
      human_approvals: [{
        step: 4,
        decision: "approved",
        timestamp: "{{current_timestamp}}"
      }]
    }
  </action>

  <invoke-task
      exec="{project-root}/bmad/sew/tasks/state-manager.task.xml"
      action="update"
      project_id="{{project_id}}"
      sessions_folder="{sessions_folder}"
      data="{{state_update}}"
  />

  <template-output>approved_ideas</template-output>
</step>

<step n="5" goal="Tranh luận & Xây dựng Dàn ý">
  <invoke-task
      exec="{project-root}/bmad/sew/tasks/outline-debate.task.xml"
      topic="Xây dựng dàn ý chi tiết"
      approved_ideas="{{approved_ideas}}"
      output_file="{{project_folder}}/05-outline-debate.yaml"
      output_variable="outline_debate_results"
  />

  <!-- Update state -->
  <action>
    Prepare state update:
    {{state_update}} = {
      workflow: {
        current_step: 5,
        completed_steps: [1, 2, 3, 4, 5]
      },
      variables: {
        curated_outline: "{{project_folder}}/05-outline-debate.yaml"
      }
    }
  </action>

  <invoke-task
      exec="{project-root}/bmad/sew/tasks/state-manager.task.xml"
      action="update"
      project_id="{{project_id}}"
      sessions_folder="{sessions_folder}"
      data="{{state_update}}"
  />

  <template-output>curated_outline</template-output>
</step>

<step n="6" goal="Con người Đánh giá Dàn ý">
  <invoke-task
      exec="{project-root}/bmad/sew/tasks/human-outline-approval-gate.task.xml"
      curated_outline="{{curated_outline}}"
      output_file="{{project_folder}}/06-final-outline.yaml"
      output_variable="outline_approval_decision"
  />

  <check if="{{outline_approval_decision.decision}} == 'rejected'">
    <action>Ghi nhận phản hồi của người dùng: {{outline_approval_decision.feedback}}</action>

    <!-- Record rejection in state -->
    <action>
      {{human_approval_record}} = {
        step: 6,
        decision: "rejected",
        feedback: "{{outline_approval_decision.feedback}}",
        timestamp: "{{current_timestamp}}"
      }
    </action>

    <invoke-task
        exec="{project-root}/bmad/sew/tasks/state-manager.task.xml"
        action="update"
        project_id="{{project_id}}"
        sessions_folder="{sessions_folder}"
        data="{
          human_approvals: [{{human_approval_record}}]
        }"
    />

    <goto step="5"/>
  </check>

  <!-- Record approval in state -->
  <action>
    Prepare state update:
    {{state_update}} = {
      workflow: {
        current_step: 6,
        completed_steps: [1, 2, 3, 4, 5, 6]
      },
      variables: {
        final_outline: "{{project_folder}}/06-final-outline.yaml"
      },
      human_approvals: [{
        step: 6,
        decision: "approved",
        timestamp: "{{current_timestamp}}"
      }]
    }
  </action>

  <invoke-task
      exec="{project-root}/bmad/sew/tasks/state-manager.task.xml"
      action="update"
      project_id="{{project_id}}"
      sessions_folder="{sessions_folder}"
      data="{{state_update}}"
  />

  <template-output>final_outline</template-output>
</step>

<step n="7" goal="Viết bài thích ứng (Adaptive Writing)">
  <action>Load additional context files for writing</action>
  <action>Read {installed_path}/context_files/customer_persona.md → {{customer_persona}}</action>

  <invoke-task
      exec="{project-root}/bmad/sew/tasks/adaptive-writing.task.xml"
      final_outline="{{final_outline}}"
      analysis_report="{{analysis_report}}"
      customer_persona="{{customer_persona}}"
      brand_guideline="{{brand_guideline}}"
      cultural_lexicon="{{cultural_lexicon}}"
      output_file="{{project_folder}}/07-first-draft.md"
      output_variable="first_draft"
  />

  <!-- Update state -->
  <action>
    Prepare state update:
    {{state_update}} = {
      workflow: {
        current_step: 7,
        completed_steps: [1, 2, 3, 4, 5, 6, 7]
      },
      variables: {
        first_draft: "{{project_folder}}/07-first-draft.md"
      }
    }
  </action>

  <invoke-task
      exec="{project-root}/bmad/sew/tasks/state-manager.task.xml"
      action="update"
      project_id="{{project_id}}"
      sessions_folder="{sessions_folder}"
      data="{{state_update}}"
  />

  <template-output>first_draft</template-output>
</step>

<step n="8" goal="Tối ưu hóa SEO (SEO Optimization)">
  <invoke-task
      exec="{project-root}/bmad/sew/tasks/seo-optimization.task.xml"
      first_draft="{{first_draft}}"
      topic="{{analysis_report.summary.vietnamese_summary}}"
      output_file="{{project_folder}}/08-seo-optimized.md"
      output_variable="seo_optimized_draft"
  />

  <!-- Update state -->
  <action>
    Prepare state update:
    {{state_update}} = {
      workflow: {
        current_step: 8,
        completed_steps: [1, 2, 3, 4, 5, 6, 7, 8]
      },
      variables: {
        seo_optimized_draft: "{{project_folder}}/08-seo-optimized.md"
      }
    }
  </action>

  <invoke-task
      exec="{project-root}/bmad/sew/tasks/state-manager.task.xml"
      action="update"
      project_id="{{project_id}}"
      sessions_folder="{sessions_folder}"
      data="{{state_update}}"
  />

  <template-output>seo_optimized_draft</template-output>
</step>

<step n="9" goal="QA & Định dạng Xuất bản">
  <invoke-task
      exec="{project-root}/bmad/sew/tasks/quality-assurance-and-formatting.task.xml"
      seo_optimized_draft="{{seo_optimized_draft}}"
      output_file="{{project_folder}}/09-final-publishable.yaml"
      output_variable="final_publishable_content"
  />

  <!-- Update state - mark workflow as completed -->
  <action>
    Prepare final state update:
    {{state_update}} = {
      workflow: {
        status: "completed",
        current_step: 9,
        completed_steps: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      },
      variables: {
        final_publishable_content: "{{project_folder}}/09-final-publishable.yaml"
      },
      project: {
        completion_date: "{{current_timestamp}}"
      }
    }
  </action>

  <invoke-task
      exec="{project-root}/bmad/sew/tasks/state-manager.task.xml"
      action="update"
      project_id="{{project_id}}"
      sessions_folder="{sessions_folder}"
      data="{{state_update}}"
  />

  <action>
    Hiển thị thông báo hoàn thành:
    ╔══════════════════════════════════════════════════╗
    ║  🎉 WORKFLOW HOÀN TẤT THÀNH CÔNG!              ║
    ╠══════════════════════════════════════════════════╣
    ║  Project ID: {{project_id}}                     ║
    ║  Tất cả 9 bước đã hoàn thành                    ║
    ║  Final output: {{project_folder}}/09-final-publishable.yaml ║
    ╚══════════════════════════════════════════════════╝
  </action>

  <template-output>final_publishable_content</template-output>
</step>

</workflow>