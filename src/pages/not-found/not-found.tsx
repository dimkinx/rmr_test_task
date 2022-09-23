import {FC} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, Result} from 'antd';
import {AppRoute} from '../../common/constants';

const NotFound: FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(AppRoute.Main);
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary" onClick={handleButtonClick}>Back Home</Button>}
    />
  );

};

export default NotFound;
