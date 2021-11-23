import PropTypes from 'prop-types'
import Button from "./Button";
import {useLocation} from "react-router-dom"

const Header = ({ title,onAdd,showAdd }) => {
    const location = useLocation();
    return (
        <header className='header'>
            <h1 style={headingStyle}>{ title }</h1>
            {location.pathname === '/' &&
                <Button color={ showAdd ? 'blue' : 'green' }
                     text={ showAdd ? 'Close' : 'Add new task'}
                     onClick={ onAdd }
                />
            }
        </header>
    );
}

Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

const headingStyle = {
    /*
     No value used here since we are not using a dynamic style. This is just a placeholder
     to remember next time I need to use it
     */
}

export default Header;