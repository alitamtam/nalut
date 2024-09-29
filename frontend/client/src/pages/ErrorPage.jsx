// ErrorPage.js
import PropTypes from 'prop-types';

const ErrorPage = ({ error }) => {
    return (
        <div>
            <h1>Oops! Something went wrong</h1>
            <p>{error?.statusText || error?.message}</p>
        </div>
    );
};

ErrorPage.propTypes = {
    error: PropTypes.shape({
        statusText: PropTypes.string,
        message: PropTypes.string,
    }),
};

export default ErrorPage;
