import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';

type AdminPrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function AdminPrivateRoute(props: AdminPrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthorizationStatus.Admin
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default AdminPrivateRoute;