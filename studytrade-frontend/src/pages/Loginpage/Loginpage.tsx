interface LoginpageProps {
    homepageClick?: () => void;
}

function Loginpage({ homepageClick }: LoginpageProps) {
    return (
        <div>
            <p>Loginpag</p>
            <button onClick={homepageClick}>Homepage</button>
        </div>
    );
}
export default Loginpage;
