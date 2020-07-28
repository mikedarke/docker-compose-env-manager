import React from 'react';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import DockerComposeFileSelector from './DockerComposeFileSelector';
import { useEnvironmentContext } from '../../contexts/EnvironmentContext';
import DockerComposeFile from '../../lib/docker-compose/DockerComposeFile';
import routes from '../../paths/routes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch'
      }
    }
  })
);

export default function Environment() {
  const classes = useStyles();
  const {
    environment,
    setEnvironment,
    saveEnvironment
  } = useEnvironmentContext();
  const history = useHistory();

  const updateEnvironmentName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newName = event.target.value;
    const updatedEnvironment = { ...environment };
    updatedEnvironment.name = newName;
    setEnvironment(updatedEnvironment);
  };

  const onSaveEnvironment = () => {
    console.log('Save', environment);
    saveEnvironment(environment, () => {
      history.push(routes.SERVICES);
    });
  };

  const setFiles = (files: DockerComposeFile[]) => {
    const updatedEnvironment = { ...environment };
    updatedEnvironment.files = files;
    setEnvironment(updatedEnvironment);
  };

  const { name, files } = environment;

  return (
    <form className={classes.root} noValidate autoComplete="on">
      <TextField
        id="standard-basic"
        label="Environment Name"
        value={name}
        onChange={updateEnvironmentName}
      />
      <DockerComposeFileSelector files={files} setFiles={setFiles} />
      <Button variant="contained" color="primary" onClick={onSaveEnvironment}>
        Save environment
      </Button>
    </form>
  );
}
