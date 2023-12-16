import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';

type WorkerPrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function WorkerPrivateRoute(props: WorkerPrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus !== AuthorizationStatus.Unknown
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default WorkerPrivateRoute;