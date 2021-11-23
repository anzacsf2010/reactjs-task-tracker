import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const About = ({ version }) => {
    return (
        <about>
            <p>Version: { version }</p>
            <Link to='/'>Go Back</Link>
        </about>
    );
}

About.defaultProps = {
    version: '1.0.0.0',
}

About.propTypes = {
    version: PropTypes.string.isRequired,
}

export default About;