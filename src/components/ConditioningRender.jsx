import Loading from './Loading';
import Error from './Error';

function ConditioningRender({
  status, children, onRefresh, loading, errMessage,
}) {
  if (status === 'LOADING') {
    return loading ?? <Loading />;
  } if (status === 'SUCCESS') {
    return children;
  }
  return <Error onRefresh={onRefresh} message={errMessage} />;
}

export default ConditioningRender;
