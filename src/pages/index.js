import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Hero, Contact } from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = ({ location }) => {
  useEffect(() => {
    // Scroll to top on component mount
  }, []);

  return (
    <Layout location={location}>
      <StyledMainContainer className="fillHeight">
        <Hero />
        {/* <Featured /> */}
        {/* <Projects /> */}
        <Contact />
      </StyledMainContainer>
    </Layout>
  );
};

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
