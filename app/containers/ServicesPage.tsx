import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import routes from '../paths/routes';
import ServiceList from '../components/ServiceList';
import { RootStateType, DockerComposeConfig } from '../reducers/types';

type Props = {
  dockerCompose: DockerComposeConfig;
};

export function ServicesPage(props: Props) {
  const { dockerCompose } = props;
  return (
    <div>
      <h2>Service List</h2>
      <ServiceList dockerCompose={dockerCompose} />
      <Link to={routes.HOME}>Home</Link>
    </div>
  );
}

function mapStateToProps(state: RootStateType) {
  console.log('State:');
  console.log(state);
  return {
    dockerCompose: state.dockerCompose
  };
}

// function mapDispatchToProps(dispatch: Dispatch) {
//   return bindActionCreators(
//     {
//     },
//     dispatch
//   );
// }

export default connect(mapStateToProps)(ServicesPage);
