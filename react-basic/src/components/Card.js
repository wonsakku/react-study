import propTypes from 'prop-types';
import { useSelector } from 'react-redux';

// const Card = (props) => {
const Card = ({ title, children, onClick }) => {

    return (
        <div className="card mb-3 cursor-pointer" onClick={onClick}>
            <div className="card-body py-2 d-flex align-items-center">
                <div className="flex-grow-1">{title}</div>
                {children && <div>{children}</div>}
            </div>
        </div>
    );
};

Card.propTypes = {
    title: propTypes.string.isRequired,
    children: propTypes.element,
    onClick: propTypes.func
}

Card.defaultProps = {
    // title: "defaultTitle"
    children: null,
    onClick: () => { }
}

export default Card;
