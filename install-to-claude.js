/**
 * Quick installer for SEW module agents into Claude Code
 * Compiles YAML agents and copies to .claude/commands/
 */

const path = require('node:path');
const fs = require('fs-extra');
const chalk = require('chalk');

const projectRoot = path.resolve(__dirname, '../..');

async function installSewToClaude() {
  console.log(chalk.cyan('🚀 Installing SEW Module to Claude Code...\n'));

  // 1. Ensure .claude/commands/bmad/sew/agents exists
  const claudeAgentsDir = path.join(projectRoot, '.claude/commands/bmad/sew/agents');
  await fs.ensureDir(claudeAgentsDir);
  console.log(chalk.dim(`✓ Created directory: ${claudeAgentsDir}`));

  // 2. Copy compiled agents from bmad/sew/agents/*.md to .claude
  const sourceAgentsDir = path.join(projectRoot, 'bmad/sew/agents');
  const agentFiles = await fs.readdir(sourceAgentsDir);
  const mdFiles = agentFiles.filter((f) => f.endsWith('.md'));

  if (mdFiles.length === 0) {
    console.log(chalk.yellow('\n⚠️  No compiled agents found!'));
    console.log(chalk.dim('Run: node bmad/sew/build-agents.js first'));
    process.exit(1);
  }

  console.log(chalk.cyan(`\nCopying ${mdFiles.length} agents...\n`));

  for (const mdFile of mdFiles) {
    const sourcePath = path.join(sourceAgentsDir, mdFile);
    const destPath = path.join(claudeAgentsDir, mdFile);

    await fs.copy(sourcePath, destPath, { overwrite: true });
    console.log(chalk.green(`  ✓ ${mdFile}`));
  }

  // 3. Copy workflows
  const workflowsSourceDir = path.join(projectRoot, 'bmad/sew/workflows');
  const workflowsDestDir = path.join(projectRoot, '.claude/commands/bmad/sew/workflows');

  if (await fs.pathExists(workflowsSourceDir)) {
    await fs.copy(workflowsSourceDir, workflowsDestDir, { overwrite: true });
    console.log(chalk.green('\n  ✓ Workflows copied'));
  }

  // 4. Copy tasks
  const tasksSourceDir = path.join(projectRoot, 'bmad/sew/tasks');
  const tasksDestDir = path.join(projectRoot, '.claude/commands/bmad/sew/tasks');

  if (await fs.pathExists(tasksSourceDir)) {
    await fs.copy(tasksSourceDir, tasksDestDir, { overwrite: true });
    console.log(chalk.green('  ✓ Tasks copied'));
  }

  // 5. Copy config
  const configSource = path.join(projectRoot, 'bmad/sew/config.yaml');
  const configDest = path.join(projectRoot, '.claude/commands/bmad/sew/config.yaml');

  await fs.copy(configSource, configDest, { overwrite: true });
  console.log(chalk.green('  ✓ Config copied'));

  // 6. Create manifest entry in bmad/_cfg/manifest.yaml
  const manifestPath = path.join(projectRoot, 'bmad/_cfg/manifest.yaml');

  if (await fs.pathExists(manifestPath)) {
    const manifestContent = await fs.readFile(manifestPath, 'utf8');

    if (!manifestContent.includes('sew:')) {
      const sewEntry = `\nsew:
  name: "SEO Expert Writer"
  version: "1.0.0"
  enabled: true
  agents:
    - master-orchestrator
    - content-analyzer
    - market-insight-agent
    - adaptive-writer
    - seo-specialist
    - qa-editor
    - debate-moderator
    - publishing-formatter
    - content-fetcher
`;
      await fs.appendFile(manifestPath, sewEntry);
      console.log(chalk.green('  ✓ Manifest updated'));
    }
  }

  console.log(chalk.green('\n✨ SEW Module installed successfully!'));
  console.log(chalk.dim('\n📌 Available agents:'));
  for (const mdFile of mdFiles) {
    const agentName = path.basename(mdFile, '.md');
    console.log(chalk.dim(`   - ${agentName}`));
  }

  console.log(chalk.cyan('\n💡 Usage:'));
  console.log(chalk.dim('   Call any agent by name in Claude Code'));
  console.log(chalk.dim('   Example: "master-orchestrator" or "content-analyzer"\n'));
}

installSewToClaude().catch((error) => {
  console.error(chalk.red('Installation failed:'), error.message);
  process.exit(1);
});
