const { createRunOncePlugin, withPodfile } = require('@expo/config-plugins');

const PLUGIN_NAME = 'with-ios-simulator-excluded-archs';

/**
 * On Apple Silicon, omit x86_64 iphonesimulator slices so Swift pods (e.g. ExpoLogBox) are not
 * compiled twice — avoids OOM / long CI failures. Intel Macs are unchanged (uname != arm64).
 */
const POST_INSTALL_SNIPPET = `    # Apple Silicon only: skip x86_64 simulator slice (halves Swift compile; avoids CI OOM)
    if \`uname -m\`.strip == 'arm64'
      installer.pods_project.targets.each do |target|
        target.build_configurations.each do |build_config|
          build_config.build_settings['EXCLUDED_ARCHS[sdk=iphonesimulator*]'] = 'x86_64'
        end
      end
    end
`;

function withIosSimulatorExcludedArchs(config) {
  return withPodfile(config, (config) => {
    let contents = config.modResults.contents;
    if (contents.includes("EXCLUDED_ARCHS[sdk=iphonesimulator*]")) {
      return config;
    }

    const key = ':ccache_enabled => ccache_enabled?(podfile_properties),';
    const pos = contents.indexOf(key);
    if (pos === -1) {
      console.warn(
        `[${PLUGIN_NAME}] Podfile template changed; could not inject simulator EXCLUDED_ARCHS hook.`,
      );
      return config;
    }

    const insertAfter = contents.indexOf('\n    )', pos);
    if (insertAfter === -1) {
      console.warn(`[${PLUGIN_NAME}] Could not find end of react_native_post_install block.`);
      return config;
    }

    const afterParen = insertAfter + '\n    )'.length;
    contents = contents.slice(0, afterParen) + '\n' + POST_INSTALL_SNIPPET + contents.slice(afterParen);
    config.modResults.contents = contents;
    return config;
  });
}

module.exports = createRunOncePlugin(withIosSimulatorExcludedArchs, PLUGIN_NAME);
