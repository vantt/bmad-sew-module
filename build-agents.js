/**
 * Build script cho SEW module agents
 * Compile các agent YAML thành MD (XML) format
 */

const path = require('node:path');
const fs = require('fs-extra');

// Import YamlXmlBuilder từ BMAD CLI tools
const projectRoot = path.resolve(__dirname, '../..');
const { YamlXmlBuilder } = require(path.join(projectRoot, 'tools/cli/lib/yaml-xml-builder'));

const builder = new YamlXmlBuilder();

async function buildAllSewAgents() {
  console.log('🔨 Building SEW Module Agents...\n');

  const agentsDir = path.join(__dirname, 'agents');
  const files = await fs.readdir(agentsDir);

  const yamlFiles = files.filter((f) => f.endsWith('.agent.yaml'));

  let built = 0;
  let errors = 0;

  for (const yamlFile of yamlFiles) {
    const agentName = path.basename(yamlFile, '.agent.yaml');
    const yamlPath = path.join(agentsDir, yamlFile);
    const mdPath = path.join(agentsDir, `${agentName}.md`);

    try {
      console.log(`  Building ${agentName}...`);

      // Check for customize file
      const customizePath = path.join(projectRoot, 'bmad/_cfg/agents', `sew-${agentName}.customize.yaml`);
      const customizeExists = await fs.pathExists(customizePath);

      // Build the agent
      await builder.buildAgent(yamlPath, customizeExists ? customizePath : null, mdPath, { includeMetadata: true });

      console.log(`  ✓ ${agentName} compiled successfully`);
      built++;
    } catch (error) {
      console.error(`  ✗ Error building ${agentName}:`, error.message);
      errors++;
    }
  }

  console.log(`\n📊 Build Summary:`);
  console.log(`  ✓ Successfully built: ${built} agents`);
  if (errors > 0) {
    console.log(`  ✗ Failed: ${errors} agents`);
  }
  console.log('\n✨ Done!');
}

// Run the build
buildAllSewAgents().catch((error) => {
  console.error('Build failed:', error);
  process.exit(1);
});
