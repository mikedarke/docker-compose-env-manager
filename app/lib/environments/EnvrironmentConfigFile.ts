import { writeFileSync } from 'fs';
import EnvironmentDefinition from './EnvironmentDefinition';

export default class EnvrironmentConfigFile {
  environment: EnvironmentDefinition;

  dialog: any;

  constructor(environment: EnvironmentDefinition) {
    this.environment = environment;
    // eslint-disable-next-line prefer-destructuring, global-require
    const { dialog } = require('electron').remote;
    this.dialog = dialog;
  }

  async saveEnvironment(onSavedCallback: Function) {
    console.log(`Saving environment ${this.environment.name}`);
    const result = await this.dialog.showSaveDialog({
      defaultPath: this.getDefaultEnvironmentFileName()
    });

    if (result.filePath) {
      this.writeEnvironmentFile(result.filePath);
      onSavedCallback();
    }
  }

  writeEnvironmentFile(filePath: string) {
    try {
      const envData = JSON.stringify(this.environment, null, '\t');
      writeFileSync(filePath, envData, 'utf-8');
    } catch (e) {
      this.dialog.showMessageBoxSync({
        type: 'error',
        title: 'Saving Environment',
        message: `Failed to save environment ${this.environment.name} file to ${filePath}`,
        detail: e.stack
      });
    }
  }

  getDefaultEnvironmentFileName() {
    const sanitisedEnvName = this.environment.name
      .replace(/[^a-z0-9]/gi, '_')
      .toLowerCase();

    return `${sanitisedEnvName}.env.json`;
  }
}
