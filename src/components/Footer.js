import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const Footer = ({ copyright }) => {
    return (
        <footer>
            <p>{ copyright }</p>
            <Link to='/about'>About</Link>
        </footer>
    );
}

Footer.defaultProps = {
    copyright: 'Copyright &copy; 2021',
}

Footer.propTypes = {
    copyright: PropTypes.string,
}

export default Footer;