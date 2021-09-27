/* eslint-disable array-callback-return */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import { AllCall } from '../helpers/apiCalls';
import style from '../style/StacksList.module.css';

const StacksList = (props) => {
  const {stacksList, getAllStacks} = props;

  useEffect(() => {
    (async () => {
      try {  
        await getAllStacks('stacks');
      } catch (error) {
        console.log(error)
      }           
    })();
  }, [getAllStacks]);

  return stacksList.length === 0 ? <div className="d-flex justify-content-center align-items-center w-100"><Spinner animation="grow" /></div> : (
    <div className={`container mx-auto mt-4 ${style.container2}`}>
      <h1 className={style.title}>Stacks</h1>
      <div className="row">
        {stacksList.map(stack => {
          <div className="col-md-4">
            <div className="card" style={{width: "18rem"}}>
              <img src="https://i.imgur.com/ZTkt4I5.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{stack.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Since:
                  {' '}
                  {stack.released_year}
                </h6>
                <p className="card-text">
                  {stack.description.substring(0, 87)}
                  ...
                </p>
                <Link
                  key={stack}
                  to={{
                    pathname: `/stack/${stack.name}`,
                    state: {
                      id: stack._id,
                    },
                  }}
                  className={`${style.btn2} mr-2`}
                  id="list-home-list"
                  data-toggle="list"
                  role="tab"
                  aria-controls="home"
                >
                  <i className="fas fa-link" />
                  Learn More...
                </Link>
              </div>
            </div>
          </div> 
        })}
      </div> 
    </div>  
  );
};

StacksList.propTypes = {
  stacks: PropTypes.shape({
    error: PropTypes.object,
    pending: PropTypes.bool,
    stacksList: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  getAllStacks: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  stacks: {
    error: state.stacks.error,
    stacksList: state.stacks.stacksList,
    pending: state.stacks.pending,
  },
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllStacks: AllCall,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StacksList);