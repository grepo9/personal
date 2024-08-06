import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import { KEY_CODES } from '@utils';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledJobsSection = styled.section`
  max-width: 700px;

  .inner {
    display: flex;

    @media (max-width: 600px) {
      display: block;
    }

    @media (min-width: 700px) {
      min-height: 340px;
    }
  }
`;

const StyledTabList = styled.div`
  position: relative;
  z-index: 3;
  width: max-content;
  padding: 0;
  margin: 0;
  list-style: none;

  @media (max-width: 600px) {
    display: flex;
    overflow-x: auto;
    width: calc(100% + 100px);
    padding-left: 50px;
    margin-left: -50px;
    margin-bottom: 30px;
  }
  @media (max-width: 480px) {
    width: calc(100% + 50px);
    padding-left: 25px;
    margin-left: -25px;
  }

  li {
    &:first-of-type {
      @media (max-width: 600px) {
        margin-left: 50px;
      }
      @media (max-width: 480px) {
        margin-left: 25px;
      }
    }
    &:last-of-type {
      @media (max-width: 600px) {
        padding-right: 50px;
      }
      @media (max-width: 480px) {
        padding-right: 25px;
      }
    }
  }
`;

const StyledTabButton = styled.button`
  ${({ theme }) => theme.mixins.link};
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--tab-height);
  padding: 0 20px 2px;
  border-left: 2px solid var(--lightest-navy);
  background-color: transparent;
  color: ${({ isActive }) => (isActive ? 'var(--green)' : 'var(--slate)')};
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  text-align: left;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 0 15px 2px;
  }
  @media (max-width: 600px) {
    ${({ theme }) => theme.mixins.flexCenter};
    min-width: 120px;
    padding: 0 15px;
    border-left: 0;
    border-bottom: 2px solid var (--lightest-navy);
    text-align: center;
  }

  &:hover,
  &:focus {
    background-color: var(--light-navy);
  }
`;

const StyledHighlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 2px;
  height: var(--tab-height);
  border-radius: var(--border-radius);
  background: var(--green);
  transform: translateY(calc(${({ activeTabId }) => activeTabId} * var(--tab-height)));
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: 0.1s;

  @media (max-width: 600px) {
    top: auto;
    bottom: 0;
    width: 100%;
    max-width: var(--tab-width);
    height: 2px;
    margin-left: 50px;
    transform: translateX(calc(${({ activeTabId }) => activeTabId} * var(--tab-width)));
  }
  @media (max-width: 480px) {
    margin-left: 25px;
  }
`;

const StyledTabPanels = styled.div`
  position: relative;
  width: 100%;
  margin-left: 20px;

  @media (max-width: 800px) {
    margin-left: 0;
  }
`;

const StyledTabPanel = styled.div`
  width: 200%;
  height: auto;
  max-height: 600px; /* Set the maximum height */
  overflow-y: auto; /* Make the content scrollable */
  padding: 10px 5px;

  ul {
    ${({ theme }) => theme.mixins.fancyList};
  }

  h3 {
    margin-bottom: 2px;
    font-size: var(--fz-xxl);
    font-weight: 500;
    line-height: 1.3;

    .company {
      color: var(--green);
    }
  }

  .range {
    margin-bottom: 25px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
  }

  .location {
    margin-bottom: 10px;
    margin-top: 10px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }
`;

const Jobs = () => {
  const jobsData = [
    {
      frontmatter: {
        title: 'Software Engineer',
        company: 'Super Micro Computer, Inc.',
        location: 'San Jose, CA',
        range: 'Mar 2024 - Present',
        url: 'https://www.supermicro.com/en/',
      },
      html: `<ul>
          <li>Develop full stack applications with React, Node.js, and Express to create internal tools used daily across the global production line</li>
          <li>Implemented GraphQL with Apollo Server to streamline data fetching and improve API efficiency</li>
          <li>Manage and deploy Kubernetes on a bare metal server, transitioning the deployment management from Ansible to Helm</li>
          <li>Increased unit test coverage to over 95% for most of the existing projects using Jest</li>
          <li>Refactor legacy codebase with modularization and simplifying complex code logic, reducing technical debt</li>
          <li>Created a CI/CD pipeline using Drone CI to automate deployment and testing of applications, ensuring minimal downtime delivery</li>
          <li>Debugged and resolved critical production-level bugs, resulting in a reduction in system downtime and improved application stability</li>
          <li>Design and maintain database services utilizing MariaDB and ScyllaDB, implementing Galera Cluster for syncing, ensuring high availability and data consistency across multiple countries</li>
          <li>Designed, planned, and built a comprehensive development environment for local testing through Docker containers</li>
        </ul>
        `,
    },
    {
      frontmatter: {
        title: 'Software Engineer',
        company: 'Informed.IQ',
        location: 'San Francisco, CA',
        range: 'Nov 2021 - Mar 2023',
        url: 'https://informediq.com/',
      },
      html: `<ul>
        <li>Optimized extraction algorithms using Ruby on Rails to increase recall and precision rates by 20% for Google OCR data</li>
        <li>Integrated and tested a new API product using Python that accurately calculates applicant income from various documents</li>
        <li>Ensured 100% data accuracy for incoming client information by designing and implementing a RESTful API validator</li>
        <li>Worked on the seamless transition from a monolithic single deployment code base to a microservices architecture</li>
        <li>Developed and maintained Terraform configurations for consistent and reproducible deployments across environments</li>
        <li>Implemented customized metrics for each microservice using AWS CloudWatch, enabling real-time monitoring with dashboards</li>
      </ul>
      `,
    },
    {
      frontmatter: {
        title: 'Software Engineer Intern',
        company: 'Equifax',
        location: 'Remote - St. Louis, MO',
        range: 'May 2021 - Aug 2021',
        url: 'https://www.equifax.com/',
      },
      html: `<ul>
            <li>Automated new hire workflow through Java microservices to optimize and expedite the onboarding process for employees</li>
            <li>Utilized Google Cloud Platform’s Firebase, Cloud Firestore, and Kubernetes for secure information storage</li>
            <li>Created unit tests for each microservice using JUnit and Mockito, improving workflows by ensuring reliability and security</li>
          </ul>
      `,
    },
    {
      frontmatter: {
        title: 'Software Engineer Intern',
        company: 'Kenway Consulting',
        location: 'Remote - Chicago, IL',
        range: 'Aug 2020 – May 2021',
        url: 'https://www.kenwayconsulting.com/',
      },
      html: `<ul>
            <li>Developed a web application in Angular that calculates each employee’s bonus based on a value-cost projection</li>
            <li>Integrated and tested API backend services for the web app using HTML, CSS, TypeScript, and Postman, ensuring seamless functionality and user experience</li>
          </ul>
      `,
    },
  ];

  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState(null);
  const tabs = useRef([]);
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const focusTab = () => {
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus();
      return;
    }
    // If we're at the end, go to the start
    if (tabFocus >= tabs.current.length) {
      setTabFocus(0);
    }
    // If we're at the start, move to the end
    if (tabFocus < 0) {
      setTabFocus(tabs.current.length - 1);
    }
  };

  useEffect(() => focusTab(), [tabFocus]);

  const onKeyDown = e => {
    switch (e.key) {
      case KEY_CODES.ARROW_UP: {
        e.preventDefault();
        setTabFocus(tabFocus - 1);
        break;
      }

      case KEY_CODES.ARROW_DOWN: {
        e.preventDefault();
        setTabFocus(tabFocus + 1);
        break;
      }

      default: {
        break;
      }
    }
  };

  return (
    <StyledJobsSection id="jobs" ref={revealContainer}>
      <h2 className="numbered-heading">Work Experience</h2>

      <div className="inner">
        <StyledTabList role="tablist" aria-label="Job tabs" onKeyDown={e => onKeyDown(e)}>
          {jobsData &&
            jobsData.map(({ frontmatter }, i) => {
              const { company } = frontmatter;
              return (
                <StyledTabButton
                  key={i}
                  isActive={activeTabId === i}
                  onClick={() => setActiveTabId(i)}
                  ref={el => (tabs.current[i] = el)}
                  id={`tab-${i}`}
                  role="tab"
                  tabIndex={activeTabId === i ? '0' : '-1'}
                  aria-selected={activeTabId === i ? true : false}
                  aria-controls={`panel-${i}`}>
                  <span>{company}</span>
                </StyledTabButton>
              );
            })}
          <StyledHighlight activeTabId={activeTabId} />
        </StyledTabList>

        <StyledTabPanels>
          {jobsData &&
            jobsData.map(({ frontmatter, html }, i) => {
              const { title, url, company, range, location } = frontmatter;

              return (
                <CSSTransition key={i} in={activeTabId === i} timeout={250} classNames="fade">
                  <StyledTabPanel
                    id={`panel-${i}`}
                    role="tabpanel"
                    tabIndex={activeTabId === i ? '0' : '-1'}
                    aria-labelledby={`tab-${i}`}
                    aria-hidden={activeTabId !== i}
                    hidden={activeTabId !== i}>
                    <h3>
                      <span>{title}</span>
                      <span className="company">
                        &nbsp;@&nbsp;
                        <a href={url} className="inline-link">
                          {company}
                        </a>
                      </span>
                    </h3>
                    <p className="location">{location}</p>
                    <p className="range">{range}</p>

                    <div dangerouslySetInnerHTML={{ __html: html }} />
                  </StyledTabPanel>
                </CSSTransition>
              );
            })}
        </StyledTabPanels>
      </div>
    </StyledJobsSection>
  );
};

export default Jobs;
