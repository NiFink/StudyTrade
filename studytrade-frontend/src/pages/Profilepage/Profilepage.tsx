interface ProfilepageProps {
    homepageClick?: () => void;
}

function Profilepage({ homepageClick }: ProfilepageProps) {
    return (
        <div>
            <p>Profilepag</p>
            <button onClick={homepageClick}>Homepage</button>
        </div>
    );
}
export default Profilepage;
