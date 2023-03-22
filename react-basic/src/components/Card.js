import propTypes from 'prop-types';

// const Card = (props) => {
const Card = ({ title, children, onClick }) => {

    return (
        <div className="card mb-3 cursor-pointer" onClick={onClick}>
            <div className="card-body">
                {/* {props.title} */}
                {/* {title} */}

                <div className="d-flex justify-content-between">
                    <div>{title}</div>
                    {children && <div>{children}</div>}
                </div>
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
