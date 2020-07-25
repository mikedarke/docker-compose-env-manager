import React, { useState } from 'react';
import { Typography, TextField } from '@material-ui/core';
import DockerComposeFile from '../../lib/docker-compose/DockerComposeFile';

type Props = {
  dockerComposeFile: DockerComposeFile;
  classes: any;
  onUpdate: Function;
  onRemove: Function;
};

export default function DockerComposeFileItem(props: Props) {
  const { dockerComposeFile, onUpdate, classes } = props;
  const [file, setFile] = useState(dockerComposeFile);

  const onNameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    const dcf = new DockerComposeFile(file.FileInfo, name);
    setFile(dcf);
    onUpdate(dcf);
  };

  if (!file) {
    return null;
  }

  return (
    <div className={classes}>
      <TextField
        id="standard-basic"
        label="Group Name"
        value={file?.Name}
        onChange={onNameChanged}
      />
      <Typography variant="caption" display="block">
        {file.FileInfo.path}
      </Typography>
    </div>
  );
}
