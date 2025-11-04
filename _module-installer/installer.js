const chalk = require('chalk');
const path = require('node:path');
const fs = require('fs-extra');

/**
 * SEW Module Installer
 * Custom installer for SEO Expert Writer module
 *
 * @param {Object} options - Installation options
 * @param {string} options.projectRoot - The root directory of the target project
 * @param {Object} options.config - Module configuration from install-config.yaml
 * @param {Array<string>} options.installedIDEs - Array of IDE codes that were installed
 * @param {Object} options.logger - Logger instance for output
 * @returns {Promise<boolean>} - Success status
 */
async function install(options) {
  const { projectRoot, config, installedIDEs, logger } = options;

  try {
    logger.log(chalk.blue('🖋️  Installing SEW (SEO Expert Writer) Module...'));

    // 1. Create output directories
    await createOutputDirectories(projectRoot, config, logger);

    // 2. Setup context files if not exist
    await setupContextFiles(projectRoot, logger);

    // 3. Handle IDE-specific configurations
    if (installedIDEs && installedIDEs.length > 0) {
      logger.log(chalk.cyan(`Configuring SEW for IDEs: ${installedIDEs.join(', ')}`));
      for (const ide of installedIDEs) {
        await configureForIDE(ide, projectRoot, config, logger);
      }
    }

    logger.log(chalk.green('✓ SEW Module installation complete'));
    logger.log(chalk.dim('\n💡 Tip: SEW module includes 9 specialized agents for SEO content creation:'));
    logger.log(chalk.dim('   - Master Orchestrator: Tổng quản lý dự án'));
    logger.log(chalk.dim('   - Content Analyzer: Phân tích nội dung'));
    logger.log(chalk.dim('   - Market Insight: Nghiên cứu thị trường'));
    logger.log(chalk.dim('   - Adaptive Writer: Viết nội dung linh hoạt'));
    logger.log(chalk.dim('   - SEO Specialist: Tối ưu SEO'));
    logger.log(chalk.dim('   - QA Editor: Kiểm tra chất lượng'));
    logger.log(chalk.dim('   - Debate Moderator: Tranh luận ý tưởng'));
    logger.log(chalk.dim('   - Publishing Formatter: Định dạng xuất bản'));
    logger.log(chalk.dim('   - Content Fetcher: Thu thập nội dung\n'));

    return true;
  } catch (error) {
    logger.error(chalk.red(`Error installing SEW module: ${error.message}`));
    return false;
  }
}

/**
 * Create necessary output directories
 * @private
 */
async function createOutputDirectories(projectRoot, config, logger) {
  logger.log(chalk.cyan('Creating output directories...'));

  const directories = [
    resolveConfigPath(projectRoot, config.sessions_output_folder),
    resolveConfigPath(projectRoot, config.final_output_folder),
    path.join(projectRoot, 'bmad/sew/workflows/seo-article-rewriting/context_files'),
  ];

  for (const dir of directories) {
    if (await fs.pathExists(dir)) {
      logger.log(chalk.dim(`  ○ Exists: ${path.relative(projectRoot, dir)}`));
    } else {
      await fs.ensureDir(dir);
      logger.log(chalk.dim(`  ✓ Created: ${path.relative(projectRoot, dir)}`));
    }
  }
}

/**
 * Setup context files with templates if they don't exist
 * @private
 */
async function setupContextFiles(projectRoot, logger) {
  logger.log(chalk.cyan('Setting up context files...'));

  const contextDir = path.join(projectRoot, 'bmad/sew/workflows/seo-article-rewriting/context_files');

  // Check if context files already exist
  const contextFiles = ['brand_guideline.md', 'business_vision.md', 'customer_persona.md', 'mission.md', 'culture.md'];

  let existingFiles = 0;
  for (const file of contextFiles) {
    if (await fs.pathExists(path.join(contextDir, file))) {
      existingFiles++;
    }
  }

  if (existingFiles > 0) {
    logger.log(chalk.dim(`  ○ Context files already exist (${existingFiles}/${contextFiles.length})`));
  } else {
    logger.log(chalk.dim('  ℹ Context files will be created when running the workflow'));
  }
}

/**
 * Configure SEW module for specific IDE
 * @private
 */
async function configureForIDE(ide, projectRoot, config, logger) {
  switch (ide) {
    case 'claude-code': {
      // Claude Code specific SEW configurations
      logger.log(chalk.dim('  ✓ Configured for Claude Code'));
      break;
    }
    case 'cursor': {
      // Cursor specific SEW configurations
      logger.log(chalk.dim('  ✓ Configured for Cursor'));
      break;
    }
    case 'windsurf': {
      // Windsurf specific SEW configurations
      logger.log(chalk.dim('  ✓ Configured for Windsurf'));
      break;
    }
    default: {
      logger.log(chalk.dim(`  ✓ Configured for ${ide}`));
      break;
    }
  }
}

/**
 * Resolve configuration paths that may contain {project-root} placeholders
 * @private
 * @param {string} projectRoot
 * @param {string} value
 * @returns {string}
 */
function resolveConfigPath(projectRoot, value) {
  if (!value || typeof value !== 'string') return value;
  return value
    .replace(/{project-root}/g, projectRoot)
    .replace(/{project_root}/g, projectRoot);
}

module.exports = { install };
