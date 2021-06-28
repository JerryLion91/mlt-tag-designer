// Libs
import React from 'react';
import PropTypes from 'prop-types';

// Helpers
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// style Components
import Header from '../components/Header';
import AppBody from '../components/AppBody';
import Button from '../components/Button';
import Footer from '../components/Footer';

// functional Components
import Tag from '../components/Tag';
import DiscProperties from '../components/DiscProperties';
import LoadingComponent from '../components/LoadingComponent';

// Styles
import styles from '../styles/styles';

export default function TagConstructorPage({
  availability,
  changeOrder,
  showMessage,
}) {
  const blank_tag = {
    typedName: '',
    fontFamily: 'serif',
    insideColor: 'black',
    outsideColor: 'white',
    quantity: 1,
  };
  const [tag, setTag] = React.useState(blank_tag);
  const handleTagChange = (newTag) => {
    setTag(newTag);
    setCookie('tag', newTag, { path: '/tag-constructor' });
  };

  const handleHistoryClick = () => {
    setTag(blank_tag);
    removeCookie('tag', { path: '/tag-constructor' });
  };

  const history = useHistory();

  const finishDesign = () => {
    changeOrder({ type: 'addTag', tag: tag });
    history.push('/tag-constructor/sumary');
  };
  const handleFinishClick = () => {
    if (tag.typedName === '') {
      showMessage({
        code: 'tag/missingName',
        message: 'Your tag dont have a name. Do you want to procced?',
        values: { callback: finishDesign },
      });
    }
  };

  const [cookies, setCookie, removeCookie] = useCookies(['tag']);
  React.useEffect(() => {
    const { tag } = cookies;
    if (tag) {
      setTag(tag);
    }
  }, [cookies]);

  return (
    <>
      <Header>
        <Button onClick={handleHistoryClick} icon={'history'} />
        <Button onClick={() => history.push('/')} icon={'navigate_before'} />
      </Header>
      <AppBody>
        <Tag size={200} tag={tag} styles={{ margin: '20px' }} />
        {availability ? (
          <DiscProperties
            availability={availability}
            tag={tag}
            onChange={handleTagChange}
          />
        ) : (
          <LoadingComponent height={240} />
        )}

        <Button
          style={{
            ...styles.btnFilledPurple,
            // this btn inst in a parent div with width, alignSelf is solution
            alignSelf: 'center',
          }}
          onClick={handleFinishClick}
          icon={''}
        >
          Finish Design
        </Button>
      </AppBody>
      <Footer />
    </>
  );
}

TagConstructorPage.propTypes = {
  availability: PropTypes.object.isRequired,
  changeOrder: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired,
};
