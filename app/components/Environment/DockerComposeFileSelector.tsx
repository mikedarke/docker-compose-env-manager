import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import { Typography, Button } from '@material-ui/core';
import DockerComposeFile from '../../lib/docker-compose/DockerComposeFile';
import DockerComposeFileItem from './DockerComposeFileItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '100ch'
      }
    },
    h3: {
      fontSize: '1em'
    },
    fileItem: {
      '& > *': {
        width: '100ch'
      }
    }
  })
);

type Props = {
  files: DockerComposeFile[];
  setFiles: Function;
};

export default function DockerComposeFileSelector(props: Props) {
  const classes = useStyles();
  const { files, setFiles } = props;
  const displayNone = { display: 'none' };

  const onFileAdded = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFiles = [...files];
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    const f = event.target.files[0];
    const dcf = new DockerComposeFile(f.name, f.path, f.name);
    updatedFiles.push(dcf);
    setFiles(updatedFiles);
    // eslint-disable-next-line no-param-reassign
    event.target.value = '';
  };

  const onFileUpdated = (file: DockerComposeFile) => {
    const updatedFiles = [...files];
    updatedFiles.forEach((f, index) => {
      if (f.filePath === file.filePath) {
        updatedFiles[index] = file;
      }
    });

    setFiles(updatedFiles);
  };

  return (
    <FormGroup className={classes.root}>
      <input
        type="file"
        id="compose-file"
        name="compose-file"
        value=""
        onChange={onFileAdded}
        style={displayNone}
      />
      <label htmlFor="compose-file">
        <Button component="span" variant="contained" color="secondary">
          Add config
        </Button>
      </label>
      {files.length === 0 ? <Typography>No files configured</Typography> : null}
      {files.map(f => (
        <DockerComposeFileItem
          key={f.filePath}
          dockerComposeFile={f}
          onUpdate={onFileUpdated}
          onRemove={() => {}}
          classes={classes.fileItem}
        />
      ))}
    </FormGroup>
  );
}
