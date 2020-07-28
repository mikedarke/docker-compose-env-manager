import { writeFileSync, readFile } from 'fs';
import path from 'path';
import { Dialog } from 'electron';
import EnvironmentDefinition from './EnvironmentDefinition';
import DockerComposeFile from '../docker-compose/DockerComposeFile';
import { EnvironmentConfigFile } from '.';

export default class EnvrironmentConfigFile {
  dialog: Dialog;

  constructor() {
    // eslint-disable-next-line prefer-destructuring, global-require
    const { dialog } = require('electron').remote;
    this.dialog = dialog;
  }

  async saveEnvironment(
    environment: EnvironmentDefinition,
    onSavedCallback: Function
  ) {
    console.log(`Saving environment ${environment.name}`);
    const result = await this.dialog.showSaveDialog({
      defaultPath: EnvrironmentConfigFile.getDefaultEnvironmentFileName(
        environment
      )
    });

    if (result.filePath) {
      this.writeEnvironmentFile(environment, result.filePath);
      onSavedCallback();
    }
  }

  async loadEnvironment(onLoadedCallback: Function) {
    const result = await this.dialog.showOpenDialog({
      properties: ['openFile']
    });

    if (result.filePaths.length > 0) {
      const cfgPath = result.filePaths[0];
      readFile(cfgPath, (err, data) => {
        if (err) throw err;
        const environment = JSON.parse(data.toString());
        const absoluteEnv = EnvironmentConfigFile.getEnvironmentWithAbsolutePaths(
          environment,
          cfgPath
        );
        onLoadedCallback(absoluteEnv, cfgPath);
      });
    }
  }

  writeEnvironmentFile(environment: EnvironmentDefinition, filePath: string) {
    try {
      const pathResolvedEnvironment = EnvrironmentConfigFile.getEnvironmentWithRelativePaths(
        environment,
        filePath
      );
      const envData = JSON.stringify(pathResolvedEnvironment, null, '\t');
      writeFileSync(filePath, envData, 'utf-8');
    } catch (e) {
      this.dialog.showMessageBoxSync({
        type: 'error',
        title: 'Saving Environment',
        message: `Failed to save environment ${environment.name} file to ${filePath}`,
        detail: e.stack
      });
    }
  }

  static getDefaultEnvironmentFileName(environment: EnvironmentDefinition) {
    const sanitisedEnvName = environment.name
      .replace(/[^a-z0-9]/gi, '_')
      .toLowerCase();

    return `${sanitisedEnvName}.env.json`;
  }

  static getEnvironmentWithRelativePaths(
    originalEvironment: EnvironmentDefinition,
    filePath: string
  ): EnvironmentDefinition {
    const env = { ...originalEvironment };
    const { dir } = path.parse(filePath);

    const updatedFiles: DockerComposeFile[] = [];
    env.files.forEach(f => {
      const updatedFile = { ...f };
      console.log(`Env dir: ${dir}`);
      console.log(`File path: ${f.filePath}`);
      const relativePath = path.relative(dir, f.filePath);
      console.log(`Relative path: ${relativePath}`);
      updatedFile.filePath = relativePath;
      updatedFiles.push(updatedFile);
    });

    env.files = updatedFiles;

    return env;
  }

  static getEnvironmentWithAbsolutePaths(
    originalEnvironment: EnvironmentDefinition,
    filePath: string
  ): EnvironmentDefinition {
    const env = { ...originalEnvironment };
    const { dir } = path.parse(filePath);

    const updatedFiles: DockerComposeFile[] = [];
    env.files.forEach(f => {
      const updatedFile = { ...f };
      updatedFile.filePath = path.resolve(dir, updatedFile.filePath);
      updatedFiles.push(updatedFile);
    });

    env.files = updatedFiles;

    return env;
  }
}
